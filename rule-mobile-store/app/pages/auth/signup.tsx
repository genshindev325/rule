// app/user/auth/signup.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter, IonRouterLink } from '@ionic/react';
import { useAuth } from '@/app/components/auth/authContext';
import { SERVER_URL } from '@/app/config';
import { toast } from 'react-toastify';

const SignUp: React.FC = () => {
  const router = useIonRouter();
  const { signin } = useAuth();

  // form validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const minLength = 6;
  const maxLength = 20;
  const textSm = 'text-sm md:text-base font-semibold';

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (newPassword: string) => {
    if (newPassword.length < minLength) {
      return `パスワードは${minLength}文字以上でなければなりません。`;
    } else if (newPassword.length > maxLength) {
      return `パスワードは${maxLength}文字を超えることはできません。`;
    } else if (!/[A-Z]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの大文字が含まれている必要があります。';
    } else if (!/[a-z]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの小文字が含まれている必要があります。';
    } else if (!/[0-9]/.test(newPassword)) {
      return 'パスワードには少なくとも 1 つの数字を含める必要があります。';
    // } else if (!/[!@#$%^&*]/.test(newPassword)) {
    //   return 'パスワードには少なくとも1つの特殊文字を含める必要があります (!@#$%^&*).';
    } else {
      return '';
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError('有効なメールアドレスを入力してください。');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));

    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmError('パスワードが一致しません。');
    } else {
      setConfirmError('');
    }
  };

  // handle submit
  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add sign-up logic here
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    toast.info('しばらくお待ちください。', {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      bodyClassName: 'text-xs sm:text-sm',
    });

    const response = await fetch(`${SERVER_URL}/api/stores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status === 201) {
      const result = await response.json();
      const {
        email,
        role,
        profile,
        token
      } = result.data;
      signin(email, role, profile, token);
      toast.success('ユーザーのサインアップに成功しました。', {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
      router.push('/dashboard');
    } else {
      const result = await response.json();
      toast.error(`${result.message}`, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
    }
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4">サインアップ</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="w-full text-xs sm:text-sm px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
              placeholder="メール"
              required
            />
            {emailError && <p className="text-red-500 text-xs sm:text-sm mt-2">{emailError}</p>}
            <input
              type="text"
              name='username'
              className="w-full text-xs sm:text-sm px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
              placeholder="ユーザー名"
              required
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full text-xs sm:text-sm px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
              placeholder="パスワード"
            />
            {passwordError && <p className="text-red-500 text-xs sm:text-sm mt-2">{passwordError}</p>}
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full text-xs sm:text-sm px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="パスワードの確認"
            />
            {confirmError && <p className="text-red-500 text-xs sm:text-sm mt-2">{confirmError}</p>}
            <button
              type="submit"
              className={`w-full mt-10 py-2 px-4 bg-black ${textSm} text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300`}
            >
              サインアップ
            </button>
            <div className='my-6 text-right'>
              <IonRouterLink routerLink='/auth/signin' className={`${textSm} text-gray-500 hover:cursor-pointer`}>
                すでにアカウントを持っています
              </IonRouterLink>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SignUp;