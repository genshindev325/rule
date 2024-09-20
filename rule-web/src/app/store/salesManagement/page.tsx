// app/store/salesManagement/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import TotalSales from '@/components/store/salesManagement/totalSales';
import EventHistory from '@/components/store/salesManagement/eventHistory';
import { useAuth } from '@/components/auth/authContext';
import { formatDateTime } from '@/utils/datetime';

interface EventProps {
  name: string,
  date: string,
  earnings: number
}

const SalesManagement = () => {
  const [loading, setLoading] = useState(true); 
  const [events, setEvents] = useState<EventProps[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const today = new Date();
  const [startDate, setStartDate] = useState(today.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const { profile } = useAuth();
  const store = profile?._id;
  // Get today's date in the YYYY-MM-DD format
  const getTodayDate = (): string => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("startDate: " + startDate);
      console.log("endDate: " + endDate);
      console.log("store: " + store);
      try {
        // Fetch salesManagement Data
        const response_salesManagement = await fetch('/api/stores/sales-management', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            startDate, endDate, store
          })
        });
        if (response_salesManagement.ok) {
          const result_salesManagement = await response_salesManagement.json();
          setEvents(result_salesManagement.events);
          setTotalSales(result_salesManagement.totalSales)
        } else {
          console.error('Failed to fetch salesManagement data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-full p-10">
          <h1 className="text-3xl font-bold mb-6">売り上げ管理</h1>
            <TotalSales totalSales={totalSales} />
          <div className="mt-8">
            <h3 className='text-sm font-semibold pt-4'>期間指定</h3>
            <div className='flex flex-row py-4 gap-4'>
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="w-48 p-3 bg-gray-300 rounded-md focus:outline-none focus:border-blue-100"
                placeholder={getTodayDate()}
                required
              />
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className="w-48 p-3 bg-gray-300 rounded-md focus:outline-none focus:border-blue-100"
                placeholder="2023年 11月 14日"
                required
              />
            </div>
            <EventHistory events={events} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SalesManagement;
