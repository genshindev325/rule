// app/user/auth/login.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify';
import { FaRegUser, FaUnlockAlt } from 'react-icons/fa';
import { useAuth } from '@/app/components/auth/authContext';
import { SERVER_URL } from '@/app/config';

const Login: React.FC = () => {
  const femaleGradient = 'bg-gradient-to-r from-[#fb298e] to-[#ff9dc7]';
  const textSm = 'text-sm md:text-base font-semibold';
  const textXs = 'text-xs sm:text-sm md:text-base';
  const input = `${textXs} w-full pl-2 sm:px-4 md:px-6 py-2 sm:py-4 focus:outline-none text-gray-800`;

  const router = useIonRouter();
  const { signin } = useAuth();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
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
        body: JSON.stringify({ email: emailAddress, password }),
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
        <div className="relative flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
          <div className="w-full min-h-screen bg-cover bg-center bg-[url('/image/circle_gradient.png')]" />
          <div className="absolute -top-[4vh] left-[2vw] w-[15vw] h-[50vh] bg-cover bg-center bg-[url('/image/lines_left.png')] z-10" />
          <div className="absolute bottom-0 right-[2vw] w-[15vw] h-[50vh] bg-cover bg-center bg-[url('/image/lines_right.png')] z-10" />
          <div className='absolute flex flex-col items-center justify-center m-auto z-20'>
            <div className="w-[30vw] h-[20vh] bg-contain bg-center bg-no-repeat bg-[url('/image/ruleText2.png')]" />
            <h2 className='text-[50px] text-white mt-10 mb-4'>Rule</h2>
            <h2 className='text-2xl text-white mb-20'>居酒屋マッチングサービス</h2>
            <div className='flex flex-row items-center w-[50vw] bg-white border border-gray-300'>
              <div className='w-[4vw] min-w-8 px-2'>
                <FaRegUser className='mx-auto text-blue-500' />
              </div>
              <input
                type="address"
                name='email'
                className={`${input} grow`}
                placeholder="メールアドレス"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-row items-center w-[50vw] bg-white border border-gray-300'>
              <div className='w-[4vw] min-w-8 px-2'>
                <FaUnlockAlt className='mx-auto text-blue-500' />
              </div>
              <input
                type="password"
                name='password'
                className={`${input} grow`}
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={`w-[50vw] ${textXs} text-right mt-2 mb-8`}>
              <IonRouterLink routerLink={`/auth/passwordResetSend`} className='text-white'>パスワードを忘れた</IonRouterLink>
            </div>            
            <button
              type="submit"
              onClick={handleSubmit}
              className={`w-[50vw] py-2 md:py-4 px-4 ${textSm} ${femaleGradient} hover:from-red-400 hover:to-red-400 text-white focus:outline-none duration-500`}
            >
              ログイン
            </button>
            <div className={`${textXs} text-center py-4`}>                  
              <IonRouterLink routerLink='/auth/signup' className='text-white'>アカウントを新規作成</IonRouterLink>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
