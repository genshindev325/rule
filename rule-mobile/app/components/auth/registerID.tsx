// app/user/auth/registerID.tsx

'use client';

import React, { useState } from 'react';

interface RegisterIDInterface {
  Id: string;
  isOpen: boolean;
  onUserIDChange: (newUserID: string) => void;
}

const RegisterID: React.FC<RegisterIDInterface> = ({ Id, isOpen, onUserIDChange }) => {
  const [userID, setUserID] = useState(Id);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    onUserIDChange(userID);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className={`h-32 md:h-48 w-full ${maleGradient}`}>
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
        <h2 className="text-xl md:text-3xl font-bold py-12 md:py-20 px-12 text-center">IDを登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name='userID'
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
              placeholder="ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
          </div>
          <p className="text-sm md:text-md text-center font-semibold text-gray-400">
            半角英数字と(.) (アンダーバー)
          </p>
          <p className="text-sm md:text-md text-center font-semibold text-gray-400">
            で入力してください。
          </p>
          <div className='flex justify-center'>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full`}>➔</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterID;
