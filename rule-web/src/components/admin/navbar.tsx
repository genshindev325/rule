// components/admin/Navbar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaCalendar, FaComments, FaChartArea, FaClipboardList, FaBell, FaStore, FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const [notificaitonCounts, setNotificationCounts] = useState(0);
  const navItem = 'flex flex-col items-center justify-center space-y-1 w-[88px] h-16 rounded-md bg-transparent font-semibold hover:bg-gray-200/10 hover:text-white active:text-blue-500 duration-300';
  
  // Polling interval in milliseconds (e.g., 1000ms * 60 = 1 minute)
  const POLLING_INTERVAL = 1000 * 5;

  useEffect(() => {
    // Load selected menu from sessionStorage if available
    const storedMenu = sessionStorage.getItem('selectedMenu');
    if (storedMenu) {
      setSelectedMenu(storedMenu);
    }
    // fetch notificaitons every 1 minute
    if (!token) {
      router.push('/auth/signin');
    } else {
      const fetchData = async () => {
        try {
          const response_notifications = await fetch('/api/admin/notifications/check', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response_notifications.ok) {
            const result = await response_notifications.json();
            setNotificationCounts(result.data.length);
          } else {
            console.log(response_notifications.status);
          }
        } catch (error) {
          console.log('Error: ', error);
        }
      };

      fetchData();
      const intervalId = setInterval(fetchData, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, []);

  const handleMenuClick = (menu: string) => {
    sessionStorage.setItem('previewMenu', selectedMenu);
    setSelectedMenu(menu);
    sessionStorage.setItem('selectedMenu', menu);
    menu === 'notifications' && setNotificationCounts(0);
  };

  return (
    <div className="flex flex-col items-center h-full bg-zinc-700 text-white w-24">
      <div className="flex flex-col items-center sticky top-8">
        <Link href="/admin/dashboard" className='mb-4'>
          <button
            className={`${navItem} ${selectedMenu === 'dashboard' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <FaHome className="w-6 h-6" />
            <h2 className='text-xs'>ダッシュボード</h2>
          </button>
        </Link>
        <Link href="/admin/events" className='mb-4'>
          <button
            className={`${navItem} ${selectedMenu === 'events' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('events')}
          >
            <FaCalendar className="w-6 h-6" />
            <h2 className='text-xs'>イベント</h2>
          </button>
        </Link>
        <Link href="/admin/chat" className='mb-4'>
          <button
            className={`${navItem} ${selectedMenu === 'chat' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('chat')}
          >
            <FaComments className="w-6 h-6" />
            <h2 className='text-xs'>お問い合わせ</h2>
          </button>
        </Link>
        <Link href="/admin/settlementSummary" className='mb-4'>
          <button
            className={`${navItem} ${selectedMenu === 'settlementSummary' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('settlementSummary')}
          >
            <FaClipboardList className="w-6 h-6" />
            <h2 className='text-xs'>決済サマリー</h2>
          </button>
        </Link>
        <Link href="/admin/salesManagement" className='mb-4'>
          <button
            className={`${navItem} ${selectedMenu === 'salesManagement' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('salesManagement')}
          >
            <FaChartArea className="w-6 h-6" />
            <h2 className='text-xs'>売上管理</h2>
          </button>
        </Link>
        <Link href="/admin/storePayment" className='mb-4'>
          <button
            className={`${navItem} ${selectedMenu === 'storeManagement' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('storeManagement')}
          >
            <FaStore className="w-6 h-6" />
            <h2 className='text-xs'>売り上げ管理</h2>
          </button>
        </Link>
      </div>
      <div className='flex flex-col sticky bottom-8 space-y-6 mt-auto text-black'>
        <Link href="/admin/notification">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'notifications' ? 'text-blue-400' : ''} duration-500`}
            onClick={() => handleMenuClick('notifications')}
          >
            <FaBell className="relative w-7 h-7" />
            {notificaitonCounts > 0 && <div className='absolute top-0 -right-2 rounded-full w-4 h-4 bg-green-600 border-none text-xs text-white text-center'>{notificaitonCounts}</div>}
          </button>
        </Link>
        <Link href="/auth/signout">
          <button
            className={`hover:text-red-500 ${selectedMenu === 'signout' ? 'text-red-400' : ''} duration-500`}
            onClick={() => handleMenuClick('signout')}
          >
            <FaSignOutAlt className="w-7 h-7" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
