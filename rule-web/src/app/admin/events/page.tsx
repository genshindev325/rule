// app/admin/events/page.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/admin/navbar';
import UpcomingEvents from '@/components/admin/events/upcomingEvents';
import PastEvents from '@/components/admin/events/pastEvents';
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
    storeName: string
  },
}

interface PastEvent {
  eventName: string,
  eventDate: string | "---",
  maleTotal: number,
  males: number,
  maleFee: number,
  femaleTotal: number,
  females: number,
  femaleFee: number,
  earnings: number,
  store: {
    storeName: string
  },
}

const Events = () => {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true); 
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const POLLING_INTERVAL = 1000 * 60;

  useEffect(() => {
    if (!token) {
      router.push('/auth/signin');
    } else {
      const fetchData = async () => {
        try {
          // get upcoming events
          const response_upcomingEvents = await fetch('/api/events/filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ upcoming: true }),
          });
          if (response_upcomingEvents.status === 200) {
            const result = await response_upcomingEvents.json();
            setUpcomingEvents(result.data);
          } else {
            console.log(response_upcomingEvents.status);
            console.log("Getting upcoming events failed.");
          }

          // get past events
          const response_pastEvents = await fetch('/api/events/filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ past: true })
          });
          if (response_pastEvents.status === 200) {
            const result = await response_pastEvents.json();
            setPastEvents(result.data);
          } else {
            console.log(response_pastEvents.status);
            console.log("Getting past events failed.")
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

  return (
    <AuthWrapper allowedRoles={['admin']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-24">
          <Navbar />
        </div>
        <div className="w-full p-10">
          <div className="mt-0">
            <div className='flex flex-row gap-8 pb-4 items-center'>
              <h3 className="text-2xl font-bold mb-4">今後のイベント</h3>
            </div>
            <UpcomingEvents upcomingEvents={upcomingEvents} />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">過去のイベント</h3>
            <PastEvents pastEvents={pastEvents} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Events;
