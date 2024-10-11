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
  const textMd = 'text-md sm:text-lg font-semibold';
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
              <IonTitle className='text-center font-semibold mr-12 text-gray-800'>イベント一覧</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className='w-full h-full bg-gray-100'>
            {/* tab */}
            <div className='fixed top-11 flex flex-row w-full ion-padding bg-gray-100 pt-8 z-50'>
              <div className='flex flex-1 justify-center items-center'>
                <button
                  type='button'
                  className={`${tab === 'upcoming' ? 'bg-blue-400 text-white rounded-lg' : 'bg-transparent text-gray-700'} ${textMd} duration-500 py-1 px-2`}
                  onClick={showUpcomingEvents}
                >
                  今後のイベント
                </button>
              </div>
              <div className='flex flex-1 justify-center items-center'>
                <button
                  type='button'
                  className={`${tab === 'past' ? 'bg-blue-400 text-white rounded-lg' : 'bg-transparent text-gray-700'} ${textMd} duration-500 py-1 px-2`}
                  onClick={showPastEvents}
                >
                  過去のイベント
                </button>
              </div>
            </div>
            <div className='w-full flex flex-col bg-gray-100 ion-padding pt-20 pb-4 text-gray-800'>
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
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default EventList;