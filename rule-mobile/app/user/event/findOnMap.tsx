'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';

import AuthWrapper from '@/app/components/auth/authWrapper';
import GoogleMapBackground from '@/app/components/utils/googleMap';
import { SERVER_URL } from '@/app/config';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

interface EventProps {
  _id: string;
  eventName: string;
  category: string;
  coverImage: string;
  description: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
  store: {
    storeLat: number;
    storeLng: number;
    storeName: string;
    storeImages: string[];
    cookingGenre: string;
    foodGenre: string;
    storeGenre: string;
    address: string;
    access: string[];
    description: string;
    status: string;
  };
  status: string;
  createdAt: string;
}

const FindOnMap: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const router = useIonRouter();
  const [loading, setLoading] = useState(true); // Fixed
  const [upcomingEvents, setUpcomingEvents] = useState<EventProps[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const searchBlackSVG = '/svg/search-black.svg';
  const settingSVG = '/svg/settings.svg';
  
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        router.push('/auth/login');
      } else {
        try {
          setLoading(true);
          const response = await fetch(`${SERVER_URL}/api/events/filter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ upcoming: true }),
          });
          if (response.status === 200) {
            const result = await response.json();
            setUpcomingEvents(result.data);
          } else {
            console.error('Failed to fetch upcomingEvents data');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold text-gray-800'>読み込み中...</div>;
  }

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col min-h-screen w-screen bg-white text-gray-800">
            {/* Header */}
            <div className={`h-36 sm:h-40 md:h-44 w-full ${maleGradient} z-10`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-16 sm:pt-20 md:pt-24 px-4'>
                <IonRouterLink routerLink={'/home'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>イベントを探す</h2>
              </div>
              <div className="flex flex-row items-center bg-white rounded-lg shadow-xl py-1 px-2 md:px-4 mx-8 sm:mx-9 mt-4">
                <img src={settingSVG} alt="settings" className="w-4" />
                <h2 className="text-xs py-1 sm:py-2 pl-2 text-left">イベントを検索する</h2>
                <img src={searchBlackSVG} alt="search" className="ml-auto w-3" />
              </div>
            </div>
            {/* Google Map Background */}
            <GoogleMapBackground events={upcomingEvents} address="Osaka, Japan" className="w-full" />
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default FindOnMap;
