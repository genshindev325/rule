// components/admin/Navbar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaCalendar, FaComments, FaChartArea, FaClipboardList, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  useEffect(() => {
    // Load selected menu from sessionStorage if available
    const storedMenu = sessionStorage.getItem('selectedMenu');
    if (storedMenu) {
      setSelectedMenu(storedMenu);
    }
  }, []);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    sessionStorage.setItem('selectedMenu', menu);
  };

  return (
    <div className="flex flex-col items-center h-full bg-zinc-700 text-white w-20">
      <div className="flex flex-col items-center space-y-8 sticky top-8">
        <Link href="/admin/dashboard">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'dashboard' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <FaHome className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/events">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'events' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('events')}
          >
            <FaCalendar className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/chat">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'chat' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('chat')}
          >
            <FaComments className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/settlementSummary">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'settlementSummary' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('settlementSummary')}
          >
            <FaClipboardList className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/salesManagement">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'salesManagement' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('salesManagement')}
          >
            <FaChartArea className="w-8 h-8" />
          </button>
        </Link>
      </div>
      <div className='flex flex-col sticky bottom-8 space-y-8 mt-auto text-black'>
        <button
          className={`hover:text-blue-400 ${selectedMenu === 'notifications' ? 'text-blue-400' : ''}`}
          onClick={() => handleMenuClick('notifications')}
        >
          <FaBell className="w-8 h-8" />
        </button>
        {/* Uncomment if needed */}
        {/* <Link href="/admin/setting">
          <button
            className={`hover:text-blue-400 ${selectedMenu === 'setting' ? 'text-blue-400' : ''}`}
            onClick={() => handleMenuClick('setting')}
          >
            <FaCog className="w-8 h-8" />
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
