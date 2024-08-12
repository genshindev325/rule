// components/event/eventCard.tsx

import React, { useState } from 'react';

const EventCard: React.FC = () => {
  const total = 8;
  const males = 7;
  const females = 2;
  const maleRate = males/total;
  const femaleRate = females/total;

  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';

  const [eventImage, setEventImage] = useState(
    '/image/img_1.png'
    // Modify image paths here from event profile
  );

  return (
    <div className="flex flex-row space-x-2 bg-white rounded-xl shadow-xl px-3 sm:px-6 md:px-9 md:px-8 py-6 md:py-12 mx-2 sm:mx-8 md:mx-16 md:mt-6 mb-12 md:mb-20">
      <img src={eventImage} alt={`event-profile`} className="rounded-md rounded-br-none w-28 sm:w-36 h-20 sm:h-24" />
      <div className='flex flex-col space-y-1'>
        <h2 className="text-xs sm:text-sm md:text-md font-bold">街コン・合コン・飲み会イベント</h2>
        <h2 className="text-xs sm:text-sm md:text-md">2023年9月20日 17:00</h2>
        <div className='flex flex-row space-x-1'>
          <div className={`${maleGradient} px-1 rounded-full w-10 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>男性</div>
          <h2 className='text-xs sm:text-sm md:text-md'>5000円 募集 : {males}/{total}</h2>
          <div className="w-16 md:w-28 bg-gray-300 h-2 rounded-full my-auto">
            <div 
              className={`h-2 ${maleGradient}`} 
              style={{ width: `${maleRate * 100}%` }}
            ></div>
          </div>
        </div>
        <div className='flex flex-row space-x-1'>
          <div className={`${femaleGradient} px-1 rounded-full w-10 text-center text-xs sm:text-sm md:text-md text-white my-auto`}>女性</div>
          <h2 className='text-xs sm:text-sm md:text-md'>2000円 募集 : {females}/{total}</h2>
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
