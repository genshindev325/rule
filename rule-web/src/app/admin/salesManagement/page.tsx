// app/admin/salesManagement/pages.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import EarningsManagement from '@/components/admin/salesManagement/earningsManagement';
import Navbar from '@/components/admin/navbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

interface EarningsProps {
  salesTotal: number,
  salesExp: number,
  salesData: number[],
  eventsData: number[]
}

const SalesManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const [earnings, setEarnings] = useState<EarningsProps>({
    salesTotal: 1,
    salesExp: 1,
    salesData: [10000, 20000, 23000, 67000, 78000, 43000, 45000, 23000, 67000, 78000, 43000, 45000],
    eventsData: [10, 20, 23, 67, 78, 43, 45, 23, 67, 78, 43, 45]
  });

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } else {
      const fetchData = async () => {
        try {
          // Fetch earning Data
          const response_earningData = await fetch('/api/admin/earningsManagement', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
          });
          if (response_earningData.ok) {
            const result_earning = await response_earningData.json();
            setEarnings(result_earning);
          } else {
            console.log(response_earningData.status)
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

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-full p-10 pb-16">
          <EarningsManagement {...earnings} />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SalesManagement;