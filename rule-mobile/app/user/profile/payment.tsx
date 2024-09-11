// app/user/profile/payment.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import FormInput from '@/app/components/user/event/stripePaymentElement';
import AuthWrapper from '@/app/components/auth/authWrapper';

const ProfilePayment: React.FC = () => {
  const router = useIonRouter();
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'w-11/12 rounded-xl bg-white -mt-40 flex flex-col shadow-md';

  const textLg = 'text-center text-lg sm:text-xl md:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg md:text-xl py-2 sm:py-4 md:py-6 font-bold';

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white">
            <div className={`h-56 sm:h-60 md:h-72 w-full px-6 md:px-8 py-4 sm:py-6 md:py-8 flex flex-row ${maleGradient}`}>
              {/* header */}
              <IonRouterLink routerLink={'/profile/myPage'}>
                <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
              </IonRouterLink>
              <h2 className='grow text-xl font-semibold text-center text-white pr-10'>マイページ</h2>
            </div>
            {/* container */}
            <div className={`${container}`}>
              <div className='flex flex-col items-center bg-white rounded-t-xl py-4'>
                <h2 className={`${textLg}`}>クレジット設定</h2>
              </div>
              <div className=''>
                <FormInput />
              </div>
            </div>
            {/* buttons */}
            <div className='w-5/6 flex flex-col space-y-4 py-6'>
              <button type='button' className={`${maleGradient} rounded-full py-2 text-white ${textMd}`}>登録する</button>
              <button type='button' onClick={() => router.back()} className={`bg-gray-400 rounded-full py-2 text-white text-center ${textMd}`}>キャンセル</button>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePayment;
