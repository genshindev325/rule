// app/user/auth/registerName.tsx

'use client';

import React, { useState } from 'react';

interface RegisterNameInterface {
  userName: string;
  isOpen: boolean;
  onUserNameChange: (newUserName: string) => void;
}

const RegisterName: React.FC<RegisterNameInterface> = ({ userName, isOpen, onUserNameChange }) => {
  const [name, setUserName] = useState(userName);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    onUserNameChange(name);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
        <h2 className="text-xl md:text-3xl font-bold py-12 md:py-20 px-12 text-center">ニックネームを登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
              placeholder="氏名"
              value={name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className='flex justify-center'>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full`}>➔</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterName;
