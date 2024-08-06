// pages/dashboard.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import RecentReviews from '@/components/dashboard/recentReviews';
import ReviewModal from '@/components/dashboard/reviewModal';
import UpcomingEvents from '@/components/dashboard/upcomingEvents';
import MainPanel from '@/components/dashboard/mainPanel';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<string[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddReview = (review: string) => {
    setReviews([...reviews, review]);
  };

  return (
    <div className="min-h-screen min-w-full flex bg-gray-100">
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
        <RecentReviews onSeeMore={handleOpenModal} />        
      </div>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default Dashboard;
