// app/user/auth/selectGender.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

const SelectGender: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    console.log(gender);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
            <h2 className="text-xl md:text-3xl font-bold py-12 md:py-20 px-12 text-center">性別を選択してください</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-md md:text-xl font-bold flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`px-4 py-2 rounded-full ${gender === 'male' ? 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white' : 'bg-white border-2 border-solid border-gray-400 text-gray-700'}`}
                >
                  男性
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`px-4 py-2 rounded-full ${gender === 'female' ? 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white' : 'bg-white border-2 border-solid border-gray-400 text-gray-700'}`}
                >
                  女性
                </button>
              </div>
              <IonRouterLink routerLink="/auth/registerEmail">
                <div className='flex justify-center'>
                  <button type="submit"
                    className="mt-10 w-24 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white py-2 rounded-full hover:from-purple-500 hover:to-blue-500 transition-colors"
                  >
                    ➔
                  </button>
                </div>
              </IonRouterLink>
            </form>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectGender;
