// app/user/event/EventDetail.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { FaPaperPlane } from 'react-icons/fa';
import FullCarousel from '@/app/components/user/search/fullCarousel';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '@/app/store/features/event/EventSlice';
import { RootState } from '@/app/store/store';
import { formatDateTime } from '@/app/components/utils/datetime';
import GoogleMapLocation from '@/app/components/utils/googleMapLocate';
import { SERVER_URL } from '@/app/config';
import { toast } from 'react-toastify';

const EventDetail: React.FC = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const eventString = searchParams.get('event');
  const router = useIonRouter();
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const container = 'rounded-2xl bg-white px-4 sm:px-6 md:px-8 py-6 sm:py-12 md:py-20 md:m-6 flex flex-col shadow-lg space-y-1';
  const locationSVG = '/svg/location-black.svg';

  const textMd = 'text-md sm:text-lg md:text-xl';
  const textSm = 'text-sm sm:text-md md:text-lg';
  const textXs = 'text-xs sm:text-sm md:text-md';

  const caution = '注意事項。注意事項。注意事項。注意事項。注意事項。注意事項。注意事項。注意事項。注意事項。注意事項。注意事項。';
  
  // Redux state selectors
  const selectedEvent = useSelector((state: RootState) => state.event.selectedEvent);
  const userInfo = useSelector((state: RootState) => state.auth.profile);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (eventString) {
      try {
        const parsedEvent = JSON.parse(decodeURIComponent(eventString));
        dispatch(setSelectedEvent(parsedEvent));
      } catch (error) {
        console.error('Failed to parse event data from URL:', error);
      }
    }
  }, [eventString, dispatch]);

  if (!userInfo || !selectedEvent) {
    console.log("Missing user information or event data.");
    return;
  };

  const checkParticipation = async () => {
    // check whether user already participate into the event...
    if (!token) {
      router.push('/auth/login');
    } else {
      const response = await fetch(`${SERVER_URL}/api/events/participate/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          userId: userInfo._id,
          eventId: selectedEvent._id,
          gender: userInfo.gender }),
      });
      if (response.status === 200) {
        router.push('/event/payment');
      } else {
        const result = await response.json();
        toast.info('このイベントにはすでに参加しています。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      }
    }
  }

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col min-h-screen w-screen bg-white text-gray-800 space-y-1">
            {/* header */}
            <div className={`h-60 md:h-72 w-full ${maleGradient}`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-4 px-4'>
                <IonRouterLink routerLink={'/event/findOnMap'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>イベントを探す</h2>
              </div>
            </div>
            {/* container */}
            <div className='absolute top-14 px-4'>
              <div className={`${container}`}>
                {/* title */}
                <h2 className={`${textMd} font-semibold`}>{selectedEvent.eventName}</h2>
                <h2 className={`${textSm}`}>{formatDateTime(selectedEvent.eventDate)}</h2>
                <img src={selectedEvent.coverImage} className='py-2' />
                {/* male */}
                <div className='rounded-lg bg-gray-200 p-4 sm:p-6 flex flex-col space-y-1'>
                  <div className='flex flex-row'>
                    <div className={`${maleGradient} px-2 rounded-full w-12 sm:w-14 text-center ${textXs} text-white my-auto`}>男性</div>
                    <h2 className={`${textXs} pl-2 my-auto`}>募集人数</h2>
                    <h2 className={`${textXs} pl-2 my-auto`}>|</h2>
                    <h2 className={`${textXs} pl-2 my-auto`}>{selectedEvent.males}/{selectedEvent.maleTotal}</h2>
                    <div className="w-24 sm:w-28 md:w-32 bg-white h-3 md:h-6 rounded-full my-auto ml-2">
                      <div 
                        className={`h-3 md:h-6 ${maleGradient}`} 
                        style={{ width: `${selectedEvent.males / selectedEvent.maleTotal * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse'>
                    <h2 className={`${textXs} pl-2`}>料金  <strong className={textSm}>{selectedEvent.maleFee}</strong>円(税込)</h2>
                  </div>
                </div>
                {/* female */}
                <div className='rounded-lg bg-gray-200 p-4 sm:p-6 flex flex-col space-y-1'>
                  <div className='flex flex-row'>
                    <div className={`${femaleGradient} px-2 rounded-full w-12 sm:w-14 text-center ${textXs} text-white my-auto`}>女性</div>
                    <h2 className={`${textXs} pl-2 my-auto`}>募集人数</h2>
                    <h2 className={`${textXs} pl-2 my-auto`}>|</h2>
                    <h2 className={`${textXs} pl-2 my-auto`}>{selectedEvent.females}/{selectedEvent.femaleTotal}</h2>
                    <div className="w-24 sm:w-28 md:w-32 bg-white h-3 md:h-6 rounded-full my-auto ml-2">
                      <div
                        className={`h-3 md:h-6 ${femaleGradient}`} 
                        style={{ width: `${selectedEvent.females / selectedEvent.femaleTotal * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse'>
                    <h2 className={`${textXs} pl-2`}>料金  <strong className={textSm}>{selectedEvent.femaleFee}</strong>円(税込)</h2>
                  </div>
                </div>
                {/* button */}
                <div className='py-4 flex'>
                  <button type='submit' className={`grow rounded-lg border-solid border-2 border-gray-500 ${textSm} py-1 sm:py-2 md:py-3 font-semibold`}>イベント概要</button>
                </div>
                <h2 className={`${textXs}`}>{selectedEvent.description}</h2>
              </div>
              {/* location button with gradient */}
              <div className={`py-6 flex w-full`}>
                <button className={`grow ${maleGradient} rounded-xl text-white ${textSm} py-1 sm:py-2 md:py-3 font-semibold`}>開催場所</button>
              </div>
              {/* store info */}
              <div className=''>
                <h2 className={`${textSm} py-2 sm:py-4 md:py-6 font-bold`}>{selectedEvent.store.storeName}</h2>
                <h2 className={`${textXs}`}>料理ジャンル: {selectedEvent.store.cookingGenre}</h2>
                <div className='pt-2'>
                  <FullCarousel items={selectedEvent.store.storeImages} />
                </div>
                <h2 className={`${textXs}`}>{selectedEvent.store.description}</h2>
              </div>
              {/* Access */}
              <div className='flex flex-col space-y-1 w-full'>
                <div className='flex flex-row items-center'>
                  <img src={locationSVG} className='w-4 h-4 mx-2'/>
                  <h2 className={`${textSm} py-2 sm:py-4 md:py-6 font-bold my-auto`}>アクセス</h2>
                  <div className='flex flex-row ml-auto text-blue-500 items-center pr-2'>
                    <h2 className={`${textXs} font-semibold pr-2`}>
                      <IonRouterLink routerLink={`/chatMessages?storeId=${selectedEvent.store._id}&storeName=${selectedEvent.store.storeName}`}>
                        店舗へのお問い合わせ
                      </IonRouterLink>
                    </h2>
                    <FaPaperPlane className='w-4 h-4' />
                  </div>
                </div>
                <h2 className={`${textXs} border-b-2 border-solid border-gray-300`}>{selectedEvent.store.address}</h2>
                {selectedEvent.store.access && selectedEvent.store.access.map((acc, index) => (
                  <h2 key={index} className={`${textXs}`}>{acc}</h2>
                ))}
                <div className='py-1'>
                  <GoogleMapLocation lat={selectedEvent.store.storeLat} lng={selectedEvent.store.storeLng} />
                </div>
                <div className={`py-6 flex w-full`}>
                  <button className={`grow rounded-xl border-2 border-solid border-gray-800 ${textSm} py-1 sm:py-2 md:py-3 font-semibold`}>注意事項</button>
                </div>
                <h2 className={`${textXs}`}>{caution}</h2>
                <div className={`pt-6 pb-2 flex w-full`}>
                  <button className={`grow ${maleGradient} ${textSm} rounded-full py-2 sm:py-3 text-white`} onClick={checkParticipation}>
                    参加をして決済する
                  </button>
                </div>
                <div className={`pb-10 flex w-full`}>
                  <button className={`grow bg-gray-300 ${textSm} rounded-full py-2 sm:py-3`}>
                    <IonRouterLink routerLink='/event/findOnMap' className='text-white'>
                      戻る
                    </IonRouterLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;
