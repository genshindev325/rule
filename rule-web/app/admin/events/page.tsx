// app/admin/events/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/admin/navbar';
import UpcomingEvents from '@/components/admin/events/upcomingEvents';
import PastEvents from '@/components/admin/events/pastEvents';

const Events = () => {
  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className="w-3/4 p-10">
        <div className="mt-8">
          <div className='flex flex-row gap-8 pb-4 items-center'>
            <h3 className="text-lg font-semibold mb-4">今後のイベント</h3>
            <button type='button' className='rounded-lg bg-blue-500 text-white text-md p-2 w-36 hover:bg-blue-600'>
              イベント作成
            </button>
          </div>
          <UpcomingEvents />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">過去のイベント</h3>
          <PastEvents />
        </div>
      </div>
    </div>
  );
};

export default Events;
