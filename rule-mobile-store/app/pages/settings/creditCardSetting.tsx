// app/pages/settings/creditCardSetting.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink, useIonRouter } from '@ionic/react';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import { SERVER_URL } from '@/app/config';
import Notification from '@/app/utils/notification';

const CreditCardSetting = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold text-gray-800';
  const textXs = 'text-xs sm:text-sm';
  const router = useIonRouter();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add CreditCardSettins logic here
    const formData = new FormData(e.currentTarget);
    const cardNumber = formData.get('cardNumber');
    const cardHolderNumber = formData.get('cardHolderNumber');
    const dateOfExpiry = formData.get('dateOfExpiry');
    const securityCode = formData.get('securityCode');

    const response = await fetch(`${SERVER_URL}/api/stores/creditcard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber, cardHolderNumber, dateOfExpiry, securityCode }),
    });

    if (response.status === 200) {
      setNotification({message: 'クレジットカード設定成功。', type: 'success'});
      setTimeout(() => {
        router.push('/settings');
      }, 1000);
    } else {
      console.log(response.status);
      console.log("Failed.");
    }
  });

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle>クレジットカード設定</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>
          <div className='bg-white w-full p-4'>
            <form onSubmit={handleSubmit}>
              <h3 className='text-gray-600 py-2'>登録済みカード</h3>
              <div className="mb-4 w-full px-6 py-6 gap-16 bg-gray-100 rounded-md flex flex-col">
                <div className='flex flex-row'>
                  <h3 className='text-black text-xl'>****_****_****_4224</h3>
                </div>
                <div className='flex flex-row-reverse'>
                  <button type="button" className="w-20 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                    削除
                  </button>
                </div>
              </div>
              {/* Card registration */}
              <h3 className='text-gray-600 py-4'>カード登録</h3>
              <h3 className='text-gray-600 py-2'>カード番号</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='cardNumber'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="カード番号"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>カード名義</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='cardHolderNumber'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="カード番号"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>有効期限</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='dateOfExpiry'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="有効期限"
                  required
                />
              </div>
              <h3 className='text-gray-600 py-2'>セキュリティコード</h3>
              <div className="mb-4">
                <input
                  type="name"
                  name='securityCode'
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="セキュリティコード"
                  required
                />
              </div>
              {/* buttons */}
              <div className='flex flex-col pt-2 space-y-4'>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                  新しくカードを登録
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

export default CreditCardSetting;