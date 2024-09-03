// app/user/auth/setProfile.tsx

'use client';

import React, { useState } from 'react';
import { SERVER_URL } from '@/app/config';
import Notification from '@/app/components/utils/notification';

interface SetProfileInterface {
  isOpen: boolean;
  onUserAvatarChange: (newUserBirthday: string) => void;
}

const SetProfile: React.FC<SetProfileInterface> = ({ isOpen, onUserAvatarChange }) => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const [localAvatar, setAvatar] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        setNotification({ message: 'アップロード中です。お待​​ちください。', type: 'success' });
        const response = await fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          setAvatar(data.url);
          setNotification({ message: '画像のアップロードに成功しました!', type: 'success' });
        } else {
          console.log(response.status);
          setNotification({ message: `アップロード中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, type: 'error' });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setNotification({ message: `アップロード中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, type: 'error' });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    onUserAvatarChange(localAvatar);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-start justify-center min-h-screen w-screen bg-white">
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
      <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
        <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 text-center">プロフィール画像を</h2>
        <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 text-center">設定してください</h2>
        <form onSubmit={handleSubmit}>
          <div className="py-2 md:py-4 flex flex-col items-center justify-center h-full">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="py-2 md:py-4 px-6 sm:px-10 flex items-center justify-center border-2 border-solid border-gray-500 rounded-md cursor-pointer"
              >
                <span className="text-xl md:text-3xl text-gray-400 mr-4 flex items-center justify-center w-5 h-5 md:w-8 md:h-8 md:pb-1 border rounded-full border-solid border-gray-400 border-2">+</span>
                <span className='text-sm md:text-md font-bold text-gray-400'>プロフィール画像を選ぶ</span>
              </label>
            </div>
            {localAvatar && (
              <div className='flex-1 justify-center items-center w-40 h-40 pt-6'>
                <img src={`${localAvatar}`} />
              </div>
            )}
          </div>
          <div className='flex justify-center'>
            <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full focus:outline-none`}>➔</button>
          </div>
        </form>
      </div>
      </div>
      {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
    </div>
  );
};

export default SetProfile;
