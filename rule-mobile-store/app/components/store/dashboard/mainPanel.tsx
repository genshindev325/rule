// components/store/dashboard/mainPanel.tsx

'use client';

import React from 'react';
import { formatNumber } from '@/utils/formatNumber';

interface MainPanelProps {
  lastMonthSales: number,
  thisMonthSales: number,
  scheduledEvents: number,
  unreachedCases: number,
  reviews: number,
  reviewResponseRate: number
};

const MainPanel: React.FC<MainPanelProps> = ({
  lastMonthSales, thisMonthSales, scheduledEvents, unreachedCases, reviews, reviewResponseRate
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex flex-wrap">
      <div className="w-full md:w-1/3 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">{formatNumber(lastMonthSales)} 円</div>
          <div className="text-sm text-gray-600">前月の売上</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">{formatNumber(thisMonthSales)} 円</div>
          <div className="text-sm text-gray-600">今月の売上</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">{formatNumber(scheduledEvents)} 個</div>
          <div className="text-sm text-gray-600">予定イベント数</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">{formatNumber(unreachedCases)} アイテム</div>
          <div className="text-sm text-gray-600">未到達のケース</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">{formatNumber(reviews)} 個</div>
          <div className="text-sm text-gray-600">レビュー数</div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <div className="border-gray-200 border-solid border-2 p-6 rounded-md text-center">
          <div className="text-2xl font-bold">{formatNumber(reviewResponseRate)}%</div>
          <div className="text-sm text-gray-600">レビュー回答率</div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
