// components/admin/dashboard/mainPanel.tsx

'use client';

import React from 'react';

const MainPanel = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex flex-wrap w-5/12">
      <div className="w-full md:w-1/2 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">123,45 円</div>
          <div className="text-sm text-gray-600">前月の売上</div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">234,567 円</div>
          <div className="text-sm text-gray-600">今月の売上</div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
