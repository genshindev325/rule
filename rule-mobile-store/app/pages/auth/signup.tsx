// app/user/auth/signup.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter, IonRouterLink } from '@ionic/react';
import { useAuth } from '@/app/components/auth/authContext';
import Notification from '@/app/utils/notification';
import { SERVER_URL } from '@/app/config';

const SignUp: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
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
      setNotification({ message: `ユーザーのサインアップに成功しました。`, type: 'success'});
      setTimeout(() => {
        router.push('/store/dashboard');
      }, 1500);
    } else {
      setNotification({ message: `ユーザー名とパスワードが一致しません。${response.status} エラー`, type: 'error'});
    }
  });

  return (
    <IonPage>
      <IonContent>
        <div className="min-h-screen w-screen flex flex-col items-center justify-start bg-white p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">サインアップ</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
              placeholder="メール"
              required
            />
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
            <input
              type="text"
              name='username'
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
              placeholder="ユーザー名"
              required
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
              placeholder="パスワード"
            />
            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="パスワードの確認"
            />
            {confirmError && <p className="text-red-500 mt-2">{confirmError}</p>}
            <button
              type="submit"
              className="w-full mt-10 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            >
              サインアップ
            </button>
            <div className='my-6 text-right'>
              <IonRouterLink routerLink='/auth/signin' className='text-sm text-blue-300 hover:text-blue-500 hover:cursor-pointer font-bold'>
                すでにアカウントを持っています
              </IonRouterLink>
            </div>
          </form>
          {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SignUp;