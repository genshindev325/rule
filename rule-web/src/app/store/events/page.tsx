// app/store/events/page.tsx

'use client';

import React, { useState, useEffect } from 'react';

import AuthWrapper from '@/components/auth/authWrapper';
import Navbar from '@/components/store/navbar';
import UpcomingEvents from '@/components/store/events/upcomingEvents';
import PastEvents from '@/components/store/events/pastEvents';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

interface UpcomingEvent {
  eventName: string | "---",
  eventDate: string | "---",
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number,
  store: {
    _id: string,
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
    _id: string,
    storeName: string
  },
}

const Events = () => {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true); 
  const token = useSelector((state: RootState) => state.auth.token);
  const storeProfile = useSelector((state: RootState) => state.auth.profile);
  const router = useRouter();

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
    }
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  const filteredUpcomingEvents = upcomingEvents.filter(event =>
    event.store && event.store._id === storeProfile?._id
  );
  
  const filteredPastEvents = pastEvents.filter(event =>
    event.store && event.store._id === storeProfile?._id
  );

  const handleCreateEvent = () => {
    router.push('/store/eventSettings');
  }

  return (
    <AuthWrapper allowedRoles={['store']}>
      <div className="min-h-screen min-w-full flex bg-gray-100 text-gray-800">
        <div className="w-20">
          <Navbar />
        </div>
        <div className="w-3/4 p-10">
          <div className="mt-8">
            <div className='flex flex-row gap-8 pb-4 items-center'>
              <h3 className="text-lg font-semibold">今後のイベント</h3>
              <button type='button' onClick={handleCreateEvent} className='rounded-lg bg-blue-500 text-white text-md p-1 w-36 hover:bg-blue-600'>
                イベント作成
              </button>
            </div>
            <UpcomingEvents upcomingEvents={filteredUpcomingEvents} />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">過去のイベント</h3>
            <PastEvents pastEvents={filteredPastEvents} />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Events;
