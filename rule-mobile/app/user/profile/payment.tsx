// app/user/profile/payment.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import SetPayment from '@/app/components/user/event/setPayment';
import AuthWrapper from '@/app/components/auth/authWrapper';

const ProfilePayment: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white text-gray-800">
            <div className={`h-56 sm:h-60 md:h-64 w-full px-6 md:px-8 py-b sm:pb-6 md:pb-8 pt-16 sm:pt-20 md:pt-24 flex flex-row ${maleGradient}`}>
              {/* header */}
              <IonRouterLink routerLink={'/profile/myPage'}>
                <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
              </IonRouterLink>
              <h2 className='grow text-lg font-semibold text-center text-white pr-10'>マイページ</h2>
            </div>
            <SetPayment />
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePayment;
