// app/user/event/searchResult2/page.tsx

'use client';

import React, { useState } from 'react';
import EventCard from '@/components/user/event/eventCard';

const SearchResult2: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const container = 'px-2 sm:px-4 md:px-8 py-6 sm:py-12 md:py-20 flex flex-col space-y-4 mt-10';
  const textMd = 'text-md sm:text-lg';
  const textLg = 'text-center text-lg sm:text-xl md:text-2xl font-bold';
  const [selectedLocation, setLocation] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const events = [
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 2000,
      femaleTotal: 8,
      females: 2,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_2.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 5000,
      femaleTotal: 8,
      females: 7,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_3.png',
      maleFee: 6000,
      maleTotal: 10,
      males: 8,
      femaleFee: 4000,
      femaleTotal: 10,
      females: 3,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_4.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 3,
      femaleFee: 1000,
      femaleTotal: 8,
      females: 6,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_1.png',
      maleFee: 5000,
      maleTotal: 8,
      males: 7,
      femaleFee: 3000,
      femaleTotal: 8,
      females: 2,
    },
    {
      title: '街コン・合コン・飲み会イベント',
      date: '2023年9月20日 17:00',
      imageUrl: '/image/img_2.png',
      maleFee: 10000,
      maleTotal: 8,
      males: 4,
      femaleFee: 5000,
      femaleTotal: 8,
      females: 4,
    },
    // Add more image paths here
  ];

  const handleSearch = () => {};

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      {/* header */}
      <div className={`h-80 md:h-96 w-full ${maleGradient}`}>
        <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントを探す</h2>
        {/* search with these conditions */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-4 md:p-4 mx-8 md:mx-12 mt-4 md:mt-8">
          {/*location and date*/}
          <div className="flex space-x-2 pt-4 sm:pt-6 md:pt-8">
            <select id="location" name="location" value={selectedLocation} onChange={handleCategoryChange}
              className="px-6 py-1 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
            >
              <option value="">場所を選択</option>
              <option value="location1">場所 1</option>
              <option value="location2">場所 2</option>
              <option value="location3">場所 3</option>
            </select>
            <select id="date" name="date" value={selectedLocation} onChange={handleCategoryChange}
              className="px-6 py-1 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
            >
              <option value="">日付を選択</option>
              <option value="date1">日付 1</option>
              <option value="date2">日付 2</option>
              <option value="date3">日付 3</option>
            </select>
          </div>
          {/* budget, category, genre */}
          <div className='flex flex-col my-2 space-y-2 w-full'>
            <select id="budget" name="budget" value={selectedLocation} onChange={handleCategoryChange}
              className="block px-2 py-1 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
            >
              <option value="">予算の設定</option>
              <option value="budget1">10</option>
              <option value="budget2">20</option>
              <option value="budget3">30</option>
            </select>
            <select id="category" name="category" value={selectedLocation} onChange={handleCategoryChange}
              className="block px-2 py-1 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
            >
              <option value="">カテゴリーを選択</option>
              <option value="category1">10</option>
              <option value="category2">20</option>
              <option value="category3">30</option>
            </select>
            <select id="genre" name="genre" value={selectedLocation} onChange={handleCategoryChange}
              className="block px-2 py-1 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
            >
              <option value="">料理ジャンルを選択</option>
              <option value="genre1">和食</option>
              <option value="genre2">洋食</option>
              <option value="genre3">華食</option>
              <option value="genre4">居酒屋</option>
            </select>
          </div>
          <button type='submit' onClick={handleSearch} id='searchWith' className={`rounded-full my-2 w-full py-2 ${maleGradient} text-white ${textLg}`}>この条件で検索</button>
        </div>
      </div>
      {/* container */}
      <div className={`${container}`}>
        {/* search results */}
        {events.map((event, index) => (
          <div key={index}>
            <EventCard {...event} />
          </div>
        ))}
        {/* see more button */}
        <div className='py-8 mx-auto'>
          <button type='submit' className={`w-52 py-1 rounded-full bg-[#e5e5e5] font-bold ${textMd}`}>もっと見る</button>
        </div>
      </div>
    </div>
  );
};

export default SearchResult2;
