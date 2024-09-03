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
  const container = 'absolute top-48 rounded-xl bg-white px-1 sm:px-2 md:px-4 py-6 sm:py-12 md:py-20 mx-4 sm:m-6 md:m-8 flex flex-col shadow-md space-y-4';
  const searchSVG = '/svg/search.svg';
  const settingSVG = '/svg/settings.svg';
  const textMd = 'text-md sm:text-lg';
  const fromTop = 'pt-[900px] md:pt-[1200px] lg:pt-[1250px] xl:pt-[1350px]';
  
  const handle20Over = () => {};
  const handleStudent = () => {};
  const handleSocial = () => {};
  const handleAnime = () => {};

  // get events from findDetailModal params
  const searchParams = useSearchParams ();
  const resultEvents = searchParams.get('events');
  const router = useIonRouter();

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
            <div className={`h-80 md:h-88 w-full ${maleGradient}`}>
              <div className='flex flex-row text-xl text-center text-white font-bold pt-6 px-4'>                
                <IonRouterLink routerLink={'/event/findOnMap'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-6'>イベントを探す</h2>
              </div>
              <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 sm:mx-12 md:mx-20 mt-6 md:mt-8">
                <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-6"/>
                <h2 className="text-md font-semibold py-2 md:py-4 pl-2 text-left">イベントを検索する</h2>
                <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-4" />
              </div>
              {/* buttons */}
              <div className='flex flex-row justify-center space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-4'>
                <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handle20Over}>20代以上</button>
                <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handleStudent}>大学生Only</button>
                <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handleSocial}>社会人Only</button>
                <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handleAnime}>アニメ好き</button>
              </div>
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
              <div className='py-4 sm:py-8 mx-auto'>
                <button type='submit' className={`w-52 py-1 rounded-full bg-[#e5e5e5] font-bold ${textMd}`}>もっと見る</button>
              </div>
            </div>
            <div className={`${fromTop}`}></div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default SearchResult4;
