// app/user/auth/registerBirthday.tsx

'use client';

import React, { useState } from 'react';

interface RegisterBirthdayInterface {
  isOpen: boolean;
  onUserBirthdayChange: (newUserBirthday: string) => void;
  onCancel: () => void;
}

const RegisterBirthday: React.FC<RegisterBirthdayInterface> = ({ isOpen, onUserBirthdayChange, onCancel }) => {
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [error, setError] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const textSm = 'text-sm md:text-md font-semibold';
  const input = 'text-xs sm:text-sm md:text-md text-left placeholder:text-center w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';
  const bth = `${year}-${month}-${day}`;

  const handleChangeYear = (year: number) => {
    const curDateTime = new Date();
    const y = curDateTime.getFullYear();
    if ((y - year) < 20) {
      setError('ユーザーは20歳以上である必要があります。')
    } else {
      setError('');
      setYear(year);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    if (error === '') {
      onUserBirthdayChange(bth);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
        <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16 pb-12 md:pb-14">
          <h2 className="text-md sm:text-lg md:text-xl font-bold py-8 sm:py-10 text-center">誕生日を登録してください</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 px-4 flex flex-row gap-4 text-md md:text-xl">
              <input
                type="number"
                className={`${input}`}
                placeholder="日"
                value={day}
                min={1}
                max={31}
                onChange={(e) => setDay(parseInt(e.target.value))}
              />
              <input
                type="number"
                className={`${input}`}
                placeholder="月"
                value={month}
                min={1}
                max={12}
                onChange={(e) => setMonth(parseInt(e.target.value))}
              />
              <input
                type="number"
                className={`${input}`}
                placeholder="年"
                value={year}
                min={1920}
                onChange={(e) => handleChangeYear(parseInt(e.target.value))}
              />
            </div>
            {error &&
              <p className={`${textXs} md:text-md text-left pl-2 sm:pl-3 md:pl-4 text-red-500`}>{error}</p>
            }
            <div className='flex justify-center space-x-4'>
              <button type="button" className={`mt-10 w-24 ${maleGradient} ${textSm} text-white py-2 rounded-full focus:outline-none`} onClick={onCancel}>前の</button>
              <button type="submit" className={`mt-10 w-24 ${maleGradient} ${textSm} text-white py-2 rounded-full focus:outline-none`}>次に</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterBirthday;
