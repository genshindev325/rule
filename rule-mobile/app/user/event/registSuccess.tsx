// app/user/event/registSuccess.tsx

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { RootState } from '@/app/store/store';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { formatDateTime } from '@/app/components/utils/datetime';

const RegistSuccess: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const completedImage = '/svg/checked_outline.svg';
  
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
            <div className="py-4 md:py-6 lg:py-14 flex flex-col text-xl text-white font-bold text-center">
              <img src={completedImage} alt={`event-complete`} width={60} height={40} className="rounded-md rounded-br-none text-white mx-auto mb-4" />
              <h2 className='grow'>{selectedEvent.eventName}</h2>
            </div>
            {/* content */}
            <div className='rounded-lg bg-white p-4 px-2 md:px-4 mb-12 flex flex-col sm:items-center space-y-1'>
              <h2 className='text-sm md:text-md font-semibold '>街コン・合コン・飲み会イベント</h2>
              <h2 className='text-sm md:text-md'>{formatDateTime(selectedEvent.eventDate)}</h2>
              <div className='flex flex-row space-x-2 text-xs'>
                <button className='rounded-full bg-[#e6e6e6] px-4 py-1' onClick={handle20Over}>20代以上</button>
                <button className='rounded-full bg-[#e6e6e6] px-4 py-1' onClick={handle20Over}>大学生Only</button>
                <button className='rounded-full bg-[#e6e6e6] px-4 py-1' onClick={handle20Over}>アニメ好き</button>
              </div>
              <img src={selectedEvent.coverImage} alt={`event-profile`} width={350} height={70} className="py-1" />
              <button className='bg-transparent border-solid border-2 rounded-lg border-black text-black text-sm font-semibold py-1 w-full' >イベント概要</button>
              <h2 className='py-2 text-xs'>{selectedEvent.description}</h2>
            </div>
            {/* button */}
            <button className='rounded-full w-full bg-white hover:bg-gray-100 mx-8 p-2 mb-4 border-none font-semibold'>
              <IonRouterLink routerLink='/home'>
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
