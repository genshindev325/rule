// components/store/salesManagement/totalSales.tsx

'use client';

import React from 'react';
import { formatNumber } from '@/app/utils/formatNumber';

interface TotalSalesProps {
  totalSales: number
}

const TotalSales: React.FC<TotalSalesProps> = ({ totalSales }) => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-base sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-base font-semibold';
  return (
    <div className="w-40 sm:w-48 md:w-56 bg-white text-gray-800">
      <div className="border-gray-200 border-solid border-2 p-2 rounded-md text-center">
        <div className={`${textSm} py-2`}>総合売上</div>
        <div className={`${textXl} py-2`}>{formatNumber(totalSales)} 円</div>
      </div>
    </div>
  );
};

export default TotalSales;
