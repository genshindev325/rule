// components/event/eventReviewCard.tsx

import React, { useState, useEffect } from 'react';
import StarRating from '@/app/utils/starRating';
import { formatDateTime } from '@/app/utils/datetime';

interface CardProps {
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
    rating: number;
    _id: string;
  };
}

const EventReviewCard: React.FC<CardProps> = ({
  eventName, eventDate, coverImage, maleFee, femaleFee, maleTotal, femaleTotal, males, females, rating, store
}) => {
  const maleRate = males/maleTotal;
  const femaleRate = females/femaleTotal;
  const eventFilledStars = Math.min(rating, 5);  
  const eventEmptyStars = 5 - eventFilledStars;

  const [eventRating, setRating] = useState(rating);
  const [storeRating, setStoreRating] = useState(store.rating);

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const textSm = 'text-xs sm:text-sm md:text-md';

  return (
    <div className='flex flex-col bg-white rounded-xl p-2 sm:p-4 text-gray-800'>
      <div className="flex flex-row space-x-2">
        <img src={coverImage} alt={`event-profile`} className="rounded-md rounded-br-none w-24 sm:w-36 h-20 sm:h-24" />
        <div className='flex flex-col space-y-1'>
          <h2 className={`${textSm} font-bold`}>{eventName}</h2>
          <h2 className={`${textSm}`}>{formatDateTime(eventDate)}</h2>
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
            <div className={`${femaleGradient} px-1 rounded-full w-10 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>女性</div>
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
      <div className='flex flex-row items-center'>
        <h2 className={`${textSm}`}>イベントを評価:</h2>
        {/* event star rating */}
        <div className='space-x-1 flex ml-auto'>
          <StarRating rate={eventRating} />
        </div>
      </div>
      <div className='flex flex-row items-center'>
        <h2 className={`${textSm}`}>お店を評価:</h2>
        {/* store star rating */}
        <div className='space-x-1 flex ml-auto'>
          <StarRating rate={storeRating} />
        </div>
      </div>
    </div>
  );
};

export default EventReviewCard;
