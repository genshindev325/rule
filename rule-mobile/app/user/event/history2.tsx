// app/user/event/history2.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import EventCard from '@/app/components/user/event/eventCard';
import EventReviewCard from '@/app/components/user/event/eventReviewCard';
import AuthWrapper from '@/app/components/auth/authWrapper';

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
  const upcoming = true;
  const past = true;

  const events = [
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 2000,
      femaleTotal: 8,
      females: 2,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_2.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 5000,
      femaleTotal: 8,
      females: 7,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_3.png',
      maleFee: 6000,
      maleTotal: 10,
      males: 8,
      femaleFee: 4000,
      femaleTotal: 10,
      females: 3,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_4.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 3,
      femaleFee: 1000,
      femaleTotal: 8,
      females: 6,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 3000,
      femaleTotal: 8,
      females: 2,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_2.png',
      maleFee: 10000,
      maleTotal: 8,
      males: 4,
      femaleFee: 5000,
      femaleTotal: 8,
      females: 4,
    },
    // Add more image paths here
  ];

  const eventReviews = [
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 2000,
      femaleTotal: 8,
      females: 2,
      rateEvent: 3,
      rateStore: 4,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_2.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 5000,
      femaleTotal: 8,
      females: 7,
      rateEvent: 2,
      rateStore: 5,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_3.png',
      maleFee: 6000,
      maleTotal: 10,
      males: 8,
      femaleFee: 4000,
      femaleTotal: 10,
      females: 3,
      rateEvent: 3,
      rateStore: 3,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_4.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 3,
      femaleFee: 1000,
      femaleTotal: 8,
      females: 6,
      rateEvent: 2,
      rateStore: 1,
    },
    {
      eventName: '街コン・合コン・飲み会イベント',
      eventDate: '2023年9月20日 17:00',
      coverImage: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 3000,
      femaleTotal: 8,
      females: 2,
      rateEvent: 4,
      rateStore: 3,
    },
    // Add more image paths here
  ];

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // get upcoming events
        const response_upcomingEvents = await fetch('http://localhost:3000/api/events/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ upcoming }),
        });
        if (response_upcomingEvents.status === 200) {
          console.log("Getting upcoming events success.");
          const result = await response_upcomingEvents.json();
          setUpcomingEvents(result.data);
          console.log(result.data);
        } else {
          console.log(response_upcomingEvents.status);
          console.log("Getting upcoming events failed.");
        }

        // get past events
        const response_pastEvents = await fetch('http://localhost:3000/api/events/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ past })
        });
        if (response_pastEvents.status === 200) {
          console.log("Getting past events success.");
          const result = await response_pastEvents.json();
          setPastEvents(result.data);
          console.log(result.data);
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
