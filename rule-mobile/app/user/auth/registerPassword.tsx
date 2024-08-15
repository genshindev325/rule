// app/user/auth/registerPasword.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

const RegisterPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log(password);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
            <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 px-12 text-center">パスワードを</h2>
            <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 px-12 text-center">登録してください</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-md md:text-xl font-bold">
                <input
                  type="text"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4 text-md md:text-xl font-bold">
                <input
                  type="text"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="パスワード(確認用)"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <IonRouterLink routerLink='/auth/registerBirthday'>
                <div className='flex justify-center'>
                  <button type="submit"
                    className="mt-10 w-24 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white py-2 rounded-full hover:from-purple-500 hover:to-blue-500 transition-colors"
                  >
                    ➔
                  </button>
                </div>
              </IonRouterLink>
            </form>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPassword;
