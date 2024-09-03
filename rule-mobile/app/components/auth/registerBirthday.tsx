// app/user/auth/registerBirthday.tsx

'use client';

import React, { useState } from 'react';

interface RegisterBirthdayInterface {
  isOpen: boolean;
  onUserBirthdayChange: (newUserBirthday: string) => void;
}

const RegisterBirthday: React.FC<RegisterBirthdayInterface> = ({ isOpen, onUserBirthdayChange }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const bth = `${year}-${month}-${day}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    onUserBirthdayChange(bth);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
        <h2 className="text-xl md:text-3xl font-bold py-12 md:py-20 text-center">誕生日を登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-row gap-4 text-md md:text-xl">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center focus:outline-none"
              placeholder="日"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center focus:outline-none"
              placeholder="月"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center focus:outline-none"
              placeholder="年"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>              
          <p className="text-sm md:text-md text-center font-semibold text-gray-400">
            スキップする
          </p>
          <div className='flex justify-center'>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`}>➔</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterBirthday;
