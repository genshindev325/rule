// app/admin/events/page.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/admin/navbar';
import UpcomingEvents from '@/components/admin/events/upcomingEvents';
import PastEvents from '@/components/admin/events/pastEvents';

interface UpcomingEvent {
  id: number,
  eventName: string,
  date: string,
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number
}

interface PastEvent {
  eventName: string,
  date: string,
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number,
  earnings: number
}

const Events = () => {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recentReviews Data
        const response_recentReviews = await fetch('/api/admin/events/pastEvents');
        if (response_recentReviews.ok) {
          const result_recentReviews = await response_recentReviews.json();
          setPastEvents(result_recentReviews.pastEvents);
        } else {
          console.error('Failed to fetch recentReviews data');
        }

        // Fetch upcomingEvents Data
        const response_upcomingEvents = await fetch('/api/admin/events/upcomingEvents');
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

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen min-w-full flex bg-gray-100">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-3/4 p-10">
          <div className="mt-8">
            <div className='flex flex-row gap-8 pb-4 items-center'>
              <h3 className="text-lg font-semibold mb-4">今後のイベント</h3>
              {/* <button type='button' className='rounded-lg bg-blue-500 text-white text-md p-2 w-36 hover:bg-blue-600'>
                イベント作成
              </button> */}
            </div>
            <UpcomingEvents upcomingEvents={upcomingEvents} />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">過去のイベント</h3>
            <PastEvents pastEvents={pastEvents} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Events;
