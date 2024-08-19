// app/admin/dashboard/memberStoreAddition/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/admin/navbar';
import ImageCarousel from '@/components/imageCarousel';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MemberStoreAddition = () => {
  const router = useRouter();

  const [storeName, setStoreName] = useState('');

  const [images, setImages] = useState<string[]>([
    '/image/img_1.png',
    '/image/img_1.png',
    // Add more image paths here
  ]);

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add memberStoreAddition logic here
    const formData = new FormData(e.currentTarget);
    const storeName = formData.get('storeName');
    const storeGenre = formData.get('storeGenre');
    const foodGenre = formData.get('foodGenre');
    const cuisine = formData.get('cuisine');
    const address = formData.get('address');
    const access1 = formData.get('access1');
    const access2 = formData.get('access2');
    const description = formData.get('description');

    const response = await fetch('/api/admin/dashboard/memberStoreAddition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storeName, storeGenre, foodGenre, cuisine, address, access1, access2, description }),
    });

    if (response.status === 200) {
      router.push('/admin/dashboard');
      console.log("Add memberStore success.");
    } else {
      console.log(response.status);
      console.log("Add memberStore failed.");
    }
  });

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
            <h2 className="text-2xl font-bold mb-6">加盟店追加</h2>
            <form onSubmit={handleSubmit}>
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
              <h3 className='text-gray-600 py-2'>店舗名</h3>
              <div className="mb-4">
                <input 
                  type="name"
                  name='storeName'
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="店舗名"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>店舗ジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='storeGenre'
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="海鮮"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>食べ物のジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='foodGenre'
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="鳥"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>料理ジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='cuisine'
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="焼き鳥"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>住所</h3>
              <div className="mb-4">
                <input
                  type="address"
                  name='address'
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪府大阪市中央区東心斎橋1-17-2 アニーズビル1F"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>アクセス</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='access1'
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪メトロ御堂筋線心斎橋駅から徒歩10分"
                  required
                />
                <input
                  type="name"
                  name='access2'
                  className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪メトロ長堀橋駅から徒歩5分"
                  required
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
                  name='description'
                  className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="説明文"
                  rows={5}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberStoreAddition;
