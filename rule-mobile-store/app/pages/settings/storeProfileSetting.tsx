// app/pages/settings/storeProfileSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, useIonRouter, IonRouterLink } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Notification from '@/app/utils/notification';
import GoogleMapComponent from '@/app/utils/googleMap';
import { SERVER_URL } from '@/app/config';

const StoreProfileSetting = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold text-gray-800';
  const textXs = 'text-xs sm:text-sm';
  const router = useIonRouter();
  const [storeID, setStoreID] = useState('');  
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [storeImages, setStoreImages] = useState<string>();
  const [address, setAddress] = useState('');
  const { profile } = useSelector((state: RootState) => state.auth);
  const [storeLocation, setStoreLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        const response = await fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          setStoreImages(data.url);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  useEffect(() => {}, [storeImages]);

  const handleDeleteImage = () => {
    setStoreImages('');
  };

  // Callback to receive the new marker location
  const handleLocationSelect = (position: { lat: number; lng: number }, mainAddress: string | null) => {
    setStoreLocation(position); // Update the location in the state
    if (mainAddress) {
      setAddress(mainAddress);
    }
  };

  useEffect(() => {
    if (profile) {
      setStoreID(profile._id);
    }
  }, [profile])

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add StoreProfileSettings logic here
    const formData = new FormData(e.currentTarget);
    const storeName = formData.get('storeName');
    const storeGenre = formData.get('storeGenre');
    const foodGenre = formData.get('foodGenre');
    const cookingGenre = formData.get('cookingGenre');
    const access1 = formData.get('access1');
    const access2 = formData.get('access2');
    const description = formData.get('description');
    console.log("storeLocation: " + storeLocation);

    const response = await fetch(`${SERVER_URL}/api/stores/${storeID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storeName,
        storeGenre,
        foodGenre,
        cookingGenre,
        address,
        access1,
        access2,
        storeImages,
        description,
        storeLat: storeLocation?.lat,
        storeLng: storeLocation?.lng,
      }),
    });

    if (response.status === 200) {
      router.push('/settings');
      console.log('store profile setting success')
      setTimeout(() => {
        setNotification({message: 'ストア プロファイルの設定に成功しました', type: 'success'});
      }, 1500);
    } else {
      setNotification({message: `プロファイルの設定に失敗しました。エラー:${response.status}`, type: 'error'});
    }
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle>店舗プロフィール設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>
          <div className='bg-white w-full p-4'>
            <form onSubmit={handleSubmit}>
              <h3 className='text-gray-600 py-2'>店舗名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='storeName'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="店舗名"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>店舗ジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='storeGenre'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="店舗ジャンル"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>食材ジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='foodGenre'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="食材ジャンル"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>料理ジャンル</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='cookingGenre'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="料理ジャンル"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>住所</h3>
              <div className="mb-4">
                <input
                  type="address"
                  name='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪府大阪市中央区東心斎橋1-17-2 アニーズビル 1F"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>アクセス</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='access1'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪メトロ 御堂筋線 心斎橋駅から徒歩10分"
                />
                <input
                  type="name"
                  name='access2'
                  className="w-full p-2 mt-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="大阪メトロ 長堀鶴見緑地線 長堀橋駅から徒歩5分"
                />
              </div>
              <div className='mb-4'>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 font-light text-4xl flex flex-col justify-center items-center'>+</label>
                {/* store images */}
                {storeImages && (
                  <div className='flex-1 justify-center items-center w-40 pt-6'>
                    <img src={`${storeImages}`} onClick={handleDeleteImage} />
                  </div>
                )}
                {/* google map */}
                <div className="my-4">
                  <GoogleMapComponent onLocationSelect={handleLocationSelect} />
                </div>
              </div>
              <div className="mb-4">
                <h3 className='text-gray-600 py-2'>説明文</h3>
                <textarea
                  name='description'
                  className="w-full p-2 mt-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="説明文"
                  rows={3}
                />
              </div>
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                  保存
                </button>
                <button type="button" className="w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300">
                  <IonRouterLink routerLink='/settings' className='text-white'>キャンセル</IonRouterLink>
                </button>
              </div>
            </form>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default StoreProfileSetting;