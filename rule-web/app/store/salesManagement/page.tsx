// app/store/salesManagement/page.tsx

'use client';

import React from 'react';
import Navbar from '@/components/store/navbar';
import TotalSales from '@/components/store/salesManagement/totalSales';
import EventHistory from '@/components/store/salesManagement/eventHistory';

const SalesManagement = () => {
  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className="w-full p-10">
        <h1 className="text-3xl font-bold mb-6">販売管理</h1>
        <TotalSales />
        <div className="mt-8">
          <h3 className='text-sm pt-4'>期間指定</h3>
          <div className='flex flex-row py-4 gap-4'>
            <span className='p-2 border-none rounded-lg bg-gray-300 w-48 text-sm mt-auto'>
              November 14, 2022
            </span>
            <span className='p-2 border-none rounded-lg bg-gray-300 w-48 text-sm mt-auto'>
              November 14, 2022
            </span>
          </div>
          <EventHistory />
        </div>
      </div>
    </div>
  );
};

export default SalesManagement;
