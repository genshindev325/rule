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
          <div className='flex flex-row-reverse items-center w-[52vh] h-[52vh] bg-white -ml-[26vh] rounded-full'>
            <h2 className='text-3xl text-[#7F92F2] pr-[7vh]'>Rule</h2>
            <div className='w-[11vh]'>
              <img src={'/image/ruleText1.png'} alt='rule' width={1414} height={2000} />
            </div>
          </div>
          {/* menus */}
          <div className='absolute flex flex-col space-y-[2vh] z-10'>
            {/* find event on map */}
            <div className="flex flex-row ml-[8vh]">
              <div className='w-[7vh] z-50'>
                <img src='/image/menu1.png' alt='rule' width={1414} height={2000} />
              </div>              
              <IonRouterLink routerLink='/event/findOnMap'>
                <button className='w-[calc(100vw-8vh)] my-[3vh] -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-violet-500 hover:to-violet-500 text-gray-700 hover:text-white shadow-lg duration-300'>
                  <h2 className='text-md sm:text-lg text-right py-2 pr-[14vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>イベントを探す</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* event history */}
            <div className="flex flex-row ml-[18vh]">
              <div className='w-[7vh] z-50'>
                <img src='/image/menu2.png' alt='rule' width={1414} height={2000} />
              </div>              
              <IonRouterLink routerLink='/event/eventHistory2'>
                <button className='w-[calc(100vw-18vh)] my-[3vh] -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-violet-500 hover:to-violet-500 text-gray-700 hover:text-white shadow-lg duration-300'>
                  <h2 className='text-md sm:text-lg text-right py-2 pr-[14vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>イベント予約履歴</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* user profile setting */}
            <div className="flex flex-row ml-[21vh]">
              <div className='w-[7vh] z-50'>
                <img src='/image/menu3.png' alt='rule' width={1414} height={2000} />
              </div>              
              <IonRouterLink routerLink='/profile/myPage'>
                <button className='w-[calc(100vw-21vh)] my-[3vh] -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-violet-500 hover:to-violet-500 text-gray-700 hover:text-white shadow-lg duration-300'>
                  <h2 className='text-md sm:text-lg text-right py-2 pr-[14vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>マイページ</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* inquery */}
            <div className="flex flex-row ml-[18vh]">
              <div className='w-[7vh] z-50'>
                <img src='/image/menu4.png' alt='rule' width={1414} height={2000} />
              </div>              
              <IonRouterLink routerLink='/chatList'>
                <button className='w-[calc(100vw-18vh)] my-[3vh] -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-violet-500 hover:to-violet-500 text-gray-700 hover:text-white shadow-lg duration-300'>
                  <h2 className='text-md sm:text-lg text-right py-2 pr-[14vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>お問い合わせ</h2>
                </button>
              </IonRouterLink>
            </div>
            {/* sign out */}
            <div className="flex flex-row ml-[8vh]">
              <div className='w-[7vh] z-50'>
                <img src='/image/menu5.png' alt='rule' width={1414} height={2000} />
              </div>              
              <IonRouterLink routerLink='/auth/logout'>
                <button className='w-[calc(100vw-8vh)] my-[3vh] -ml-[4vh] bg-gradient-to-r from-white to-[#83d5f7] hover:from-red-400 hover:to-red-400 text-gray-700 hover:text-white shadow-lg duration-300'>
                  <h2 className='text-md sm:text-lg text-right py-2 pr-[14vw] sm:pr-[28vw] md:pr-[36vw] font-semibold'>ログアウト</h2>
                </button>
              </IonRouterLink>
            </div>
          </div>
          {/* privacy */}
          <div className='absolute bottom-[5vh] flex flex-row space-x-4 justify-center items-center w-full px-auto'>
            <h2 className='text-sm sm:text-md text-white'>プライバシーポリシー</h2>
            <h2 className='text-sm sm:text-md text-white'>&nbsp;|&nbsp;</h2>
            <h2 className='text-sm sm:text-md text-white'>特定商取引法に基づく表記</h2>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
