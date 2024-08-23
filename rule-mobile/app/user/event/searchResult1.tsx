// app/user/event/searchResult1.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import EventCard from '@/app/components/user/event/eventCard';
import AuthWrapper from '@/app/components/auth/authWrapper';

const SearchResult1: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'rounded-xl bg-white px-2 sm:px-4 md:px-8 py-6 sm:py-12 md:py-20 m-4 sm:m-8 md:m-16 flex flex-col shadow-md space-y-4';
  const searchSVG = '/svg/search.svg';
  const settingSVG = '/svg/settings.svg';
  const textMd = 'text-md sm:text-lg';

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

  const handleSearch = () => {};

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col min-h-screen w-screen bg-white">
            {/* header */}
            <div className={`h-44 md:h-48 w-full ${maleGradient}`}>
              <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントを探す</h2>
              <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 md:mx-20 mt-6 md:mt-8">
                <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-8"/>
                <h2 className="text-xl font-semibold py-2 md:py-4 pl-2 text-left">イベントを検索する</h2>
                <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-6" />
              </div>
            </div>
            {/* container */}
            <div className={`${container}`}>
              <div className='flex text-xl font-semibold'>
                <div className='flex-none'>*</div>
                <div className='grow text-center'>検索結果</div>
              </div>
              {/* search results */}
              {events.map((event, index) => (
                <div key={index}>
                  <EventCard {...event} />
                </div>
              ))}
              {/* see more button */}
              <div className='py-8 mx-auto'>
                <button type='submit' className={`w-52 py-1 rounded-full bg-[#e5e5e5] font-bold ${textMd}`}>もっと見る</button>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>    
  );
};

export default SearchResult1;
