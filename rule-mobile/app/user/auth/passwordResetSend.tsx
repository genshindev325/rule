// app/user/auth/passwordResetSend.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';

const PasswordResetSend: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    try {
      const res = await fetch('http://localhost:3000/api/users/send-verification-email', {
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
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20">
            <h2 className="text-3xl font-bold py-12 md:py-20 px-12 text-center">パスワード再設定</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
                  placeholder="メールアドレスもしくは電話番号"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {message ? <p>{message}</p> :
              <p className="text-md md:text-lg font-semibold text-gray-400">
                ご登録されているメールアドレスもしくはSMSにて、パスワード再設定用のURLを送信します。
              </p>}
              <button
                type="submit"
                className="w-full py-2 md:py-4 px-4 mb-16 md:mb-24 mt-16 md:mt-32 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white rounded-full font-bold"
              >
                送信する
              </button>
            </form>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordResetSend;
