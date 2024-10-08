// app/pages/settings.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';

const Settings = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold text-gray-800';
  const textXs = 'text-xs sm:text-sm';

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-semibold mr-12'>設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className='min-h-screen min-w-full flex flex-col space-y-4 bg-gray-100 ion-padding'>
            <div className="w-full flex flex-row space-x-4">
              <IonRouterLink routerLink="/settings/storeProfileSetting" className='flex-1'>
                <div className={`rounded-lg underline underline-offset-2 border-gray-200 border-solid border-2 bg-white hover:bg-gray-200 text-center px-1 py-16 ${textSm}`}>
                  店舗プロフィール設定
                </div>
              </IonRouterLink>
              <IonRouterLink routerLink="/settings/passwordSetting" className='flex-1'>
                <div className={`rounded-lg underline underline-offset-2 border-gray-200 border-solid border-2 bg-white hover:bg-gray-200 text-center px-1 py-16 ${textSm}`}>
                  パスワード設定
                </div>
              </IonRouterLink>
            </div>
            <div className="w-full flex flex-row space-x-4">
              <IonRouterLink routerLink="/settings/creditCardSetting" className='flex-1'>
                <div className={`rounded-lg underline underline-offset-2 border-gray-200 border-solid border-2 bg-white hover:bg-gray-200 text-center px-1 py-16 ${textSm}`}>
                  クレジットカード設定
                </div>
              </IonRouterLink>
              <IonRouterLink routerLink="/settings/transferAccountSetting" className='flex-1'>
                <div className={`rounded-lg underline underline-offset-2 border-gray-200 border-solid border-2 bg-white hover:bg-gray-200 text-center px-1 py-16 ${textSm}`}>
                  振込口座の設定
                </div>
              </IonRouterLink>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default Settings;