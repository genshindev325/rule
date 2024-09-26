// app/user/auth/login.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter, IonRouterLink } from '@ionic/react';
import { useAuth } from '@/app/components/auth/authContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { SERVER_URL } from '@/app/config';

const Logout: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector((state: RootState) => state.auth.profile);
  const router = useIonRouter();
  const { signout } = useAuth();
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textSm = 'text-sm md:text-md';
  
  if (!userInfo) {
    console.log("Missing user information or event data.");
    return;
  } else {
    setEmail(userInfo.email);
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 200) {
        signout();
        router.push('/auth/signin');
      } else {
        console.log(response.status);
      }
    } catch(error) {
      console.log("error: " + error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center justify-start min-h-screen w-screen bg-white p-6 space-y-4">
          <div className={`${textXl} pb-4`}>サインイン</div>
          <button
            type="button"
            onClick={handleLogout}
            className={`${textSm} w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300`}
          >
            サインイン
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Logout;
