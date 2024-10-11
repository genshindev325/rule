// app/user/event/eventReview2.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import FullCarousel from '@/app/components/user/search/fullCarousel';
import AuthWrapper from '@/app/components/auth/authWrapper';
import StarRating from '@/app/components/utils/starRating';
import { RootState } from '@/app/store/store';
import { formatDateTime } from '@/app/components/utils/datetime';
import { SERVER_URL } from '@/app/config';

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
  maleTotal: number | 1,
  males: number | 0,
  femaleFee: number,
  femaleTotal: number | 1,
  females: number | 0,
  rating: number;
  ratingCount: number;
  store: {
    _id: string;
    rating: number;
    address: string;
    access: string[];
    description: string;
    storeImages: string[];
    storeName: string;
  };
  status: string,
  createdAt: string
}

const EventReview2: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(''); // will be changed
  const [types, setTypes] = useState<string[]>([]); // will be changed
  const [userId ,setUserId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [reviewEvent, setReviewEvent] = useState('');
  const [reviewStore, setReviewStore] = useState('');
  const [storeReplyText, setStoreReplyText] = useState('');
  const [ratingEvent, setRatingEvent] = useState(0);
  const [ratingStore, setRatingStore] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
  const searchParams = useSearchParams();
  const eventString = searchParams.get('event');
  const router = useIonRouter();
  const userProfile = useSelector((state: RootState) => state.auth.profile);
  const token = useSelector((state: RootState) => state.auth.token);

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const container = 'w-full rounded-2xl -mt-32 bg-white p-4 sm:p-6 md:p-8 flex flex-col shadow-md';
  const locationSVG = '/svg/location.svg';
  const textMd = 'text-md sm:text-lg md:text-xl';
  const textSm = 'text-sm sm:text-md md:text-lg';
  const textXs = 'text-xs sm:text-sm md:text-md';

  // get selected event data and current user information
  useEffect(() => {
    if (eventString) {
      try {
        const parsedEvent = JSON.parse(decodeURIComponent(eventString));
        setSelectedEvent(parsedEvent);
        setRatingStore(parsedEvent.store.rating);
        setRatingEvent(parsedEvent.rating);
        setStoreId(parsedEvent.store._id);
      } catch (error) {
        console.error('Failed to parse event data from URL:', error);
      } finally {
        setLoading(false);
      }
    }
    if(userProfile) {
      setUserId(userProfile._id);
    }
  }, [eventString]);

  useEffect(() => {
    const fetchReply = async () => {
      const response = await fetch(`${SERVER_URL}/api/reviews/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ storeId }),
      });
      if (response.status === 200) {
        const result = await response.json();
        setStoreReplyText(result.storeReplyText);
      } else {
        console.log(response.status);
      }
    }
    if (storeId) {
      fetchReply();
    }
  }, [storeId])

  // set event rate
  const handleRateEventChange = (newRate: number) => {
    setRatingEvent(newRate);
  };

  // set store rate
  const handleRateStoreChange = (newRate: number) => {
    setRatingStore(newRate);
  };

  // send event review
  const handleSubmitEventReview = () => {
    try {
      if (!token) {
        router.push('/auth/login');
      } else {
        const submitEventReview = async () => {
          const eventId = selectedEvent?._id;
          const eventReviewText = reviewEvent;
          const eventRating = ratingEvent;
          const createdBy = userId;
          console.log('eventRating: ' + eventRating);
          // send event review
          const response = await fetch(`${SERVER_URL}/api/reviews/event`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ eventId, eventReviewText, eventRating, createdBy }),
          });
          if (response.status === 201) {
            console.log("Sending event review success.");
            const result = await response.json();
            console.log(result.data);
          } else {
            console.log(response.status);
            console.log("Sending event review failed.");
          }
        };
        submitEventReview();
      }
    } catch(error) {
      console.error("An error occurred sending event review:", error);
    }
  }

  // send store review
  const handleSubmitStoreReview = () => {
    try {
      const submitStoreReview = async () => {
        const storeId = selectedEvent?.store._id;
        const storeReviewText = reviewStore;
        const storeRating = ratingStore;
        const createdBy = userId;
        // send store review
        const response = await fetch(`${SERVER_URL}/api/reviews/store`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ storeId, storeReviewText, storeRating, createdBy }),
        });
        if (response.status === 201) {
          console.log("Sending store review success.");
          const result = await response.json();
          console.log(result.data);
        } else {
          console.log(response.status);
          console.log("Sending store review failed.");
        }
      };
      submitStoreReview();
    } catch(error) {
      console.error("An error occurred sending store review:", error);
    }
  };

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold text-gray-800'>読み込み中...</div>;

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col min-h-screen w-screen bg-white space-y-1 text-gray-800">
            {/* header */}
            <div className={`h-56 sm:h-60 md:h-64 w-full ${maleGradient}`}>
              <div className='flex flex-row text-xl font-semibold text-center text-white pt-16 sm:pt-20 md:pt-24 px-4'>
                <IonRouterLink routerLink={'/event/eventHistory2'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>イベントレビュー</h2>
              </div>
            </div>
            {/* container */}
            <div className='px-4'>
              <div className={`${container}`}>
                {/* title */}
                <h2 className='text-md sm:text-lg font-semibold'>{selectedEvent?.eventName}</h2>
                <h2 className={`${textSm}`}>{selectedEvent && formatDateTime(selectedEvent.eventDate)}</h2>
                {/* type */}
                <div className='flex flex-row space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-4'>
                  {types && types.map((type, index) => (
                    <div key={index} className='rounded-full bg-gray-200 px-3 md:px-4 py-1'>{type}</div>
                  ))}
                </div>
                <img src={`${selectedEvent?.coverImage}`} />
                {/* male */}
                <div className='rounded-lg bg-gray-100 p-2 sm:p-3 flex flex-col'>
                  <div className='flex flex-row items-center'>
                    <div className={`${maleGradient} px-1 rounded-full w-10 sm:w-12 md:w-14 text-center ${textXs} text-white my-auto`}>男性</div>
                    <h2 className={`${textXs} pl-2`}>募集人数</h2>
                    <h2 className={`${textSm} pl-2`}>|</h2>
                    <h2 className={`${textSm} pl-2`}>{selectedEvent?.males}/{selectedEvent?.maleTotal}</h2>
                    <div className='flex-1 my-auto'>
                      <div className="w-16 sm:w-20 md:w-24 bg-gray-300 h-3 sm:h-4 md:h-5 rounded-full rounded-l-none ml-4">
                        <div
                          className={`h-3 sm:h-4 md:h-5 ${maleGradient}`} 
                          style={{ width: `${selectedEvent ? selectedEvent.males/selectedEvent.maleTotal * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse'>
                    <h2 className={`${textSm} pl-2`}>料金  <strong className='text-lg'>{selectedEvent?.maleFee}</strong>円(税込)</h2>
                  </div>
                </div>
                {/* female */}
                <div className='rounded-lg bg-gray-100 p-2 sm:p-3 flex flex-col'>
                  <div className='flex flex-row items-center'>
                    <div className={`${femaleGradient} px-1 rounded-full w-10 sm:w-12 md:w-14 text-center ${textXs} text-white my-auto`}>女性</div>
                    <h2 className={`${textXs} pl-2`}>募集人数</h2>
                    <h2 className={`${textSm} pl-2`}>|</h2>
                    <h2 className={`${textSm} pl-2`}>{selectedEvent?.females}/{selectedEvent?.femaleTotal}</h2>
                    <div className='flex-1 my-auto'>
                      <div className="w-16 sm:w-20 md:w-24 bg-gray-300 h-3 sm:h-4 md:h-5 rounded-full rounded-l-none ml-4">
                        <div
                          className={`h-3 sm:h-4 md:h-5 ${femaleGradient}`} 
                          style={{ width: `${selectedEvent ? selectedEvent.females/selectedEvent.femaleTotal * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse'>
                    <h2 className={`${textSm} pl-2`}>料金  <strong className='text-lg'>{selectedEvent?.femaleFee}</strong>円(税込)</h2>
                  </div>
                </div>
                {/* button */}
                <div className='py-2 flex'>
                  <button type='submit' className={`grow rounded-lg border-solid border py-1 sm:py-2 md:py-3 border-gray-500 ${textXs}`}>イベント概要</button>
                </div>
                <h2 className={`${textXs}`}>{selectedEvent?.description}</h2>
              </div>
            </div>
            {/* send review about event */}
            <div className='flex flex-col px-4 sm:px-6 md:px-8 space-y-4 pt-8'>
              <div className='flex flex-row'>
                <h2 className={`${textSm} font-semibold`}>イベントを評価:</h2>
                {/* event star rating */}
                <div className='space-x-1 flex ml-auto'>
                  <StarRating rate={ratingEvent} onRateChange={handleRateEventChange} />
                </div>
              </div>
              <textarea
                value={reviewEvent}
                onChange={(e) => setReviewEvent(e.target.value as string)}
                className={`w-full mt-2 p-2 bg-gray-100 rounded-md focus:outline-none text-xs sm:text-sm`}
                placeholder="イベントのレビューを書く"
                rows={6}          
              />
              <button id="btn_event" onClick={handleSubmitEventReview} className={`grow bg-gray-800 rounded-full text-white font-semibold py-1 ${textSm}`}>送信する</button>
            </div>
            {/* location button with gradient */}
            <div className={`p-4 sm:px-6 md:px-8 flex w-full`}>
              <button className={`grow ${maleGradient} rounded-xl py-1 text-white font-semibold ${textSm}`}>開催場所</button>
            </div>
            {/* store info */}
            <div className='px-4 sm:px-6 md:px-8'>
              <h2 className={`${textMd}`}>{selectedEvent?.store.storeName}</h2>
              <h2 className={`${textSm} font-semibold`}>料理ジャンル: 居酒屋、海鮮、日本酒バー</h2>
              <div className='pt-3'>
                {selectedEvent?.store.storeImages && 
                <FullCarousel items={selectedEvent?.store.storeImages} />}
              </div>
              <h2 className={`${textSm}`}>{selectedEvent?.store.description}</h2>
            </div>
            {/* Access */}
            <div className='px-4 sm:px-6 md:px-8 flex flex-col space-y-1'>
              <h2 className={`${textMd} font-semibold flex`}><img src={`${locationSVG}`} className='w-6 h-6 mr-4'/>アクセス</h2>
              <h2 className={`${textSm} border-b-2 border-solid border-gray-300`}>{selectedEvent?.store.address}</h2>
              {selectedEvent?.store.access.map((access, index) => (
                <h2 key={index} className={`${textSm}`}>{access}</h2>
              ))}
              <img src={`${map}`} className='py-2' />
              <div className={`p-4 sm:px-6 md:px-8 flex w-full`}>
                <button className={`grow rounded-xl border-2 border-solid border-gray-800 ${textMd}`}>注意事項</button>
              </div>
              <h2 className={`${textSm}`}>{selectedEvent?.store.description}</h2>
            </div>
            {/* send review about store */}
            <div className='flex flex-col px-4 sm:px-6 md:px-8 space-y-4 py-8'>
              <div className='flex flex-row'>
                <h2 className={`${textMd} font-semibold`}>お店を評価:</h2>
                {/* event star rating */}
                <div className='space-x-1 flex ml-auto'>
                  <StarRating rate={ratingStore} onRateChange={handleRateStoreChange} />
                </div>
              </div>
              <textarea
                value={reviewStore}
                onChange={(e) => setReviewStore(e.target.value)}
                className="w-full mt-3 p-2 bg-gray-100 rounded-md focus:outline-none text-xs sm:text-sm"
                placeholder="お店のレビューを書く"
                rows={6}
              />
              {storeReplyText &&
                <>
                  <h2 className={`${textSm} font-semibold text-blue-600`}>店舗の対応</h2>
                  <h2 className={`${textXs} font-semibold p-2 rounded-lg border shadow-lg`}>{storeReplyText}</h2>
                </>
              }
              {!storeReplyText && 
                <button id="btn_event" onClick={handleSubmitStoreReview} className={`grow bg-gray-800 rounded-full py-2 text-white ${textMd}`}>
                  送信する
                </button>
              }
              <div className={`pb-6 pt-2 flex w-full`}>
                <button onClick={() => router.back()} className={`grow bg-gray-400 rounded-full py-1 text-white ${textMd}`}>TOPにもどる</button>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
    
  );
};

export default EventReview2;
