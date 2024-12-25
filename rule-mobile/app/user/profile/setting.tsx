// app/user/profile/setting.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import AuthWrapper from '@/app/components/auth/authWrapper';

const ProfileSetting: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'w-[90vw] rounded-xl bg-white -mt-28 px-4 sm:px-5 md:px-6 pb-6 sm:pb-8 md:py-10 flex flex-col shadow-md';
  const textLg = 'text-center text-lg sm:text-xl md:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-semibold';
  const textSm = 'text-sm sm:text-md';

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white text-gray-800">
            <div className={`h-56 sm:h-60 md:h-72 w-full px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 pt-16 sm:pt-20 md:pt-24 flex flex-row ${maleGradient}`}>
              {/* header */}
              <IonRouterLink routerLink={'/profile/myPage'}>
                <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
              </IonRouterLink>
              <h2 className='grow text-lg font-semibold text-center text-white pr-10'>マイページ</h2>
            </div>
            {/* container */}
            <div className={`${container}`}>
              <div className='flex flex-col items-center'>
                <h2 className={`${textMd} pt-6`}>プロフィール設定</h2>
              </div>
              {/* profile photo */}
              <IonRouterLink routerLink={'/setting/changeAvatar'}>
                <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300 text-gray-700'>
                  <h2 className={`${textSm} font-semibold`}>プロフィール写真</h2>
                  <div className='flex flex-row items-center'>
                    <img src='/svg/profile-fill-gradient.svg' className='w-14 h-14' />
                      <img src='/svg/plus.svg' className='ml-auto w-6 mr-1' />
                  </div>
                </div>
              </IonRouterLink>
              {/* nick name */}
              <IonRouterLink routerLink={'/setting/changeName'}>
                <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300 text-gray-700'>
                  <h2 className={`${textSm} font-semibold`}>ニックネーム</h2>
                  <div className='flex flex-row items-center'>
                    <h2 className={`${textSm}`}>ニックネームを変更する</h2>
                    <img src='/svg/arrow-right.svg' className='ml-auto w-4 mr-1' />
                  </div>
                </div>
              </IonRouterLink>
              {/* ID */}
              <IonRouterLink routerLink={'/setting/changeID'}>
                <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300 text-gray-700'>
                  <h2 className={`${textSm} font-semibold`}>ID</h2>
                  <div className='flex flex-row items-center'>
                    <h2 className={`${textSm}`}>IDを変更する</h2>
                    <img src='/svg/arrow-right.svg' className='ml-auto w-4 mr-1' />
                  </div>
                </div>
              </IonRouterLink>
              {/* birthday */}
              <IonRouterLink routerLink={'/setting/changeBirthday'}>
                <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300 text-gray-700'>
                  <h2 className={`${textSm} font-semibold`}>誕生日</h2>
                  <div className='flex flex-row items-center'>
                    <h2 className={`${textSm}`}>1997年3月27日</h2>
                    <img src='/svg/arrow-right.svg' className='ml-auto w-4 mr-1' />
                  </div>
                </div>
              </IonRouterLink>
              {/* Identity verification */}
              <IonRouterLink routerLink={'/setting/uploadIdentityCard'}>
                <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300 text-gray-700'>
                  <h2 className={`${textSm} font-semibold`}>本人確認</h2>
                  <div className='flex flex-row items-center'>
                    <h2 className={`${textSm}`}>本人確認</h2>
                    <img src='/svg/arrow-right.svg' className='ml-auto w-4 mr-1' />
                  </div>
                </div>
              </IonRouterLink>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default ProfileSetting;
