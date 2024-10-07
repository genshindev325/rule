// app/admin/settlementSummary/page.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/admin/navbar';
import SettlementSummary from '@/components/admin/salesManagement/settlementSummary';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

interface StoreSale {
  storeName: string,
  sales: number,
  salesForecast: number,
  totalDepositedAmount: number
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [storeSalesList, setStoreSalesList] = useState<StoreSale[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth/signin');
      } else {
      const fetchData = async () => {
        try {
          // Fetch settlementSummary Data
          const response_settlementSummary = await fetch('/api/admin/settlementSummary', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
          });
          if (response_settlementSummary.ok) {
            const result_settlementSummary = await response_settlementSummary.json();
            setStoreSalesList(result_settlementSummary.storeSales);
          } else {
            console.error('Failed to fetch mainPanel data');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-gray-800 text-3xl font-bold'>読み込み中...</div>;

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-full p-10 pb-16">
          <h1 className="text-3xl font-bold mb-6">決済サマリー</h1>
          <div className="mt-8">
            <h3 className="text-sm mb-4">加盟店</h3>
            <div className='border-none bg-gray-200 w-fit p-2 mb-4 pr-12 rounded'>
              すべての加盟店
            </div>
            <SettlementSummary stores={storeSalesList} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Dashboard;
