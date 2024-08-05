// components/Navbar.tsx

'use client';

import React from 'react';
import { FaHome, FaCalendarAlt, FaComments, FaChartBar, FaBell, FaCog } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex flex-col items-center h-full py-8 bg-zinc-700 text-white">
      <div className="flex flex-col items-center space-y-8 flex-grow">
        <FaHome className="w-6 h-6" />
        <FaCalendarAlt className="w-6 h-6" />
        <FaComments className="w-6 h-6" />
        <FaChartBar className="w-6 h-6" />
      </div>
      <div className='flex flex-col items-end space-y-8 mt-auto text-black'>
        <FaBell className="w-6 h-6" />
        <FaCog className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Navbar;
