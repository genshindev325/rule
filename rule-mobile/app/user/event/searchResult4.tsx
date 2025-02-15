// app/user/event/searchResult4.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { useSearchParams  } from 'next/navigation';
import EventCard from '@/app/components/user/event/eventCard';
import AuthWrapper from '@/app/components/auth/authWrapper';

interface EventProps {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
  store: {
    storeName: string;
    address: string;
  }
}

const SearchResult4: React.FC = () => {
  const [testEvents, setTestEvents] = useState<EventProps[]>([]);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = ' -mt-24 rounded-2xl bg-white px-3 sm:px-12 md:px-14 ld:px-16 py-6 sm:py-12 md:py-16 flex flex-col shadow-md space-y-4 w-[90vw] min-h-[80vh]';
  const textMd = 'text-base sm:text-lg';
  const router = useIonRouter();
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
          <div className="flex flex-col items-center min-h-[calc(100vh-56px)] w-screen bg-white text-gray-800">
            {/* header */}
            <div className={`h-40 sm:h-44 w-full ${maleGradient}`}>
              <div className='flex flex-row text-lg text-center text-white font-semibold pt-6 px-4'>
                <button onClick={() => router.goBack()}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </button>
                <h2 className='grow pr-6'>イベントを探す</h2>
              </div>
            </div>
            {/* container */}
            <div className={`${container}`}>
              {/* search results */}
              {testEvents && testEvents.map((event, index) => (
                <div key={index}>
                  <IonRouterLink routerLink={`/event/eventDetail?event=${encodeURIComponent(JSON.stringify(event))}`} className='text-black'>
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
