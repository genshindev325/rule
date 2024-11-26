// app/store/setting/storeProfileSetting/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-toastify';
import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import GoogleMapComponent from '@/utils/googleMap';
import ImageCarousel from '@/components/utils/imageCarousel';

interface IProfile {
  _id: string;
  email: string;
  storeID: string;
  storeName: string;
  storeGenre: string;
  foodGenre: string;
  cookingGenre: string;
  address: string;
  access: string[];
  storeImages: string[];
  description: string;
  storeLat: number;
  storeLng: number;
  status: string;
}

const StoreProfileSettings = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile | null>(useSelector((state: RootState) => state.auth.profile));
  const token = useSelector((state: RootState) => state.auth.token);
  const storeID = profile?._id || '';

  useEffect(() => {
    const fetchStoreProfile = async () => {
      const response = await fetch(`/api/stores/${storeID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        setProfile(result.data);
      } else {
        toast.error(`データの取得に失敗しました。エラー:${response.status}`, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      }
    };
    if (storeID && token) {
      fetchStoreProfile();
    }
  }, [storeID, token]);
  
  if (profile === null) {
    return;
  }

  const handleAddImage = (newImage: string) => {
    setProfile({...profile, storeImages: [...profile.storeImages, newImage]});
  };

  const handleDeleteImage = (image: string) => {
    setProfile({
      ...profile,
      storeImages: profile.storeImages.filter(src => src !== image)
    });
  };

  // Callback to receive the new marker location
  const handleLocationSelect = (position: { lat: number; lng: number }, mainAddress: string | null) => {
    setProfile({...profile, storeLat: position.lat, storeLng: position.lng});
    if (mainAddress) {
      setProfile({...profile, address: mainAddress});
    }
  };

  // Handle dynamically adding new access input fields
  const handleAddAccess = () => {
    setProfile({...profile, access: [...profile.access, '']});
  };

  // Handle updating the value of each access field
  const handleAccessChange = (index: number, value: string) => {
    const updatedAccess = [...profile.access];
    updatedAccess[index] = value; // Update the specific access input at index
    setProfile({...profile, access: updatedAccess});
  };

  // Handle removing an access input field
  const handleRemoveAccess = (index: number) => {
    const updatedAccess = profile.access.filter((_, i) => i !== index);
    setProfile({...profile, access: updatedAccess});
  };

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      router.push('/auth/signin');
      } else {
      e.preventDefault();
      toast.info('少々お待ちください。', {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
      const response = await fetch(`/api/stores/${storeID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          storeName: profile.storeName,
          storeGenre: profile.storeGenre,
          foodGenre: profile.foodGenre,
          cookingGenre: profile.cookingGenre,
          address: profile.address,
          access: profile.access,
          storeImages: profile.storeImages,
          description: profile.description,
          storeLat: profile.storeLat,
          storeLng: profile.storeLng,
        }),
      });

      await fetch(`/api/admin/store-payment/initiate/${storeID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          storeName: profile.storeName,
        })
      })

      if (response.status === 200) {
        toast.success('プロファイルの設定に成功しました。', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => {
          router.push('/store/setting');
        }, 1500);
      } else {
        toast.error(`プロファイルの設定に失敗しました。エラー:${response.status}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    }
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
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="店舗名"
                    value={profile.storeName}
                    onChange={e => setProfile({...profile, storeName: e.target.value})}
                    required
                  />
                </div>
                <h3 className='py-2 text-md'>店舗ジャンル</h3>
                <div className="mb-4">
                  <select
                    id="storeGenre"
                    name='storeGenre'
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none duration-1000"
                    value={profile.storeGenre}
                    onChange={(e) => setProfile({...profile, storeGenre: e.target.value})}
                    required
                  >
                    <option value="">選択してください</option>
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
                </div>
                <h3 className='py-2 text-md'>食材ジャンル</h3>
                <div className="mb-4">
                  <select
                    id="foodGenre"
                    name='foodGenre'
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none duration-1000"
                    value={profile.foodGenre}
                    onChange={(e) => setProfile({...profile, foodGenre: e.target.value})}
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="肉系">肉系</option>
                    <option value="魚介系">魚介系</option>
                    <option value="野菜系">野菜系</option>
                    <option value="その他">その他 ...</option>
                  </select>
                </div>
                <h3 className='py-2 text-md'>料理ジャンル</h3>
                <div className="mb-4">
                  <select
                    id="cookingGenre"
                    name='cookingGenre'
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none duration-1000"
                    value={profile.cookingGenre}
                    onChange={e => setProfile({...profile, cookingGenre: e.target.value})}
                    required
                  >
                    <option value="">選択してください</option>
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
                <h3 className='py-2 text-md'>住所</h3>
                <div className="mb-4">
                  <input
                    type="address"
                    name='address'
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="大阪府大阪市中央区東心斎橋1-17-2 アニーズビル 1F"
                    required
                  />
                </div>
                <h3 className='py-2 text-md'>アクセス</h3>
                {profile.access.map((value, index) => (
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
                    <GoogleMapComponent initLat={profile.storeLat} initLng={profile.storeLng} onLocationSelect={handleLocationSelect} />
                  </div>
                </div>
                <div className='mb-4'>
                  <ImageCarousel initImages={profile.storeImages} onAddImage={handleAddImage} onDeleteImage={handleDeleteImage} />
                </div>
                <div className="mb-4">
                  <h3 className='py-2 text-md'>説明文</h3>
                  <textarea
                    name='description'
                    className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="説明文"
                    value={profile.description}
                    onChange={e => setProfile({...profile, description: e.target.value})}
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
    </AuthWrapper>
  );
};

export default StoreProfileSettings;
