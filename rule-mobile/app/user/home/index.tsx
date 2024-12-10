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
        <div className={`flex flex-col items-center min-h-screen w-screen text-gray-800`}>
          {/* header */}
          <div className={`h-40 sm:h-40 md:h-48 w-full ${maleGradient}`}>
            <h2 className='text-xl text-center text-white font-bold pt-10'>居酒屋マッチングサービス</h2>
            <h2 className='text-xl text-center text-white font-bold pt-6'>- Rule -</h2>
          </div>
          <div className="p-12 w-full space-y-8">
            <div>
              <IonRouterLink routerLink='/event/findOnMap'>
                <button className={`rounded-full ${maleGradient} p-2 border-none w-full font-semibold text-white`}>
                  イベントを探す
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/event/eventHistory2'>
                <button className={`rounded-full ${maleGradient} p-2 border-none w-full font-semibold text-white`}>
                  イベント予約履歴
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/chatList'>
                <button className={`rounded-full ${maleGradient} p-2 border-none w-full font-semibold text-white`}>
                  お問い合わせ
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/profile/myPage'>
                <button className={`rounded-full ${maleGradient} p-2 border-none w-full font-semibold text-white`}>
                  マイページ
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/auth/logout'>
                <button className={`rounded-full ${femaleGradient} p-2 border-none w-full font-semibold text-white`}>
                  ログイン
                </button>
              </IonRouterLink>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
