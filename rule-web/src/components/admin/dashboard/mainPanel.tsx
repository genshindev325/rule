// components/admin/dashboard/mainPanel.tsx

'use client';

import React from 'react';
import { formatNumber } from '@/utils/formatNumber';

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
        <div className="border-gray-200 border-solid border-2 py-6 rounded-md text-center">
        <div className="text-sm font-semibold">前月の売上</div>
          <h2 className="text-xl md:text-2xl font-bold">{formatNumber(lastMonthSales)} 円</h2>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="border-gray-200 border-solid border-2 py-6 rounded-md text-center">
        <div className="text-sm font-semibold">今月の売上</div>
          <p className="text-xl md:text-2xl font-bold">{formatNumber(thisMonthSales)} 円</p>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
