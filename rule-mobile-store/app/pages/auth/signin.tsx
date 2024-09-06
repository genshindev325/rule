// app/user/auth/login.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import Notification from '@/app/utils/notification';
import { useAuth } from '@/app/components/auth/authContext';
import { SERVER_URL } from '@/app/config';

const SignIn: React.FC = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textSm = 'text-sm md:text-md font-semibold';

  const router = useIonRouter();
  const { signin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {}, [notification]);

  const handleSubmit = async () => {
    try {
      setNotification({ message: 'しばらくお待ちください。', type: 'success' });
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
          setNotification({ message: 'サインインに成功しました!', type: 'success' });
          setTimeout(() => {
            router.push('/home');
          }, 1500);
        }
      } else {
        console.log(response.status);
        setNotification({ message: 'ユーザー名とパスワードが一致しません。', type: 'error' });
      }
    } catch(error) {
      setNotification({ message: `サインイン中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, type: 'error' });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center justify-start min-h-screen w-screen bg-white p-6 space-y-4">
          <div className={`${textXl} pb-4`}>サインイン</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="メールアドレス"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="パスワード"
              required
            />
            <a href="#" className={`${textSm} mr-auto pb-4`}> パスワードをお忘れですか？ </a>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            >
              サインイン
            </button>
            <div className='my-6 text-center'>
              <a href='/auth/signup' className='text-sm text-blue-300 hover:text-blue-500 hover:cursor-pointer font-bold'>
                アカウントを作成する
              </a>
            </div>
        </div>
        {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
