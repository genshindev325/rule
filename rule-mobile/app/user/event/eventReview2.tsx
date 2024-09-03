// app/user/event/eventReview2.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import FullCarousel from '@/app/components/user/search/fullCarousel';
import Star from '@/app/components/user/event/starSVG';
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
    access1: string;
    access2: string;
    description: string;
    storeImages: string;
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
  const [reviewEvent, setReviewEvent] = useState('');
  const [reviewStore, setReviewStore] = useState('');
  const [ratingEvent, setRatingEvent] = useState(0);
  const [ratingStore, setRatingStore] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
  const searchParams = useSearchParams();
  const eventString = searchParams.get('event');
  const router = useIonRouter();
  const userProfile = useSelector((state: RootState) => state.auth.profile);

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const container = 'w-full rounded-xl -mt-36 bg-white px-4 sm:px-6 md:px-8 py-6 sm:py-12 md:py-20 md:m-6 flex flex-col shadow-md space-y-2';
  const locationSVG = '/svg/location.svg';

  const textLg = 'text-lg sm:text-xl md:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg md:text-xl py-2 sm:py-4 md:py-6 font-bold';
  const textSm = 'text-sm sm:text-md md:text-lg font-semibold';

  // get selected event data and current user information
  useEffect(() => {
    if (eventString) {
      try {
        const parsedEvent = JSON.parse(decodeURIComponent(eventString));
        setSelectedEvent(parsedEvent);
        setRatingStore(parsedEvent.store.rating);
        setRatingEvent(parsedEvent.rating);
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
      const submitEventReview = async () => {
        const eventId = selectedEvent?._id;
        const eventReviewText = reviewEvent;
        const eventRating = ratingEvent;
        const createdBy = userId;
        console.log('eventRating: ' + eventRating);
        // send event review
        const response = await fetch(`${SERVER_URL}/api/reviews/event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
          headers: { 'Content-Type': 'application/json' },
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
  }
  
  const items = [
    {
      imageUrl: '/image/img_1.png',
    },
    {
      imageUrl: '/image/img_2.png',
    },
    {
      imageUrl: '/image/img_3.png',
    },
    {
      imageUrl: '/image/img_4.png',
    },
    // will be added or get from database
  ];

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col min-h-screen w-screen bg-white space-y-1">
            {/* header */}
            <div className={`h-60 md:h-72 w-full ${maleGradient}`}>
              <h2 className='text-xl text-center text-white pt-10'>イベントレビュー</h2>
            </div>
            {/* container */}
            <div className='px-4'>
              <div className={`${container}`}>
                {/* title */}
                <h2 className='text-lg sm:text-xl font-bold'>{selectedEvent?.eventName}</h2>
                <h2 className='text-md sm:text-lg'>{selectedEvent && formatDateTime(selectedEvent.eventDate)}</h2>
                {/* type */}
                <div className='flex flex-row space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-4'>
                  {types && types.map((type, index) => (
                    <div key={index} className='rounded-full bg-gray-200 px-3 md:px-4 py-1'>{type}</div>
                  ))}
                </div>
                <img src={`${selectedEvent?.coverImage}`} className='py-2' />
                {/* male */}
                <div className='rounded-lg bg-gray-100 p-4 sm:p-6 flex flex-col space-y-1'>
                  <div className='flex flex-row'>
                    <div className={`${maleGradient} px-2 py-1 rounded-full w-10 sm:w-20 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>男性</div>
                    <h2 className={`${textSm} pl-2`}>募集人数</h2>
                    <h2 className={`${textSm} pl-2`}>|</h2>
                    <h2 className={`${textSm} pl-2`}>{selectedEvent?.males}/{selectedEvent?.maleTotal}</h2>
                    <div className="w-24 md:w-40 bg-white h-3 md:h-6 rounded-full my-auto ml-2 ml-auto">
                      <div 
                        className={`h-3 md:h-6 ${maleGradient}`} 
                        style={{ width: `${selectedEvent ? selectedEvent.males/selectedEvent.maleTotal * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse'>
                    <h2 className={`${textSm} pl-2`}>料金  <strong className='text-lg'>{selectedEvent?.maleFee}</strong>円(税込)</h2>
                  </div>
                </div>
                {/* female */}
                <div className='rounded-lg bg-gray-100 p-4 sm:p-6 flex flex-col space-y-1'>
                  <div className='flex flex-row'>
                    <div className={`${femaleGradient} px-2 py-1 rounded-full w-10 sm:w-20 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>女性</div>
                    <h2 className={`${textSm} pl-2`}>募集人数</h2>
                    <h2 className={`${textSm} pl-2`}>|</h2>
                    <h2 className={`${textSm} pl-2`}>{selectedEvent?.females}/{selectedEvent?.femaleTotal}</h2>
                    <div className="w-24 md:w-40 bg-white h-3 md:h-6 rounded-full my-auto ml-2 ml-auto">
                      <div 
                        className={`h-3 md:h-6 ${femaleGradient}`} 
                        style={{ width: `${selectedEvent ? selectedEvent.females/selectedEvent.femaleTotal * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className='flex flex-row-reverse'>
                    <h2 className={`${textSm} pl-2`}>料金  <strong className='text-lg'>{selectedEvent?.femaleFee}</strong>円(税込)</h2>
                  </div>
                </div>
                {/* button */}
                <div className='py-6 flex'>
                  <button type='submit' className={`grow rounded-lg border-solid border-2 border-gray-500 ${textMd}`}>イベント概要</button>
                </div>
                <h2 className={`${textSm}`}>{selectedEvent?.description}</h2>
              </div>
            </div>
            {/* send review about event */}
            <div className='flex flex-col px-4 sm:px-6 md:px-8 space-y-4 py-8'>
              <div className='flex flex-row'>
                <h2 className={`${textLg}`}>イベントを評価:</h2>
                {/* event star rating */}
                <div className='space-x-1 flex ml-auto'>
                  <StarRating rate={ratingEvent} onRateChange={handleRateEventChange} />
                </div>
              </div>
              <textarea
                value={reviewEvent}
                onChange={(e) => setReviewEvent(e.target.value)}
                className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none"
                placeholder="イベントのレビューを書く"
                rows={6}          
              />
              <button id="btn_event" onClick={handleSubmitEventReview} className={`grow bg-gray-800 rounded-full text-white ${textMd}`}>送信する</button>
            </div>
            {/* location button with gradient */}
            <div className={`py-6 px-4 sm:px-6 md:px-8 flex w-full`}>
              <button className={`grow ${maleGradient} rounded-xl text-white ${textMd}`}>開催場所</button>
            </div>
            {/* store info */}
            <div className='px-4 sm:px-6 md:px-8'>
              <h2 className={`${textMd}`}>{selectedEvent?.store.storeName}</h2>
              <h2 className={`${textSm}`}>料理ジャンル: 居酒屋、海鮮、日本酒バー</h2>
              <div className='pt-6'>
                <FullCarousel items={items} />
              </div>
              <h2 className={`${textSm}`}>{selectedEvent?.store.description}</h2>
            </div>
            {/* Access */}
            <div className='px-4 sm:px-6 md:px-8 flex flex-col space-y-1'>
              <h2 className={`${textMd} flex`}><img src={`${locationSVG}`} className='w-6 h-6 mr-4'/>アクセス</h2>
              <h2 className={`${textSm} border-b-2 border-solid border-gray-300`}>{selectedEvent?.store.address}</h2>
              {selectedEvent?.store.access1 &&
                <h2 className={`${textSm}`}>{selectedEvent?.store.access1}</h2>
              }
              {selectedEvent?.store.access2 &&
                <h2 className={`${textSm}`}>{selectedEvent?.store.access2}</h2>
              }
              <img src={`${map}`} className='py-2' />
              <div className={`py-6 px-4 sm:px-6 md:px-8 flex w-full`}>
                <button className={`grow rounded-xl border-2 border-solid border-gray-800 ${textMd}`}>注意事項</button>
              </div>
              <h2 className={`${textSm}`}>{selectedEvent?.store.description}</h2>
            </div>
            {/* send review about store */}
            <div className='flex flex-col px-4 sm:px-6 md:px-8 space-y-4 py-8'>
              <div className='flex flex-row'>
                <h2 className={`${textLg}`}>お店を評価:</h2>
                {/* event star rating */}
                <div className='space-x-1 flex ml-auto'>
                  <StarRating rate={ratingStore} onRateChange={handleRateStoreChange} />
                </div>
              </div>
              <textarea
                value={reviewStore}
                onChange={(e) => setReviewStore(e.target.value)}
                className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none"
                placeholder="お店のレビューを書く"
                rows={6}
              />
              <button id="btn_event" onClick={handleSubmitStoreReview} className={`grow bg-gray-800 rounded-full text-white ${textMd}`}>送信する</button>
              <div className={`py-6 flex w-full`}>
                <button onClick={() => router.back()} className={`grow bg-gray-300 rounded-full text-white ${textMd}`}>TOPにもどる</button>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
    
  );
};

export default EventReview2;
