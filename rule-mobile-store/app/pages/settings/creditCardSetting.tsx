// app/pages/settings/creditCardSetting.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink, useIonRouter } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import StripePaymentElement from '@/app/components/store/stripePaymentElement';

const CreditCardSetting = () => {
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
          <StripePaymentElement />
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default CreditCardSetting;