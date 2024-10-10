// app/user/event/searchResult4.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { useSearchParams  } from 'next/navigation';
import EventCard from '@/app/components/user/event/eventCard';
import AuthWrapper from '@/app/components/auth/authWrapper';

interface EventProps {
  _id: string,
  eventName: string,
  category: string,
  coverImage: string,
  description: string,
  eventDate: string,
  eventStartTime: string,
  eventEndTime: string,
  maleFee: number,
  maleTotal: number,
  males: number,
  femaleFee: number,
  femaleTotal: number,
  females: number,
  store: string;
  status: string,
  createdAt: string
}

const SearchResult4: React.FC = () => {
  const [testEvents, setTestEvents] = useState<EventProps[]>([]);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = ' -mt-36 rounded-2xl bg-white px-3 sm:px-12 md:px-14 ld:px-16 py-6 sm:py-12 md:py-16 flex flex-col shadow-md space-y-4 w-[92vw] min-h-[80vh]';
  const textMd = 'text-md sm:text-lg';

  // get events from findDetailModal params
  const searchParams = useSearchParams ();
  const resultEvents = searchParams.get('events');

  useEffect(() => {
    if (resultEvents) {
      setTestEvents(JSON.parse(resultEvents));
    }
  }, [resultEvents]);

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white">
            {/* header */}
            <div className={`h-56 md:h-60 w-full ${maleGradient}`}>
              <div className='flex flex-row text-xl text-center text-white font-bold pt-6 px-4'>                
                <IonRouterLink routerLink={'/event/findOnMap'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-6'>イベントを探す</h2>
              </div>
              {/* <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 sm:mx-12 md:mx-20 mt-6 md:mt-8">
                <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-6"/>
                <h2 className="text-md font-semibold py-2 md:py-4 pl-2 text-left">イベントを検索する</h2>
                <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-4" />
              </div> */}
            </div>
            {/* container */}
            <div className={`${container}`}>
              {/* search results */}
              {testEvents && testEvents.map((event, index) => (
                <div key={index}>
                  <IonRouterLink routerLink={`/event/payment?event=${encodeURIComponent(JSON.stringify(event))}`} className='text-black'>
                    <EventCard {...event} />
                  </IonRouterLink>
                </div>
              ))}
              {/* see more button */}
              {testEvents.length > 6 &&
                <div className='py-4 sm:py-8 mx-auto'>
                  <button type='submit' className={`w-52 py-1 rounded-full bg-[#e5e5e5] font-bold ${textMd}`}>もっと見る</button>
                </div>
              }
              {testEvents.length === 0 &&
                <div className='flex flex-row items-center justify-center w-full min-h-[80vh]'>
                  <h2 className='text-sm font-semibold text-gray-700'>
                    一致するイベントが見つかりません。
                  </h2>
                </div>
              }
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default SearchResult4;
