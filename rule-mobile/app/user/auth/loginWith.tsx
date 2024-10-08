// app/user/auth/loginWith.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { FaApple, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';

const LoginWith: React.FC = () => {
  const textSm = 'text-sm sm:text-md font-semibold';

  const handleLogin = (provider: string) => {
    // Handle the login process for each provider
    console.log(`Logging in with ${provider}`);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
            <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16">
              <h2 className="text-md font-bold py-8 sm:py-10 md:py-12 text-center">ログイン</h2>
              <div className="space-y-6 pb-12 md:pb-28">
                <button
                  onClick={() => handleLogin('LINE')}
                  className="flex items-center justify-start w-full py-1 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold bg-green-500 text-white rounded-md"
                >
                  <SiLine className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                  <div className={`${textSm} mx-auto`}>
                    LINEでログイン
                  </div>
                </button>
                <button
                  onClick={() => handleLogin('Apple')}
                  className="flex items-center justify-center w-full py-1 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold bg-black text-white rounded-md"
                >
                  <FaApple className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                  <div className={`${textSm} mx-auto`}>
                    Appleでログイン
                  </div>
                </button>
                <button
                  onClick={() => handleLogin('Facebook')}
                  className="flex items-center justify-center w-full py-1 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold bg-blue-600 text-white rounded-md"
                >
                  <FaFacebook className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                  <div className={`${textSm} mx-auto`}>
                    Facebookでログイン
                  </div>
                </button>
                <button
                  onClick={() => handleLogin('Email')}
                  className="flex items-center justify-center w-full py-1 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold border border-gray-800 border-solid rounded-md"
                >
                  <FaEnvelope className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                  <div className={`${textSm} mx-auto`}>
                    メールでログイン
                  </div>
                </button>
              </div>
              <div className='text-right text-sm pb-6 font-bold'>
                <IonRouterLink routerLink='/auth/login'>
                  キャンセル
                </IonRouterLink>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginWith;
