// app/user/auth/passwordReset.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useSearchParams } from 'next/navigation';
import { SERVER_URL } from '@/app/config';
import { toast } from 'react-toastify';

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [email, setEmail] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textSm = 'text-sm md:text-md';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const input = `${textXs} w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none`;
  const minLength = 6;
  const maxLength = 20;
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email');

  const router = useIonRouter();

  useEffect(() => {
    if (!userEmail) {
      setConfirmError('無効なリンクです。');
    } else {
      setEmail(JSON.parse(decodeURIComponent(userEmail)));
    }
  }, [userEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    if (confirmPassword !== password) {
      setConfirmError('パスワードが一致しません。');
    } else if (password === '') {
      setConfirmError('新しいパスワードを入力してください。');
    } else {
      setConfirmError('');
      const response = await fetch(`${SERVER_URL}/api/users/forgot-pwd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, newPassword: password }),
      });
      if (response.status === 200) {
        toast.success('パスワードのリセットに成功しました。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        router.push('/auth/login');
      } else {
        console.log(response.status);
        console.log("Password setting failed.");
      }
    }
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
  

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
            <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16 pb-6">
              <h2 className="text-md font-bold pt-12 md:pt-20 px-12 text-center">パスワードを</h2>
              <h2 className="text-md font-bold pb-12 md:pb-20 px-12 text-center">再設定してください</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="password"
                    className={input}
                    placeholder="パスワード"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && <p className={`text-red-500 mt-1 ${textSm}`}>{passwordError}</p>}
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    className={input}
                    placeholder="パスワード(確認用)"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {confirmError && <p className={`text-red-500 mt-1 ${textSm}`}>{confirmError}</p>}
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 md:py-4 px-4 my-8 sm:my-10 md:my-12 font-semibold ${textSm} ${maleGradient} text-white rounded-full focus:outline-none`}
                >
                  再設定する
                </button>
              </form>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordReset;
