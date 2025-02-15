// app/admin/dashboard/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/admin/navbar';
import MainPanel from '@/components/admin/dashboard/mainPanel';
import UserList from '@/components/admin/dashboard/userList';
import MemberStoreList from '@/components/admin/dashboard/memberStoreList';
import AuthWrapper from '@/components/auth/authWrapper';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

interface MainPanelProps {
  lastMonthSales: number,
  thisMonthSales: number,
}

interface Store {
  _id: string,
  email: string;
  storeID: string;
  storeName: string;
  storeGenre: string;
  foodGenre: string;
  cookingGenre: string;
  address: string;
  access: [string];
  storeImages: [string];
  description: string;
  monthlyRate: number;
  rating: number;
  ratingCount: number;
  storeLat: number;
  storeLng: number;
  status: string;
  createdAt: Date;
  creditCard: string;
  bankName: string;
  branchName: string;
  accountNumber: number;
  accountHolder: string;
}

interface User {
  _id: string,
  email: string;
  userID: string;
  nickname: string;
  gender: string;
  birthday: Date;
  avatar: string;
  verification: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  creditCard: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [mainPanelData, setMainPanelData] = useState<MainPanelProps>({
    lastMonthSales: 0,
    thisMonthSales: 0,
  });
  const [memberStores, setMemberStores] = useState<Store[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const POLLING_INTERVAL = 1000 * 60;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          router.push('/auth/signin');
        } else {
          // Fetch mainPanel Data
          const response_mainPanel = await fetch('/api/admin/main-panel', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
          });
          if (response_mainPanel.status === 200) {
            const result_mainPanel = await response_mainPanel.json();
            setMainPanelData(result_mainPanel);
          } else {
            console.error('Failed to fetch mainpanel data');
          }
          // Fetch memberstore Data
          const response_memberstore = await fetch('/api/stores', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
          });
          if (response_memberstore.status === 200) {
            const result_memberstore = await response_memberstore.json();
            setMemberStores(result_memberstore.data);
          } else {
            console.error('Failed to fetch memberstore data');
          }
          // Fetch userList Data
          const response_userList = await fetch('/api/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
          });
          if (response_userList.status === 200) {
            const result_userList = await response_userList.json();
            setUserList(result_userList.data);
          } else {
            console.error('Failed to fetch userList data');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen w-full flex bg-gray-100 text-gray-800">
        <div className="w-24">
          <Navbar />
        </div>
        <div className="w-full p-10 pb-16">
          <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>
            <MainPanel {...mainPanelData} />
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">ユーザー一覧</h3>
            <UserList users={userList} />
          </div>
          <div className="mt-8">
            <div className='flex flex-row gap-8 pb-4 items-center'>
              <h3 className="text-lg font-semibold mb-4">加盟店一覧</h3>
            </div>
            <MemberStoreList stores={memberStores} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Dashboard;
