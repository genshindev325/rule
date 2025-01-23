'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRouterLink, useIonRouter } from '@ionic/react';
import { FaSearch } from 'react-icons/fa';
import AuthWrapper from '@/app/components/auth/authWrapper';
import GoogleMapBackground from '@/app/components/utils/googleMap';
import SearchResultModal from '@/app/components/user/event/SearchResultModal';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedEvents, setSearchedEvents] = useState<EventProps[]>([]);
  const [isOpenSearchResultModal, setIsOpenSearchResultModal] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const POLLING_INTERVAL = 1000 * 60;
  
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        router.push('/auth/login');
      } else {
        try {
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
    const intervalId = setInterval(fetchData, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    if (searchTerm !== '') {
      const searchResult = upcomingEvents.filter(event => {
        return (
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.store.cookingGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.store.foodGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.store.storeGenre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.store.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
      });
      setSearchedEvents(searchResult);
      setIsOpenSearchResultModal(true);
    }
  };

  const handleCloseSearchResultModal = () => {
    setIsOpenSearchResultModal(false);
    setSearchTerm('');
    setSearchedEvents([]);
  }

  if (loading) {
    return <div className='w-screen h-[calc(100vh-56px)] flex items-center justify-center text-gray-800 text-3xl font-bold'>読み込み中...</div>;
  }

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col h-[calc(100vh-56px)] w-screen bg-white text-gray-800">
            {/* Header */}
            <div className={`h-36 sm:h-40 md:h-44 w-full ${maleGradient} z-10`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-16 sm:pt-20 md:pt-24 px-4'>
                <button onClick={() => router.goBack()}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </button>
                <h2 className='grow pr-6'>イベントを探す</h2>
              </div>
              <div className="flex flex-row items-center bg-white rounded-lg shadow-xl pl-2 pr-7 md:pl-4 md:pr-9 mx-10 sm:mx-12 mt-2 sm:mt-4">
                {/* <img src={settingSVG} alt="settings" className="w-4" /> */}
                <button onClick={handleSearch} className='text-[#7D67EE]'>
                  <FaSearch />
                </button>
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs w-full py-2 pl-2 text-left placeholder:text-center text-gray-800 focus:outline-none"
                  placeholder='イベントを検索する'
                />
              </div>
            </div>
            {/* Google Map background */}
            <GoogleMapBackground events={upcomingEvents} address="Osaka, Japan" className="w-full" />
            <SearchResultModal isOpen={isOpenSearchResultModal} resultEvents={searchedEvents} onClose={handleCloseSearchResultModal} />
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default FindOnMap;
