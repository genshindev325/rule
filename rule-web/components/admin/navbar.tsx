// components/admin/Navbar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome, FaCalendar, FaComments, FaChartArea, FaClipboardList, FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex flex-col items-center h-full py-10 bg-zinc-700 text-white">
      <div className="flex flex-col items-center space-y-8 flex-grow">
        <button className='hover:text-blue-400 active:text-blue-800'>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          {/* <div className="w-8 h-8 rounded-full bg-[url('../public/vercel.svg')] bg-gray-200" /> */}
        </button>
        <Link href="/admin/dashboard">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaHome className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/events">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaCalendar className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/chat">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaComments className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/settlementSummary">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaClipboardList className="w-8 h-8" />
          </button>
        </Link>
        <Link href="/admin/salesManagement">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaChartArea className="w-8 h-8" />
          </button>
        </Link>
      </div>
      <div className='flex flex-col items-end space-y-8 mt-auto text-black'>
        <button className='hover:text-blue-400 active:text-blue-800'>
          <FaBell className="w-8 h-8" />
        </button>        
        {/* <Link href="/admin/setting">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaCog className="w-8 h-8" />
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
