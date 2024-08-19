// app/admin/dashboard/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/admin/navbar';
import MainPanel from '@/components/admin/dashboard/mainPanel';
import UserList from '@/components/admin/dashboard/userList';
import MemberStoreList from '@/components/admin/dashboard/memberStoreList';

interface MainPanelProps {
  lastMonthSales: number,
  thisMonthSales: number,
}

interface Store {
  storeID: string,
  monthRate: number,
  storeName: string,
  registeredDate: string,
}

interface User {
  userID: string,
  userName: string,
  registeredDate: string,
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [mainPanelData, setMainPanelData] = useState<MainPanelProps>({
    lastMonthSales: 0,
    thisMonthSales: 0,
  });
  const [memberStores, setMemberStores] = useState<Store[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch mainPanel Data
        const response_mainPanel = await fetch('/api/admin/dashboard/mainPanel');
        if (response_mainPanel.ok) {
          const result_mainPanel = await response_mainPanel.json();
          setMainPanelData(result_mainPanel);
        } else {
          console.error('Failed to fetch memberstore data');
        }
        // Fetch memberstore Data
        const response_memberstore = await fetch('/api/admin/dashboard/memberStoreList');
        if (response_memberstore.ok) {
          const result_memberstore = await response_memberstore.json();
          setMemberStores(result_memberstore.memberStores);
        } else {
          console.error('Failed to fetch memberstore data');
        }
        // Fetch userList Data
        const response_userList = await fetch('/api/admin/dashboard/userList');
        if (response_userList.ok) {
          const result_userList = await response_userList.json();
          setUserList(result_userList.users);
        } else {
          console.error('Failed to fetch userList data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>Loading...</div>;

  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <div className="w-20">
        <Navbar />
      </div>
      <div className="w-full p-10 pb-16">
        <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>
        <MainPanel {...mainPanelData} />
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">ユーザーリスト</h3>
          <UserList users={userList} />
        </div>
        <div className="mt-8">
          <div className='flex flex-row gap-8 pb-4 items-center'>
            <h3 className="text-lg font-semibold mb-4">加盟店一覧</h3>
            <a href='/admin/dashboard/memberStoreAddition'>
              <button type='button' className='rounded-lg bg-blue-500 text-white text-md p-2 w-36 hover:bg-blue-600'>
                追加
              </button>
            </a>
          </div>
          <MemberStoreList stores={memberStores} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
