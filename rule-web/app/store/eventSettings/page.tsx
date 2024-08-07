// app/store/eventSetting/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/store/navbar';

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
      <div className="w-20">
        <Navbar />
      </div>
      <div className="min-h-screen w-auto py-20 mx-auto bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">イベント設定</h2>
          <form onSubmit={handleSubmit}>
            {/* buttons */}
            <div className='flex flex-row justify-end gap-4 pt-12'>
              <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                保つ
              </button>
              <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                下書き
              </button>
            </div>
            {/* Event settings */}
            <h3 className='text-gray-600 py-2'>イベント名</h3>
            <div className="mb-4">
              <input
                type="name"
                className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                placeholder="イベント名"
              />
            </div>
            <h3 className='text-gray-600 py-2'>カテゴリー</h3>
            <div className="mb-4"> {/*will be modified*/}
              <select
                id="category"
                name="category"
                className="block w-full px-6 py-3 text-base bg-gray-100 rounded-md focus:outline-none sm:text-sm"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">選んでください</option>
                <option value="category1">カテゴリー 1</option>
                <option value="category2">カテゴリー 2</option>
                <option value="category3">カテゴリー 3</option>
              </select>
            </div>
            <h3 className='text-gray-600 py-2'>表紙画像</h3>
            <div className="mb-4">
              <div className='w-full px-6 py-3 bg-gray-100 rounded-md flex flex-row justify-center'>
                <img src='/image/img_1.png' className='w-2/3' />
              </div>
            </div>
            <h3 className='text-gray-600 py-2'>説明文</h3>
            <div className="mb-4">
              <textarea
                className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                placeholder="説明文"
                rows={5}
              />
            </div>
            {/* schedule */}
            <div className='mb-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>スケジュール</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="November 14, 2023"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>開始時間</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="17:00"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>終了時間</h3>
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
                  <h3 className='text-gray-600 py-2'>採用された男性の数</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="採用された男性の数"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>採用された女性の数</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="採用された女性の数"
                  />
                </div>
              </div>
            </div>
            {/* rate */}
            <div className='mb-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>男性料金</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="男性料金"
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-gray-600 py-2'>女性料金</h3>
                  <input
                    type="name"
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="女性料金"
                  />
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className='flex flex-row justify-end gap-4 pt-12'>
              <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                保つ
              </button>
              <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                下書き
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventSettings;
