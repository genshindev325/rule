// app/user/event/history1.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import EventCard from '@/app/components/user/event/eventCard';
import EventReviewCard from '@/app/components/user/event/eventReviewCard';

const EventHistory1: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-xl bg-white -mt-56 px-1 sm:px-4 md:px-8 py-6 sm:py-10 md:py-14 flex flex-col shadow-md space-y-4';

  const events = [
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 2000,
      femaleTotal: 8,
      females: 2,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_2.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 5000,
      femaleTotal: 8,
      females: 7,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_3.png',
      maleFee: 6000,
      maleTotal: 10,
      males: 8,
      femaleFee: 4000,
      femaleTotal: 10,
      females: 3,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_4.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 3,
      femaleFee: 1000,
      femaleTotal: 8,
      females: 6,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 3000,
      femaleTotal: 8,
      females: 2,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_2.png',
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
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_1.png',
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
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_2.png',
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
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_3.png',
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
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_4.png',
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
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_1.png',
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

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center min-h-screen w-screen bg-white">
          <div className={`h-80 md:h-88 w-full ${maleGradient}`}>
            {/* header */}
            <h2 className='text-3xl text-center text-white font-bold pt-10'>イベント予約履歴</h2>
          </div>
          {/* container */}
          <div className={`${container}`}>
            <h2 className='text-xl text-center font-bold'>参加予定のイベント</h2>
            {/* search results */}
            {events.map((event, index) => (          
              <div key={index}>
                <EventCard { ...event } />
              </div>
            ))}
          </div>
          <div className={`py-6 px-4 sm:px-6 md:px-8 flex flex-col space-y-2 items-center w-full`}>
            <h2 className='text-xl font-bold pt-3'>過去に参加したイベント</h2>
            {/* past events attended */}
            {eventReviews.map((event, index) => (
              <div key={index}>
                <EventReviewCard {...event } />
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventHistory1;
