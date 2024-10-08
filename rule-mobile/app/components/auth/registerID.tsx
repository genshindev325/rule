// app/user/auth/registerID.tsx

'use client';

import React, { useState } from 'react';

interface RegisterIDInterface {
  Id: string;
  isOpen: boolean;
  onUserIDChange: (newUserID: string) => void;
  onCancel: () => void;
}

const RegisterID: React.FC<RegisterIDInterface> = ({ Id, isOpen, onUserIDChange, onCancel }) => {
  const [userID, setUserID] = useState(Id);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textSm = 'text-sm md:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const input = 'text-xs sm:text-sm md:text-md w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    onUserIDChange(userID);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className={`h-32 md:h-48 w-full ${maleGradient}`}>
      <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16 pb-12 md:pb-14">
        <h2 className="text-md sm:text-lg md:text-xl font-bold py-8 sm:py-10 text-center">IDを登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name='userID'
              className={`${input}`}
              placeholder="ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
          </div>
          <p className={`${textXs} text-center text-gray-400`}>
            半角英数字と(.) (アンダーバー)
          </p>
          <p className={`${textXs} text-center text-gray-400`}>
            で入力してください。
          </p>
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

export default RegisterID;
