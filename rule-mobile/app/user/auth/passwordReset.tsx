// app/user/auth/passwordReset.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useSearchParams } from 'next/navigation';

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const minLength = 6;
  const maxLength = 20;

  const router = useIonRouter();

  useEffect(() => {
    if (!token) {
      setConfirmError('無効なリンクです。');
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    if (confirmPassword !== password) {
      setConfirmError('パスワードが一致しません。');
    } else if (password === '') {
      setConfirmError('新しいパスワードを入力してください。');
    } else {
      setConfirmError('');
      // reset password logic ...

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
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20">
            <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 px-12 text-center">パスワードを</h2>
            <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 px-12 text-center">再設定してください</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
                  placeholder="パスワード"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
                  placeholder="パスワード(確認用)"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmError && <p className="text-red-500 mt-2">{confirmError}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-2 md:py-4 px-4 mb-16 md:mb-24 mt-16 md:mt-32 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white rounded-full font-bold"
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
