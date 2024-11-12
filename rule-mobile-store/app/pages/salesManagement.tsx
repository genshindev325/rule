// app/pages/salesManagement.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonMenuButton, IonTitle, useIonRouter } from '@ionic/react';
import { SERVER_URL } from '@/app/config';
import SideMenu from '@/app/components/store/IonMenu';
import AuthWrapper from '@/app/components/auth/authWrapper';
import TotalSales from '@/app/components/store/salesManagement/totalSales';
import EventHistory from '@/app/components/store/salesManagement/eventHistory';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAuth } from '../components/auth/authContext';

interface EventProps {
  eventName: string;
  eventDate: string;
  totalEarnings: number;
  coverImage: string;
}
// Get today's date in the YYYY-MM-DD format
const today = new Date();
const getTodayDate = (): string => {
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SalesManagement = () => {
  const textSm = 'text-sm sm:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm';
  const [loading, setLoading] = useState(true); 
  const [events, setEvents] = useState<EventProps[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate());
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useIonRouter();
  const { profile } = useAuth();
  const store = profile?._id;
  const POLLING_INTERVAL = 1000 * 60;

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } else {
      const fetchData = async () => {
        try {
          // Fetch salesManagement Data
          const response_salesManagement = await fetch(`${SERVER_URL}/api/stores/sales-management`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              startDate, endDate, store
            })
          });
          if (response_salesManagement.ok) {
            const result_salesManagement = await response_salesManagement.json();
            setEvents(result_salesManagement.events);
            setTotalSales(result_salesManagement.totalSales)
          } else {
            console.error('Failed to fetch salesManagement data');
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
  }, [startDate, endDate, totalSales]);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold text-gray-800'>読み込み中...</div>;

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-semibold mr-12 text-gray-800'>売り上げ管理</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent fullscreen>
          <div className="w-full ion-padding bg-gray-100 text-gray-800">
            <TotalSales totalSales={totalSales} />
            <div className="mt-4">
              <h3 className={`${textSm}`}>期間指定</h3>
              <div className='flex flex-row py-2 gap-4'>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 p-2 text-xs sm:text-sm bg-gray-200 rounded-lg focus:outline-none border-none"
                  value={startDate}
                  required
                />
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 p-2 text-xs sm:text-sm bg-gray-200 rounded-lg focus:outline-none border-none"
                  value={endDate}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <EventHistory events={events} />
            </div>
          </div>
        </IonContent>
      </IonPage>
    </AuthWrapper>
  );
}

export default SalesManagement;