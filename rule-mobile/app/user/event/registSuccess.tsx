// app/user/event/registSuccess.tsx

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { RootState } from '@/app/store/store';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { formatDateTime } from '@/app/components/utils/datetime';
import { formatReturnTime } from '@/app/components/utils/returnTime';

const RegistSuccess: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const completedImage = '/svg/checked_outline.svg';
  const textSm = 'text-sm sm:text-md md:text-lg';
  const textXs = 'text-xs sm:text-sm md:text-md';
  
  const selectedEvent = useSelector((state: RootState) => state.event.selectedEvent);
  const handle20Over = () => {};

  if (!selectedEvent) {
    console.log("Missing user information or event data.");
    return;
  };

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className={`flex flex-col items-center min-h-screen w-screen ${maleGradient} px-4`}>
            {/* banner on the bg-gradient */}
            <div className="py-4 sm:p-5 md:py-6 lg:py-14 flex flex-col text-lg text-white font-bold text-center">
              <img src={completedImage} alt={`event-complete`} width={60} height={40} className="rounded-md rounded-br-none text-white mx-auto mb-4" />
              <h2 className='grow'>イベントへの参加が</h2>
              <h2 className='grow'>完了します!</h2>
            </div>
            {/* content */}
            <div className='rounded-2xl bg-white p-4 px-6 sm:px-7 md:px-8 mb-4 flex flex-col items-start space-y-1'>
              <h2 className={`${textSm} font-semibold`}>{selectedEvent.eventName}</h2>
              <h2 className={textSm}>{formatDateTime(selectedEvent.eventStartTime)}~{formatReturnTime(selectedEvent.eventEndTime)}</h2>
              <div className={`${textSm} flex flex-row space-x-2`}>
                <button className={`${textXs} rounded-full bg-[#e6e6e6] px-2 py-1`} onClick={handle20Over}>20代以上</button>
                <button className={`${textXs} rounded-full bg-[#e6e6e6] px-2 py-1`} onClick={handle20Over}>大学生Only</button>
                <button className={`${textXs} rounded-full bg-[#e6e6e6] px-2 py-1`} onClick={handle20Over}>アニメ好き</button>
              </div>
              <img src={selectedEvent.coverImage} alt={`event-profile`} width={350} height={70} className="py-1" />
              <button className={`${textSm} bg-transparent border-solid border-2 rounded-lg border-black text-black font-semibold py-1 w-full`}>イベント概要</button>
              <h2 className={`${textSm} py-1`}>{selectedEvent.description}</h2>
            </div>
            {/* button */}
            <button className='rounded-full w-full bg-white hover:bg-gray-100 mx-8 p-2 my-6 border-none font-semibold'>
              <IonRouterLink routerLink='/home' className={`${textSm} text-gray-800`}>
                TOPにもどる
              </IonRouterLink>
            </button>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default RegistSuccess;
