// app/user/auth/registerName.tsx

'use client';

import React, { useState } from 'react';

interface RegisterNameInterface {
  userName: string;
  isOpen: boolean;
  onUserNameChange: (newUserName: string) => void;
  onCancel: () => void;
}

const RegisterName: React.FC<RegisterNameInterface> = ({ userName, isOpen, onUserNameChange, onCancel }) => {
  const [name, setUserName] = useState(userName);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const input = 'text-xs sm:text-sm md:text-md w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    onUserNameChange(name);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16 pb-12 md:pb-14">
        <h2 className="text-md sm:text-lg md:text-xl font-bold py-8 sm:py-10 text-center">ニックネームを登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className={`${input}`}
              placeholder="氏名"
              value={name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className='flex justify-center space-x-4'>
            <button type="button" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`} onClick={onCancel}>⬅</button>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`}>➔</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterName;
