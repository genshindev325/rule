// app/user/auth/login.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/components/auth/authContext';
import { SERVER_URL } from '@/app/config';

const Login: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textSm = 'text-sm md:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm md:text-md';
  const input = `${textXs} w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-600 rounded-md focus:outline-none`;

  const router = useIonRouter();
  const { signin } = useAuth();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    toast.info('しばらくお待ちください。', {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      bodyClassName: 'text-xs sm:text-sm',
    });

    try {
      const response = await fetch(`${SERVER_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 200) {
        const result = await response.json();
        const {
          email,
          role,
          profile,
          token
        } = result.data;
        if (role === 'user') {
          signin(email, role, profile, token);
          toast.success('サインインに成功しました!', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
          router.push('/home');
        }
      } else {
        console.log(response.status);
        toast.error('ユーザー名とパスワードが一致しません。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
      }
    } catch(error) {
      toast.error(`サインイン中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
          <div className={`h-32 md:h-48 w-full ${maleGradient}`}>
          <div className="bg-white rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-12 sm:mt-14 md:mt-16">
            <h2 className="text-md font-bold py-8 sm:py-10 md:py-12 text-center">ログイン</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="address"
                  name='email'
                  className={input}
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
                  className={input}
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={`${textXs} text-right`}>
                <IonRouterLink routerLink={`/auth/passwordResetSend`} className='text-gray-500 font-semibold'>パスワードをお忘れですか？</IonRouterLink>
              </div>
              <div className={`${textXs} text-right text-gray-400`}>
                {/* <IonRouterLink routerLink='/auth/loginWith'>ソーシャルログイン</IonRouterLink> */}
              </div>
              <button
                type="submit"
                className={`w-full py-2 md:py-4 px-4 my-8 sm:my-10 md:my-12 ${textSm} ${maleGradient} text-white rounded-full focus:outline-none`}
              >
                サインイン
              </button>
              <div className={`${textXs} text-center pb-10`}>                  
                <IonRouterLink routerLink='/auth/signup' className='text-gray-500 font-semibold'>アカウントを作成する</IonRouterLink>
              </div>
            </form>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
