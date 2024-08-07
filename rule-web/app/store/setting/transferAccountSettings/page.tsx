// app/store/setting/transferAccountSettings/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/store/navbar';

const TransferAccountSetting = () => {
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add transfer account setting logic here
  }

  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className='w-auto mx-auto'>
        <div className="min-h-screen flex items-start py-20 justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">振替口座設定</h2>
            <form onSubmit={handleSubmit}>
              {/* Transfer account setting */}
              <h3 className='text-gray-600 py-2'>銀行名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="銀行名"
                />
              </div>
              <h3 className='text-gray-600 py-2'>支店名</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="支店名"
                />
              </div>
              <h3 className='text-gray-600 py-2'>口座番号</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="口座番号"
                />
              </div>
              <h3 className='text-gray-600 py-2'>口座名義人</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="口座名義人"
                />
              </div>
              {/* buttons */}
              <div className='flex flex-row justify-end gap-4 pt-12'>
                <button type="submit" className="w-48 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  keep
                </button>
                <button type="button" className="w-48 py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferAccountSetting;
