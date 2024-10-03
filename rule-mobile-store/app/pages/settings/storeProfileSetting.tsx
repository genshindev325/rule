// app/pages/settings/storeProfileSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, useIonRouter, IonRouterLink } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import GoogleMapComponent from '@/app/utils/googleMap';
import { SERVER_URL } from '@/app/config';
import ImageCarousel from '@/app/components/imageCarousel';
import { toast } from 'react-toastify';

const StoreProfileSetting = () => {
  const textSm = 'text-sm sm:text-md text-gray-800';
  const textXs = 'text-xs sm:text-sm';
  const router = useIonRouter();
  const [storeID, setStoreID] = useState('');
  const [storeImages, setStoreImages] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const { profile } = useSelector((state: RootState) => state.auth);
  const [storeLocation, setStoreLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [access, setAccess] = useState<string[]>(['']);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleAddImage = (newImage: string) => {
    setStoreImages((prevImages) => [...prevImages, newImage]);
  };

  useEffect(() => {}, [storeImages]);

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

  // Handle dynamically adding new access input fields
  const handleAddAccess = () => {
    setAccess([...access, '']); // Add an empty string for a new input field
  };

  // Handle updating the value of each access field
  const handleAccessChange = (index: number, value: string) => {
    const updatedAccess = [...access];
    updatedAccess[index] = value; // Update the specific access input at index
    setAccess(updatedAccess);
  };

  // Handle removing an access input field
  const handleRemoveAccess = (index: number) => {
    const updatedAccess = access.filter((_, i) => i !== index); // Remove the specific input at index
    setAccess(updatedAccess);
  };

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      router.push('/auth/login');
    } else {
      e.preventDefault();
      // Add StoreProfileSettings logic here
      const formData = new FormData(e.currentTarget);
      const storeName = formData.get('storeName');
      const storeGenre = formData.get('storeGenre');
      const foodGenre = formData.get('foodGenre');
      const cookingGenre = formData.get('cookingGenre');
      const description = formData.get('description');

      const response = await fetch(`${SERVER_URL}/api/stores/${storeID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          storeName,
          storeGenre,
          foodGenre,
          cookingGenre,
          address,
          access,
          storeImages,
          description,
          storeLat: storeLocation?.lat,
          storeLng: storeLocation?.lng,
        }),
      });

      if (response.status === 200) {
        toast.success('プロファイルの設定に成功しました。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        setTimeout(() => {
          router.push('/settings');
        }, 1500);
      } else {
        toast.error(`プロファイルの設定に失敗しました。エラー:${response.status}`, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
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
              <IonTitle className='text-center font-bold text-xl mr-12'>店舗プロフィール設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>
          <div className='bg-white w-full p-4'>
            <form onSubmit={handleSubmit}>
              <h3 className={`${textSm} font-semibold py-1`}>店舗名</h3>
              <div className="mb-2">
                <input
                  type="name"
                  name='storeName'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="店舗名"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-1`}>店舗ジャンル</h3>
              <div className="mb-2">
                <input
                  type="name"
                  name='storeGenre'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="店舗ジャンル"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-1`}>食材ジャンル</h3>
              <div className="mb-2">
                <input
                  type="name"
                  name='foodGenre'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="食材ジャンル"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-1`}>料理ジャンル</h3>
              <div className="mb-2">
                <input
                  type="name"
                  name='cookingGenre'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="料理ジャンル"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-1`}>住所</h3>
              <div className="mb-2">
                <input
                  type="address"
                  name='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="大阪府大阪市中央区東心斎橋1-17-2 アニーズビル 1F"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-1`}>アクセス</h3>
              {access.map((value, index) => (
                <div className="relative mb-1" key={index}>
                  <input
                    type="text"
                    name={`access${index}`}
                    value={value}
                    onChange={(e) => handleAccessChange(index, e.target.value)}
                    className={`${textXs} w-full p-2 mb-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                    placeholder={`大阪メトロ 御堂筋線 心斎橋駅から徒歩10分`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAccess(index)}
                      className="absolute right-2 top-5 hover:font-bold duration-300 transform -translate-y-1/2 text-gray-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <div className='mb-2'>
                <button
                  type='button'
                  onClick={handleAddAccess}
                  className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-400 duration-700 text-xl text-gray-700 flex flex-col justify-center items-center'
                >
                  +
                </button>
                {/* google map */}
                <div className="my-2">
                  <GoogleMapComponent onLocationSelect={handleLocationSelect} />
                </div>
              </div>
              <div className='mb-4'>
                <ImageCarousel onAddImage={handleAddImage} />
              </div>
              <div className="mb-2">
                <h3 className={`${textSm} font-semibold py-2`}>説明文</h3>
                <textarea
                  name='description'
                  className={`${textXs} w-full p-2 mt-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="説明文"
                  rows={3}
                />
              </div>
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="submit" className={`${textSm} w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300`}>
                  保存
                </button>
                <button type="button" className={`${textSm} w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300`}>
                  <IonRouterLink routerLink='/settings' className='text-gray-800'>キャンセル</IonRouterLink>
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