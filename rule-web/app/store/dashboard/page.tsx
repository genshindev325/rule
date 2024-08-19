// app/store/dashboard/page.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import RecentReviews from '@/components/store/dashboard/recentReviews';
import ReviewModal from '@/components/store/dashboard/reviewModal';
import UpcomingEvents from '@/components/store/dashboard/upcomingEvents';
import MainPanel from '@/components/store/dashboard/mainPanel';

interface UpcomingEvent {
  name: string,
  date: string,
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number,
};

interface RecentReview {
  user: string,
  date: string,
  content: string,
  conclusion: string,
  rating: number,
};

interface MainPanelProps {
  lastMonthSales: number,
  thisMonthSales: number,
  scheduledEvents: number,
  unreachedCases: number,
  reviews: number,
  reviewResponseRate: number
};

const Dashboard = () => {
  const [mainPanelData, setMainPanelData] = useState<MainPanelProps>({
    lastMonthSales: 0,
    thisMonthSales: 0,
    scheduledEvents: 0,
    unreachedCases: 0,
    reviews: 0,
    reviewResponseRate: 0,
  });
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch mainPanel Data
        const response_mainPanel = await fetch('/api/store/dashboard/mainPanel');
        if (response_mainPanel.ok) {
          const result_mainPanel = await response_mainPanel.json();
          setMainPanelData(result_mainPanel);
        } else {
          console.error('Failed to fetch mainPanel data');
        }

        // Fetch recentReviews Data
        const response_recentReviews = await fetch('/api/store/dashboard/recentReviews');
        if (response_recentReviews.ok) {
          const result_recentReviews = await response_recentReviews.json();
          setRecentReviews(result_recentReviews.recentReviews);
        } else {
          console.error('Failed to fetch recentReviews data');
        }

        // Fetch upcomingEvents Data
        const response_upcomingEvents = await fetch('/api/store/dashboard/upcomingEvents');
        if (response_upcomingEvents.ok) {
          const result_upcomingEvents = await response_upcomingEvents.json();
          setUpcomingEvents(result_upcomingEvents.upcomingEvents);
        } else {
          console.error('Failed to fetch upcomingEvents data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>Loading...</div>;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-3/4 p-10">
          <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>
          <MainPanel {...mainPanelData} />
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">今後のイベント</h3>
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </div>
        <div className='w-auto p-10 mt-4'>
          <RecentReviews onSeeMore={handleOpenModal} reviews={recentReviews} />        
        </div>
        <ReviewModal
          isOpen={isModalOpen}
          reviews={recentReviews}
          onClose={handleCloseModal}
        />
      </div>
    </AuthWrapper>
  );
};

export default Dashboard;
