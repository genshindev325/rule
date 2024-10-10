'use client';

import React, { useEffect, useRef, useState } from 'react';
import locations from "@/app/constants/location.json";

interface EventProps {
  _id: string;
  eventName: string;
  category: string;
  coverImage: string;
  description: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
  store: {
    storeLat: number;
    storeLng: number;
    storeName: string;
    storeImages: string[];
    cookingGenre: string;
    foodGenre: string;
    storeGenre: string;
    address: string;
    access: string[];
    description: string;
    status: string;
  };
  status: string;
  createdAt: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchConditions: {
    location?: string;
    date?: string;
    category?: string;
    storeGenre?: string;
    foodGenre?: string;
    cookingGenre?: string;
  }) => void;
}

const FindDetailModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSearch }) => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const textSm = 'text-center text-sm sm:text-md md:text-lg';
  const textXs = 'text-xs sm:text-sm md:text-md';

  const modalRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');
  const [storeGenre, setStoreGenre] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [cookingGenre, setCookingGenre] = useState('');

  const handleWithConditions = () => {
    if (onSearch) {  // Ensure onSearch exists before calling it
      onSearch({
        location,
        date,
        category,
        storeGenre,
        foodGenre,
        cookingGenre,
      });
    }
    onClose(); // Close the modal after search
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
        <div className="flex mb-3 space-x-2">
          <select
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`block flex-1 p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">場所を選択</option>
            {locations &&
              locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))
            }
          </select>
          <input
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            className={`flex-1 px-2 bg-transparent rounded-md focus:outline-none border border-solid border-gray-500 ${textXs}`}
            value={date}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="flex space-x-2">
          <div>
            <button
              className={`rounded-l-md px-5 py-2 border border-r-0 ${textXs} text-center ${
                gender === 'male' ? maleGradient + ' text-white border-none' : 'bg-transparent text-black border-solid border-gray-500'
              }`}
              onClick={() => setGender('male')}
            >
              男性
            </button>
            <button
              className={`rounded-r-md px-5 py-2 border border-l-0 ${textXs} text-center ${
                gender === 'female' ? femaleGradient + ' text-white border-none' : 'bg-transparent text-black border-solid border-gray-500'
              }`}
              onClick={() => setGender('female')}
            >
              女性
            </button>
          </div>
          <select
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`block flex-1 p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">年齢</option>
            <option value="20代">20代</option>
            <option value="30代">30代</option>
            <option value="40代">40代</option>
            <option value="50代">50代</option>
            <option value="60代以上">60代以上</option>
          </select>
          <h2 className={`${textXs} my-auto`}>歳</h2>
        </div>
        <div className="flex flex-col space-y-3 py-3">
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`block w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">カテゴリーを選択</option>
            <option value="ランチ">ランチ</option>
            <option value="ディナー">ディナー</option>
            <option value="合コン">合コン</option>
            <option value="婚活">婚活</option>
            <option value="趣味交流会">趣味交流会</option>
            <option value="その他">その他 ...</option>
          </select>
          <select
            id="store"
            name="store"
            value={storeGenre}
            onChange={(e) => setStoreGenre(e.target.value)}
            className={`block w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">店舗ジャンルを選択</option>
            <option value="カフェ">カフェ</option>
            <option value="居酒屋">居酒屋</option>
            <option value="レストラン">レストラン</option>
            <option value="和食">和食</option>
            <option value="バー">バー</option>
            <option value="ラウンジ">ラウンジ</option>
            <option value="屋外ガーデン">屋外ガーデン</option>
            <option value="専門料理店">専門料理店</option>
            <option value="その他">その他 ...</option>
          </select>
          <select
            id="food"
            name="food"
            value={foodGenre}
            onChange={(e) => setFoodGenre(e.target.value)}
            className={`relative w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">食材ジャンルを選択</option>
            <option value="肉系">肉系</option>
            <option value="魚介系">魚介系</option>
            <option value="野菜系">野菜系</option>
            <option value="その他">その他 ...</option>
          </select>
          <select
            id="cooking"
            name="cooking"
            value={cookingGenre}
            onChange={(e) => setCookingGenre(e.target.value)}
            className={`block w-full p-2 bg-transparent border-solid border border-gray-500 rounded-md focus:outline-none ${textXs}`}
          >
            <option value="">料理ジャンルを選択</option>
            <option value="和食">和食</option>
            <option value="焼肉">焼肉</option>
            <option value="寿司">寿司</option>
            <option value="天ぷら">天ぷら</option>
            <option value="しゃぶしゃぶ">しゃぶしゃぶ</option>
            <option value="フレンチ">フレンチ</option>
            <option value="イタリアン">イタリアン</option>
            <option value="中華料理">中華料理</option>
            <option value="韓国料理">韓国料理</option>
            <option value="地中海料理">地中海料理</option>
            <option value="エスニック料理">エスニック料理</option>
            <option value="タイ料理">タイ料理</option>
            <option value="インド料理">インド料理</option>
            <option value="ヴィーガン・ベジタリアン料理">ヴィーガン・ベジタリアン料理</option>
            <option value="創作料理">創作料理</option>
            <option value="その他">その他 ...</option>
          </select>
        </div>
        <button
          type="button"
          id="searchWith"
          className={`rounded-full w-full py-2 mt-6 ${maleGradient} ${textSm} font-semibold text-white`}
          onClick={handleWithConditions}
        >
          この条件で検索
        </button>
      </div>
    </div>
  );
};

export default FindDetailModal;
