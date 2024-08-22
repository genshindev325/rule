// components/admin/dashboard/mainPanel.tsx

'use client';

import React from 'react';

interface MainPanelProps {
  lastMonthSales: number,
  thisMonthSales: number,
}

const MainPanel: React.FC<MainPanelProps> = ({
  lastMonthSales, thisMonthSales
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex flex-wrap w-5/12">
      <div className="w-full md:w-1/2 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <h2 className="text-xl md:text-2xl font-bold">{lastMonthSales} 円</h2>
          <div className="text-sm text-gray-600">前月の売上</div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <p className="text-xl md:text-2xl font-bold">{thisMonthSales} 円</p>
          <div className="text-sm text-gray-600">今月の売上</div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
