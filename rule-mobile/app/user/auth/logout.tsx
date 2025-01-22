// app/user/auth/logout.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useAuth } from '@/app/components/auth/authContext';

const LogOut: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textSm = 'text-sm md:text-base font-semibold';
  const textXs = 'text-xs sm:text-sm md:text-base';

  const router = useIonRouter();
  const { signout } = useAuth();

  const handleSignOut = () => {
    router.push('/auth/login');
    signout();
  };

  const handleCancel = () => {
    router.push('/home');
  }

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center h-[calc(100vh-56px)] w-screen bg-white text-gray-800">
          <div className={`h-40 sm:h-44 w-full ${maleGradient}`}>
            <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16">
              <h2 className="text-lg font-semibold py-8 sm:py-10 md:py-12 text-center">ログアウト</h2>
              <h2 className="mb-8 text-center text-sm text-gray-600">
                本当にログアウトしますか?
              </h2>
              <div className='flex flex-row space-x-4 pb-10'>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={`w-full ${textSm} py-2 px-4 rounded-2xl border-2 border-solid border-red-500 bg-transparent text-red-500 hover:text-white hover:bg-red-500 focus:outline-none duration-500`}
                >
                  ログアウト
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`w-full ${textSm} py-2 px-4 rounded-2xl border-2 border-solid border-gray-500 bg-transparent text-gray-500 hover:text-white hover:bg-gray-500 focus:outline-none duration-500`}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LogOut;
