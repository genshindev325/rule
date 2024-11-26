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

interface IProfile {
  _id: string;
  email: string;
  password: string;
  storeID: string;
  storeName: string;
  storeGenre: string;
  foodGenre: string;
  cookingGenre: string;
  address: string;
  access: string[];
  storeImages: string[];
  description: string;
  monthlyRate: number;
  rating: number;
  ratingCount: number;
  storeLat: number;
  storeLng: number;
  status: string;
  createdAt: Date;
  creditCard: string;
  bankName: string;
  branchName: string;
  accountNumber: number;
  accountHolder: string;
}

const StoreProfileSetting = () => {
  const textSm = 'text-sm sm:text-md text-gray-800';
  const textXs = 'text-xs sm:text-sm';
  const router = useIonRouter();
  const [profile, setProfile] = useState<IProfile | null>(useSelector((state: RootState) => state.auth.profile));
  const token = useSelector((state: RootState) => state.auth.token);
  if (profile === null) {
    return;
  }
  const storeID = profile._id || '';

  useEffect(() => {
    const fetchStoreProfile = async () => {
      const response = await fetch(`${SERVER_URL}/api/stores/${storeID}`, {
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
  
  const handleAddImage = (newImage: string) => {
    // setStoreImages((prevImages) => [...prevImages, newImage]);
    setProfile({...profile, storeImages: [...profile.storeImages, newImage]});
  };

  const handleDeleteImage = (image: string) => {
    // setStoreImages((prevImages) => prevImages.filter(src => src !== image));
    setProfile({
      ...profile,
      storeImages: profile.storeImages.filter(src => src !== image)
    })
  };

  // Callback to receive the new marker location
  const handleLocationSelect = (position: { lat: number; lng: number }, mainAddress: string | null) => {
    // setStoreLocation(position);
    setProfile({...profile, storeLat: position.lat, storeLng: position.lng});
    if (mainAddress) {
      setProfile({...profile, address: mainAddress});
    }
  };

  // Handle dynamically adding new access input fields
  const handleAddAccess = () => {
    // setAccess([...access, '']);
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
    // setAccess(updatedAccess);
    setProfile({...profile, access: updatedAccess});
  };

  const handleCancel = () => {
    router.push('/settings');
  };

  const handleSubmit = async () => {
    if (!token) {
      router.push('/auth/login');
    } else {

      toast.info('少々お待ちください。', {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
      const response = await fetch(`${SERVER_URL}/api/stores/${storeID}`, {
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
  };

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
            <IonTitle className='text-center text-gray-800 font-semibold mr-12'>店舗プロフィール設定</IonTitle> {/* Default title */}
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className='bg-white w-full ion-padding text-gray-800'>
            <form onSubmit={handleSubmit}>
              <h3 className={`${textSm} font-semibold py-1`}>店舗名</h3>
              <div className="mb-2">
                <input
                  type="name"
                  name='storeName'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="店舗名"
                  value={profile.storeName}
                  onChange={e => setProfile({...profile, storeName: e.target.value})}
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-1`}>店舗ジャンル</h3>
              <div className="mb-2">
                <select
                  id="storeGenre"
                  name='storeGenre'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  value={profile.storeGenre}
                  onChange={e => setProfile({...profile, storeGenre: e.target.value})}
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
              <h3 className={`${textSm} font-semibold py-1`}>食材ジャンル</h3>
              <div className="mb-2">
                <select
                  id="foodGenre"
                  name='foodGenre'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
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
              <h3 className={`${textSm} font-semibold py-1`}>料理ジャンル</h3>
              <div className="mb-2">
                <select
                  id="cookingGenre"
                  name='cookingGenre'
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
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
              <h3 className={`${textSm} font-semibold py-1`}>住所</h3>
              <div className="mb-2">
                <input
                  type="address"
                  name='address'
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className={`${textXs} w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="大阪府大阪市中央区東心斎橋1-17-2 アニーズビル 1F"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-1`}>アクセス</h3>
              {profile.access.map((value, index) => (
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
                <ImageCarousel initImages={profile.storeImages} onAddImage={handleAddImage} onDeleteImage={handleDeleteImage} />
              </div>
              <div className="mb-2">
                <h3 className={`${textSm} font-semibold py-2`}>説明文</h3>
                <textarea
                  name='description'
                  className={`${textXs} w-full p-2 mt-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="説明文"
                  value={profile.description}
                  onChange={e => setProfile({...profile, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="button" onClick={handleSubmit} className={`${textSm} w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300`}>
                  保存
                </button>
                <button type="button" onClick={handleCancel} className={`${textSm} w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300`}>
                  キャンセル
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