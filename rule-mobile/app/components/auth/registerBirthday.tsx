// app/user/auth/registerBirthday.tsx

'use client';

import React, { useState } from 'react';

interface RegisterBirthdayInterface {
  isOpen: boolean;
  onUserBirthdayChange: (newUserBirthday: string) => void;
  onCancel: () => void;
}

const RegisterBirthday: React.FC<RegisterBirthdayInterface> = ({ isOpen, onUserBirthdayChange, onCancel }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const input = 'text-xs sm:text-sm w-full px-3 sm:px-4 md:px-6 py-2 border border-gray-700 rounded-md focus:outline-none';
  const bth = `${year}-${month}-${day}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    onUserBirthdayChange(bth);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
      <div className="h-40 sm:h-44 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-16 sm:mt-20 md:mt-24 pb-12 md:pb-14">
        <h2 className="text-md sm:text-lg md:text-xl font-bold py-8 sm:py-10 text-center">誕生日を登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-row gap-4 text-md md:text-xl">
            <input
              type="text"
              className={`${input}`}
              placeholder="日"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="text"
              className={`${input}`}
              placeholder="月"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="text"
              className={`${input}`}
              placeholder="年"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>              
          <p className={`${textXs} md:text-md text-center text-gray-400`}>
            スキップする
          </p>
          <div className='flex justify-center space-x-4'>
            <button type="button" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`} onClick={onCancel}>以前</button>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`}>次に</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterBirthday;
