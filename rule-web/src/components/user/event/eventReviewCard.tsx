// components/event/eventReviewCard.tsx

import React, { useState } from 'react';
import Star from './starSVG';
import { randomInt } from 'crypto';

interface CardProps {
  title: string;
  date: string;
  imageUrl: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
  rateEvent: number;
  rateStore: number;
}

const EventReviewCard: React.FC<CardProps> = ({
  title, date, imageUrl, maleFee, femaleFee, maleTotal, femaleTotal, males, females, rateEvent, rateStore
}) => {
  const maleRate = males/maleTotal;
  const femaleRate = females/femaleTotal;
  const eventFilledStars = Math.min(rateEvent, 5);
  const eventEmptyStars = 5 - eventFilledStars;
  const storeFilledStars = Math.min(rateStore, 5);
  const storeEmptyStars = 5 - storeFilledStars;

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const textSm = 'text-xs sm:text-sm md:text-base';

  return (
    <div className='flex flex-col space-y-2 bg-white rounded-xl shadow-xl px-2 sm:px-6 md:px-8 py-4 md:py-10 md:mt-6 text-gray-800'>
      <div className="flex flex-row space-x-2">
        <img src={imageUrl} alt={`event-profile`} className="rounded-md rounded-br-none w-24 sm:w-36 h-20 sm:h-24" />
        <div className='flex flex-col space-y-1'>
          <h2 className={`${textSm} font-bold`}>{title}</h2>
          <h2 className={`${textSm}`}>{date}</h2>
          <div className='flex flex-row space-x-1'>
            <div className={`${maleGradient} px-1 rounded-full w-10 text-center ${textSm} text-white my-auto`}>男性</div>
            <h2 className={`${textSm}`}>{maleFee}円 募集 : {males}/{maleTotal}</h2>
            <div className="w-16 md:w-28 bg-gray-300 h-2 rounded-full my-auto">
              <div 
                className={`h-2 ${maleGradient}`} 
                style={{ width: `${maleRate * 100}%` }}
              ></div>
            </div>
          </div>
          <div className='flex flex-row space-x-1'>
            <div className={`${femaleGradient} px-1 rounded-full w-10 text-center text-xs sm:text-sm md:text-base text-white my-auto`}>女性</div>
            <h2 className={`${textSm}`}>{femaleFee}円 募集 : {females}/{femaleTotal}</h2>
            <div className="w-16 md:w-28 bg-gray-200 h-2 rounded-full my-auto">
              <div 
                className={`h-2 ${femaleGradient}`} 
                style={{ width: `${femaleRate * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row'>
        <h2 className={`${textSm}`}>イベントを評価:</h2>
        {/* event star rating */}
        <div className='space-x-1 flex ml-auto'>
          {[...Array(eventFilledStars)].map((_, index) => (
            <Star key={index} gradientColors={['#7c5ded', '#83d5f7']} size={20} />
          ))}
          {/* {[...Array(eventEmptyStars)].map((_, index) => (
            <Star key={index + eventFilledStars} gradientColors={['#d1d5db', '#d1d5db']} size={20} /> // Using a gray color for empty stars
          ))} */}
        </div>
      </div>
      <div className='flex flex-row'>
        <h2 className={`${textSm}`}>お店を評価:</h2>
        {/* store star rating */}
        <div className='space-x-1 flex ml-auto'>
          {[...Array(storeFilledStars)].map((_, index) => (
            <Star key={index} gradientColors={['#7c5ded', '#83d5f7']} size={20} />
          ))}
          {/* {[...Array(storeEmptyStars)].map((_, index) => (
            <Star key={index + eventFilledStars} gradientColors={['#d1d5db', '#d1d5db']} size={20} />
          ))} */}
        </div>
      </div>
      <div className='flex flex-row ml-auto'>
        <img src='/svg/write.svg' className='w-4 sm:w-6 h-4 sm:h-6'/>
        <h2 className={`${textSm} font-bold`}>レビューを書く</h2>
      </div>
    </div>
  );
};

export default EventReviewCard;
