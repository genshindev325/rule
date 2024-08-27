// app/user/auth/registerBirthday.tsx

'use client';

import React, { useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import { IonPage, IonContent, useIonRouter, IonRouterLink } from '@ionic/react';

const RegisterBirthday: React.FC = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  const router = useIonRouter();
  const searchParams = useSearchParams ();
  const sex = searchParams.get('sex');
  const email = searchParams.get('email');
  const pwd = searchParams.get('pwd');
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const bth = `${year}-${month}-${day}`;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission
    router.push(`/auth/setProfile?sex=${sex}&email=${email}&pwd=${pwd}&bth=${bth}&id=${id}&name=${name}`);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
            <h2 className="text-xl md:text-3xl font-bold py-12 md:py-20 px-12 text-center">誕生日を登録してください</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-row gap-4 text-md md:text-xl">
                <input
                  type="text"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="日"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="月"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="年"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>              
              <p className="text-sm md:text-md text-center font-semibold text-gray-400">
                <IonRouterLink routerLink={`/auth/setProfile?sex=${sex}&email=${email}&pwd=${pwd}&bth=''&id=${id}&name=${name}`}>
                  スキップする
                </IonRouterLink>
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

export default RegisterBirthday;
