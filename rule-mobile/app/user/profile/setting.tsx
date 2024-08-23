// app/user/profile/setting.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import AuthWrapper from '@/app/components/auth/authWrapper';

const ProfileSetting: React.FC = () => {

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-xl bg-white -mt-56 px-4 md:px-8 py-6 sm:py-10 md:py-14 flex flex-col shadow-md';

  const textLg = 'text-center text-xl sm:text-3xl md:text-3xl font-bold';
  const textMd = 'text-md sm:text-xl md:text-3xl py-2 sm:py-4 md:py-6 font-bold';
  const textSm = 'text-center text-sm sm:text-md md:text-lg';

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white">
            <div className={`h-80 md:h-88 w-full px-4 md:px-8 pt-10 flex flex-row ${maleGradient}`}>
              {/* header */}
              <IonRouterLink routerLink={'/profile/myPage'}>
                <img src='/svg/arrow-left-white.svg' className='w-10 h-10' />
              </IonRouterLink>
              <h2 className='grow text-3xl text-center text-white font-bold pr-10'>マイページ</h2>
            </div>
            {/* container */}
            <div className={`${container} w-5/6`}>
              <div className='flex flex-col items-center'>
                <h2 className={`${textLg}`}>プロフィール設定</h2>
              </div>
              {/* profile photo */}
              <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
                <h2 className={`${textMd}`}>プロフィール写真</h2>
                <div className='flex flex-row items-center'>
                  <img src='/svg/profile-fill-gradient.svg' className='w-14 h-14' />
                  <img src='/svg/plus.svg' className='ml-auto w-7 h-7' />
                </div>
              </div>
              {/* nick name */}
              <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
                <h2 className={`${textMd}`}>ニックネーム</h2>
                <div className='flex flex-row items-center'>
                  <h2 className={`${textSm}`}>ニックネームを変更する</h2>
                  <img src='/svg/arrow-right.svg' className='ml-auto w-6 h-6' />
                </div>
              </div>
              {/* ID */}
              <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
                <h2 className={`${textMd}`}>ID</h2>
                <div className='flex flex-row items-center'>
                  <h2 className={`${textSm}`}>IDを変更する</h2>
                  <img src='/svg/arrow-right.svg' className='ml-auto w-6 h-6' />
                </div>
              </div>
              {/* birthday */}
              <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
                <h2 className={`${textMd}`}>誕生日</h2>
                <div className='flex flex-row items-center'>
                  <h2 className={`${textSm}`}>1997年3月27日</h2>
                  <img src='/svg/arrow-right.svg' className='ml-auto w-6 h-6' />
                </div>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default ProfileSetting;
