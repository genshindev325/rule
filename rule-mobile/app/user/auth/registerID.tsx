// app/user/auth/registerID.tsx

'use client';

import React, { useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

const RegisterID: React.FC = () => {
  const [userID, setUserID] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  const router = useIonRouter();
  const searchParams = useSearchParams ();
  const gender = searchParams.get('gender');
  const email = searchParams.get('email');
  const password = searchParams.get('pwd');
  const birthday = searchParams.get('bth');
  const image = searchParams.get('img');
  const name = searchParams.get('name');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission

    const response = await fetch('/api/user/auth/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gender, email, password, birthday, image, name, userID }),
    });

    if (response.status === 200) {
      router.push('/event/findOnMap');
      console.log("Registeration success.");
    } else {
      console.log(response.status);
      console.log("Registeration failed.");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className={`h-32 md:h-48 w-full ${maleGradient}`}>
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
            <h2 className="text-xl md:text-3xl font-bold py-12 md:py-20 px-12 text-center">パスワード再設定</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name='userID'
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="氏名"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  required
                />
              </div>
              <p className="text-sm md:text-md text-center font-semibold text-gray-400">
                半角英数字と(.) (アンダーバー)
              </p>
              <p className="text-sm md:text-md text-center font-semibold text-gray-400">
                で入力してください。
              </p>
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

export default RegisterID;
