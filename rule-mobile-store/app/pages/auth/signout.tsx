// app/user/auth/signout.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useAuth } from '@/app/components/auth/authContext';

const SignOut: React.FC = () => {
  const router = useIonRouter();
  const { signout } = useAuth();
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textSm = 'text-sm md:text-md';

  const handleSignOut = () => {
    router.push('/auth/signin');
  };

  const handleCancel = () => {
    router.goBack();
  }

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center justify-start min-h-screen w-screen bg-white p-6 space-y-4">
          <div className={`${textXl} pb-4`}>ログアウト</div>
          <h2 className="mb-8 text-center text-md text-gray-600">
            本当にログアウトしますか?
          </h2>
          <div className='flex flex-row space-x-4'>
            <button
              type="button"
              onClick={handleSignOut}
              className={`${textSm} w-full py-2 px-4 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none duration-500`}
            >
              ログアウト
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`${textSm} w-full py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none duration-500`}
            >
              キャンセル
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignOut;
