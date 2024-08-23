// app/store/setting/storeProfileSetting/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';

const StoreProfileSettings = () => {
  const router = useRouter();

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add StoreProfileSettings logic here
    const formData = new FormData(e.currentTarget);
    const storeName = formData.get('storeName');
    const storeGenre = formData.get('storeGenre');
    const foodGenre = formData.get('foodGenre');
    const cuisine = formData.get('cuisine');
    const address = formData.get('address');
    const access1 = formData.get('access1');
    const access2 = formData.get('access2');
    const image = formData.get('image');
    const description = formData.get('description');

    const response = await fetch('/api/store/setting/storeProfileSetting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storeName,
        storeGenre,
        foodGenre,
        cuisine,
        address,
        access1,
        access2,
        image,
        description
      }),
    });

    if (response.status === 200) {
      router.push('/store/setting');
    } else {
      console.log(response.status);
      console.log("Failed.");
    }
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100">
        <div className="w-20">
          <Navbar />
        </div>
        <div className='w-auto mx-auto'>
          <div className="min-h-screen flex items-start py-20 justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">ストアプロフィール設定</h2>
              <form onSubmit={handleSubmit}>
                <h3 className='text-gray-600 py-2'>店名</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='storeName'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="店名"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>店舗ジャンル</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='storeGenre'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="店舗ジャンル"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>食べ物のジャンル</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='foodGenre'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="食べ物のジャンル"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>料理ジャンル</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='cuisine'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="料理ジャンル"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>住所</h3>
                <div className="mb-4">
                  <input
                    type="address"
                    name='address'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="Annie's Building 1F, 1-17-2 Higashi-Shinsaibashi, Chuo-ku, Osaka-shi, Osaka Prefecture"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>アクセス</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='access1'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="10 minutes walk from Shinsaibashi Station on the Osaka Metro Midosuji Line"
                  />
                  <input
                    type="name"
                    name='access2'
                    className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="5 minutes walk from Nagahoribashi Station on the Osaka Metro Nagahori Tsunimi-ryokuchi Line"
                  />
                </div>
                <div className='mb-4'>
                  <button type='button' className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 font-light text-4xl flex flex-col justify-center items-center'>+</button>
                </div>
                <div className="mb-4">
                  <h3 className='text-gray-600 py-2'>ストアイメージ</h3>
                </div>
                <div className="mb-4">
                  <h3 className='text-gray-600 py-2'>説明文</h3>
                  <textarea
                    className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="説明文"
                    rows={5}
                  />
                </div>
                {/* buttons */}
                <div className='flex flex-row justify-end gap-4 pt-12'>
                  <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    保存
                  </button>
                  <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                    <a href='/store/setting'>キャンセル</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default StoreProfileSettings;
