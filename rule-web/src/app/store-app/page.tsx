// app/user/auth/login.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/authContext';
import MainPanel from '@/components/test/dashboard/mainPanel';
import UpcomingEvents from '@/components/test/dashboard/upcomingEvents';
import RecentReviews from '@/components/test/dashboard/recentReviews';
import ReviewModal from '@/components/test/dashboard/reviewModal';
import ReplyModal from '@/components/test/dashboard/replyModal';

interface UpcomingEvent {
  eventName: string,
  eventDate: string,
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number,
};

interface RecentReview {
  createdAt: string,
  createdBy: {
    email: string;
    nickname: string;
    avatar: string;
  },
  storeReviewText: string,
  conclusion: string,
  storeRating: number,
};

interface MainPanelProps {
  lastMonthSales: number,
  thisMonthSales: number,
  scheduledEvents: number,
  unreachedCases: number,
  reviews: number,
  reviewResponseRate: number
};

const test: React.FC = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textSm = 'text-sm md:text-md font-semibold';
  const [mainPanelData, setMainPanelData] = useState<MainPanelProps>({
    lastMonthSales: 0,
    thisMonthSales: 0,
    scheduledEvents: 0,
    unreachedCases: 0,
    reviews: 0,
    reviewResponseRate: 0,
  });
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([]);
  const [replyReview, setReplyReview] = useState<RecentReview>();
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true); 
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch mainPanel Data
        const response_mainPanel = await fetch('/api/stores/main-panel');
        if (response_mainPanel.ok) {
          const result_mainPanel = await response_mainPanel.json();
          setMainPanelData(result_mainPanel);
        } else {
          console.error('Failed to fetch mainPanel data');
        }

        // Fetch recentReviews Data
        const response_recentReviews = await fetch('/api/reviews/store/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storeId: profile?._id })
        });
        if (response_recentReviews.ok) {
          const result_recentReviews = await response_recentReviews.json();
          setRecentReviews(result_recentReviews.data);
        } else {
          console.error('Failed to fetch recentReviews data');
        }

        // Fetch upcomingEvents Data
        const response_upcomingEvents = await fetch('/api/stores/upcoming-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ store: profile?._id }),
        });
        if (response_upcomingEvents.ok) {
          const result_upcomingEvents = await response_upcomingEvents.json();
          setUpcomingEvents(result_upcomingEvents.data);
        } else {
          // Error handler
          console.error('Failed to fetch upcoming events data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleOpenReplyModal = (review: RecentReview) => {
    setIsReplyModalOpen(true);
    setIsReviewModalOpen(false);
    setReplyReview(review);
  };

  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
  };

  return (
    <div className='min-h-screen min-w-full flex flex-col space-y-4 bg-gray-100'>
      <MainPanel {...mainPanelData} />
      <div className="mt-4">
        <h3 className={`${textXl} mb-4`}>今後のイベント</h3>
        <UpcomingEvents events={upcomingEvents} />
      </div>
      <div className='w-auto p-10 mt-4'>
        <RecentReviews onSeeMore={handleOpenReviewModal} reviews={recentReviews} onSelectReview={handleOpenReplyModal} />        
      </div>
      <ReviewModal isOpen={isReviewModalOpen} reviews={recentReviews} onClose={handleCloseReviewModal} onSelectReview={handleOpenReplyModal} />
      {replyReview && <ReplyModal isOpen={isReplyModalOpen} review={replyReview} onClose={handleCloseReplyModal} />}
    </div>
  );
};

export default test;
