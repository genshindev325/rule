// app/auth/registerName/page.tsx

'use client';

import React, { useState } from 'react';

const RegisterName: React.FC = () => {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log(userName);
  };

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
        <h2 className="text-xl font-bold py-12 md:py-20 px-12 text-center">ニックネームを登録してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
              placeholder="氏名"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='flex justify-center'>
            <button type="submit"
              className="mt-10 w-24 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white py-2 rounded-full hover:from-purple-500 hover:to-blue-500 transition-colors"
            >
              ➔
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterName;
