// app/user/auth/passwordResetSend.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { SERVER_URL } from '@/app/config';

const PasswordResetSend: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const textSm = 'text-sm md:text-md font-semibold';
  const input = 'text-xs sm:text-sm md:text-md w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    try {
      const res = await fetch(`${SERVER_URL}/api/users/send-verification-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('確認メールが送信されました。メールを確認してください。');
      } else {
        setMessage('エラーが発生しました。もう一度お試しください。');
      }
    } catch (error) {
      setMessage('サーバーエラーが発生しました。');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16">
            <h2 className="text-md font-bold py-8 sm:py-10 md:py-12 text-center">パスワード再設定</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className={`${input}`}
                  placeholder="メールアドレスもしくは電話番号"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {message ? <p>{message}</p> :
              <p className={`${textXs} text-gray-400`}>
                ご登録されているメールアドレスもしくはSMSにて、パスワード再設定用のURLを送信します。
              </p>}
              <button
                type="submit"
                className={`w-full py-2 md:py-4 px-4 mt-16 sm:mt-18 md:mt-20 ${textSm} ${maleGradient} text-white rounded-full`}
              >
                送信する
              </button>
              <div className={`text-right text-sm ${textXs} py-8 font-bold`}>
                <IonRouterLink routerLink='/auth/login'>
                  キャンセル
                </IonRouterLink>
              </div>
            </form>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordResetSend;
