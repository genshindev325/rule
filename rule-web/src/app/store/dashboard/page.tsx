// app/store/dashboard/page.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import { useAuth } from '@/components/auth/authContext';
import Navbar from '@/components/store/navbar';
import RecentReviews from '@/components/store/dashboard/recentReviews';
import ReviewModal from '@/components/store/dashboard/reviewModal';
import ReplyModal from '@/components/store/dashboard/replyModal';
import UpcomingEvents from '@/components/store/events/upcomingEvents';
import MainPanel from '@/components/store/dashboard/mainPanel';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

interface UpcomingEvent {
  _id: number,
  eventName: string,
  eventDate: string,
  maleTotal: string | null,
  males: number,
  femaleTotal: string | null,
  females: number,
  store: {
    _id: string,
    storeName: string
  },
};

interface RecentReview {
  _id: string,
  createdAt: string,
  createdBy: {
    email: string;
    nickname: string;
    avatar: string;
  },
  storeReviewText: string,
  conclusion: string,
  storeRating: number,
  eventName: string
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
  const [replyReview, setReplyReview] = useState<RecentReview>();
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const { profile } = useAuth();
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const POLLING_INTERVAL = 1000 * 60;

  useEffect(() => {
    if (!token) {
      router.push('/auth/signin');
      } else {
      const fetchData = async () => {
        try {
          // Fetch mainPanel Data
          const response_mainPanel = await fetch('/api/stores/main-panel', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ storeId: profile?._id }),
          });
          if (response_mainPanel.ok) {
            const result_mainPanel = await response_mainPanel.json();
            setMainPanelData(result_mainPanel);
          } else {
            console.error('Failed to fetch mainPanel data');
          }

          // Fetch recentReviews Data
          const response_recentReviews = await fetch('/api/reviews/store/filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
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
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
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
      const intervalId = setInterval(fetchData, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
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

  const noticeReplySuccess = () => {
    toast.success('返信は成功しました。', {
      position: "top-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    console.log("reply successful")
  }

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="relative min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-24">
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
          <RecentReviews onSeeMore={handleOpenReviewModal} reviews={recentReviews} onSelectReview={handleOpenReplyModal} />        
        </div>
        <ReviewModal isOpen={isReviewModalOpen} reviews={recentReviews} onClose={handleCloseReviewModal} onSelectReview={handleOpenReplyModal} />
        {replyReview && <ReplyModal isOpen={isReplyModalOpen} review={replyReview} onClose={handleCloseReplyModal} noticeReplySuccess={noticeReplySuccess} />}
      </div>
    </AuthWrapper>
  );
};

export default Dashboard;
