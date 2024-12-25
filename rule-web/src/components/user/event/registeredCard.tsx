// components/event/registeredCard.tsx

import React, { useState } from 'react';

const RegisteredCard: React.FC = () => {
  const visaSVG = "/svg/visa.svg";
  const cardNumber = "****_****_****-4242";
  const limitedDate = "11/2026";

  return (
    <div className='px-4 md:px-8 bg-gray-100 pb-8 text-gray-800'>
      <label className="block font-bold text-gray-800 pt-8">登録済みカード</label>
      <div className="mt-4 bg-white rounded-md">
        <div className="flex flex-col p-4">
          <h4 className="text-base md:text-lg text-left font-semibold">{cardNumber}</h4>
          <img src={`${visaSVG}`} alt="Visa" className="h-12 md:h-16 mr-auto" />
          <h4 className="text-base md:text-lg text-left font-semibold">{limitedDate}</h4>
          <div className='text-right'>
            <button className='rounded-full bg-[#ff9c9c] text-base md:text-lg font-semibold text-center px-6 md:px-10'>削除</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredCard;
