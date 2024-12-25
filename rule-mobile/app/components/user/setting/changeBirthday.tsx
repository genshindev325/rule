// app/user/auth/registerName.tsx

'use client';

import React, { useState } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';
import { RootState } from '@/app/store/store';

const ChangeBirthday: React.FC = () => {
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [error, setError] = useState('');
  const bth = `${year}-${month}-${day}`;
  const router = useIonRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const email = useSelector((state: RootState) => state.auth.email);
  const textXs = 'text-xs sm:text-sm';
  const textSm = 'text-sm sm:text-base font-semibold';
  const textMd = 'text-base sm:text-lg font-semibold';
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const input = 'text-xs sm:text-sm md:text-base text-left placeholder:text-center w-full px-3 sm:px-4 md:px-6 py-2 sm:py-4 border border-gray-700 rounded-md focus:outline-none';

  const handleChangeYear = (year: number) => {
    const curDateTime = new Date();
    const y = curDateTime.getFullYear();
    if ((y - year) < 20) {
      setError('ユーザーは20歳以上である必要があります。')
    } else {
      setError('');
      setYear(year);
    }
  }

  const handleChangeBirthday = async (bth: string) => {
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
        const response = await fetch(`${SERVER_URL}/api/users/changeBirthday`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email, birthday: bth }),
        });
    
        if (response.status === 200) {
          toast.success('ユーザーの生年月日が正常に変更されました。', {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
          router.push('/profile/setting');
        } else {
          toast.error(`生年月日の変更中にエラーが発生しました。もう一度お試しください。ステータス: ${response.status}`, {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
        }
      }
    } catch(error) {
      toast.error(`生年月日の変更中にエラーが発生しました。もう一度お試しください。エラー: ${error}`, {
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
    if (error === '') {
      handleChangeBirthday(bth);
    }
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
                <h2 className='grow pr-4'>誕生日を変更する</h2>
              </div>
              <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 md:px-8 mx-5 sm:mx-6 md:mx-8 mt-8 sm:mt-10 md:mt-12 pb-12 md:pb-14">
                <h2 className={`${textMd} py-8 sm:py-10 text-center`}>生年月日を入力してください</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 flex flex-row gap-4 text-base md:text-xl">
                    <input
                      type="number"
                      className={`${input}`}
                      placeholder="日"
                      value={day}
                      min={1}
                      max={31}
                      onChange={(e) => setDay(parseInt(e.target.value))}
                    />
                    <input
                      type="number"
                      className={`${input}`}
                      placeholder="月"
                      value={month}
                      min={1}
                      max={12}
                      onChange={(e) => setMonth(parseInt(e.target.value))}
                    />
                    <input
                      type="number"
                      className={`${input}`}
                      placeholder="年"
                      value={year}
                      min={1920}
                      onChange={(e) => handleChangeYear(parseInt(e.target.value))}
                    />
                  </div>
                  {error &&
                    <p className={`${textXs} text-left pl-2 sm:pl-3 md:pl-4 text-red-500`}>{error}</p>
                  }
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

export default ChangeBirthday;
