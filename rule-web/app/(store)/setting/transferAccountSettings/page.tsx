// components/setting/transferAccountSetting.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';

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
      <div className="w-20 bg-gray-800">
        <Navbar />
      </div>
      <div className='w-auto mx-auto'>
        <div className="min-h-screen flex items-start py-20 justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Transfer account setting</h2>
            <form onSubmit={handleSubmit}>
              {/* Transfer account setting */}
              <h3 className='text-gray-600 py-2'>Bank name</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="Bank name"
                />
              </div>
              <h3 className='text-gray-600 py-2'>Branch name</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="Branch name"
                />
              </div>
              <h3 className='text-gray-600 py-2'>Account number</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="Account number"
                />
              </div>
              <h3 className='text-gray-600 py-2'>Account holder</h3>
              <div className="mb-4">
                <input
                  type="name"
                  className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
                  placeholder="Account holder"
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
