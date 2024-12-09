// components/store/Navbar.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome, FaCalendar, FaComments, FaChartLine, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [avatar, setAvatar] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const { profile } = useSelector((state: RootState) => state.auth);
  const token = useSelector((state: RootState) => state.auth.token);
  const [notificaitonCounts, setNotificationCounts] = useState(0);
  const router = useRouter();
  const navItem = 'flex flex-col items-center justify-center space-y-1 w-[88px] h-16 rounded-md bg-transparent font-semibold hover:bg-gray-200/10 hover:text-white active:text-blue-500 duration-300';
  
  // Polling interval in milliseconds (e.g., 1000ms * 60 = 1 minute)
  const POLLING_INTERVAL = 1000 * 5;

  useEffect(() => {
    if (profile) {
      setAvatar(profile.storeImages);
    }
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
          const response_notifications = await fetch('/api/stores/notifications/check', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ storeId: profile?._id })
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

      // Fetch data on component mount
      fetchData();

      // Set up polling to fetch data periodically
      const intervalId = setInterval(fetchData, POLLING_INTERVAL);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [profile])

  const handleMenuClick = (menu: string) => {
    sessionStorage.setItem('previewMenu', selectedMenu);
    setSelectedMenu(menu);
    sessionStorage.setItem('selectedMenu', menu);
  };

  return (
    <div className="flex flex-col items-center w-24 h-full bg-zinc-700 text-white">
      <div className="flex flex-col sticky top-8 items-center">
        <button className='hover:text-blue-400 active:text-blue-400 mb-6'>
          <div className="w-10 h-10 rounded-full bg-gray-200">
            {avatar && <img src={avatar[0]} className='rounded-full w-10 h-10' />}
          </div>
        </button>
        <Link href="/store/dashboard" className='mb-6'>
          <button
            className={`${navItem} ${selectedMenu === 'dashboard' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <FaHome className="w-6 h-6" />
            <h2 className='text-xs'>ダッシュボード</h2>
          </button>
        </Link>
        <Link href="/store/events" className='mb-6'>
          <button
            className={`${navItem} ${selectedMenu === 'eventSettings' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('eventSettings')}
          >
            <FaCalendar className="w-6 h-6" />
            <h2 className='text-xs'>イベント</h2>
          </button>
        </Link>
        <Link href="/store/chat" className='mb-6'>
          <button
            className={`${navItem} ${selectedMenu === 'chat' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('chat')}
          >
            <FaComments className="w-6 h-6" />
            <h2 className='text-xs'>お問い合わせ</h2>
          </button>
        </Link>
        <Link href="/store/salesManagement" className='mb-6'>
          <button
            className={`${navItem} ${selectedMenu === 'salesManagement' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => handleMenuClick('salesManagement')}
          >
            <FaChartLine className="w-6 h-6" />
            <h2 className='text-xs'>売上管理</h2>
          </button>
        </Link>
      </div>
      <div className='flex flex-col sticky bottom-8 space-y-6 mt-auto text-black'>
        <Link href="/store/notification">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'notifications' ? 'text-blue-400' : ''} duration-300`}
            onClick={() => handleMenuClick('notifications')}
          >
            <FaBell className="relative w-7 h-7" />
            {notificaitonCounts > 0 && <div className='absolute top-0 -right-2 rounded-full w-4 h-4 bg-green-600 border-none text-xs text-white text-center'>{notificaitonCounts}</div>}
          </button>
        </Link>
        <Link href="/store/setting">
          <button
            className={`hover:text-blue-400 active:text-blue-400 ${selectedMenu === 'setting' ? 'text-blue-400' : ''} duration-300`}
            onClick={() => handleMenuClick('setting')}
          >
            <FaCog className="w-7 h-7" />
          </button>
        </Link>
        <Link href="/auth/signout">
          <button
            className={`hover:text-red-500 ${selectedMenu === 'signout' ? 'text-red-400' : ''} duration-300`}
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
