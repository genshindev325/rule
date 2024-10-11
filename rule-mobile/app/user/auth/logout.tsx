// app/user/auth/logout.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useAuth } from '@/app/components/auth/authContext';

const LogOut: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textSm = 'text-sm md:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm md:text-md';

  const router = useIonRouter();
  const { signout } = useAuth();

  const handleSignOut = () => {
    router.push('/auth/login');
  };

  const handleCancel = () => {
    router.push('/home');
  }

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
          <div className={`h-44 sm:h-44 md:h-48 w-full ${maleGradient}`}>
            <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-20 sm:mt-24 md:mt-28">
              <h2 className="text-md font-bold py-8 sm:py-10 md:py-12 text-center">ログイン</h2>
              <h2 className="mb-8 text-center text-md text-gray-600">
                本当にログアウトしますか?
              </h2>
              <div className={`${textXs} text-right text-gray-400`}>
                {/* <IonRouterLink routerLink='/auth/loginWith'>ソーシャルログイン</IonRouterLink> */}
              </div>
              <div className='flex flex-row space-x-4 pb-10'>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-sm sm: text-md py-2 px-4 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none duration-500"
                >
                  ログアウト
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full text-sm sm: text-md py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none duration-500"
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
