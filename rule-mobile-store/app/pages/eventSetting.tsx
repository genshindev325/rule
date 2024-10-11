// app/pages/eventSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, useIonRouter, IonRouterLink } from '@ionic/react';
import { SERVER_URL } from '@/app/config';
import SideMenu from '@/app/components/store/IonMenu';
import { useAuth } from '@/app/components/auth/authContext';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const EventSetting = () => {
  const router = useIonRouter();
  const { profile } = useAuth();
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm';
  const token = useSelector((state: RootState) => state.auth.token);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [photoImageUrl, setPhotoImageUrl] = useState<string | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // Handle file selection  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        toast.info('画像がクラウドにアップロードされるまでしばらくお待ちください。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        const response = await fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("storeIamge-url: " + data.url);
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
      
      const response = await fetch(`${SERVER_URL}/api/events`, {
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
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        setTimeout(() => {
          sessionStorage.setItem('selectedMenu', 'dashboard');
          router.push('/dashboard');
        }, 1500);
      } else {
        console.log(response.status);
        console.log("try again.");
      }
    }
  });

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-semibold mr-12 text-gray-800'>イベント設定</IonTitle>
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className="bg-white ion-padding min-h-screen w-full text-gray-800">
            <form onSubmit={handleSubmit}>
              {/* Event settings */}
              <h3 className='text-gray-600 text-xs sm:text-sm py-2'>イベント名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='eventName'
                  className="w-full text-xs sm:text-sm p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="イベント名"
                  required
                />
              </div>
              <h3 className='text-gray-600 text-xs sm:text-sm py-2'>カテゴリ</h3>
              <div className="mb-4"> {/*will be modified*/}
                <select
                  id="category"
                  name="category"
                  className="block w-full p-2 text-xs sm:text-sm bg-gray-100 rounded-md focus:outline-none"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="" className='text-xs sm:text-sm'>選択してください</option>
                  <option value="ランチ" className='text-xs sm:text-sm'>ランチ</option>
                  <option value="ディナー" className='text-xs sm:text-sm'>ディナー</option>
                  <option value="合コン" className='text-xs sm:text-sm'>合コン</option>
                  <option value="婚活" className='text-xs sm:text-sm'>婚活</option>
                  <option value="趣味交流会" className='text-xs sm:text-sm'>趣味交流会</option>
                  <option value="その他" className='text-xs sm:text-sm'>その他 ...</option>
                </select>
              </div>
              <h3 className='text-gray-600 text-xs sm:text-sm py-2'>カパー画像</h3>
              <div className='mb-4'>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-light text-xl flex flex-col justify-center items-center'>+</label>
                {photoImageUrl && (
                  <div className='flex-1 justify-center items-center w-40 h-40 pt-6'>
                    <img src={`${photoImageUrl}`} onClick={handleDeleteImage} />
                  </div>
                )}
              </div>
              <h3 className='text-gray-600 py-2 text-xs sm:text-sm'>説明文</h3>
              <div className="mb-4">
                <textarea
                  name='description'
                  className="w-full mt-3 text-xs sm:text-sm p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="説明文"
                  rows={3}
                  required
                />
              </div>
              {/* schedule */}
              <div className='mb-4'>
                <h3 className='text-gray-600 text-xs sm:text-sm py-2'>日程</h3>
                <input
                  type="date"
                  name='schedule'
                  className="w-full p-2 text-xs bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="2023年 11月 14日"
                  required
                />
              </div>
              <div className='mb-4'>
                <h3 className='text-gray-600 text-xs sm:text-sm py-2'>開始時間</h3>
                <input
                  type="time"
                  name='startTime'
                  className="w-full p-2 text-xs bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="17:00"
                  required
                />
              </div>
              <div className='mb-4'>
                <h3 className='text-gray-600 py-2 text-xs sm:text-sm'>終了時間</h3>
                <input
                  type="time"
                  name='endTime'
                  className="w-full p-2 bg-gray-100 rounded-md text-xs sm:text-sm focus:outline-none focus:border-blue-100"
                  placeholder="21:00"
                  required
                />
              </div>
              {/* recurited number */}
              <div className='mb-4'>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 text-xs sm:text-sm py-2'>男性の募集人数</h3>
                    <input
                      type="number"
                      name='maleTotal'
                      className="w-full text-xs p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="男性の募集人数"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 text-xs sm:text-sm py-2'>女性の募集人数</h3>
                    <input
                      type="number"
                      name='femaleTotal'
                      className="w-full text-xs p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
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
                    <h3 className='text-gray-600 text-xs sm:text-sm py-2'>男性の料金</h3>
                    <input
                      type="number"
                      name='maleFee'
                      className="w-full text-xs p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="男性料金"
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-gray-600 text-xs sm:text-sm py-2'>女性の料金</h3>
                    <input
                      type="number"
                      name='femaleFee'
                      className="w-full text-xs p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                      placeholder="女性料金"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="submit" className="w-full py-2 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600 duration-300">
                  保存
                </button>
                <button type="button" className="w-full py-2 bg-gray-300 text-sm text-black rounded-md hover:bg-gray-400 duration-300">
                  <IonRouterLink routerLink='/dashboard' className='text-gray-800'>下書き</IonRouterLink>
                </button>
              </div>
            </form>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default EventSetting;