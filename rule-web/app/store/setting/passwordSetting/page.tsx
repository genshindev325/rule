// app/store/setting/passwordSetting/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/store/navbar';

const PasswordSetting = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add Password setting logic here
  }

  return (
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
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="現在のパスワード"
                />
              </div>
              <h3 className='text-gray-600 py-2'>新しいパスワード</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="新しいパスワード"
                />
              </div>
              <h3 className='text-gray-600 py-2'>新しいパスワードを (再入力)</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="新しいパスワードを (再入力)"
                />
              </div>
              {/* buttons */}
              <div className='flex flex-row justify-end gap-4 pt-12'>
                <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  保つ
                </button>
                <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                  下書き
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetting;
