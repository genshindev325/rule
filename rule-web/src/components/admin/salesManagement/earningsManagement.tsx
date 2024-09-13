// components/admin/salesManagement/earningsManagemt.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { formatNumber } from '@/utils/formatNumber';

interface EarningsProps {
  sales: number,
  salesTotal: number,
  salesData: number[],
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const EarningsManagement: React.FC<EarningsProps> = ({
  sales, salesTotal, salesData
}) => {
  const chartOptions = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    fill: {
      colors: ['#4C51BF'],
    },
  };

  const chartSeries = [
    {
      name: 'series-1',
      data: salesData,
    },
  ];

  return (
    <div className="container mx-auto p-4 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">売上</h1>
      <div className="p-4 mb-6 bg-white shadow-md rounded-md flex flex-wrap w-5/12">
        <div className="w-full md:w-1/2 p-4">
          <div className="border-gray-200 border-solid border-2 py-6 rounded-md text-center">
            <div className="text-sm font-semibold">総合売上</div>
            <div className="text-2xl font-bold">{formatNumber(sales)} 円</div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="border-gray-200 border-solid border-2 py-6 rounded-md text-center">
            <div className="text-sm font-semibold">見込総合売上</div>
            <div className="text-2xl font-bold">{formatNumber(salesTotal)} 円</div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mb-6">
        <a href="#" className="text-blue-500 border-b-2 border-blue-500 pb-1 font-semibold">
          1日の売り上げ
        </a>
        <a href="#" className="text-zinc-850 border-b-2 border-transparent pb-1 font-semibold">
          一日の開催合コン数
        </a>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Chart options={chartOptions} series={chartSeries} type="area" height="350" />
      </div>
    </div>
  );
};

export default EarningsManagement;
