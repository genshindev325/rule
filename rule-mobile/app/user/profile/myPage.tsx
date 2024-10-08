// app/user/profile/myPage.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState('');
  const [userID, setUserID] = useState('XXX-XXX-XXX-XXX');
  const router = useIonRouter();
  const userInfo = useSelector((state: RootState) => state.auth.profile);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'w-5/6 rounded-xl bg-white -mt-40 px-4 sm:px-5 md:px-6 pb-6 sm:pb-8 md:py-10 flex flex-col shadow-md';
  const textMd = 'text-sm sm:text-md md:text-lg py-1 sm:py-2 md:py-4 font-semibold text-zinc-800';

  useEffect(() => {
    if (userInfo) {
      setAvatar(userInfo.avatar);
      setUserID(userInfo.userID);
    } else {
      router.push('/auth/login');
    }
  }, [userInfo, router, avatar, userID]);

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white">
            <div className={`h-56 sm:h-60 md:h-72 w-full px-6 md:px-8 py-4 sm:py-6 md:py-8 flex flex-row ${maleGradient}`}>
              {/* header */}
              <IonRouterLink routerLink={'/home'}>
                <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
              </IonRouterLink>
              <h2 className='grow text-xl font-semibold text-center text-white pr-10'>マイページ</h2>
            </div>
            {/* container */}
            <div className={`${container}`}>
              <div className='flex flex-col items-center'>
                {avatar &&
                  <img src={`${avatar}`} className='w-28 h-28 object-contain rounded-full mt-4' />
                }
                <h2 className={`${textMd}`}>ID: {userID}</h2>
              </div>
              {/* profile setting */}
              <IonRouterLink routerLink={'/profile/setting'}>
                <div className='flex flex-row items-center py-4 border-b border-solid border-gray-300'>
                  <img src='/svg/profile-circle.svg' className='w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10' />
                  <h2 className={`${textMd}`}>プロフィール設定</h2>
                  <img src='/svg/arrow-right.svg' className='w-4 ml-auto' />
                </div>
              </IonRouterLink>
              {/* payment setting */}
              <IonRouterLink routerLink={'/profile/payment'}>
                <div className='flex flex-row items-center py-4 border-b border-solid border-gray-300'>
                  <img src='/svg/payment.svg' className='w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10' />
                  <h2 className={`${textMd}`}>クレジット設定</h2>
                  <img src='/svg/arrow-right.svg' className='w-4 ml-auto' />
                </div>
              </IonRouterLink>
              {/* password setting */}
              <IonRouterLink routerLink={'/profile/password'}>
                <div className='flex flex-row items-center py-4 border-b border-solid border-gray-300'>
                  <img src='/svg/lock.svg' className='w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8' />
                  <h2 className={`${textMd}`}>パスワード設定 • 変更</h2>
                  <img src='/svg/arrow-right.svg' className='w-4 ml-auto' />
                </div>
              </IonRouterLink>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
