// app/admin/salesManagement/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/admin/navbar';
import SettlementSummary from '@/components/admin/salesManagement/settlementSummary';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className="w-full p-10 pb-16">
        <h1 className="text-3xl font-bold mb-6">決済サマリー</h1>
        <div className="mt-8">
          <h3 className="text-sm mb-4">加盟店</h3>
          <div className='border-none bg-gray-200 w-fit p-2 mb-4 pr-12 rounded'>
            すべての加盟店
          </div>
          <SettlementSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
