// app/admin/dashboard/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/admin/navbar';
import MainPanel from '@/components/admin/dashboard/mainPanel';
import UserList from '@/components/admin/dashboard/userList';

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
          <h3 className="text-lg font-semibold mb-4">User List</h3>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
