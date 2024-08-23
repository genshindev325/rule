// app/user/event/searchResult4.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import EventCard from '@/app/components/user/event/eventCard';

const SearchResult4: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'absolute top-48 rounded-xl bg-white px-1 sm:px-4 md:px-8 py-6 sm:py-12 md:py-20 m-8 sm:m-8 md:m-16 flex flex-col shadow-md space-y-4';
  const searchSVG = '/svg/search.svg';
  const settingSVG = '/svg/settings.svg';

  const textMd = 'text-md sm:text-lg';
  const fromTop = 'pt-[900px] md:pt-[1200px] lg:pt-[1250px] xl:pt-[1350px]';
  
  const handle20Over = () => {};
  const handleStudent = () => {};
  const handleSocial = () => {};
  const handleAnime = () => {};

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

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center min-h-screen w-screen bg-white">
          {/* header */}
          <div className={`h-80 md:h-88 w-full ${maleGradient}`}>
            <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントを探す</h2>
            <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 sm:mx-12 md:mx-20 mt-6 md:mt-8">
              <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-6"/>
              <h2 className="text-lg font-semibold py-2 md:py-4 pl-2 text-left">イベントを検索する</h2>
              <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-4" />
            </div>
            {/* buttons */}
            <div className='flex flex-row justify-center space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-4'>
              <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handle20Over}>20代以上</button>
              <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handleStudent}>大学生Only</button>
              <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handleSocial}>社会人Only</button>
              <button className='rounded-full bg-white shadow-lg px-3 md:px-4 py-1' onClick={handleAnime}>アニメ好き</button>
            </div>
          </div>
          {/* container */}
          <div className={`${container}`}>
            {/* search results */}
            {events.map((event, index) => (
              <div key={index}>
                <EventCard {...event} />
              </div>
            ))}
            {/* see more button */}
            <div className='py-4 sm:py-8 mx-auto'>
              <button type='submit' className={`w-52 py-1 rounded-full bg-[#e5e5e5] font-bold ${textMd}`}>もっと見る</button>
            </div>
          </div>
          <div className={`${fromTop}`}></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchResult4;
