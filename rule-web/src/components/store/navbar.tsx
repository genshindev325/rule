// components/store/Navbar.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome, FaCalendar, FaComments, FaChartLine, FaBell, FaCog } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Navbar = () => {
  const [avatar, setAvatar] = useState('/image/minion.png');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const { profile } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (profile) {
      setAvatar(profile.storeImages);
    }
    // Load selected menu from sessionStorage if available
    const storedMenu = sessionStorage.getItem('selectedMenu');
    if (storedMenu) {
      setSelectedMenu(storedMenu);
    }
  }, [profile])

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    sessionStorage.setItem('selectedMenu', menu);
  };

  return (
    <div className="flex flex-col items-center w-20 h-full bg-zinc-700 text-white">
      <div className="flex flex-col sticky top-8 items-center space-y-8">
        <button className='hover:text-blue-400 active:text-blue-400'>
          <div className="w-8 h-8 rounded-full bg-gray-200">
            {avatar && <img src={avatar} className='rounded-full w-8 h-8' />}
          </div>
        </button>
        <Link href="/store/dashboard">
          <button
            className={`hover:text-blue-400 active:text-blue-400 ${selectedMenu === 'dashboard' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <FaHome className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/store/eventSettings">
          <button
            className={`hover:text-blue-400 active:text-blue-400 ${selectedMenu === 'eventSettings' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('eventSettings')}
          >
            <FaCalendar className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/store/chat">
          <button
            className={`hover:text-blue-400 active:text-blue-400 ${selectedMenu === 'chat' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('chat')}
          >
            <FaComments className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/store/salesManagement">
          <button
            className={`hover:text-blue-400 active:text-blue-400 ${selectedMenu === 'salesManagement' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('salesManagement')}
          >
            <FaChartLine className="w-8 h-8" />
          </button>
        </Link>
      </div>
      <div className='flex flex-col sticky bottom-8 space-y-8 mt-auto text-black'>
        <button className='hover:text-blue-400 active:text-blue-400'>
          <FaBell className="w-8 h-8" />
        </button>
        <Link href="/store/setting">
          <button
            className={`hover:text-blue-400 active:text-blue-400 ${selectedMenu === 'setting' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('setting')}
          >
            <FaCog className="w-8 h-8" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
