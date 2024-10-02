// app/user/profile/setting.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import AuthWrapper from '@/app/components/auth/authWrapper';

const ProfileSetting: React.FC = () => {

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'w-5/6 rounded-xl bg-white -mt-40 px-3 sm:px-4 md:px-6 pb-6 sm:pb-8 md:py-10 flex flex-col shadow-md';

  const textLg = 'text-center text-lg sm:text-xl md:text-2xl font-bold';
  const textMd = 'text-md sm:text-xl md:text-3xl py-2 sm:py-4 md:py-6 font-bold';
  const textSm = 'text-center text-sm sm:text-md md:text-lg';

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
              <div className='flex flex-col items-center'>
                <h2 className={`${textLg} pt-6`}>プロフィール設定</h2>
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
