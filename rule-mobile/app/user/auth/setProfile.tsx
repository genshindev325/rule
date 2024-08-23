// app/user/auth/setProfile.tsx

'use client';

import React, { useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

const SetProfile: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  const [img, setImage] = useState<string>();

  const router = useIonRouter();
  const searchParams = useSearchParams ();
  const sex = searchParams.get('sex');
  const mail = searchParams.get('mail');
  const pwd = searchParams.get('pwd');
  const bth = searchParams.get('bth');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
        }
      };
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    router.push(`/auth/registerName?sex=${sex}&mail=${mail}&pwd=${pwd}&bth=${bth}&img=${img}`);
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
                    <span className='text-md md:text-xl font-bold text-gray-400'>プロフィール画像を選ぶ</span>
                  </label>
                </div>
                {img && (
                  <div className='flex-1 justify-center items-center w-40 h-40 pt-6'>
                    <img src={`${img}`} />
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                <button type="submit" className={`mt-10 w-24 ${maleGradient} text-white py-2 rounded-full`}>➔</button>
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
