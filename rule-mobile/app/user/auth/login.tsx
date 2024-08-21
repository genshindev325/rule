// app/user/auth/login.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('userName: ' + email);
    console.log('userEmail: ' + password);

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result.message);
      const userName = result.userName;
      const userEmail = result.userEmail;
      const userRole = result.userRole;
      const token = result.token;
      if (userRole === 'user') {
        console.log('userName: ' + userName);
        console.log('userEmail: ' + userEmail);
      }
    } else {
      console.log(response.status);
      console.log("Your username and pasword mismatched.");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20">
            <h2 className="text-3xl font-bold py-12 md:py-20 px-12 text-center">ログイン</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="address"
                  name='email'
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
                  placeholder="メールアドレス"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name='password'
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <IonRouterLink routerLink='/auth/passwordReset'>
                <p className="text-md md:text-lg text-right font-semibold text-gray-400">
                  パスワードをお忘れですか？
                </p>
              </IonRouterLink>
              <IonRouterLink routerLink='/auth/loginWith'>
                <p className="text-md md:text-lg text-right font-semibold text-gray-400">
                  ソーシャルログイン
                </p>
              </IonRouterLink>
              <button
                type="submit"
                className="w-full py-2 md:py-4 px-4 mb-16 md:mb-24 mt-16 md:mt-32 bg-gradient-to-r from-[#7c5ded] to-[#83d5f7] text-white rounded-full font-bold"
              >
                サインイン
              </button>
              <IonRouterLink routerLink='/auth/selectGender'>
                <p className="text-md md:text-lg text-center font-semibold text-gray-400 pb-10">
                  ソーシャルログイン
                </p>
              </IonRouterLink>
            </form>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
