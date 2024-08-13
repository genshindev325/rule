// app/user/event/findOnMap/page.tsx

'use client';

import React, { useState } from 'react';
import EventCarousel from '@/components/user/event/eventCarousel';
import EventCard from '@/components/user/event/eventCard';
import FindDetailModal from '@/components/user/event/findDetailModal';

const FindOnMap: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const searchSVG = '/svg/search.svg';
  const settingSVG = '/svg/settings.svg';
  const detailSVG = '/svg/detail.svg';
  const locationSVG = '/svg/location.svg';
  let detailConditions = {
    "location": "",
    "date": "",
    "gender": "",
    "age": "",
    "category": "",
    "store": "",
    "food": "",
    "genre": "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([
    '/image/img_1.png',
    '/image/img_1.png',
    '/image/img_1.png',
    '/image/img_1.png',
    '/image/img_1.png',
    // Add more image paths here
  ]);
  
  const handle20Over = () => {};
  const handleStudent = () => {};
  const handleSocial = () => {};
  const handleAnime = () => {};

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {};

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      {/* header */}
      <div className={`h-44 md:h-48 w-full ${maleGradient}`}>
        <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントを探す</h2>
        <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 md:mx-20 mt-6 md:mt-8">
          <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-8" onClick={handleOpenModal}/>
          <h2 className="text-xl font-semibold py-2 md:py-4 pl-2 text-left">イベントを検索する</h2>
          <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-6" />
        </div>
      </div>
      {/* content */}
      <div className='flex flex-row justify-center space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-4'>
        <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handle20Over}>20代以上</button>
        <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleStudent}>大学生Only</button>
        <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleSocial}>社会人Only</button>
        <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleAnime}>アニメ好き</button>
      </div>
      <div className='bg-gray-100 h-40 mt-96'>
        <EventCarousel images={images}/>
      </div>
      {/* buttons */}
      <div className='flex flex-row justify-center items-center space-x-12 md:space-x-36 py-12 md:py-48'>
        <button className={`rounded-md w-12 h-12 ${maleGradient} fill-white`}>
          <img src={searchSVG} className="rounded-md rounded-br-none mx-auto w-6 fill-white" />
        </button>
        <button className={`rounded-md w-12 h-12 ${maleGradient} text-white`}>
          <img src={detailSVG} className="rounded-md rounded-br-none mx-auto w-6 fill-white" />
        </button>
        <button className={`rounded-md w-12 h-12 ${maleGradient} text-white`}>
          <img src={locationSVG} className="rounded-md rounded-br-none mx-auto w-6 fill-white" />
        </button>
      </div>
      {/* Find event with more detail conditions */}
      <FindDetailModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSearch} />
    </div>
  );
};

export default FindOnMap;
