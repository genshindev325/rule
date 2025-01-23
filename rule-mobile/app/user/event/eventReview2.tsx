// app/user/event/eventReview2.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter, IonRouterLink } from '@ionic/react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FaPaperPlane } from 'react-icons/fa';
import GoogleMapLocation from '@/app/components/utils/googleMapLocate';
import AuthWrapper from '@/app/components/auth/authWrapper';
import SendReviewModal from '@/app/components/user/event/sendReviewModal';
import SentReviewModal from '@/app/components/user/event/sentReviewModal';
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
    storeGenre: string;
    cookingGenre: string;
    storeLat: number;
    storeLng: number;
  };
  status: string,
  createdAt: string
}

const EventReview2: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [IsSendReviewModalOpen, setIsSendReviewModalOpen] = useState(false);
  const [IsSentReviewModalOpen, setIsSentReviewModalOpen] = useState(false);
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
  const container = 'w-full rounded-2xl -mt-10 bg-white p-4 sm:p-6 md:p-8 flex flex-col shadow-md';
  const locationSVG = '/svg/location.svg';
  const textMd = 'text-base sm:text-lg md:text-xl';
  const textSm = 'text-sm sm:text-base md:text-lg';
  const textXs = 'text-xs sm:text-sm md:text-base';

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

  if (!selectedEvent) {
    console.log("Missing user information or event data.");
    return;
  }

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
        const eventName = selectedEvent?.eventName;
        // send store review
        const response = await fetch(`${SERVER_URL}/api/reviews/store`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ storeId, storeReviewText, storeRating, createdBy, eventName }),
        });
        if (response.status === 201) {
          console.log("Sending store review success.");
          const result = await response.json();
          console.log(result.data);
          setIsSentReviewModalOpen(true);
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

  if (loading) return <div className='w-screen h-[calc(100vh-56px)] flex items-center justify-center text-3xl text-gray-800 font-bold'>読み込み中...</div>;

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col min-h-[calc(100vh-56px)] w-screen bg-white text-zinc-700 space-y-1">
            {/* header */}
            <div className={`h-36 sm:h-40 w-full ${maleGradient}`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-2 px-4'>
                <button onClick={() => router.goBack()}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </button>
                <h2 className='grow pr-4'>参加イベント情報</h2>
              </div>
            </div>
            {/* container */}
            <div className='absolute top-10 px-8 w-full h-48 rounded-2xl'>
              <img src={selectedEvent.coverImage} className='w-full rounded-2xl h-48' />
            </div>
            <div className='absolute top-48 px-8 pb-6 w-full'>
              <div className={`${container}`}>
                {/* title */}
                <h2 className={`${textMd} font-semibold`}>{selectedEvent.eventName}</h2>
                <h2 className='text-xs sm:text-sm'>{formatDateTime(selectedEvent.eventDate)}</h2>
                {/* male */}
                <div className='flex flex-row'>
                  <div className={`${maleGradient} rounded-full w-10 sm:w-12 text-center text-white my-auto`} style={{ fontSize: '0.65rem' }}>男性</div>
                  <h2 className={`pl-2 my-auto`} style={{ fontSize: '0.65rem' }}>募集人数</h2>
                  <h2 className={`pl-3 my-auto`} style={{ fontSize: '0.65rem' }}>{selectedEvent.males}/{selectedEvent.maleTotal}</h2>
                  <div className="w-16 sm:w-20 bg-gray-200 h-2 rounded-full my-auto ml-1">
                    <div
                      className={`h-2 ${maleGradient} rounded-full`} 
                      style={{ width: `${selectedEvent.males / selectedEvent.maleTotal * 100}%` }}
                    ></div>
                  </div>
                  <h2 className='ml-auto my-auto' style={{ fontSize: '0.65rem' }}>料金  <strong>{selectedEvent.maleFee}</strong>円&nbsp;&nbsp;税込</h2>
                </div>
                {/* female */}
                <div className='flex flex-row pt-2'>
                  <div className={`${femaleGradient} rounded-full w-10 sm:w-12 text-center text-white my-auto`} style={{ fontSize: '0.65rem' }}>女性</div>
                  <h2 className={`pl-2 my-auto`} style={{ fontSize: '0.65rem' }}>募集人数</h2>
                  <h2 className={`pl-3 my-auto`} style={{ fontSize: '0.65rem' }}>{selectedEvent.females}/{selectedEvent.femaleTotal}</h2>
                  <div className="w-16 sm:w-20 bg-gray-200 h-2 rounded-full my-auto ml-1">
                    <div
                      className={`h-2 ${femaleGradient} rounded-full`}
                      style={{ width: `${selectedEvent.females / selectedEvent.femaleTotal * 100}%` }}
                    ></div>
                  </div>
                  <h2 className='ml-auto my-auto' style={{ fontSize: '0.65rem' }}>料金  <strong>{selectedEvent.femaleFee}</strong>円&nbsp;&nbsp;税込</h2>
                </div>
                {/* description and caution */}
                <div className='flex flex-row pt-6'>
                  <h2 className={`text-base font-semibold text-gray-800`}>イベント概要</h2>
                </div>
                <h2 className={`${textXs}`}>{selectedEvent.description}</h2>
                {/* store name */}
                <div className='flex flex-row pt-6'>
                  <h2 className={`text-base font-semibold text-gray-800`}>{selectedEvent.store.storeName}</h2>
                  <div className='flex flex-row ml-auto text-blue-500 items-center'>
                    <h2 className={`${textXs} pr-2`}>
                      <IonRouterLink routerLink={`/chatMessages?storeId=${selectedEvent.store._id}&storeName=${selectedEvent.store.storeName}&eventId=${selectedEvent._id}&eventName=${selectedEvent.eventName}`}>
                        店舗への問い合わせ
                      </IonRouterLink>
                    </h2>
                    <FaPaperPlane className='w-4 h-4' />
                  </div>
                </div>
                <h2 className={`${textXs}`}>店舗ジャンル: {selectedEvent.store.storeGenre}, {selectedEvent.store.cookingGenre}</h2>
                <h2 className={`${textXs}`}>{selectedEvent.store.storeName}</h2>
                {/* Access */}
                <div className='flex flex-col space-y-1 w-full pt-6'>
                  <h2 className='text-base font-semibold text-gray-800'>住所</h2>
                  <h2 className={`${textXs}`}>{selectedEvent.store.address}</h2>
                  <h2 className={`${textXs}`}>アクセス:</h2>
                  {selectedEvent.store.access && selectedEvent.store.access.map((acc, index) => (
                    <h2 key={index} className={`${textXs}`}>{acc}</h2>
                  ))}
                  <div className='py-1'>
                    <GoogleMapLocation lat={selectedEvent.store.storeLat} lng={selectedEvent.store.storeLng} />
                  </div>
                </div>
                {storeReplyText &&
                  <>
                    <h2 className={`${textSm} font-semibold text-blue-600 my-2`}>店舗の対応</h2>
                    <h2 className={`${textXs} font-semibold p-2 rounded-lg border shadow-lg mb-4`}>{storeReplyText}</h2>
                  </>
                }
                {/* buttons */}
                {!storeReplyText && <div className={`flex w-2/3 mx-auto pt-4 pb-2`}>
                  <button className={`grow ${maleGradient} text-sm rounded-full py-1 sm:py-2 text-white`} onClick={() => setIsSendReviewModalOpen(true)}>
                    レビューをする
                  </button>
                </div>}
                <div className={`flex w-2/3 mx-auto pb-4`}>
                  <button onClick={() => router.goBack()} className={`grow bg-gray-400 text-sm text-white rounded-full py-1 sm:py-2`}>
                    戻る
                  </button>
                </div>
              </div>
            </div>
            <SendReviewModal
              isOpen={IsSendReviewModalOpen}
              onClose={() => setIsSendReviewModalOpen(false)}
              onConfirmSendReview={() => handleSubmitStoreReview()}
              ratingStore={ratingStore}
              handleRateStoreChange={(newStoreRate) => handleRateStoreChange(newStoreRate)}
              ratingEvent={ratingEvent}
              handleRateEventChange={(newEventRate) => handleRateEventChange(newEventRate)}
              reviewStore={reviewStore}
              setReviewStore={(newReview) => setReviewStore(newReview)}
            />
            <SentReviewModal
              isOpen={IsSentReviewModalOpen}
              onClose={() => setIsSentReviewModalOpen(false)}
            />
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
    
  );
};

export default EventReview2;
