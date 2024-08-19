// app/store/setting/passwordSetting/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';

const PasswordSetting = () => {
  const router = useRouter();

  const handleSubmit = (async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add Password setting logic here
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const newPasswordConfirm = formData.get('newPasswordConfirm');

    const response = await fetch('/api/store/setting/storeProfileSetting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword, newPasswordConfirm }),
    });

    if (response.status === 200) {
      router.push('/store/setting');
      console.log("Password setting success.")
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
              <h2 className="text-2xl font-bold mb-6">パスワード設定</h2>
              <form onSubmit={handleSubmit}>
                {/* Password setting */}
                <h3 className='text-gray-600 py-2'>現在のパスワード</h3>
                <div className="mb-4">
                  <input
                    type="password"
                    name='currentPassword'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="現在のパスワード"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>新しいパスワード</h3>
                <div className="mb-4">
                  <input
                    type="password"
                    name='newPassword'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="新しいパスワード"
                    required
                  />
                </div>
                <h3 className='text-gray-600 py-2'>新しいパスワードを (再入力)</h3>
                <div className="mb-4">
                  <input
                    type="password"
                    name='newPasswordConfirm'
                    className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                    placeholder="新しいパスワードを (再入力)"
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

export default PasswordSetting;
