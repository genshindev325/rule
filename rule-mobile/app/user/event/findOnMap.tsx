// app/user/event/findOnMap.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';

import EventCarousel from '@/app/components/user/event/eventCarousel';
import EventCard from '@/app/components/user/event/eventCard';

const FindOnMap: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const searchSVG = '/svg/search.svg';
  const settingSVG = '/svg/settings.svg';

  const [images, setImages] = useState<string[]>([
    '/image/img_1.png',
    '/image/img_1.png',
    '/image/img_1.png',
    '/image/img_1.png',
    '/image/img_1.png',
    // Add more image paths here
  ]);
  
  const handle20Over = () => {};
  const handleStudent = () => {};
  const handleSocial = () => {};
  const handleAnime = () => {};

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col min-h-screen w-screen bg-white">
          {/* header */}
          <div className={`h-44 md:h-48 w-full ${maleGradient}`}>
            <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントを探す</h2>
            <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 md:mx-20 mt-6 md:mt-8">
              <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-8" />
              <h2 className="text-xl font-semibold py-2 md:py-4 pl-2 text-left">イベントを検索する</h2>
              <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-6" />
            </div>
          </div>
          {/* content */}
          <div className='flex flex-row justify-center space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-4'>
            <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handle20Over}>20代以上</button>
            <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleStudent}>大学生Only</button>
            <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleSocial}>社会人Only</button>
            <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleAnime}>アニメ好き</button>
          </div>
          <div className='bg-gray-100 w-full h-40 mt-96'>
            <EventCarousel images={images}/>
          </div>
          {/* buttons */}
          <div className='flex flex-row justify-center items-center space-x-8'>
            <button className={`rounded-md w-20 h-20 ${maleGradient}`}>
              <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-6" />
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FindOnMap;
