// app/user/profile/password.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

const ProfilePassword: React.FC = () => {

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-xl bg-white -mt-56 px-4 md:px-8 py-6 sm:py-10 md:py-14 flex flex-col shadow-md';

  const textLg = 'text-center text-xl sm:text-3xl md:text-3xl font-bold';
  const textMd = 'text-md sm:text-xl md:text-3xl py-2 sm:py-4 md:py-6 font-bold';

  return (
    <IonPage>
      <IonContent>
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
              <h2 className={`${textLg}`}>パスワード変更</h2>
            </div>
            {/* current password */}
            <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
              <h2 className={`${textMd}`}>現在のパスワード</h2>
              <div className='flex flex-row items-center'>
                <h2 className={`${textMd} text-gray-400`}>***************</h2>
                <img src='/svg/eye-closed.svg' className='ml-auto w-7 h-7' />
              </div>
            </div>
            {/* new password */}
            <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
              <h2 className={`${textMd}`}>新規パスワード</h2>
              <div className='flex flex-row items-center'>
                <h2 className={`${textMd} text-gray-400`}>***************</h2>
                <img src='/svg/eye-closed.svg' className='ml-auto w-7 h-7' />
              </div>
            </div>
            {/* confirm new password */}
            <div className='flex flex-col pt-6 border-b-2 border-solid border-gray-300'>
              <h2 className={`${textMd}`}>新規パスワード確認</h2>
              <div className='flex flex-row items-center'>
                <h2 className={`${textMd} text-gray-400`}>***************</h2>
                <img src='/svg/eye-open.svg' className='ml-auto w-10 h-10' />
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className='w-5/6 flex flex-col space-y-4 py-6'>
            <button type='button' className={`${maleGradient} rounded-full py-2 text-white ${textMd}`}>登録する</button>
            <button type='button' className={`bg-gray-400 rounded-full py-2 text-white text-center ${textMd}`}>キャンセル</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePassword;
