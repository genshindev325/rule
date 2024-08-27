// components/event/eventCard.tsx

import React, { useState } from 'react';
import { formatDateTime } from '@/app/components/utils/datetime';

// will be modified
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
}

const EventCard: React.FC<CardProps> = ({
  eventName, eventDate, coverImage, maleFee, femaleFee, maleTotal, femaleTotal, males, females,
}) => {
  const maleRate = males/maleTotal;
  const femaleRate = females/femaleTotal;

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';

  return (
    <div className="flex flex-row space-x-2 bg-white rounded-xl shadow-[0_2px_10px_3px_rgba(0,0,0,0.2)] px-2 sm:px-6 md:px-8 py-4 md:py-10 mx-0 sm:mx-4 md:mx-8 md:mt-6">
      <img src={coverImage} alt={`event-profile`} className="rounded-md rounded-br-none w-24 sm:w-36 h-20 sm:h-24" />
      <div className='flex flex-col space-y-1'>
        <h2 className="text-xs sm:text-sm md:text-md font-bold">{eventName}</h2>
        <h2 className="text-xs sm:text-sm md:text-md">{formatDateTime(eventDate)}</h2>
        <div className='flex flex-row space-x-1'>
          <div className={`${maleGradient} px-1 rounded-full w-10 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>男性</div>
          <h2 className='text-xs sm:text-sm md:text-md'>{maleFee}円 募集 : {males}/{maleTotal}</h2>
          <div className="w-16 md:w-28 bg-gray-300 h-2 rounded-full my-auto">
            <div
              className={`h-2 ${maleGradient}`} 
              style={{ width: `${maleRate * 100}%` }}
            ></div>
          </div>
        </div>
        <div className='flex flex-row space-x-1'>
          <div className={`${femaleGradient} px-1 rounded-full w-10 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>女性</div>
          <h2 className='text-xs sm:text-sm md:text-md'>{femaleFee}円 募集 : {females}/{femaleTotal}</h2>
          <div className="w-16 md:w-28 bg-gray-200 h-2 rounded-full my-auto">
            <div 
              className={`h-2 ${femaleGradient}`} 
              style={{ width: `${femaleRate * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
