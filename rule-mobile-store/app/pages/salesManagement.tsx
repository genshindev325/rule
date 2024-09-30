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

interface EventProps {
  name: string;
  date: string;
  earnings: number;
  coverImage: string;
}

const SalesManagement = () => {
  const textSm = 'text-sm sm:text-md font-semibold';
  const textXs = 'text-xs sm:text-sm';
  const [loading, setLoading] = useState(true); 
  const [events, setEvents] = useState<EventProps[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useIonRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    } else {
      const fetchData = async () => {
        try {
          // Fetch salesManagement Data
          const response_salesManagement = await fetch(`${SERVER_URL}/api/stores/sales-management`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
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
    }
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;

  return (
    <AuthWrapper allowedRoles={['store']}>
      <SideMenu />
      <IonPage id='main-content'>
        <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" /> {/* This button opens the SideMenu */}
              <IonTitle className='text-center font-bold text-2xl mr-12'>売り上げ管理</IonTitle> {/* Default title */}
            </IonToolbar>
          </IonHeader>
        <IonContent>
          <div className="w-full p-4 bg-gray-100">
            <TotalSales totalSales={totalSales} />
            <div className="mt-4">
              <h3 className={`${textSm}`}>期間指定</h3>
              <div className='flex flex-row py-2 gap-4'>
                <span className='p-2 border-none rounded-lg bg-gray-200 flex-1'>
                  2022年 11月 14日
                </span>
                <span className='p-2 border-none rounded-lg bg-gray-200 flex-1'>
                  2023年 11月 14日
                </span>
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