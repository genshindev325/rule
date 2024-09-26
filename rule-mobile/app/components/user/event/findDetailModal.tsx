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
  const textSm = 'text-center text-sm sm:text-md md:text-lg';
  const textXs = 'text-xs sm:text-sm md:text-md';

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
      <div ref={modalRef} className="bg-white px-4 py-6 rounded-2xl shadow-md w-[85%] max-w-2xl mx-4 sm:mx-8">
        {/*location and date*/}
        <div className="flex mb-3 space-x-2">
          <select id="location" name="location" value={location} onChange={handleLocationChange}
            className={`block w-40 p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">場所を選択</option>
            <option value="Tokyo, Japan">東京、日本</option>
            <option value="Osaka, Japan">大阪、日本</option>
          </select>
          <select id="date" name="date" value={date} onChange={handleDateChange}
            className={`block w-40 p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">日付を選択</option>
            <option value="date1">日付 1</option>
            <option value="date2">日付 2</option>
            <option value="date3">日付 3</option>
          </select>
        </div>
        {/*gender and age*/}
        <div className="flex space-x-2">
          <div className=''>
            <button className={`rounded-l-md px-5 py-2 border border-r-0 ${textXs} text-center ${gender === 'male' ? maleGradient + ' text-white border-none' : 'bg-transparent text-black border-solid border-gray-500'}`} onClick={() => setGender('male')}>男性</button>
            <button className={`rounded-r-md px-5 py-2 border border-l-0 ${textXs} text-center ${gender === 'female' ? femaleGradient + ' text-white border-none' : 'bg-transparent text-black border-solid border-gray-500'}`} onClick={() => setGender('female')}>女性</button>
          </div>
          <select id="age" name="age" value={age} onChange={handleAgeChange}
            className={`block w-28 p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">年齢</option>
            <option value="age1">20代以上</option>
            <option value="age2">30代以上</option>
            <option value="age3">40代以上</option>
            <option value="age3">50代以上</option>
            <option value="age3">60代以上</option>
          </select>
          <h2 className={`${textXs} my-auto`}>歳</h2>
        </div>
        {/* category, store, food, genre */}
        <div className='flex flex-col space-y-3 py-3'>
          {/* <div className='relative'>
            <input
              type="text"
              name={`access${index}`}
              value={value}
              onChange={(e) => handleAccessChange(index, e.target.value)}
              className="w-full p-2 mb-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder={`大阪メトロ 御堂筋線 心斎橋駅から徒歩10分`}
            />
            <button
              type="button"
              onClick={() => handleRemoveAccess(index)}
              className="absolute right-2 top-5 hover:font-bold duration-300 transform -translate-y-1/2 text-gray-500 hover:text-red-700"
            >
              +
            </button>
          </div> */}
          <select id="category" name="category" value={category} onChange={handleCategoryChange}
            className={`block w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">カテゴリーを選択</option>
            <option value="category1">10</option>
            <option value="category2">20</option>
            <option value="category3">30</option>
          </select>
          <select id="store" name="store" value={storeGenre} onChange={handleStoreGenreChange}
            className={`block w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">店舗ジャンルを選択</option>
            <option value="wedding, drinking, party">10</option>
            <option value="store2">20</option>
            <option value="store3">30</option>
          </select>
          <select id="food" name="food" value={foodGenre} onChange={handleFoodGenreChange}
            className={`relative w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">食材ジャンルを選択</option>
            <option value="food1">10</option>
            <option value="food2">20</option>
            <option value="food3">30</option>
          </select>
          <select id="cooking" name="cooking" value={cookingGenre} onChange={handleCookingGenreChange}
            className={`block w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">料理ジャンルを選択</option>
            <option value="genre1">和食</option>
            <option value="genre2">洋食</option>
            <option value="genre3">華食</option>
            <option value="genre4">居酒屋</option>
          </select>
        </div>
        <button type='submit' id='searchWith' className={`rounded-full w-full py-2 mt-6 ${maleGradient} ${textSm} font-semibold text-white`} onClick={handleSubmit}>この条件で検索</button>
      </div>
    </div>
  );
};

export default FindDetailModal;
