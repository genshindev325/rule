import React, { useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { setSelectedEvent } from '@/app/store/features/event/EventSlice';
import StripePaymentElement from '@/app/components/user/event/stripePaymentElement';
import EventCard from '@/app/components/user/event/eventCard';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { RootState } from '@/app/store/store';
import { toast } from 'react-toastify';
import { formatNumber } from '@/app/components/utils/formatNumber';

const EventPayment: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textMd = 'text-base sm:text-lg font-semibold';
  const textSm = 'text-sm sm:text-base font-semibold';
  const textXs = 'text-xs sm:text-sm';

  // Redux state selectors
  const selectedEvent = useSelector((state: RootState) => state.event.selectedEvent);
  const userInfo = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const eventString = searchParams.get('event');

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

  const { 
    _id: userId,
    gender: gender,
  } = userInfo;
  const {
    _id: eventId,
    maleFee: maleFee,
    femaleFee: femaleFee,
    eventDate: eventDate
  } = selectedEvent;
  const eventPrice = gender === 'male' ? maleFee : femaleFee;
  const totalPrice = Math.ceil(eventPrice * 1.05);
  const fee = totalPrice - eventPrice;
  const storeId = selectedEvent.store._id;
  const storeName = selectedEvent.store.storeName;
  const storeStatus = selectedEvent.store.status;
  const eventStatus = selectedEvent.status;

  if (eventStatus !== 'active' || storeStatus !== 'active') {
    toast.error('このイベントの予約は終了しました。', {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      bodyClassName: 'text-xs sm:text-sm',
    });
  }

  if (!selectedEvent) {
    toast.error('無効なイベントデータ。', {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      bodyClassName: 'text-xs sm:text-sm',
    });
  }

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
            <div className={`h-40 sm:h-44 w-full ${maleGradient}`}>
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
                <div className={`${textSm} rounded-md border-2 border-solid border-gray-500 py-1 sm:py-2 md:py-3 mx-4 sm:mx-6 md:mx-8 text-gray-800 text-center`}>
                  お支払い手続き
                </div>
                <div className="flex flex-col mx-8 md:mx-20 mt-4 sm:mt-6">
                  <h3 className={`${textSm} text-gray-800`}>クレジット決済</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className={`${textXs} text-gray-600`}>参加費（税込み）</div>
                    <div className="text-sm text-gray-800">{formatNumber(eventPrice)}円</div>
                  </div>
                  <div className={`flex items-center ${textMd} justify-between mt-1 border-t-2 border-gray-300 pt-2 md:pt-4`}>
                    <div className="text-gray-600">決済金額（税込み）</div>
                    <div className="text-gray-800">{formatNumber(totalPrice)}円</div>
                  </div>
                </div>
                {/* Registration Form */}
                <div className="mt-4 sm:mt-6 bg-white">
                  <StripePaymentElement totalPrice={totalPrice} fee={fee} eventId={eventId} eventDate={eventDate} storeId={storeId} storeName={storeName} />
                  <div className="mt-4 pb-12 md:pb-20 flex justify-center">
                    <button type="button" className={`mx-4 ${textSm} w-full bg-gray-500 text-white py-2 sm:py-3 md:py-4 rounded-full hover:bg-gray-400`}>
                      <IonRouterLink routerLink='/event/findOnMap' className='text-white'>
                        キャンセル
                      </IonRouterLink>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default EventPayment;
