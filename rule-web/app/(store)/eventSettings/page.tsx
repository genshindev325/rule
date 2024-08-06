// pages/eventSettings.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';

const EventSettings = () => {
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add event settings logic here
  }

  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20 bg-gray-800">
        <Navbar />
      </div>
      <div className="min-h-screen w-auto pt-20 mx-auto bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Event settings</h2>
          <form onSubmit={handleSubmit}>
            {/* buttons */}
            <div className='flex flex-row justify-end gap-4 pt-12'>
              <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                keep
              </button>
              <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                draft
              </button>
            </div>
            {/* Event settings */}
            <h3 className='text-gray-600 py-2'>Event name</h3>
            <div className="mb-4">
              <input
                type="name"
                className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                placeholder="Event name"
              />
            </div>
            <h3 className='text-gray-600 py-2'>Category</h3>
            <div className="mb-4"> {/*will be modified*/}
              <select
                id="category"
                name="category"
                className="block w-full px-6 py-3 text-base bg-gray-100 rounded-md focus:outline-none sm:text-sm"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Please select</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div>
            <h3 className='text-gray-600 py-2'>Cover image</h3>
            <div className="mb-4">
              <div className='w-full px-6 py-3 bg-gray-100 rounded-md flex flex-row justify-center'>
                <img src='/image/img_1.png' className='w-2/3' />
              </div>
            </div>
            <h3 className='text-gray-600 py-2'>Explanatory text</h3>
            <div className="mb-4">
              <textarea
                className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                placeholder="Explanation text"
                rows={5}
              />
            </div>
            {/* schedule */}
            <div className='mb-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>Schedule</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="November 14, 2023"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>Starting time</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="17:00"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>Ending time</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="21:00"
                  />
                </div>
              </div>
            </div>
            {/* recurited number */}
            <div className='mb-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>Number of men recruited</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="Number of men recruited"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>Number of women recruited</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="Number of women recruited"
                  />
                </div>
              </div>
            </div>
            {/* rate */}
            <div className='mb-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>Men's rate</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="Men's rate"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>Women's rates</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="Women's rates"
                  />
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className='flex flex-row justify-end gap-4 pt-12'>
              <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                keep
              </button>
              <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventSettings;
