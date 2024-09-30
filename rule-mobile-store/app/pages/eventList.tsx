// app/pages/eventList.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, IonRouterLink, useIonRouter } from '@ionic/react';
import { SERVER_URL } from '@/app/config';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import EventCard from '@/app/components/event/eventCard';
import EventReviewCard from '@/app/components/event/eventReviewCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface UpcomingEventProps {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
}

interface PastEventProps {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
  rating: number;
  store: {
    _id: string;
    rating: number;
    address: string;
    access1: string;
    access2: string;
    description: string;
    storeImages: string;
    storeName: string;
  };
}

const EventList: React.FC = () => {
  const textXl = 'text-xl sm:text-2xl font-bold';
  const textMd = 'text-md sm:text-lg font-bold';
  const textSm = 'text-sm sm:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm';
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventProps[]>([]);
  const [pastEvents, setPastEvents] = useState<PastEventProps[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useIonRouter();

  const showUpcomingEvents = () => {
    setTab('upcoming');
  }

  const showPastEvents = () => {
    setTab('past');
  }

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } else {
      const fetchEventData = async () => {
        try {
          // get upcoming events
          const response_upcomingEvents = await fetch(`${SERVER_URL}/api/events/filter`, {
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
          const response_pastEvents = await fetch(`${SERVER_URL}/api/events/filter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ past: true })
          });
          if (response_pastEvents.status === 200) {
            const result = await response_pastEvents.json();
            const result_events: PastEventProps[] = result.data;
            const filterEvents = result_events.filter(event => event && event.store !== null);
            setPastEvents(filterEvents);
          } else {
            console.log(response_pastEvents.status);
            console.log("Getting past events failed.")
          }
        } catch(error) {
          console.error("An error occurred during get events:", error);
        }
      }

      fetchEventData();
    }
  }, [])

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-bold text-2xl mr-12'>イベント一覧</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>
          <div className='min-h-screen min-w-full flex flex-col space-y-4 bg-gray-100 px-4 sm:px-6'>
            {/* tab */}
            <div className='flex flex-row border-b-2 border-gray-300 my-4'>
              <button
                type='button'
                className={`${tab === 'upcoming' ? 'text-blue-500 underline underline-offset-4' : 'bg-transparent'} ${textMd} flex-1`}
                onClick={showUpcomingEvents}
              >
                今後のイベント
              </button>
              <button
                type='button'
                className={`${tab === 'past' ? 'text-blue-500 underline underline-offset-4' : 'bg-transparent'} ${textMd} flex-1`}
                onClick={showPastEvents}
              >
                過去のイベント
              </button>
            </div>
            {/* upcoming events */}
            <div className={`${tab === 'upcoming' ? '' : 'hidden'} space-y-2`}>
              {upcomingEvents.map((event, index) => (          
                <div key={index}>
                  <EventCard { ...event } />
                </div>
              ))}
            </div>
            {/* past events */}
            <div className={`${tab === 'past' ? '' : 'hidden'} space-y-2`}>
              {pastEvents.map((event, index) => (
                <div key={index}>
                  <EventReviewCard { ...event } />
                </div>
              ))}
            </div>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default EventList;