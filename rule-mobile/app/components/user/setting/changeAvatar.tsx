// app/user/setting/setAvatar.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';
import { RootState } from '@/app/store/store';

const ChangeAvatar: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const textSm = 'text-sm md:text-md font-semibold';
  const input = 'text-xs sm:text-sm w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-700 text-gray-800 rounded-md focus:outline-none';
  const [localAvatar, setAvatar] = useState('');
  const router = useIonRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const email = useSelector((state: RootState) => state.auth.email);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        toast.info('アップロード中です。お待​​ちください。', {
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
          setAvatar(data.url);
          toast.success('画像のアップロードに成功しました!', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        } else {
          console.log(response.status);
          toast.error(`アップロード中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error(`アップロード中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      }
    }
  };

  const handleAvatarChange = async (avatar: string) => {
    try {
      if (!token || !email) {
        router.push('/auth/login');
      } else {
        toast.info('しばらくお待ちください!', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        const response = await fetch(`${SERVER_URL}/api/users/changeAvatar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email, avatar }),
        });
    
        if (response.status === 200) {
          toast.success('ユーザーアバターが正常に変更されました。', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
          router.push('/profile/setting');
        } else {
          toast.error(`アバターの変更中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        }
      }
    } catch(error) {
      toast.error(`アバターの変更中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    handleAvatarChange(localAvatar);
  };

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
            <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
              {/* header */}
              <div className='flex flex-row text-xl font-semibold text-center text-white pt-6 px-4'>
                <IonRouterLink routerLink={'/profile/setting'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>アバターを変更</h2>
              </div>
              <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-8 sm:mt-10 md:mt-12 pb-12 md:pb-14">
                <h2 className="text-md sm:text-lg md:text-xl font-bold pt-8 sm:pt-10 text-center">アバターを選択してください</h2>
                <form onSubmit={handleSubmit}>
                  <div className="py-2 md:py-4 flex flex-col items-center justify-center h-full">
                    <div className='w-full'>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-input"
                      />
                      <label
                        htmlFor="file-input"
                        className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 flex items-center justify-center border border-gray-500 rounded-md cursor-pointer"
                      >
                        <span className="text-md text-gray-400 mr-4 flex items-center justify-center w-5 h-5 md:w-8 md:h-8 md:pb-1 border rounded-full border-gray-400">+</span>
                        <span className={`${textXs} text-gray-400`}>プロフィール画像を選ぶ</span>
                      </label>
                    </div>
                    {localAvatar && (
                      <div className='flex-1 justify-center items-center w-40 h-40 pt-6'>
                        <img src={`${localAvatar}`} />
                      </div>
                    )}
                  </div>
                  <div className='flex justify-center'>
                    <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`}>変更</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default ChangeAvatar;
