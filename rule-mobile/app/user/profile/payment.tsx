// app/user/profile/payment.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import FormInput from '@/app/components/user/event/stripePaymentElement';
import RegisteredCard from '@/app/components/user/event/registeredCard';
import AuthWrapper from '@/app/components/auth/authWrapper';

const ProfilePayment: React.FC = () => {
  const router = useIonRouter();
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-xl bg-gray-100 -mt-56 pb-6 sm:pb-10 md:pb-14 flex flex-col shadow-md';

  const textLg = 'text-center text-xl sm:text-3xl md:text-3xl font-bold';
  const textMd = 'text-md sm:text-xl md:text-3xl py-2 sm:py-4 md:py-6 font-bold';

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white">
            <div className={`h-80 md:h-88 w-full px-4 md:px-8 pt-10 flex flex-row ${maleGradient}`}>
              {/* header */}
              <IonRouterLink routerLink={'/profile/myPage'}>
                <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
              </IonRouterLink>
              <h2 className='grow text-xl text-center text-white pr-10'>マイページ</h2>
            </div>
            {/* container */}
            <div className={`${container} w-5/6`}>
              <div className='flex flex-col items-center bg-white rounded-t-xl py-8'>
                <h2 className={`${textLg}`}>クレジット設定</h2>
              </div>
              <div className=''>
                <RegisteredCard />
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
