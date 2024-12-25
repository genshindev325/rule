// app/user/home.tsx

'use client';

import React from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className='relative flex flex-row items-center min-h-screen w-screen bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]'>
          {/* circle title image */}
          <div className='flex flex-row-reverse items-center w-[466px] h-[466px] bg-white -ml-[233px] rounded-full'>
            <h2 className='text-4xl text-[#7F92F2] pr-10'>Rule</h2>
            <div className='w-[11vh]'>
              <img src={'/image/ruleText1.png'} alt='rule' />
            </div>
          </div>
          {/* menus */}
          <div className='absolute flex flex-col space-y-[21px] z-10'>
            {/* find event on map */}
            <div className="flex flex-row ml-16">
              <div className='w-16 z-50'>
                <img src='/image/menu1.png' alt='rule' />
              </div>              
              <IonRouterLink routerLink='/event/findOnMap'>
                <button className='w-[calc(100vw-4rem)] mt-7 mb-6 -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-[#7c5ded] hover:to-[#83d5f7] text-gray-700 hover:text-white shadow-sm hover:shadow-xl duration-300'>
                  <h2 className='text-sm sm:text-base text-right py-2 pr-[12vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>イベントを探す</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* event history */}
            <div className="flex flex-row ml-40">
              <div className='w-16 z-50'>
                <img src='/image/menu2.png' alt='rule' />
              </div>              
              <IonRouterLink routerLink='/event/eventHistory2'>
                <button className='w-[calc(100vw-10rem)] mt-7 mb-6 -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-[#7c5ded] hover:to-[#83d5f7] text-gray-700 hover:text-white shadow-sm hover:shadow-xl duration-300'>
                  <h2 className='text-sm sm:text-base text-right py-2 pr-[12vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>イベント予約履歴</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* user profile setting */}
            <div className="flex flex-row ml-48">
              <div className='w-16 z-50'>
                <img src='/image/menu3.png' alt='rule' />
              </div>              
              <IonRouterLink routerLink='/profile/myPage'>
                <button className='w-[calc(100vw-12rem)] mt-7 mb-6 -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-[#7c5ded] hover:to-[#83d5f7] text-gray-700 hover:text-white shadow-sm hover:shadow-xl duration-300'>
                  <h2 className='text-sm sm:text-base text-right py-2 pr-[12vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>マイページ</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* inquery */}
            <div className="flex flex-row ml-40">
              <div className='w-16 z-50'>
                <img src='/image/menu4.png' alt='rule' />
              </div>              
              <IonRouterLink routerLink='/chatList'>
                <button className='w-[calc(100vw-10rem)] mt-7 mb-6 -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-[#7c5ded] hover:to-[#83d5f7] text-gray-700 hover:text-white shadow-sm hover:shadow-xl duration-300'>
                  <h2 className='text-sm sm:text-base text-right py-2 pr-[12vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>お問い合わせ</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* sign out */}
            <div className="flex flex-row ml-16">
              <div className='w-16 z-50'>
                <img src='/image/menu5.png' alt='rule' />
              </div>              
              <IonRouterLink routerLink='/auth/logout'>
                <button className='w-[calc(100vw-4rem)] mt-7 mb-6 -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-[#fb298e] hover:to-[#ff9dc7] text-gray-700 hover:text-white shadow-sm hover:shadow-xl duration-300'>
                  <h2 className='text-sm sm:text-base text-right py-2 pr-[12vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>ログアウト</h2>
                </button>
              </IonRouterLink>
            </div>
          </div>
          {/* privacy */}
          <div className='absolute bottom-[5vh] flex flex-row space-x-4 justify-center items-center w-full px-auto'>
            <h2 className='text-xs sm:text-sm text-white'>プライバシーポリシー</h2>
            <h2 className='text-xs sm:text-sm text-white'>&nbsp;|&nbsp;</h2>
            <h2 className='text-xs sm:text-sm text-white'>特定商取引法に基づく表記</h2>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
