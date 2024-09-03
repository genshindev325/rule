// app/user/auth/login.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import Notification from '@/app/components/utils/notification';
import { useAuth } from '@/app/components/auth/authContext';
import { SERVER_URL } from '@/app/config';

const Login: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textMd = 'text-md md:text-lg font-semibold';

  const router = useIonRouter();
  const { signin } = useAuth();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {}, [notification]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

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

        // Auto-close notification after 4 seconds
        setTimeout(handleCloseNotification, 4000);
      }
    } catch(error) {
      setNotification({ message: `サインイン中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, type: 'error' });

      // Auto-close notification after 4 seconds
      setTimeout(handleCloseNotification, 4000);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex items-start justify-center min-h-screen w-screen bg-white">
          <div className={`h-32 md:h-48 w-full ${maleGradient}`}>
          <div className="bg-white rounded-3xl shadow-xl px-6 md:px-12 mx-8 md:mx-20 mt-12 md:mt-20">
            <h2 className="text-xl font-bold py-12 md:py-20 px-12 text-center">ログイン</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="address"
                  name='email'
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg focus:outline-none"
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
                  className="w-full px-3 py-2 md:px-8 md:py-4 border border-gray-700 rounded-lg focus:outline-none"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={`${textMd} text-right text-gray-400`}>
                <IonRouterLink routerLink={`/auth/passwordResetSend`}>パスワードをお忘れですか？</IonRouterLink>
              </div>
              <div className={`${textMd} text-right text-gray-400`}>
                <IonRouterLink routerLink='/auth/loginWith'>ソーシャルログイン</IonRouterLink>
              </div>
              <button
                type="submit"
                className={`w-full py-2 md:py-4 px-4 mb-16 md:mb-24 mt-16 md:mt-32 ${maleGradient} text-white rounded-full font-bold focus:outline-none`}
              >
                サインイン
              </button>
              <div className={`${textMd} text-center text-gray-400 pb-10`}>                  
                <IonRouterLink routerLink='/auth/signup'>アカウントを作成する</IonRouterLink>
              </div>
            </form>
          </div>
          </div>
        </div>
        {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
      </IonContent>
    </IonPage>
  );
};

export default Login;
