// app/pages/settings/transferAccountSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink, useIonRouter } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';
import Notification from '@/app/utils/notification';

const TransferAccountSetting = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold text-gray-800';
  const textXs = 'text-xs sm:text-sm';
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useIonRouter();
  
  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add transfer account setting logic here
    const formData = new FormData(e.currentTarget);
    const bankName = formData.get('bankName');
    const branchName = formData.get('branchName');
    const accountNumber = formData.get('accountNumber');
    const accountHolder = formData.get('accountHolder');

    const response = await fetch(`${SERVER_URL}/api/stores/transfer-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bankName, branchName, accountNumber, accountHolder }),
    });

    if (response.status === 200) {
      setNotification({message: '振込口座の設定が完了しました。', type: 'success'});
      setTimeout(() => {
        router.push('/settings');
      }, 1000);
    } else {
      console.log(response.status);
      console.log("Failed.");
    }
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle>振込口座の設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>
          <div className='bg-white w-full p-4'>
            <form onSubmit={handleSubmit}>
              {/* Transfer account setting */}
              <h3 className='text-gray-600 py-2'>銀行名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='bankName'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="銀行名"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>支店名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='branchName'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="支店名"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>口座番号</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='accountNumber'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="口座番号"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>口座名義</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='accountHolder'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="口座名義"
                  required
                />
              </div>
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                  保存
                </button>
                <button type="button" className="w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300">
                  <IonRouterLink routerLink='/settings' className='text-gray-800'>キャンセル</IonRouterLink>
                </button>
              </div>
            </form>
          </div>
          {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default TransferAccountSetting;