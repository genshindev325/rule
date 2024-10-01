'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { formatNumber } from '@/utils/formatNumber';

interface EarningsProps {
  salesTotal: number;
  salesExp: number;
  salesData: number[];
  eventsData: number[];
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const EarningsManagement: React.FC<EarningsProps> = ({
  salesTotal,
  salesExp,
  salesData,
  eventsData,
}) => {
  // State to track the selected data type
  const [activeTab, setActiveTab] = useState<'sales' | 'events'>('sales');

  // Chart configuration
  const chartOptions = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    fill: {
      colors: ['#4C51BF'],
    },
    // Ensure that the y-axis shows integers (no decimal places) for salesData
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return Math.ceil(val).toString(); // Show only integer values
        },
      },
    },
  };

  // Keep salesData as whole numbers
  const formattedSalesData = salesData.map((value) => Math.round(value));

  // Format eventsData to one decimal place
  const formattedEventsData = eventsData.map((value) => Number(value.toFixed(1)));

  // Toggle between salesData and eventsData based on the active tab
  const chartSeries = [
    {
      name: activeTab === 'sales' ? 'Sales Data' : 'Events Data',
      data: activeTab === 'sales' ? formattedSalesData : formattedEventsData,
    },
  ];

  return (
    <div className="container mx-auto p-4 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">売上</h1>

      <div className="p-4 mb-6 bg-white shadow-md rounded-md flex flex-wrap w-5/12">
        <div className="w-full md:w-1/2 p-4">
          <div className="border-gray-200 border-solid border-2 py-6 rounded-md text-center">
            <div className="text-sm font-semibold">総合売上</div>
            <div className="text-2xl font-bold">
              {formatNumber(Number(salesTotal.toFixed(1)))} 円
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="border-gray-200 border-solid border-2 py-6 rounded-md text-center">
            <div className="text-sm font-semibold">見込総合売上</div>
            <div className="text-2xl font-bold">
              {formatNumber(Number(salesExp.toFixed(1)))} 円
            </div>
          </div>
        </div>
      </div>

      {/* Tab Links */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('sales')}
          className={`${
            activeTab === 'sales'
              ? 'bg-blue-500 text-white'
              : 'text-zinc-850'
          } p-2 font-semibold focus:outline-none duration-300 rounded-lg`}
        >
          1日の売り上げ
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`${
            activeTab === 'events'
              ? 'bg-blue-500 text-white'
              : 'text-zinc-850'
          } p-2 font-semibold focus:outline-none duration-300 rounded-lg`}
        >
          一日の開催合コン数
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <Chart options={chartOptions} series={chartSeries} type="area" height="350" />
      </div>
    </div>
  );
};

export default EarningsManagement;
