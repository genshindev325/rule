// components/Navbar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome, FaCalendarAlt, FaComments, FaChartBar, FaBell, FaCog } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex flex-col items-center h-full py-10 bg-zinc-700 text-white">
      <div className="flex flex-col items-center space-y-8 flex-grow">
        <button className='hover:text-blue-400 active:text-blue-800'>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          {/* <div className="w-8 h-8 rounded-full bg-[url('../public/vercel.svg')] bg-gray-200" /> */}
        </button>
        <Link href="/dashboard">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaHome className="w-8 h-8" />
          </button>
        </Link>
        <button className='hover:text-blue-400 active:text-blue-800'>
          <FaCalendarAlt className="w-8 h-8" />
        </button>
        <button className='hover:text-blue-400 active:text-blue-800'>
          <FaComments className="w-8 h-8" />
        </button>
        <button className='hover:text-blue-400 active:text-blue-800'>
          <FaChartBar className="w-8 h-8" />
        </button>
      </div>
      <div className='flex flex-col items-end space-y-8 mt-auto text-black'>
        <button className='hover:text-blue-400 active:text-blue-800'>
          <FaBell className="w-8 h-8" />
        </button>        
        <Link href="/setting">
          <button className='hover:text-blue-400 active:text-blue-800'>
            <FaCog className="w-8 h-8" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
