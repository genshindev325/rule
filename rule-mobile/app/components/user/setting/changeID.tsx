// app/components/user/setting/changeID.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';
import { RootState } from '@/app/store/store';

const ChangeID: React.FC = () => {
  const [userID, setUserID] = useState('');
  const router = useIonRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const email = useSelector((state: RootState) => state.auth.email);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const textSm = 'text-sm md:text-base font-semibold';
  const textMd = 'text-base sm:text-lg font-semibold';
  const input = 'text-xs sm:text-sm md:text-base text-left placeholder:text-center w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';

  const handleChangeID = async (userID: string) => {
    try {
      if (!token || !email) {
        router.push('/auth/login');
      } else {
        toast.info('しばらくお待ちください。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        const response = await fetch(`${SERVER_URL}/api/users/changeID`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email, userID: userID }),
        });
    
        if (response.status === 200) {
          toast.success('ユーザーのIDが正常に変更されました。', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
          router.push('/profile/setting');
        } else {
          toast.error(`IDの変更中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        }
      }
    } catch(error) {
      toast.error(`IDの変更中にエラーが発生しました。もう一度お試しください。もう一度お試しください。エラー: ${error}`, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: 'text-xs sm:text-sm',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleChangeID(userID);
  };

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex items-start justify-center min-h-screen w-screen bg-white text-gray-800">
            <div className="h-40 sm:h-44 w-full bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]">
              {/* header */}
              <div className='flex flex-row text-lg font-semibold text-center text-white py-6 sm:py-8 px-4 sm:px-6 md:px-8'>
                <IonRouterLink routerLink={'/profile/setting'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>ユーザーIDを変更する</h2>
              </div>
              <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-8 sm:mt-10 md:mt-12 pb-12 md:pb-14">
                <h2 className={`${textMd} py-8 sm:py-10 text-center`}>ユーザーIDを入力してください</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      name='userID'
                      className={`${input}`}
                      placeholder="ID"
                      value={userID}
                      onChange={(e) => setUserID(e.target.value)}
                      required
                    />
                  </div>
                  <div className='flex justify-center space-x-4'>
                    <button type="submit" className={`mt-10 w-24 ${maleGradient} ${textSm} text-white py-2 rounded-full focus:outline-none`}>変更</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default ChangeID;
