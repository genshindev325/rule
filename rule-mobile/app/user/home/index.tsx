// app/user/home.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

const Home: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';

  return (
    <IonPage>
      <IonContent>
        <div className={`flex flex-col items-center min-h-screen w-screen`}>
          {/* header */}
          <div className={`h-40 sm:h-40 md:h-48 w-full ${maleGradient}`}>
            <h2 className='text-xl text-center text-white font-bold pt-10'>居酒屋マッチングサービス</h2>
            <h2 className='text-xl text-center text-white font-bold pt-6'>- Rule -</h2>
          </div>
          <div className='p-12 w-full space-y-8'>
            <button className={`rounded-full ${maleGradient} p-2 border-none w-full`}>
              <IonRouterLink routerLink='/event/findOnMap' className='font-semibold text-white'>イベントを探す</IonRouterLink>
            </button>
            <button className={`rounded-full ${maleGradient} p-2 border-none w-full`}>
              <IonRouterLink routerLink='/event/eventHistory2' className='font-semibold text-white'>イベント予約履歴</IonRouterLink>
            </button>
            <button className={`rounded-full ${maleGradient} p-2 border-none w-full`}>
              <IonRouterLink routerLink='/chatList' className='font-semibold text-white'>お問い合わせ</IonRouterLink>
            </button>
            <button className={`rounded-full ${maleGradient} p-2 border-none w-full`}>
              <IonRouterLink routerLink='/profile/myPage' className='font-semibold text-white'>マイページ</IonRouterLink>
            </button>
            <button className={`rounded-full ${femaleGradient} p-2 border-none w-full`}>
              <IonRouterLink routerLink='/auth/logout' className='font-semibold text-white'>ログイン</IonRouterLink>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
