// app/user/profile/myPage.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

const Profile: React.FC = () => {

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-xl bg-white -mt-56 px-4 md:px-8 py-6 sm:py-10 md:py-14 flex flex-col shadow-md';

  const textMd = 'text-md sm:text-xl md:text-3xl py-2 sm:py-4 md:py-6 font-bold';
  const userID = 'XXXXXXXXXX';

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center min-h-screen w-screen bg-white">
          <div className={`h-80 md:h-88 w-full px-4 md:px-8 pt-10 flex flex-row ${maleGradient}`}>
            {/* header */}
            <img src='/svg/arrow-left-white.svg' className='w-10 h-10' />
            <h2 className='grow text-3xl text-center text-white font-bold pr-10'>マイページ</h2>
          </div>
          {/* container */}
          <div className={`${container} w-5/6`}>
            <div className='flex flex-col items-center'>
              <img src='/svg/profile-circle-gradient.svg' className='w-40 h-40' />
              <h2 className={`${textMd}`}>ID:{userID}</h2>
            </div>
            {/* profile setting */}
            <IonRouterLink routerLink={'/profile/setting'}>
              <div className='flex flex-row items-center py-6 border-b-2 border-solid border-gray-300'>
                <img src='/svg/profile-circle.svg' className='w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16' />
                <h2 className={`${textMd}`}>プロフィール設定</h2>
                <img src='/svg/arrow-right.svg' className='w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 ml-auto' />
              </div>
            </IonRouterLink>
            {/* payment setting */}
            <IonRouterLink routerLink={'/profile/payment'}>
              <div className='flex flex-row items-center py-6 border-b-2 border-solid border-gray-300'>
                <img src='/svg/payment.svg' className='w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16' />
                <h2 className={`${textMd}`}>クレジット設定</h2>
                <img src='/svg/arrow-right.svg' className='w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 ml-auto' />
              </div>
            </IonRouterLink>
            {/* password setting */}
            <IonRouterLink routerLink={'/profile/password'}>
              <div className='flex flex-row items-center py-6 border-b-2 border-solid border-gray-300'>
                <img src='/svg/lock.svg' className='w-7 sm:w-11 md:w-14 h-7 sm:h-11 md:h-14' />
                <h2 className={`${textMd}`}>パスワード設定 • 変更</h2>
                <img src='/svg/arrow-right.svg' className='w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 ml-auto' />
              </div>
            </IonRouterLink>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
