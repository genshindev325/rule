// app/pages/dashboard.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, useIonRouter, IonButtons } from '@ionic/react';
import { SERVER_URL } from '@/app/config';
import { useAuth } from '@/app/components/auth/authContext';
import AuthWrapper from '@/app/components/auth/authWrapper';
import MainPanel from '@/app/components/store/dashboard/mainPanel';
import SideMenu from '@/app/components/store/IonMenu';
import EventCard from '@/app/components/event/eventCard';
import RecentReviews from '@/app/components/store/dashboard/recentReviews';
import ReviewModal from '@/app/components/store/dashboard/reviewModal';
import ReplyModal from '@/app/components/store/dashboard/replyModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface UpcomingEvent {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
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

const Dashboard = () => {
  const textXl = 'text-xl sm:text-2xl font-semibold';
  const textMd = 'text-md sm:text-lg font-semibold';
  const textSm = 'text-sm sm:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm';
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
  const router = useIonRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } else {
      const fetchData = async () => {
        try {
          // Fetch mainPanel Data
          const response_mainPanel = await fetch(`${SERVER_URL}/api/stores/main-panel`, {
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
          const response_recentReviews = await fetch(`${SERVER_URL}/api/reviews/store/filter`, {
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
          const response_upcomingEvents = await fetch(`${SERVER_URL}/api/stores/upcoming-events`, {
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

  const onSeeMoreEvent = () => {

  };

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" />
            <IonTitle  className='text-center font-semibold mr-12'>ダッシュボード</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">ダッシュボード</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className='min-h-screen w-full flex flex-col space-y-4 ion-padding bg-gray-100'>
            <MainPanel {...mainPanelData} />
            {/* upcoming events */}
            <div className={`${textSm}`}>今後のイベント</div>
            {upcomingEvents.map((event, index) => (          
              <div key={index}>
                <EventCard { ...event } />
              </div>
            ))}
            <span className='underline underline-offset-2 text-sm mx-auto text-gray-800' onClick={onSeeMoreEvent}>
              もっと見る
            </span>
            {/* recent reviews */}
            <div className={`${textSm}`}>最近のレビュー</div>
            <RecentReviews reviews={recentReviews} onSeeMore={handleOpenReviewModal} onSelectReview={handleOpenReplyModal} />
            <ReviewModal isOpen={isReviewModalOpen} reviews={recentReviews} onClose={handleCloseReviewModal} onSelectReview={handleOpenReplyModal} />
            {replyReview && <ReplyModal isOpen={isReplyModalOpen} review={replyReview} onClose={handleCloseReplyModal} />}
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  )
}

export default Dashboard;