// app/store/setting/creditCardSettings/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';

const CreditCardSettings = () => {
  const router = useRouter();

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add CreditCardSettins logic here
    const formData = new FormData(e.currentTarget);
    const cardNumber = formData.get('cardNumber');
    const cardHolderNumber = formData.get('cardHolderNumber');
    const dateOfExpiry = formData.get('dateOfExpiry');
    const securityCode = formData.get('securityCode');

    const response = await fetch('/api/store/setting/storeProfileSetting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber, cardHolderNumber, dateOfExpiry, securityCode }),
    });

    if (response.status === 200) {
      router.push('/store/setting');
      console.log("Credit card setting success.");
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
          <div className="flex items-start py-20 justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">クレジットカード設定</h2>
              <form onSubmit={handleSubmit}>
                <h3 className='text-gray-600 py-2'>登録カード</h3>
                <div className="mb-4 w-full px-6 py-6 gap-16 bg-gray-100 rounded-md flex flex-col">
                  <div className='flex flex-row'>
                    <h3 className='text-black text-xl'>****_****_****_4224</h3>
                  </div>
                  <div className='flex flex-row-reverse'>
                    <button type="button" className="w-20 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
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
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="カード番号"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>クレジットカード名義人氏名</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='cardHolderNumber'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="クレジットカード名義人氏名"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>有効期限</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='dateOfExpiry'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="有効期限"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>セキュリティコード</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='securityCode'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="セキュリティコード"
                    required
                  />
                </div>
                {/* buttons */}
                <div className='flex flex-row justify-end gap-4 pt-12'>
                  <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    保存
                  </button>
                  <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                    <a href='/store/setting'>キャンセル</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default CreditCardSettings;
