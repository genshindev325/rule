// app/pages/settings/creditCardSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';

const CreditCardSetting = () => {
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
              <IonTitle>クレジットカード設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default CreditCardSetting;