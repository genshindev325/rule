// components/store/dashboard/mainPanel.tsx

'use client';

import React from 'react';
import { formatNumber } from '@/app/utils/formatNumber';

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
    <div className="py-4 sm:py-6 bg-gray-100 space-y-4 text-gray-800">
      <div className="w-full flex flex-row space-x-4">
        <div className="flex-1 border-gray-300 border-solid border p-4 rounded-md text-center bg-white">
        <div className="text-sm text-gray-600">前月の売上</div>
          <div className="text-md font-semibold">{formatNumber(lastMonthSales)} 円</div>
        </div>
        <div className="flex-1 border-gray-300 border-solid border p-4 rounded-md text-center bg-white">
        <div className="text-sm text-gray-600">今月の売上</div>
          <div className="text-md font-semibold">{formatNumber(thisMonthSales)} 円</div>
        </div>
      </div>
      <div className="w-full flex flex-row space-x-4">
        <div className="flex-1 border-gray-300 border-solid border p-4 rounded-md text-center bg-white">
        <div className="text-sm text-gray-600">予定イベント数</div>
          <div className="text-md font-semibold">{formatNumber(scheduledEvents)} 件</div>
        </div>
        <div className="flex-1 border-gray-300 border-solid border p-4 rounded-md text-center bg-white">
        <div className="text-sm text-gray-600">定員未達</div>
          <div className="text-md font-semibold">{formatNumber(unreachedCases)} 件</div>
        </div>
      </div>
      <div className="w-full flex flex-row space-x-4">
        <div className="flex-1 border-gray-300 border-solid border p-4 rounded-md text-center bg-white">
        <div className="text-sm text-gray-600">レビュー数</div>
          <div className="text-md font-semibold">{formatNumber(reviews)} 件</div>
        </div>
        <div className="flex-1 border-gray-300 border-solid border p-4 rounded-md text-center bg-white">
        <div className="text-sm text-gray-600">レビュー返信率</div>
          <div className="text-md font-semibold">{formatNumber(reviewResponseRate)}%</div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
