// components/Navbar.tsx

'use client';

import React from 'react';
import { FaHome, FaCalendarAlt, FaComments, FaChartBar, FaBell, FaCog } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex flex-col items-center h-full py-4 bg-gray-800 text-white">
      <div className="flex flex-col items-center space-y-8">
        <FaHome className="w-6 h-6" />
        <FaCalendarAlt className="w-6 h-6" />
        <FaComments className="w-6 h-6" />
        <FaChartBar className="w-6 h-6" />
        <FaBell className="w-6 h-6" />
        <FaCog className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Navbar;
