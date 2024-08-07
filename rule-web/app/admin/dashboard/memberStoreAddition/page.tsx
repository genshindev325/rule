// app/store/setting/storeProfileSetting/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/admin/navbar';
import ImageCarousel from '@/components/imageCarousel';
import Link from 'next/link';

const StoreProfileSettings = () => {
  const [storeName, setStoreName] = useState('');

  const [images, setImages] = useState<string[]>([
    '/image/img_1.png',
    '/image/img_1.png',
    // Add more image paths here
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add StoreProfileSettings logic here
  };

  const handleAddImage = (newImage: string) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className='w-auto mx-auto'>
        <div className="min-h-screen flex items-start py-20 justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">ストアプロフィール設定</h2>
            {/* buttons */}
            <div className='flex flex-row justify-end gap-4 pt-12'>
              <button type="submit" className="w-28 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                保存
              </button>
              <Link href={'/admin/dashboard'}>
                <button type="button" className="w-28 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                  下書き
                </button>
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <h3 className='text-gray-600 py-2'>店舗名</h3>
              <div className="mb-4">
                <input 
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="店舗名"
                />
              </div>
              <h3 className='text-gray-600 py-2'>店舗ジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="海鮮"
                />
              </div>
              <h3 className='text-gray-600 py-2'>食べ物のジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="鳥"
                />
              </div>
              <h3 className='text-gray-600 py-2'>料理ジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="焼き鳥"
                />
              </div>
              <h3 className='text-gray-600 py-2'>住所</h3>
              <div className="mb-4">
                <input
                  type="address"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪府大阪市中央区東心斎橋1-17-2 アニーズビル1F"
                />
              </div>
              <h3 className='text-gray-600 py-2'>アクセス</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪メトロ御堂筋線心斎橋駅から徒歩10分"
                />
                <input
                  type="name"
                  className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪メトロ長堀橋駅から徒歩5分"
                />
              </div>
              <div className='mb-4'>
                <button type='button' className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 font-light text-4xl flex flex-col items-center'>+</button>
              </div>
              <div className="mb-4">
                <h3 className='text-gray-600 py-2'>店舗画像</h3>                
                <ImageCarousel images={images} onAddImage={handleAddImage} />
              </div>
              <div className="mb-4">
                <h3 className='text-gray-600 py-2'>説明文</h3>
                <textarea
                  className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="説明文"
                  rows={5}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfileSettings;
