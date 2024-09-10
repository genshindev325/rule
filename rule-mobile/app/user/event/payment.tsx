import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, useIonRouter, IonRouterLink } from '@ionic/react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import StripePaymentElement from '@/app/components/user/event/stripePaymentElement';
import EventCard from '@/app/components/user/event/eventCard';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { setSelectedEvent } from '@/app/store/features/event/EventSlice';
import { RootState } from '@/app/store/store';
import { SERVER_URL } from '@/app/config';
import Notification from '@/app/components/utils/notification';
import { formatNumber } from '@/app/components/utils/formatNumber';

const EventPayment: React.FC = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const eventString = searchParams.get('event');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  // Redux state selectors
  const selectedEvent = useSelector((state: RootState) => state.event.selectedEvent);
  const userInfo = useSelector((state: RootState) => state.auth.profile);

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

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userInfo || !selectedEvent) {
      console.log("Missing user information or event data.");
      return;
    }

    const { _id: userId } = userInfo;
    const { _id: eventId } = selectedEvent;
    
    try {
      const response = await fetch(`${SERVER_URL}/api/events/participate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eventId }),
      });

      if (response.status === 201) {
        setNotification({ message: '参加成功!', type: 'success' });
        router.push('/participate');
      } else {
        setNotification({ message: `イベントへの参加中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, type: 'error' });
      }
    } catch (error) {
      setNotification({ message: `イベントへの参加中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, type: 'error' });
    }
  };

  if (!selectedEvent) {
    return (
      <IonPage>
        <IonContent>
          <div className="flex items-center justify-center min-h-screen w-screen bg-white">
            <div className="text-center text-red-500 text-xl font-bold">Invalid event data</div>
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
              <div className="py-6 md:py-12 px-4 md:px-8 flex flex-row text-xl text-white md:text-3xl font-bold text-center">
                <h2 className="grow">イベントに参加</h2>
              </div>
              {/* Event Details */}
              <div className="pb-6 px-4 sm:px-6 md:px-8">
                <EventCard {...selectedEvent} />
              </div>
              {/* Payment Form */}
              <div className="flex flex-col justify-center">
                <div className="rounded-md border-2 border-solid border-gray-500 py-2 md:py-4 mx-8 md:mx-20 text-gray-800 font-bold text-center">
                  お支払い手続き
                </div>
                <div className="flex flex-col mx-8 md:mx-20 mt-6 md:mt-10">
                  <h3 className="text-lg text-gray-800 font-bold">クレジット決済</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-gray-600">参加費（税込み）</div>
                    <div className="text-gray-800">{formatNumber(selectedEvent.maleFee)}円</div>
                  </div>
                  <div className="flex items-center font-bold justify-between mt-2 border-t-2 border-gray-300 pt-2 md:pt-4">
                    <div className="text-gray-600">決済金額（税込み）</div>
                    <div className="text-gray-800">{formatNumber(selectedEvent.maleFee * 1.05)}円</div>
                  </div>
                </div>
                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="mt-6 md:mt-10 bg-white">
                  <StripePaymentElement />
                  <h2 className="text-xs sm:text-sm md:text-md text-center pt-6 px-4">%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項%お支払い前の注意事項</h2>
                  <div className="mt-4 flex items-center justify-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2 text-gray-600">
                      <a href="" className="text-blue-400 font-bold">利用規約</a>に同意する
                    </span>
                  </div>
                  <div className="mt-6 justify-center flex">
                    <button type="submit" className={`mx-4 md:mx-8 w-full ${maleGradient} text-white py-2 rounded-full hover:bg-purple-600`}>
                      決済する
                    </button>
                  </div>
                  <div className="mt-4 pb-12 md:pb-20 flex justify-center">
                  <button type="button" className="mx-4 md:mx-8 w-full bg-gray-500 text-white py-2 rounded-full bg-[#b3b3b3] hover:bg-gray-400">
                    <IonRouterLink routerLink='/home' className='text-white'>
                      キャンセル
                    </IonRouterLink>
                  </button>
                  </div>
                </form>
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
