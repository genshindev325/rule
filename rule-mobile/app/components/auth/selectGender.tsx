// app/user/auth/selectGender.tsx

'use client';

import React, { useState } from 'react';

interface SelectGenderInterface {
  userGender: 'male' | 'female';
  isOpen: boolean;
  onGenderChange: (newGender: 'male' | 'female') => void;
  onCancel: () => void;
}

const SelectGender: React.FC<SelectGenderInterface> = ({ userGender, isOpen, onGenderChange, onCancel }) => {
  const [gender, setGender] = useState<'male' | 'female'>(userGender);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const textSm = 'text-sm md:text-md font-semibold';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
    onGenderChange(gender);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
      <div className={`h-40 sm:h-44 w-full ${maleGradient}`}>
      <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16 pb-12 md:pb-14">
        <h2 className="text-md sm:text-lg md:text-xl font-bold py-8 sm:py-10 text-center">性別を選択してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-4">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`px-4 py-2 ${textSm} rounded-full ${gender === 'male' ? maleGradient + ' text-white' : 'bg-white border border-solid border-gray-400 text-gray-700 duration-150'}`}
            >
              男性
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`px-4 py-2 ${textSm} rounded-full ${gender === 'female' ? femaleGradient + ' text-white' : 'bg-white border border-solid border-gray-400 text-gray-700 duration-150'}`}
            >
              女性
            </button>
          </div>
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

export default SelectGender;
