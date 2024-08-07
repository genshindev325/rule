// app/admin/dashboard/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/admin/navbar';
import MainPanel from '@/components/admin/dashboard/mainPanel';
import UserList from '@/components/admin/dashboard/userList';
import MemberStoreList from '@/components/admin/dashboard/memberStoreList';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className="w-full p-10 pb-16">
        <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>
        <MainPanel />
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">ユーザーリスト</h3>
          <UserList />
        </div>
        <div className="mt-8">
          <div className='flex flex-row gap-8 pb-4 items-center'>
            <h3 className="text-lg font-semibold mb-4">加盟店一覧</h3>
            <a href='/admin/dashboard/memberStoreAddition'>
              <button type='button' className='rounded-lg bg-blue-500 text-white text-md p-2 w-36 hover:bg-blue-600'>
                追加
              </button>
            </a>
          </div>
          <MemberStoreList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
