// app/auth/signout.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/authContext';

const SignOut = () => {
  const router = useRouter();
  const { signout }= useAuth();

  const handleSignOut = () => {
    signout();
    router.push('/auth/signin');
  }

  const handleCancel = () => {
    router.back();
    const previewMenu = sessionStorage.getItem('previewMenu');
    previewMenu && sessionStorage.setItem('selectedMenu', previewMenu);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">ログアウト</h2>
        <h2 className="mb-8 text-center text-md text-gray-600">
          本当にログアウトしますか?
        </h2>
        <div className='flex flex-row space-x-4'>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-2 px-4 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none duration-500"
          >
            ログアウト
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none duration-500"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignOut;