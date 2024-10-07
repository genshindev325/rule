// app/store/eventSettings/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthWrapper from '@/components/auth/authWrapper';
import { useAuth } from '@/components/auth/authContext';
import Navbar from '@/components/store/navbar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// Get today's date in the YYYY-MM-DD format
const today = new Date();
const getTodayDate = (): string => {
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EventSettings = () => {
  const router = useRouter();
  const { profile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [photoImageUrl, setPhotoImageUrl] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState(getTodayDate());
  const token = useSelector((state: RootState) => state.auth.token);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // Handle file selection  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          setPhotoImageUrl(data.url);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDeleteImage = () => {
    setPhotoImageUrl('');
  }

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      router.push('/auth/login');
    } else {
      e.preventDefault();

      // Add event settings logic here
      const coverImage = `${photoImageUrl}`;
      const formData = new FormData(e.currentTarget);
      const eventName = formData.get('eventName');
      const category = selectedCategory;
      const description = formData.get('description');
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
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
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
        toast.success('イベントを成功させましょう。', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => {
          router.push('/store/events');
          sessionStorage.setItem('selectedMenu', 'dashboard');
        }, 1000);
      } else {
        console.log(response.status);
        console.log("Create event failed.");
      }
    }
  });

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="min-h-screen w-auto py-20 mx-auto bg-gray-100">
          <div className="bg-white py-8 px-6 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">イベント設定</h2>
            <form onSubmit={handleSubmit}>
              {/* buttons */}
              <div className='flex flex-row justify-end gap-4 pt-8 pb-4'>
                <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                  保存
                </button>
                <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300">
                  <a href='/store/events'>キャンセル</a>
                </button>
              </div>
              {/* Event settings */}
              <h3 className='py-2'>イベント名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='eventName'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                  placeholder="イベント名"
                  required
                />
              </div>
              <h3 className='py-2'>カテゴリ</h3>
              <div className="mb-4"> {/*will be modified*/}
                <select
                  id="category"
                  name="category"
                  className="block w-full p-2 bg-gray-100 rounded-md focus:outline-none text-sm sm:text-md"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">選択してください</option>
                  <option value="ランチ">ランチ</option>
                  <option value="ディナー">ディナー</option>
                  <option value="合コン">合コン</option>
                  <option value="婚活">婚活</option>
                  <option value="趣味交流会">趣味交流会</option>
                  <option value="その他">その他 ...</option>
                </select>
              </div>
              <h3 className='py-2'>表紙画像</h3>
              <div className='mb-4'>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 duration-500 font-bold text-xl flex flex-col justify-center items-center'>
                  +
                </label>
                {photoImageUrl && (
                  <div className='flex-1 justify-center items-center w-40 h-40 pt-6'>
                    <img src={`${photoImageUrl}`} onClick={handleDeleteImage} />
                  </div>
                )}
              </div>
              <h3 className='py-2'>説明文</h3>
              <div className="mb-4">
                <textarea
                  name='description'
                  className="w-full mt-3 p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                  placeholder="説明文"
                  rows={5}
                  required
                />
              </div>
              {/* schedule */}
              <div className='mb-4'>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <h3 className='py-2'>日程</h3>
                    <input
                      type="date"
                      name='schedule'
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                      value={eventDate}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='py-2'>開始時間</h3>
                    <input
                      type="time"
                      name='startTime'
                      className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                      placeholder="17:00"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='py-2'>終了時間</h3>
                    <input
                      type="time"
                      name='endTime'
                      className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
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
                    <h3 className='py-2'>男性の募集人数</h3>
                    <input
                      type="number"
                      name='maleTotal'
                      className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                      placeholder="男性の募集人数"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='py-2'>女性の募集人数</h3>
                    <input
                      type="number"
                      name='femaleTotal'
                      className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                      placeholder="女性の募集人数"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* fee */}
              <div className='mb-4'>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <h3 className='py-2'>男性の料金</h3>
                    <input
                      type="number"
                      name='maleFee'
                      className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                      placeholder="男性料金"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='py-2'>女性の料金</h3>
                    <input
                      type="number"
                      name='femaleFee'
                      className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100 text-sm sm:text-md"
                      placeholder="女性料金"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className='flex flex-row justify-end gap-4 pt-12'>
                <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                  保存
                </button>
                <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300">
                  <a href='/store/events'>キャンセル</a>
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
