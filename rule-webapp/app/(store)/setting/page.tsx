// pages/setting.tsx

'use client';

import React from 'react';
import Navbar from '../../../components/navbar';

const Setting = () => {
  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20 bg-gray-800">
        <Navbar />
      </div>
      <div className="w-full p-10">
        <h1 className="text-3xl font-bold mb-6">setting</h1>
        <div className='flex flex-row gap-6'>
          <div className="rounded-lg border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
            Store profile settings
          </div>
          <div className="rounded-lg border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
            Password setting
          </div>
          <div className="rounded-lg border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
            Credit card settings
          </div>
          <div className="rounded-lg border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
            Transfer account settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
