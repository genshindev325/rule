// app/user/event/registSuccess.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const RegistSuccess: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const completedImage = '/svg/checked_outline.svg';
  const date = '2023年 9月 20日 17:00 ~ 20:00';
  const eventImage = '/image/img_1.png';
  const description = 'イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。';

  const handle20Over = () => {};

  return (
    <div className={`flex flex-col items-center min-h-screen w-screen ${maleGradient} px-8`}>
      {/* banner on the bg-gradient */}
      <div className="py-20 md:py-24 lg:py-28 px-4 md:px-8 flex flex-col text-2xl text-white md:text-3xl font-bold text-center">
        <Image src={completedImage} alt={`event-profile`} width={120} height={100} className="rounded-md rounded-br-none text-white mx-auto mb-10 md:mb-16" />
        <h2 className='grow'>イベントの参加予約が</h2>
        <h2 className='grow'>完了しました!</h2>
      </div>
      {/* content */}
      <div className='rounded-lg bg-white p-4 sm:px-8 mb-12 flex flex-col sm:items-center space-y-1'>
        <h2 className='text-lg md:text-2xl font-semibold '>街コン・合コン・飲み会イベント</h2>
        <h2 className='text-md md:text-lg'>{date}</h2>
        <div className='flex flex-row space-x-2 text-xs font-semibold'>
          <button className='rounded-full bg-[#e6e6e6] px-4 py-1' onClick={handle20Over}>20代以上</button>
          <button className='rounded-full bg-[#e6e6e6] px-4 py-1' onClick={handle20Over}>大学生Only</button>
          <button className='rounded-full bg-[#e6e6e6] px-4 py-1' onClick={handle20Over}>アニメ好き</button>
        </div>        
        <Image src={eventImage} alt={`event-profile`} width={350} height={70} className="pt-4 pb-8 sm:w-full" />
        <button className='bg-transparent border-solid border-2 rounded-lg border-black text-black font-semibold py-2 w-full' >イベント概要</button>
        <h2 className='py-4 text-sm font-semibold'>{description}</h2>
      </div>
      {/* button */}
      <button className='rounded-full w-full bg-white hover:bg-gray-100 mx-8 p-2 mb-16 border-none font-semibold'>TOPにもどる</button>
    </div>
  );
};

export default RegistSuccess;
