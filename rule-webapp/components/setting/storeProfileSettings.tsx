// components/setting/storeProfileSettings.tsx
'use client';

import React, { useState } from 'react';

const StoreProfileSettings = () => {
  const [storeName, setStoreName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add StoreProfileSettings logic here
  }

  return (
    <div className="min-h-screen flex items-start pt-20 justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Store profile settings</h2>
        <form onSubmit={handleSubmit}>
          <h3 className='text-gray-600 py-2'>Store name</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Store name"
            />
          </div>
          <h3 className='text-gray-600 py-2'>Store genre</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Store genre"
            />
          </div>
          <h3 className='text-gray-600 py-2'>Food genre</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Food genre"
            />
          </div>
          <h3 className='text-gray-600 py-2'>Cooking genre</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Cooking genre"
            />
          </div>
          <h3 className='text-gray-600 py-2'>Cooking genre</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Cooking genre"
            />
          </div>
          <h3 className='text-gray-600 py-2'>address</h3>
          <div className="mb-4">
            <input
              type="address"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Annie's Building 1F, 1-17-2 Higashi-Shinsaibashi, Chuo-ku, Osaka-shi, Osaka Prefecture"
            />
          </div>
          <h3 className='text-gray-600 py-2'>access</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="10 minutes walk from Shinsaibashi Station on the Osaka Metro Midosuji Line"
            />
            <input
              type="name"
              className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="5 minutes walk from Nagahoribashi Station on the Osaka Metro Nagahori Tsunimi-ryokuchi Line"
            />
          </div>
          <div className='mb-4'>
            <button type='button' className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 font-light text-4xl flex flex-col justify-center items-center pt-3'>+</button>
          </div>
          <div className="mb-4">
            <h3 className='text-gray-600 py-2'>Store image</h3>
          </div>
          <div className="mb-4">
            <h3 className='text-gray-600 py-2'>Explanatory text</h3>
            <textarea
              className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Explanation text"
              rows={5}
            />
          </div>
          {/* buttons */}
          <div className='flex flex-row justify-end gap-4 pt-12'>
            <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              keep
            </button>
            <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreProfileSettings;
