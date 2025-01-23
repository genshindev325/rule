// components/event/eventReviewCard.tsx

import React, { useState, useEffect } from 'react';
import Star from './starSVG';
import StarRating from '@/app/components/utils/starRating';
import { formatDateTime } from '@/app/components/utils/datetime';

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
  const textSm = 'text-xs sm:text-sm md:text-base';

  return (
    <div className="flex flex-row justify-evenly bg-white rounded-xl shadow-[0_2px_10px_3px_rgba(0,0,0,0.2)] p-1 sm:p-2 text-gray-800">
      <img src={coverImage} alt={`event-profile`} className="rounded-xl w-1/4 max-h-20 my-auto" />
      <div className='flex flex-col px-2'>
        <h2 className="sm:text-xs font-semibold" style={{ fontSize: '0.7rem', lineHeight: '0.75rem' }}>店舗名</h2>
        <h2 className="sm:text-xs mt-1" style={{ fontSize: '0.5rem', lineHeight: '0.75rem' }}>{store.storeName}</h2>
        <h2 className="sm:text-xs font-semibold mt-1" style={{ fontSize: '0.7rem', lineHeight: '0.75rem' }}>住所</h2>
        <h2 className="sm:text-xs mt-1" style={{ fontSize: '0.5rem', lineHeight: '0.75rem' }}>
          {store.address.length > 20 ? store.address.slice(0, 26) + '...' : store.address}
        </h2>
        <div className='flex flex-row items-center'>
          <h2 className="sm:text-xs" style={{ fontSize: '0.5rem', lineHeight: '0.5rem' }}>イベントを評価:</h2>
          {/* event star rating */}
          <div className='space-x-1 flex ml-auto'>
            <StarRating rate={eventRating} />
          </div>
        </div>
        <div className='flex flex-row items-center'>
          <h2 className="sm:text-xs" style={{ fontSize: '0.5rem', lineHeight: '0.5rem' }}>お店を評価:</h2>
          {/* store star rating */}
          <div className='space-x-1 flex ml-auto'>
            <StarRating rate={storeRating} />
          </div>
        </div>
      </div>
      <div className='flex flex-col space-y-1 min-w-[140px]'>
        <h2 className="sm:text-xs font-semibold" style={{ fontSize: '0.7rem', lineHeight: '0.75rem' }}>{eventName}</h2>
        <h2 className="sm:text-xs" style={{ fontSize: '0.5rem', lineHeight: '0.75rem' }}>{formatDateTime(eventDate)}</h2>
        <div className='flex flex-row space-x-1'>
          <div className={`${maleGradient} px-1 rounded-full w-9 text-center sm:text-xs text-white my-auto`} style={{ fontSize: '0.5rem', lineHeight: '0.75rem' }}>男性</div>
          <div className='flex flex-col'>
            <h2 className='ml-auto sm:text-xs' style={{ fontSize: '0.3rem', lineHeight: '0.4rem' }}>&nbsp;</h2>
            <h2 className='sm:text-xs' style={{ fontSize: '0.4rem', lineHeight: '0.4rem' }}>{maleFee}円 {males}/{maleTotal}</h2>
            <h2 className='ml-auto sm:text-xs' style={{ fontSize: '0.3rem', lineHeight: '0.4rem' }}>(税込)</h2>
          </div>
          <div className='flex-1 my-auto'>
            <div className="w-14 sm:w-16 bg-gray-300 h-2 rounded-full ml-auto">
              <div
                className={`h-2 ${maleGradient} rounded-full`} 
                style={{ width: `${maleRate * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className='flex flex-row space-x-1'>
          <div className={`${femaleGradient} px-1 rounded-full w-9 text-center sm:text-xs text-white my-auto`} style={{ fontSize: '0.5rem', lineHeight: '0.75rem' }}>女性</div>
          <div className='flex flex-col'>
            <h2 className='ml-auto sm:text-xs' style={{ fontSize: '0.3rem', lineHeight: '0.4rem' }}>&nbsp;</h2>
            <h2 className='sm:text-xs' style={{ fontSize: '0.4rem', lineHeight: '0.4rem' }}>{femaleFee}円 {females}/{femaleTotal}</h2>
            <h2 className='ml-auto sm:text-xs' style={{ fontSize: '0.3rem', lineHeight: '0.4rem' }}>(税込)</h2>
          </div>
          <div className='flex-1 my-auto'>
            <div className="w-14 sm:w-16 md:w-24 bg-gray-200 h-2 rounded-full ml-auto">
              <div 
                className={`h-2 ${femaleGradient} rounded-full`} 
                style={{ width: `${femaleRate * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventReviewCard;
