'use client';

import React from 'react';
import Navbar from '../components/navbar';
import RecentReviews from '../components/dashboard/recentReviews';
import UpcomingEvents from '../components/dashboard/upcomingEvents';
import MainPanel from '../components/dashboard/mainPanel';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-20 bg-gray-800">
        <Navbar />
      </div>
      <div className="w-3/4 p-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <MainPanel />
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <UpcomingEvents />
        </div>
      </div>
      <div className='w-auto p-10 mt-4'>
        <RecentReviews />        
      </div>
    </div>
  );
};

export default Dashboard;
