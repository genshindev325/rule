// app/user/auth/loginWith.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { FaApple, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';

const LoginWith: React.FC = () => {
  const handleLogin = (provider: string) => {
    // Handle the login process for each provider
    console.log(`Logging in with ${provider}`);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20">
            <h2 className="text-xl font-bold py-12 md:py-20 px-12 text-center">ログイン</h2>
            <div className="space-y-6 pb-20 md:pb-28">
              <button
                onClick={() => handleLogin('LINE')}
                className="flex items-center justify-start w-full py-2 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold bg-green-500 text-white rounded-lg"
              >
                <SiLine className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                <div className='mx-auto'>
                  LINEでログイン
                </div>
              </button>
              <button
                onClick={() => handleLogin('Apple')}
                className="flex items-center justify-center w-full py-2 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold bg-black text-white rounded-lg"
              >
                <FaApple className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                <div className='mx-auto'>
                  Appleでログイン
                </div>
              </button>
              <button
                onClick={() => handleLogin('Facebook')}
                className="flex items-center justify-center w-full py-2 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold bg-blue-600 text-white rounded-lg"
              >
                <FaFacebook className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                <div className='mx-auto'>
                  Facebookでログイン
                </div>
              </button>
              <button
                onClick={() => handleLogin('Email')}
                className="flex items-center justify-center w-full py-2 md:py-4 px-4 md:px-8 text-md md:text-2xl font-bold border border-gray-800 border-solid rounded-lg"
              >
                <FaEnvelope className="mr-2 h-6 w-6 md:h-10 md:w-10" />
                <div className='mx-auto'>
                  メールでログイン
                </div>
              </button>
            </div>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginWith;
