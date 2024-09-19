import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { useSelector } from 'react-redux';

import StripePaymentElement from '@/app/components/user/event/stripePaymentElement';
import EventCard from '@/app/components/user/event/eventCard';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { RootState } from '@/app/store/store';
import Notification from '@/app/components/utils/notification';
import { formatNumber } from '@/app/components/utils/formatNumber';

const EventPayment: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textMd = 'text-md sm:text-lg md:text-xl';
  const textSm = 'text-sm sm:text-md md:text-lg';
  const textXs = 'text-xs sm:text-sm md:text-md';

  // Redux state selectors
  const selectedEvent = useSelector((state: RootState) => state.event.selectedEvent);
  const userInfo = useSelector((state: RootState) => state.auth.profile);

  if (!userInfo || !selectedEvent) {
    console.log("Missing user information or event data.");
    return;
  }

  const { 
    _id: userId,
    gender: gender,
  } = userInfo;
  const {
    _id: eventId,
    maleFee: maleFee,
    femaleFee: femaleFee,
   } = selectedEvent;
  const eventPrice = gender === 'male' ? maleFee : femaleFee;
  const totalPrice = eventPrice * 1.05;

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (!selectedEvent) {
    return (
      <IonPage>
        <IonContent>
          <div className="flex items-center justify-center min-h-screen w-screen bg-white">
            <div className="text-center text-red-500 text-xl font-bold">無効なイベントデータ</div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex items-start justify-center min-h-screen w-screen bg-white">
            <div className={`h-32 md:h-48 w-full ${maleGradient}`}>
              {/* Header Section */}
              <div className="py-4 sm:py-5 md:py-6 px-4 md:px-8 flex flex-row text-white font-semibold text-lg text-center">
                <IonRouterLink routerLink={'/event/findOnMap'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>イベントに参加</h2>
              </div>
              {/* Event Details */}
              <div className="pb-6 px-4 sm:px-6 md:px-8">
                <EventCard {...selectedEvent} />
              </div>
              {/* Payment Form */}
              <div className="flex flex-col justify-center">
                <div className="rounded-md border-2 border-solid border-gray-500 py-1 sm:py-2 md:py-3 mx-4 sm:mx-6 md:mx-8 text-gray-800 font-bold text-center">
                  お支払い手続き
                </div>
                <div className="flex flex-col mx-8 md:mx-20 mt-4 sm:mt-6">
                  <h3 className={`${textSm} text-gray-800 font-semibold`}>クレジット決済</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className={`${textXs} text-gray-600`}>参加費（税込み）</div>
                    <div className="text-gray-800">{formatNumber(eventPrice)}円</div>
                  </div>
                  <div className={`flex items-center ${textMd} font-semibold justify-between mt-1 border-t-2 border-gray-300 pt-2 md:pt-4`}>
                    <div className="text-gray-600">決済金額（税込み）</div>
                    <div className="text-gray-800">{formatNumber(totalPrice)}円</div>
                  </div>
                </div>
                {/* Registration Form */}
                <div className="mt-4 sm:mt-6 bg-white">
                  <StripePaymentElement totalPrice={totalPrice} eventId={eventId} />
                  <div className="mt-4 pb-12 md:pb-20 flex justify-center">
                    <button type="button" className="mx-4 md:mx-8 w-full bg-gray-500 text-white py-1 sm:py-2 md:py-3 rounded-full hover:bg-gray-400">
                      <IonRouterLink routerLink='/event/findOnMap' className='text-white'>
                        キャンセル
                      </IonRouterLink>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default EventPayment;
