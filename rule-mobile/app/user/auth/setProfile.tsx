// app/user/auth/setProfile.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';

const SetProfile: React.FC = () => {
  const [userName, setUserName] = useState('');

  const [images, setImages] = useState<string[]>([
    '/image/img_1.png',
    '/image/img_1.png',
    // Add more image paths here
  ]);

  const handleAddImage = (newImage: string) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          handleAddImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log(userName);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
            <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 px-12 text-center">プロフィール画像を</h2>
            <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 px-12 text-center">設定してください</h2>
            <form onSubmit={handleSubmit}>
              <div className="py-2 md:py-4 flex items-center justify-center h-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="w-full h-full py-2 md:py-4 flex items-center justify-center border-2 border-solid border-gray-500 rounded-md cursor-pointer"
                >
                  <span className="text-xl md:text-3xl text-gray-400 mr-4 flex items-center justify-center w-5 h-5 md:w-8 md:h-8 md:pb-1 border rounded-full border-solid border-gray-400 border-2">+</span>
                  <span className='text-md md:text-xl font-bold text-gray-400'>プロフィール画像を選ぶ</span>
                </label>
              </div>
              <div className='flex justify-center'>
                <button type="submit"
                  className="mt-10 w-24 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white py-2 rounded-full hover:from-purple-500 hover:to-blue-500 transition-colors"
                >
                  ➔
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SetProfile;
