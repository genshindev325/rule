import React, { useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import RegisteredCard from '@/app/components/user/event/registeredCard';
import FormInput from '@/app/components/user/event/formInput';
import EventCard from '@/app/components/user/event/eventCard';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { setSelectedEvent } from '@/app/store/features/event/EventSlice';
import { RootState } from '@/app/store/store';

const EventPayment: React.FC = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userInfo || !selectedEvent) {
      console.log("Missing user information or event data.");
      return;
    }

    const { _id: userId } = userInfo;
    const { _id: eventId } = selectedEvent;
    
    try {
      const response = await fetch('http://localhost:3000/api/events/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eventId }),
      });

      if (response.status === 201) {
        console.log("Participate event success.");
        router.push("/event/findOnMap");
      } else {
        console.log(response.status);
        console.log("Participate event failed.");
      }
    } catch (error) {
      console.error("An error occurred during event participation:", error);
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
                <button
                  type="button"
                  className="flex bg-transparent rounded-full border-none w-12 text-white text-left items-center justify-center font-bold"
                  onClick={() => router.back()}
                >
                  &lt;
                </button>
                <h2 className="grow">イベントに参加</h2>
              </div>

              {/* Event Details */}
              <div className="py-6 px-2 xs:px-6">
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
                    <div className="text-gray-800">{selectedEvent.maleFee}円</div>
                  </div>
                  <div className="flex items-center font-bold justify-between mt-2 border-t-2 border-gray-300 pt-2 md:pt-4">
                    <div className="text-gray-600">決済金額（税込み）</div>
                    <div className="text-gray-800">{selectedEvent.maleFee}円</div>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="mt-8 md:mt-16 bg-white">
                  <RegisteredCard />
                  <div className="flex justify-center py-8">
                    <button
                      type="button"
                      className="bg-[#808080] text-white flex items-center px-8 md:px-12 lg:px-16 py-2 md:py-4 lg:py-6"
                    >
                      <div className="rounded-full bg-white text-[#808080] text-2xl h-6 md:h-8 lg:h-10 w-6 md:w-8 lg:w-10 mr-4 md:mr-6 lg:mr-8 flex justify-center items-center">
                        +
                      </div>
                      新しいカードを登録する
                    </button>
                  </div>
                  <FormInput />
                  <h2 className="text-sm sm:text-md md:text-lg text-center pt-6">##############################</h2>
                  <h2 className="text-sm sm:text-md md:text-lg text-center">#######################################</h2>
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
                      キャンセル
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default EventPayment;
