// app/store/eventSettings/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthWrapper from '@/components/auth/authWrapper';
import { useAuth } from '@/components/auth/authContext';
import Navbar from '@/components/store/navbar';


const EventSettings = () => {
  const router = useRouter();
  const { profile } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoImageUrl, setPhotoImageUrl] = useState<string | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // Handle file selection
  const handlePhotoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const selectedFile = event.target.files[0];
        setPhotoFile(selectedFile);

        // Create a URL for previewing the image
        const previewUrl = URL.createObjectURL(selectedFile);
        setPhotoImageUrl(previewUrl);
    }
};

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add event settings logic here

    // Upload images to the server or cloud service and get url
    const coverImage = `${photoImageUrl}`;

    const formData = new FormData(e.currentTarget);
    const eventName = formData.get('eventName');
    const category = selectedCategory;
    const description = formData.get('description');
    const eventDate = formData.get('schedule');
    const _eventStartTime = formData.get('startTime');
    const _eventEndTime = formData.get('endTime');
    let eventStartTime, eventEndTime;
    if(eventDate && _eventStartTime)
      eventStartTime = new Date(eventDate?.toString() + ' ' + _eventStartTime?.toString());
    if(eventDate && _eventEndTime)
      eventEndTime = new Date(eventDate?.toString() + ' ' + _eventEndTime?.toString());
    const maleTotal = formData.get('maleTotal');
    const femaleTotal = formData.get('femaleTotal');
    const maleFee = formData.get('maleFee');
    const femaleFee = formData.get('femaleFee');
    const store = profile?._id;

    
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        category,
        coverImage,
        description,
        eventDate,
        eventStartTime,
        eventEndTime,
        maleTotal,
        femaleTotal,
        maleFee,
        femaleFee,
        store
      }),
    });

    if (response.status === 201) {
      router.push('/store/dashboard');
      sessionStorage.setItem('selectedMenu', 'dashboard');
      console.log("Create event success.");
    } else {
      console.log(response.status);
      console.log("Create event failed.");
    }    
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
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
                  保存
                </button>
                <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                  <a href='/store/dashboard'>下書き</a>
                </button>
              </div>
              {/* Event settings */}
              <h3 className='text-gray-600 py-2'>イベント名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='eventName'
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="イベント名"
                  required
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
                  required
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
                  {photoImageUrl && (<img src={photoImageUrl} className='w-2/3' />)}
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={handlePhotoFileChange} />
                </div>
              </div>
              <h3 className='text-gray-600 py-2'>説明文</h3>
              <div className="mb-4">
                <textarea
                  name='description'
                  className="w-full px-6 mt-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="説明文"
                  rows={5}
                  required
                />
              </div>
              {/* schedule */}
              <div className='mb-4'>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 py-2'>スケジュール</h3>
                    <input
                      type="date"
                      name='schedule'
                      className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="2023年 11月 14日"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 py-2'>開始時間</h3>
                    <input
                      type="time"
                      name='startTime'
                      className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="17:00"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 py-2'>終了時間</h3>
                    <input
                      type="time"
                      name='endTime'
                      className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="21:00"
                      required
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
                      type="number"
                      name='maleTotal'
                      className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="採用された男性の数"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 py-2'>採用された女性の数</h3>
                    <input
                      type="number"
                      name='femaleTotal'
                      className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="採用された女性の数"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* fee */}
              <div className='mb-4'>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 py-2'>男性料金</h3>
                    <input
                      type="number"
                      name='maleFee'
                      className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="男性料金"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 py-2'>女性料金</h3>
                    <input
                      type="number"
                      name='femaleFee'
                      className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="女性料金"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className='flex flex-row justify-end gap-4 pt-12'>
                <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  保存
                </button>
                <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                  <a href='/store/dashboard'>下書き</a>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default EventSettings;
