// app/store/setting/storeProfileSetting/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Notification from '@/utils/notification';
import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import GoogleMapComponent from '@/utils/googleMap';
import ImageCarousel from '@/components/utils/imageCarousel';

const StoreProfileSettings = () => {
  const router = useRouter();
  const [storeID, setStoreID] = useState('');  
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [storeImages, setStoreImages] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const { profile } = useSelector((state: RootState) => state.auth);
  const [storeLocation, setStoreLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [access, setAccess] = useState<string[]>(['']);

  const handleAddImage = (newImage: string) => {
    setStoreImages((prevImages) => [...prevImages, newImage]);
  };

  const handleDeleteImage = () => {
    setStoreImages([]);
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
    e.preventDefault();
    // Add StoreProfileSettings logic here
    const formData = new FormData(e.currentTarget);
    const storeName = formData.get('storeName');
    const storeGenre = formData.get('storeGenre');
    const foodGenre = formData.get('foodGenre');
    const cookingGenre = formData.get('cookingGenre');
    const description = formData.get('description');

    console.log("access: " + JSON.stringify(access));
    console.log("storeImages: " + JSON.stringify(storeImages));

    // const response = await fetch(`/api/stores/${storeID}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     storeName,
    //     storeGenre,
    //     foodGenre,
    //     cookingGenre,
    //     address,
    //     access,
    //     storeImages,
    //     description,
    //     storeLat: storeLocation?.lat,
    //     storeLng: storeLocation?.lng,
    //   }),
    // });

    // if (response.status === 200) {
    //   setNotification({message: 'ストア プロファイルの設定に成功しました', type: 'success'});
    //   setTimeout(() => {
    //     router.push('/store/setting');
    //   }, 1500);
    // } else {
    //   setNotification({message: `プロファイルの設定に失敗しました。エラー:${response.status}`, type: 'error'});
    // }
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className='flex-1 mx-auto max-w-xl'>
          <div className="min-h-screen flex items-start py-12 justify-center bg-gray-100">
            <div className="bg-white py-8 px-6 rounded-lg shadow-md w-full max-w-4xl">
              <h2 className="text-lg font-bold mb-6">店舗プロフィール設定</h2>
              <form onSubmit={handleSubmit}>
                <h3 className='py-2 text-md'>店舗名</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='storeName'
                    className="w-full p-2  bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="店舗名"
                    required
                  />
                </div>
                <h3 className='py-2 text-md'>店舗ジャンル</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='storeGenre'
                    className="w-full p-2  bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="店舗ジャンル"
                    required
                  />
                </div>
                <h3 className='py-2 text-md'>食材ジャンル</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='foodGenre'
                    className="w-full p-2  bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="食材ジャンル"
                    required
                  />
                </div>
                <h3 className='py-2 text-md'>料理ジャンル</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='cookingGenre'
                    className="w-full p-2  bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="料理ジャンル"
                    required
                  />
                </div>
                <h3 className='py-2 text-md'>住所</h3>
                <div className="mb-4">
                  <input
                    type="address"
                    name='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2  bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="大阪府大阪市中央区東心斎橋1-17-2 アニーズビル 1F"
                    required
                  />
                </div>
                <h3 className='py-2 text-md'>アクセス</h3>
                {access.map((value, index) => (
                  <div className="relative mb-1" key={index}>
                    <input
                      type="text"
                      name={`access${index}`}
                      value={value}
                      onChange={(e) => handleAccessChange(index, e.target.value)}
                      className="w-full p-2 mb-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
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
                <div className='mb-4'>
                  <button
                    type='button'
                    onClick={handleAddAccess}
                    className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-400 duration-700 text-2xl text-gray-700 flex flex-col justify-center items-center'
                  >
                    +
                  </button>
                  {/* google map */}
                  <div className="my-4">
                    {/* {loading ? <p>Googleマップを読み込んでいます...</p> : <GoogleMapComponent onLocationSelect={handleLocationSelect} />} */}
                    <GoogleMapComponent onLocationSelect={handleLocationSelect} />
                  </div>
                </div>
                <div className='mb-4'>
                  <ImageCarousel onAddImage={handleAddImage} />
                </div>
                <div className="mb-4">
                  <h3 className='py-2 text-md'>説明文</h3>
                  <textarea
                    name='description'
                    className="w-full p-2  bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="説明文"
                    rows={5}
                  />
                </div>
                {/* buttons */}
                <div className='flex flex-row justify-end gap-4 pt-12'>
                  <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                    保存
                  </button>
                  <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300">
                    <a href='/store/setting'>キャンセル</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
    </AuthWrapper>
  );
};

export default StoreProfileSettings;
