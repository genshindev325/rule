// app/user/event/eventReview1/page.tsx

'use client';

import React, { useState } from 'react';
import EventCard from '@/app/components/user/event/eventCard';
import Star from '@/app/components/user/event/starSVG';

const EventReview1: React.FC = () => {
  const [reviewEvent, setReviewEvent] = useState('');
  const [reviewStore, setStoreEvent] = useState('');

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textLg = 'text-lg sm:text-xl md:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg md:text-xl py-2 sm:py-4 md:py-6 font-bold';

  const title = '街コン・合コン・飲み会イベント';
  const date = '2023年9月20日 17:00';
  const imageUrl = '/image/img_1.png';
  const maleFee = 5000;
  const maleTotal = 8;
  const males = 7;
  const femaleFee = 2000;
  const femaleTotal = 8;
  const females = 2;
  const rateEvent = 3;
  const rateStore = 4;
  const eventFilledStars = Math.min(rateEvent, 5);
  const eventEmptyStars = 5 - eventFilledStars;
  const storeFilledStars = Math.min(rateStore, 5);
  const storeEmptyStars = 5 - storeFilledStars;

  const event = {
    title: title,
    date: date,
    imageUrl: imageUrl,
    maleFee: maleFee,
    maleTotal: maleTotal,
    males: males,
    femaleFee: femaleFee,
    femaleTotal: femaleTotal,
    females: females,
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-screen bg-white">
      <div className={`h-40 md:h-48 w-full ${maleGradient}`}>
        {/* header */}
        <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントレビュー</h2>
      </div>
      {/* container */}
      <div className='-mt-16 sm:-mt-24 px-2 sm:px-4 md:px-8'>
        <EventCard { ...event } />
      </div>
      <div className={`py-10 sm:py-16 px-8 sm:px-16 md:px-20 flex flex-col space-y-4 w-full`}>
        <div className='flex flex-row'>
          <h2 className={`${textLg}`}>イベントを評価:</h2>
          {/* event star rating */}
          <div className='space-x-1 flex ml-auto'>
            {[...Array(eventFilledStars)].map((_, index) => (
              <Star key={index} gradientColors={['#7c5ded', '#83d5f7']} size={20} />
            ))}
            {[...Array(eventEmptyStars)].map((_, index) => (
              <Star key={index + eventFilledStars} gradientColors={['#d1d5db', '#d1d5db']} size={20} /> // Using a gray color for empty stars
            ))}
          </div>
        </div>
        <textarea
          className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none"
          placeholder="イベントのレビューを書く"
          rows={6}          
        />
        <button id="btn_event" className={`grow ${maleGradient} rounded-full text-white ${textMd}`}>送信する</button>
        <div className='flex flex-row'>
          <h2 className={`${textLg}`}>お店を評価:</h2>
          {/* event star rating */}
          <div className='space-x-1 flex ml-auto'>
            {[...Array(storeFilledStars)].map((_, index) => (
              <Star key={5 + index} gradientColors={['#7c5ded', '#83d5f7']} size={20} />
            ))}
            {[...Array(storeEmptyStars)].map((_, index) => (
              <Star key={5 + index + storeFilledStars} gradientColors={['#d1d5db', '#d1d5db']} size={20} /> // Using a gray color for empty stars
            ))}
          </div>
        </div>
        <textarea
          className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none"
          placeholder="お店のレビューを書く"
          rows={6}          
        />
        <button id="btn_store" className={`grow ${maleGradient} rounded-full text-white ${textMd}`}>送信する</button>
      </div>
    </div>
  );
};

export default EventReview1;
