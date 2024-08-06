// components/setting/passwordSetting.tsx
'use client';

import React, { useState } from 'react';

const PasswordSetting = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add Password setting logic here
  }

  return (
    <div className="min-h-screen flex items-start pt-20 justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Password settings</h2>
        <form onSubmit={handleSubmit}>
          {/* Password setting */}
          <h3 className='text-gray-600 py-2'>Current Password</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="Current Password"
            />
          </div>
          <h3 className='text-gray-600 py-2'>New Password</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="New Password"
            />
          </div>
          <h3 className='text-gray-600 py-2'>New password (again)</h3>
          <div className="mb-4">
            <input
              type="name"
              className="w-full px-6 py-3 bg-gray-100 rounded-md focus:outline-none focus:border-blue-100"
              placeholder="New password (again)"
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
  );
};

export default PasswordSetting;
