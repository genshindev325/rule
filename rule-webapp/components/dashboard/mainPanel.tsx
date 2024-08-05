'use client';

import React from 'react';

const MainPanel = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex flex-wrap">
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-200 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">123,45 yen</div>
          <div className="text-sm text-gray-600">Previous month's sales</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-200 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">234,567 yen</div>
          <div className="text-sm text-gray-600">This month's sales</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-200 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">3 pieces</div>
          <div className="text-sm text-gray-600">Number of planned events</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-200 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">1 item</div>
          <div className="text-sm text-gray-600">Cases not reached</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-200 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">12 pieces</div>
          <div className="text-sm text-gray-600">Number of reviews</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-200 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">80%</div>
          <div className="text-sm text-gray-600">Review response rate</div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
