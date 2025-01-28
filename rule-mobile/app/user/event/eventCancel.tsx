// app/user/event/EventDetail.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { FaPaperPlane } from 'react-icons/fa';
import { IoAlertCircle } from 'react-icons/io5';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '@/app/store/features/event/EventSlice';
import { RootState } from '@/app/store/store';
import { formatDateTime } from '@/app/components/utils/datetime';
import GoogleMapLocation from '@/app/components/utils/googleMapLocate';
import CautionModal from '@/app/components/user/event/cautionModal';
import { SERVER_URL } from '@/app/config';
import { toast } from 'react-toastify';
import EventCancelModal from '@/app/components/user/event/eventCancelModal';
import EventCancelledModal from '@/app/components/user/event/eventCancelledModal';
import { getPaymentDate } from '@/app/components/utils/getPaymentDate';

const EventCancel: React.FC = () => {
  const [isCaution, setIsCaution] = useState(false);
  const [isEventCancelModalOpen, setIsEventCancelModalOpen] = useState(false);
  const [isEventCancelledModalOpen, setIsEventCancelledModalOpen] = useState(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const eventString = searchParams.get('event');
  const router = useIonRouter();
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const container = 'flex flex-col p-4 sm:p-6 space-y-1 bg-white rounded-2xl shadow-lg z-50';
  const textMd = 'text-base sm:text-lg font-semibold';
  const textXs = 'text-xs sm:text-sm';
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
  }

  // Derived states
  const paymentDate = selectedEvent ? getPaymentDate(selectedEvent.eventDate) : '';
  const userId = userInfo._id;
  const gender = userInfo.gender;
  const eventId = selectedEvent._id;
  const maleFee = selectedEvent.maleFee;
  const femaleFee = selectedEvent.femaleFee;
  const eventPrice = gender === 'male' ? maleFee : femaleFee;
  const totalPrice = Math.ceil(eventPrice * 1.05);
  const fee = totalPrice - eventPrice;

  const confirmCancelParticipation = async () => {
    if (!token) {
      router.push('/auth/login');
    } else {
      const response = await fetch(`${SERVER_URL}/api/events/participate`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, eventId, paymentDate, totalPrice, fee }),
      });

      if (response.status === 201) {
        setIsEventCancelModalOpen(false);
        setIsEventCancelledModalOpen(true);
      } else {
        setIsEventCancelModalOpen(false);
        const result = await response.json();
        toast.info(`イベント参加のキャンセル中にエラーが発生しました。もう一度お試しください。エラー: ${result.message}`, {
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
          <div className="flex flex-col min-h-[calc(100vh-56px)] w-screen bg-white text-zinc-700 space-y-1">
            {/* header */}
            <div className={`h-36 sm:h-40 w-full ${maleGradient}`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-16 sm:pt-20 md:pt-24 px-4'>
                <button onClick={() => router.goBack()}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </button>
                <h2 className='grow pr-6'>参加イベント情報</h2>
              </div>
            </div>
            {/* container */}
            <div className='absolute top-24 px-8 w-full h-48 rounded-2xl'>
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
                  <button onClick={() => setIsCaution(true)} className='flex flex-row text-blue-500 hover:text-blue-600 ml-auto duration-300'>
                    <h2 className={`${textXs} pr-2`}>注意事項</h2>
                    <IoAlertCircle className='w-4 h-4' />
                  </button>
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
                {/* buttons */}
                <div className={`flex w-2/3 mx-auto pt-4 pb-2`}>
                  <button className={`grow ${femaleGradient} text-sm rounded-full py-1 sm:py-2 text-white`} onClick={() => setIsEventCancelModalOpen(true)}>
                    参加予約をキャンセル
                  </button>
                </div>
                <div className={`flex w-2/3 mx-auto pb-4`}>
                  <button onClick={() => router.goBack()} className={`grow bg-gray-400 text-sm text-white rounded-full py-1 sm:py-2`}>
                    戻る
                  </button>
                </div>
              </div>
            </div>
            <CautionModal isOpen={isCaution} caution={caution} onClose={() => setIsCaution(false)} />
            <EventCancelModal isOpen={isEventCancelModalOpen} onClose={() => setIsEventCancelModalOpen(false)} onConfirmCancel={confirmCancelParticipation} />
            <EventCancelledModal isOpen={isEventCancelledModalOpen} onClose={() => setIsEventCancelledModalOpen(false)} />
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default EventCancel;
