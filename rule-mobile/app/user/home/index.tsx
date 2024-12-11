// app/user/home.tsx

'use client';

import React from 'react';
import { FaMapMarkedAlt, FaHistory, FaPaperPlane, FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

const Home: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';

  return (
    <IonPage>
      <IonContent>
        <div className={`flex flex-col items-center min-h-screen w-screen bg-white text-gray-800`}>
          {/* header */}
          <div className={`h-52 sm:h-56 w-full ${maleGradient}`}>
            <h2 className='text-xl text-center text-white font-bold pt-10'>居酒屋マッチングサービス</h2>
            <h2 className='text-xl text-center text-white font-bold pt-6'>- Rule -</h2>
          </div>
          <div className="w-full min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-176px)] rounded-t-3xl -mt-12 p-12 space-y-8 bg-white">
            <div>
              <IonRouterLink routerLink='/event/findOnMap'>
                <button className='w-full flex flex-row justify-center items-center rounded-full p-2 border-2 border-solid border-violet-500 bg-transparent hover:bg-violet-500 hover:shadow-xl text-violet-500 hover:text-white duration-300'>
                  <FaMapMarkedAlt />
                  <h2 className='w-1/2 text-sm text-center font-semibold'>
                    イベントを探す
                  </h2>
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/event/eventHistory2'>
                <button className='w-full flex flex-row justify-center items-center rounded-full p-2 border-2 border-solid border-violet-500 bg-transparent hover:bg-violet-500 hover:shadow-xl text-violet-500 hover:text-white duration-300'>
                  <FaHistory />
                  <h2 className='w-1/2 text-sm text-center font-semibold'>
                    イベント予約履歴
                  </h2>
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/chatList'>
                <button className='w-full flex flex-row justify-center items-center rounded-full p-2 border-2 border-solid border-violet-500 bg-transparent hover:bg-violet-500 hover:shadow-xl text-violet-500 hover:text-white duration-300'>
                  <FaPaperPlane />
                  <h2 className='w-1/2 text-sm text-center font-semibold'>
                    お問い合わせ
                  </h2>
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/profile/myPage'>
                <button className='w-full flex flex-row justify-center items-center rounded-full p-2 border-2 border-solid border-violet-500 bg-transparent hover:bg-violet-500 hover:shadow-xl text-violet-500 hover:text-white duration-300'>
                  <FaUserEdit />
                  <h2 className='w-1/2 text-sm text-center font-semibold'>
                    マイページ
                  </h2>
                </button>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink routerLink='/auth/logout'>
                <button className='w-full flex flex-row justify-center items-center rounded-full p-2 border-2 border-solid border-red-500 bg-transparent hover:bg-red-500 hover:shadow-xl text-red-500 hover:text-white duration-300'>
                  <FaSignOutAlt />
                  <h2 className='w-1/2 text-sm text-center font-semibold'>
                    ログイン
                  </h2>
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
