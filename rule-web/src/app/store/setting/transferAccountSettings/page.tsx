// app/store/setting/transferAccountSettings/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const TransferAccountSetting = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      router.push('/auth/signin');
      } else {
      e.preventDefault();
      // Add transfer account setting logic here
      const formData = new FormData(e.currentTarget);
      const bankName = formData.get('bankName');
      const branchName = formData.get('branchName');
      const accountNumber = formData.get('accountNumber');
      const accountHolder = formData.get('accountHolder');

      const response = await fetch('/api/stores/transferAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bankName, branchName, accountNumber, accountHolder }),
      });

      if (response.status === 200) {
        toast.success('振込口座の設定に成功しました。', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => {
          router.push('/store/setting');
        }, 1000);
      } else {
        console.log(response.status);
        console.log("Failed.");
      }
    }
  })

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className='w-auto mx-auto'>
          <div className="min-h-screen flex items-start py-20 justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
              <h2 className="text-lg font-bold mb-6">振込口座設定</h2>
              <form onSubmit={handleSubmit}>
                {/* Transfer account setting */}
                <h3 className='font-semibold py-2 text-md'>銀行名</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='bankName'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="銀行名"
                    required
                  />
                </div>
                <h3 className='font-semibold py-2 text-md'>支店名</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='branchName'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="支店名"
                    required
                  />
                </div>
                <h3 className='font-semibold py-2 text-md'>口座番号</h3>
                <div className="mb-4">
                  <input
                    type="name"
                    name='accountNumber'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="口座番号"
                    required
                  />
                </div>
                <h3 className='font-semibold py-2 text-md'>口座名義</h3>
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
      </div>
    </AuthWrapper>
  );
};

export default TransferAccountSetting;
