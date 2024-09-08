// app/pages/settings.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle } from '@ionic/react';
import { SERVER_URL } from '@/app/config';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';

const Settings = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm';

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle>ダッシュボード</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>

        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default Settings;