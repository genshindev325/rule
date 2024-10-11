// app/pages/settings/transferAccountSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink, useIonRouter } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

const TransferAccountSetting = () => {
  const textSm = 'text-sm sm:text-md text-gray-800';
  const textXs = 'text-xs sm:text-sm';
  const router = useIonRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      router.push('/auth/login');
    } else {
      e.preventDefault();
      // Add transfer account setting logic here
      const formData = new FormData(e.currentTarget);
      const bankName = formData.get('bankName');
      const branchName = formData.get('branchName');
      const accountNumber = formData.get('accountNumber');
      const accountHolder = formData.get('accountHolder');

      const response = await fetch(`${SERVER_URL}/api/stores/transfer-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bankName, branchName, accountNumber, accountHolder }),
      });

      if (response.status === 200) {
        toast.success('振込口座の設定が完了しました。', {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          bodyClassName: 'text-xs sm:text-sm',
        });
        setTimeout(() => {
          router.push('/settings');
        }, 1000);
      } else {
        console.log(response.status);
        console.log("Failed.");
      }
    }
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-semibold mr-12'>振込口座の設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className='bg-white w-full ion-padding'>
            <form onSubmit={handleSubmit}>
              {/* Transfer account setting */}
              <h3 className={`${textSm} font-semibold py-2`}>銀行名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='bankName'
                  className={`text-lg w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="銀行名"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-2`}>支店名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='branchName'
                  className={`text-lg w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="支店名"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-2`}>口座番号</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='accountNumber'
                  className={`text-lg w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="口座番号"
                  required
                />
              </div>
              <h3 className={`${textSm} font-semibold py-2`}>口座名義</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='accountHolder'
                  className={`text-lg w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100`}
                  placeholder="口座名義"
                  required
                />
              </div>
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="submit" className={`${textSm} w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300`}>
                  保存
                </button>
                <button type="button" className={`${textSm} w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300`}>
                  <IonRouterLink routerLink='/settings' className='text-gray-800'>キャンセル</IonRouterLink>
                </button>
              </div>
            </form>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default TransferAccountSetting;