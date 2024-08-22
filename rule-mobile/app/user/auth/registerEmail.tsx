// app/user/auth/registerEmail.tsx

'use client';

import React, { useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

const RegisterEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  const router = useIonRouter();
  const searchParams = useSearchParams ();
  const gender = searchParams.get('gender');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
    router.push(`/auth/registerPassword?gender=${gender}&email=${email}`)
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20 pb-12 md:pb-20">
            <h2 className="text-xl md:text-3xl font-bold pt-12 md:pt-20 px-12 text-center">メールアドレスを</h2>
            <h2 className="text-xl md:text-3xl font-bold pb-12 md:pb-20 px-12 text-center">登録してください</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-md md:text-xl font-bold">
                <input
                  type="text"
                  name='email'
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 text-md md:text-xl font-bold">
                <input
                  type="text"
                  name='emailConfirm'
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg text-center"
                  placeholder="メールアドレス(確認用)"
                  value={emailConfirm}
                  onChange={(e) => setEmailConfirm(e.target.value)}
                  required
                />
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

export default RegisterEmail;
