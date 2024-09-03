// components/user/event/findDetailModal.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { SERVER_URL } from '@/app/config';

interface EventProps {
  _id: string,
  eventName: string,
  category: string,
  coverImage: string,
  description: string,
  eventDate: string,
  eventStartTime: string,
  eventEndTime: string,
  maleFee: number,
  maleTotal: number,
  males: number,
  femaleFee: number,
  femaleTotal: number,
  females: number,
  store: {
    address: string;
    storeGenre: string;
    foodGenre: string;
    cookingGenre: string;
    storeName: string;
  };
  status: string;
  createdAt: string;
  rating: number;
  ratingCount: number;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindDetailModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const textSmall = 'text-center text-sm sm:text-md md:text-lg';
  const textlg = 'text-center text-lg sm:text-xl md:text-2xl font-bold';

  const modalRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');
  const [storeGenre, setStoreGenre] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [cookingGenre, setCookingGenre] = useState('');
 
  const router = useIonRouter();

  const handleSubmit = async () => {
    const response = await fetch(`${SERVER_URL}/api/events/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, date, gender, age, category, storeGenre, foodGenre, cookingGenre, upcoming: true }),
    });
    if (response.status === 200) {
      const result = await response.json();
      const result_events: EventProps[] = result.data;
      const filterEvents = result_events.filter(event => event && event.store !== null);
      router.push(`/event/eventResult4?events=${JSON.stringify(filterEvents)}`);
    } else {
      console.log(response.status);
    }
    onClose();
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(e.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleStoreGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStoreGenre(e.target.value);
  };

  const handleFoodGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFoodGenre(e.target.value);
  };

  const handleCookingGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCookingGenre(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div ref={modalRef} className="bg-white px-6 py-12 rounded-2xl shadow-md w-[85%] max-w-2xl mx-4 sm:mx-8">
        {/*location and date*/}
        <div className="flex mb-4 space-x-2">
          <select id="location" name="location" value={location} onChange={handleLocationChange}
            className="block w-40 px-3 sm:px-4 md:px-5 sm:px-4 md:px-5 py-3 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
          >
            <option value="">場所を選択</option>
            <option value="Tokyo, Japan">Tokyo, Japan</option>
            <option value="Osaka, Japan">Osaka, Japan</option>
            <option value="場所 3">場所 3</option>
          </select>
          <select id="date" name="date" value={date} onChange={handleDateChange}
            className="block w-40 px-3 py-3 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
          >
            <option value="">日付を選択</option>
            <option value="date1">日付 1</option>
            <option value="date2">日付 2</option>
            <option value="date3">日付 3</option>
          </select>
        </div>
        {/*gender and age*/}
        <div className="flex mb-4 space-x-2">
          <div className=''>
            <button className={`rounded-l-lg p-3 border border-r-0 ${textSmall} ${gender === 'male' ? maleGradient + ' text-white border-none' : 'bg-transparent text-black border-solid border-gray-500'}`} onClick={() => setGender('male')}>男性</button>
            <button className={`rounded-r-lg p-3 border border-l-0 ${textSmall} ${gender === 'female' ? femaleGradient + ' text-white border-none' : 'bg-transparent text-black border-solid border-gray-500'}`} onClick={() => setGender('female')}>女性</button>
          </div>
          <select id="age" name="age" value={age} onChange={handleAgeChange}
            className="block w-28 px-6 py-3 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
          >
            <option value="">年齢</option>
            <option value="age1">10</option>
            <option value="age2">20</option>
            <option value="age3">30</option>
          </select>
          <h2 className={`${textSmall} my-auto`}>歳</h2>
        </div>
        {/* category, store, food, genre */}
        <div className='flex flex-col space-y-4 py-4'>
          <select id="category" name="category" value={category} onChange={handleCategoryChange}
            className="block w-full px-2 py-3 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
          >
            <option value="">カテゴリーを選択</option>
            <option value="category1">10</option>
            <option value="category2">20</option>
            <option value="category3">30</option>
          </select>
          <select id="store" name="store" value={storeGenre} onChange={handleStoreGenreChange}
            className="block w-full px-2 py-3 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
          >
            <option value="">店舗ジャンルを選択</option>
            <option value="wedding, drinking, party">10</option>
            <option value="store2">20</option>
            <option value="store3">30</option>
          </select>
          <select id="food" name="food" value={foodGenre} onChange={handleFoodGenreChange}
            className="relative w-full px-2 py-3 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
          >
            <option value="">食ジャンルを選択</option>
            <option value="food1">10</option>
            <option value="food2">20</option>
            <option value="food3">30</option>
          </select>
          <select id="cooking" name="cooking" value={cookingGenre} onChange={handleCookingGenreChange}
            className="block w-full px-2 py-3 bg-transparent border-solid border-2 border-gray-500 rounded-md focus:outline-none text-sm sm:text-md md:text-lg"
          >
            <option value="">料理ジャンルを選択</option>
            <option value="genre1">和食</option>
            <option value="genre2">洋食</option>
            <option value="genre3">華食</option>
            <option value="genre4">居酒屋</option>
          </select>
        </div>
        <button type='submit' id='searchWith' className={`rounded-full w-full py-3 ${maleGradient} ${textlg} text-white`} onClick={handleSubmit}>この条件で検索</button>
      </div>
    </div>
  );
};

export default FindDetailModal;
