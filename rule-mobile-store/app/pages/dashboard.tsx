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
import EventSettingModal from '@/app/components/event/EventSettingModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface UpcomingEvent {
  _id: string;
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: string;
  maleTotal: string;
  males: number;
  femaleFee: string;
  femaleTotal: string;
  females: number;
  category: string;
  description: string;
  eventStartTime: Date;
  eventEndTime: Date;
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
  eventName: string,
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
  const textSm = 'text-sm sm:text-base font-semibold';
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
  const [isShowAllUpcomingEvents, setIsShowAllUpcomingEvents] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isEventSettingOpen, setIsEventSettingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent>({
    _id: '',
    eventName: '',
    eventDate: '',
    coverImage: '',
    maleFee: '',
    maleTotal: '',
    males: 0,
    femaleFee: '',
    femaleTotal: '',
    females: 0,
    category: '',
    description: '',
    eventStartTime: new Date(),
    eventEndTime: new Date(),
  });
  const { profile } = useAuth();
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useIonRouter();
  const POLLING_INTERVAL = 1000 * 60;

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
      const intervalId = setInterval(fetchData, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-xl font-bold'>読み込み中...</div>;

  const handleOpenReplyModal = (review: RecentReview) => {
    setIsReplyModalOpen(true);
    setIsReviewModalOpen(false);
    setReplyReview(review);
  };

  const handleOpenEvenDetailModal = (event: UpcomingEvent) => {
    setSelectedEvent(event);
    setIsEventSettingOpen(true);
  }

  const handleChangeEventDetail = (eventId: string, eventName: string, coverImage: string, eventDate: string, maleFee: string, maleTotal: string, femaleFee: string, femaleTotal: string) => {
    setUpcomingEvents(prevEvents => prevEvents.map(event =>
      event._id === eventId ?
        {
          ...event,
          eventName: eventName,
          coverImage: coverImage,
          eventDate: eventDate,
          maleFee: maleFee,
          maleTotal: maleTotal,
          femaleFee: femaleFee,
          femaleTotal: femaleTotal,
        }
      : event
    ))
  };

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
          <IonToolbar>
            <IonTitle>ダッシュボード</IonTitle>
            <IonButtons slot='start'>
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className='min-h-screen w-full flex flex-col space-y-4 ion-padding bg-gray-100 text-gray-800'>
            <MainPanel {...mainPanelData} />
            {/* upcoming events */}
            <div className={`${textSm}`}>今後のイベント</div>
            {isShowAllUpcomingEvents ?
              upcomingEvents.map((event, index) => (
                <button type='button' key={index} onClick={() => handleOpenEvenDetailModal(event)}>
                  <EventCard { ...event } />
                </button>
              ))
            :
              upcomingEvents.slice(0,3).map((event, index) => (
                <button type='button' key={index} onClick={() => handleOpenEvenDetailModal(event)}>
                  <EventCard { ...event } />
                </button>
              ))
            }
            {upcomingEvents.length === 0 &&
              <p className='text-center text-xs py-6'>今後のイベントはまだありません。</p>
            }
            {upcomingEvents.length > 3 && isShowAllUpcomingEvents === false &&
              <button type='button' className='text-center text-xs p-2 text-gray-800 bg-gray-200 hover:bg-gray-300 duration-200' onClick={() => setIsShowAllUpcomingEvents(true)}>
                もっと見る
              </button>
            }
            {upcomingEvents.length > 3 && isShowAllUpcomingEvents === true &&
              <button type='button' className='text-center text-xs p-2 text-gray-800 bg-gray-200 hover:bg-gray-300 duration-200' onClick={() => setIsShowAllUpcomingEvents(false)}>
                表示を減らす
              </button>
            }
            {/* recent reviews */}
            <div className={`${textSm}`}>最近のレビュー</div>
            <RecentReviews reviews={recentReviews} onSeeMore={() => setIsReviewModalOpen(true)} onSelectReview={handleOpenReplyModal} />
            <ReviewModal isOpen={isReviewModalOpen} reviews={recentReviews} onClose={() => setIsReviewModalOpen(false)} onSelectReview={handleOpenReplyModal} />
            {replyReview && <ReplyModal isOpen={isReplyModalOpen} review={replyReview} onClose={() => setIsReplyModalOpen(false)} />}
            <EventSettingModal isOpen={isEventSettingOpen} onClose={() => setIsEventSettingOpen(false)} event={selectedEvent} onChangeEventDetail={handleChangeEventDetail}/>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  )
}

export default Dashboard;