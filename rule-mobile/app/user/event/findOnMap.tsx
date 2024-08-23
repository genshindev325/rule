// app/user/event/findOnMap.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';

import EventCarousel from '@/app/components/user/event/eventCarousel';
import FindDetailModal from '@/app/components/user/event/findDetailModal';

interface EventProps {
  title: string,
  date: string,
  imageUrl: string,
  maleFee: number,
  maleTotal: number,
  males: number,
  femaleFee: number,
  femaleTotal: number,
  females: number
}

const FindOnMap: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const searchSVG = '/svg/search.svg';
  const settingSVG = '/svg/settings.svg';
  const detailSVG = '/svg/detail.svg';
  const locationSVG = '/svg/location.svg';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentEvents, setRecentEvents] = useState<EventProps[]>([])

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
  
  // will be released after adding api...
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     // Fetch recentEvents Data
    //     const response = await fetch('http://localhost:3000/api/user/recentEvent/...');
    //     if (response.status === 200) {
    //       const result = await response.json();
    //       setRecentEvents(result.data);
    //     } else {
    //       console.error('Failed to fetch recentEvents data');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>Loading...</div>;
  
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

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col min-h-screen w-screen bg-white">
          {/* header */}
          <div className={`h-44 md:h-48 w-full ${maleGradient}`}>
            <h2 className='text-3xl text-center text-white font-bold pt-10'>イベントを探す</h2>
            <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 md:mx-20 mt-6 md:mt-8">
              <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-8" onClick={handleOpenModal}/>
              <h2 className="text-lg font-semibold py-2 md:py-4 pl-2 text-left">イベントを検索する</h2>
              <img src={searchSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-4" />
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
            <EventCarousel events={events}/>
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
          <FindDetailModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FindOnMap;
