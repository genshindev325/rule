// app/user/event/history2.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import EventCard from '@/app/components/user/event/eventCard';
import EventReviewCard from '@/app/components/user/event/eventReviewCard';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';

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

  const showUpcomingEvents = () => {
    setTab('upcoming');
  }

  const showPastEvents = () => {
    setTab('past');
  }

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-xl bg-white -mt-56 px-4 md:px-8 py-6 sm:py-10 md:py-14 flex flex-col shadow-md space-y-4';

  const textLg = 'text-lg sm:text-xl md:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg md:text-xl py-2 sm:py-4 md:py-6 font-bold';
  const textSm = 'text-sm sm:text-md md:text-lg font-semibold';

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // get upcoming events
        const response_upcomingEvents = await fetch(`${SERVER_URL}/api/events/filter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ upcoming: true }),
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ past: true })
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
      } catch(error) {
        console.error("An error occurred during get events:", error);
      }
    }

    fetchEventData();
  }, [])

  return (
    <IonPage>
      <IonContent>      
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col items-center min-h-screen w-screen bg-white">
            <div className={`h-80 md:h-88 w-full ${maleGradient}`}>
              {/* header */}
              <h2 className='text-3xl text-center text-white font-bold pt-10'>イベント予約履歴</h2>
            </div>
            {/* container */}
            <div className={`${container}`}>
              {/* tab */}
              <div className='flex flex-row'>
                <button
                  type='button'
                  className={`${tab === 'upcoming' ? maleGradient + ' text-white' : 'bg-white'} rounded-full ${textLg} px-4`}
                  onClick={showUpcomingEvents}
                >
                  今後のイベント
                </button>
                <button
                  type='button'
                  className={`${tab === 'past' ? maleGradient + ' text-white' : 'bg-white'} rounded-full ${textLg} px-4 ml-auto`}
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
            <div className='py-6'>
              <button type="button" className={`rounded-full bg-gray-200 px-12 py-1 ${textSm}`}>もっと見る</button>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>    
  );
};

export default EventHistory2;
