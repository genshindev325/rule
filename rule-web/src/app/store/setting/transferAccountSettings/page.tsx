// app/store/setting/transferAccountSettings/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import Notification from '@/utils/notification';

const TransferAccountSetting = () => {
  const router = useRouter();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add transfer account setting logic here
    const formData = new FormData(e.currentTarget);
    const bankName = formData.get('bankName');
    const branchName = formData.get('branchName');
    const accountNumber = formData.get('accountNumber');
    const accountHolder = formData.get('accountHolder');

    const response = await fetch('/api/store/setting/storeProfileSetting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bankName, branchName, accountNumber, accountHolder }),
    });

    if (response.status === 200) {
      setNotification({message: '振込口座の設定に成功しました。', type: 'success'});
      setTimeout(() => {
        router.push('/store/setting');
      }, 1500);
    } else {
      console.log(response.status);
      console.log("Failed.");
    }
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100">
        <div className="w-20">
          <Navbar />
        </div>
        <div className='w-auto mx-auto'>
          <div className="min-h-screen flex items-start py-20 justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">振込口座設定</h2>
              <form onSubmit={handleSubmit}>
                {/* Transfer account setting */}
                <h3 className='font-semibold py-2'>銀行名</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='bankName'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="銀行名"
                    required
                  />
                </div>
                <h3 className='font-semibold py-2'>支店名</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='branchName'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="支店名"
                    required
                  />
                </div>
                <h3 className='font-semibold py-2'>口座番号</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='accountNumber'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="口座番号"
                    required
                  />
                </div>
                <h3 className='font-semibold py-2'>口座名義</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='accountHolder'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="口座名義"
                    required
                  />
                </div>
                {/* buttons */}
                <div className='flex flex-row justify-end gap-4 pt-12'>
                  <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300">
                    保存
                  </button>
                  <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400 duration-300">
                    <a href='/store/setting'>キャンセル</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
      </div>
    </AuthWrapper>
  );
};

export default TransferAccountSetting;
