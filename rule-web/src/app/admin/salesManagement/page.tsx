// app/admin/salesManagement/pages.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import EarningsManagement from '@/components/admin/salesManagement/earningsManagement';
import Navbar from '@/components/admin/navbar';
import Notification from '@/utils/notification';

interface EarningsProps {
  sales: number,
  salesTotal: number,
  salesData: number[],
}

const SalesManagement: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true); 
  const [earnings, setEarnings] = useState<EarningsProps>({
    sales: 1,
    salesTotal: 0,
    salesData: [0, 0, 0, 0, 0, 0, 0]
  });
  
  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch earning Data
        const response_earningData = await fetch('/api/admin/earningsManagement');
        if (response_earningData.ok) {
          const result_earning = await response_earningData.json();
          setEarnings(result_earning);
        } else {
          setNotification({ message: 'データの取得に失敗しました。', type: 'error' });
        }
      } catch (error) {
        console.error('Error:', error);
        setNotification({ message: `エラー: ${error}`, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen w-full flex bg-gray-100">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-full p-10 pb-16">
          <EarningsManagement {...earnings} />
        </div>
      </div>
      {notification && (<Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />)}
    </AuthWrapper>
  );
};

export default SalesManagement;