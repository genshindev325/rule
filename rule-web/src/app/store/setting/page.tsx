// app/store/setting/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';

const Setting = () => {
  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-24">
          <Navbar />
        </div>
        <div className="w-full p-10">
          <h1 className="text-3xl font-bold mb-6">設定</h1>
          <div className='flex flex-row gap-6 text-md font-bold'>
            <Link href="/store/setting/storeProfileSetting">
              <div className="rounded-lg underline underline-offset-4 border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
                店舗プロフィール設定
              </div>
            </Link>
            <Link href="/store/setting/passwordSetting">
              <div className="rounded-lg underline underline-offset-4 border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
                パスワード設定
              </div>
            </Link>
            <Link href="/store/setting/creditCardSettings">
              <div className="rounded-lg underline underline-offset-4 border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
                クレジットカード設定
              </div>
            </Link>
            <Link href="/store/setting/transferAccountSettings">
              <div className="rounded-lg underline underline-offset-4 border-2 w-40 sm:w-48 md:w-56 h-28 sm:h-32 md:h-36 bg-white hover:bg-gray-200 text-center flex flex-col justify-center">
                振込口座の設定
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Setting;
