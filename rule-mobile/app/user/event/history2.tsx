// app/user/event/history2.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import EventCard from '@/app/components/user/event/eventCard';
import EventReviewCard from '@/app/components/user/event/eventReviewCard';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { RootState } from '@/app/store/store';
import { SERVER_URL } from '@/app/config';
import { useSelector } from 'react-redux';

interface UpcomingEventProps {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
}

interface PastEventProps {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
  rating: number;
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
}

const EventHistory2: React.FC = () => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventProps[]>([]);
  const [pastEvents, setPastEvents] = useState<PastEventProps[]>([]);
  const [userId ,setUserId] = useState('');
  const userProfile = useSelector((state: RootState) => state.auth.profile);
  const router = useIonRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  
  // Polling interval in milliseconds (e.g., 1000ms * 60 = 1 minute)
  const POLLING_INTERVAL = 1000 * 60;

  const showUpcomingEvents = () => {
    setTab('upcoming');
  }

  const showPastEvents = () => {
    setTab('past');
  }
  
  useEffect(() => {
    if(userProfile) {
      setUserId(userProfile._id);
    }
  }, [userProfile])

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-2xl bg-white -mt-20 px-3 sm:px-4 md:px-6 py-6 sm:py-12 md:py-20 flex flex-col shadow-md space-y-4 w-[90vw]';

  const textLg = 'text-lg sm:text-xl font-bold';
  const textMd = 'text-base sm:text-lg font-semibold';
  const textSm = 'text-sm sm:text-base font-semibold';

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (!token) {
          router.push('/auth/login');
        } else {
          // get upcoming events
          const response_upcomingEvents = await fetch(`${SERVER_URL}/api/events/filter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ upcoming: true, user: userId }),
          });
          if (response_upcomingEvents.status === 200) {
            const result = await response_upcomingEvents.json();
            setUpcomingEvents(result.data);
          } else {
            console.log(response_upcomingEvents.status);
            console.log("Getting upcoming events failed.");
          }

          // get past events
          const response_pastEvents = await fetch(`${SERVER_URL}/api/events/filter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ past: true, user: userId })
          });
          if (response_pastEvents.status === 200) {
            const result = await response_pastEvents.json();
            const result_events: PastEventProps[] = result.data;
            const filterEvents = result_events.filter(event => event && event.store !== null);
            setPastEvents(filterEvents);
          } else {
            console.log(response_pastEvents.status);
            console.log("Getting past events failed.")
          }
        }
      } catch(error) {
        console.error("An error occurred during get events:", error);
      }
    }

    if (userId) {
      fetchEventData();

      // Set up polling to fetch data periodically
      const intervalId = setInterval(fetchEventData, POLLING_INTERVAL);
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [userId])

  return (
    <IonPage>
      <IonContent>      
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center h-[calc(100vh-56px)] w-screen bg-white text-gray-800">
            <div className={`h-40 sm:h-44 w-full ${maleGradient}`}>
              {/* header */}
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-6 sm:pt-8 px-4 sm:px-6 md:px-8'>
                <IonRouterLink routerLink={'/home'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-6'>イベント予約履歴</h2>
              </div>
            </div>
            {/* container */}
            <div className={`${container}`}>
              {/* tab */}
              <div className='flex flex-row px-2 sm:px-4 md:px-6 lg:px-10 justify-evenly'>
                <button
                  type='button'
                  className={`${tab === 'upcoming' ? maleGradient + ' text-white' : 'bg-white'} rounded-full ${textSm} py-1 sm:py-2 px-3 duration-300`}
                  onClick={showUpcomingEvents}
                >
                  今後のイベント
                </button>
                <button
                  type='button'
                  className={`${tab === 'past' ? maleGradient + ' text-white' : 'bg-white'} rounded-full ${textSm} py-1 sm:py-2 px-3 duration-300`}
                  onClick={showPastEvents}
                >
                  過去のイベント
                </button>
              </div>
              {/* upcoming events */}
              <div className={`${tab === 'upcoming' ? '' : 'hidden'} space-y-4`}>
                {upcomingEvents.map((event, index) => (          
                  <div key={index}>
                    <EventCard { ...event } />
                  </div>
                ))}
              </div>
              {/* past events */}
              <div className={`${tab === 'past' ? '' : 'hidden'} space-y-4`}>
                {pastEvents.map((event, index) => (
                  <div key={index}>
                    <IonRouterLink routerLink={`/event/eventReview2?event=${encodeURIComponent(JSON.stringify(event))}`}>
                      <EventReviewCard { ...event } />
                    </IonRouterLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>    
  );
};

export default EventHistory2;
