// app/user/event/findOnMap.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';

import EventCarousel from '@/app/components/user/event/eventCarousel';
import FindDetailModal from '@/app/components/user/event/findDetailModal';
import AuthWrapper from '@/app/components/auth/authWrapper';
import GoogleMapBackground from '@/app/components/utils/googleMap';
import { SERVER_URL } from '@/app/config';

interface EventProps {
  _id: string,
  eventName: string,
  category: string,
  coverImage: string,
  description: string,
  eventDate: string,
  eventStartTime: string,
  eventEndTime: string,
  maleFee: number,
  maleTotal: number,
  males: number,
  femaleFee: number,
  femaleTotal: number,
  females: number,
  store: {
    storeLat: number,
    storeLng: number,
    storeName: string,
    address: string,
    access1: string,
    access2: string,
    description: string,
  };
  status: string,
  createdAt: string
}

const FindOnMap: React.FC = () => {
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const searchSVG = '/svg/search.svg';
  const searchBlackSVG = '/svg/search-black.svg';
  const settingSVG = '/svg/settings.svg';
  const detailSVG = '/svg/detail.svg';
  const locationSVG = '/svg/location.svg';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<EventProps[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch upcomingEvents Data
        const response = await fetch(`${SERVER_URL}/api/events/filter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ upcoming: true, limit: 6 })
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
    };

    fetchData();
  }, []);

  if (loading) return <div className='w-screen h-screen flex items-center justify-center text-3xl font-bold'>読み込み中...</div>;
  
  const handle20Over = () => {};
  const handleStudent = () => {};
  const handleSocial = () => {};
  const handleAnime = () => {};

  // handle find modal...
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to move the map to the new location (this will be passed to the GoogleMapBackground component)
  const moveToLocation = (latLng: google.maps.LatLng) => {
    if (mapRef.current) {
      mapRef.current.panTo(latLng); // Move the map to the new coordinates
    }
  };

  // This function will handle the location button click
  const handleLocationClick = () => {
    // Use Geolocation to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          moveToLocation(latLng);
        },
        () => {
          // If Geolocation fails, fall back to a default location (e.g., 'Osaka, Japan')
          geocodeAddress('Osaka, Japan');
        }
      );
    } else {
      // If geolocation is not available, geocode the default address
      geocodeAddress('Osaka, Japan');
    }
  };

  // Fallback: Geocode an address into latitude and longitude
  const geocodeAddress = (address: string) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const latLng = results[0].geometry.location;
        moveToLocation(latLng);
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  return (
    <IonPage>
      <IonContent>
        <AuthWrapper allowedRoles={['user']}>
          <div className="flex flex-col min-h-screen w-screen bg-white">
            {/* header */}
            <div className={`h-28 md:h-32 w-full ${maleGradient} z-10`}>
              <div className='flex flex-row text-lg font-semibold text-center text-white pt-4 px-4'>
                <IonRouterLink routerLink={'/home'}>
                  <img src='/svg/arrow-left-white.svg' className='w-6 h-6' />
                </IonRouterLink>
                <h2 className='grow pr-4'>イベントを探す</h2>
              </div>
              <div className="flex flex-row items-center bg-white rounded-lg shadow-xl px-2 md:px-4 mx-8 md:mx-20 mt-4">
                <img src={settingSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white w-4" onClick={handleOpenModal}/>
                <h2 className="text-sm font-semibold py-1 md:py-4 pl-2 text-left">イベントを検索する</h2>
                <img src={searchBlackSVG} alt={`event-profile`} className="rounded-md rounded-br-none text-white ml-auto w-3" />
              </div>
            </div>
            {/* Google Map background */}
            <GoogleMapBackground ref={mapRef} events={upcomingEvents} address='Osaka, Japan' className='w-full' moveToLocation={moveToLocation} />
            {/* content */}
            <div className='flex flex-row justify-center space-x-2 text-xs sm:text-sm md:text-md lg:text-lg font-semibold mt-2 z-10'>
              <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handle20Over}>20代以上</button>
              <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleStudent}>大学生Only</button>
              <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleSocial}>社会人Only</button>
              <button className='rounded-full bg-white shadow-lg px-2 sm:px-3 md:px-4 py-1' onClick={handleAnime}>アニメ好き</button>
            </div>
            <div className='h-28 mt-[280px] sm:mt-[230px] md:mt-[240px] z-10 shadow bg-white/70'>
              {/* events should be changed into upcomingEvents after adding API call */}
              <EventCarousel events={upcomingEvents}/>
            </div>
            {/* buttons */}
            <div className='flex flex-row justify-center items-center space-x-12 md:space-x-36 pt-6 z-10'>
              <button className={`rounded-md w-10 h-10 ${maleGradient} fill-white`}>
                <img src={searchSVG} className="rounded-md mx-auto w-4 fill-white" />
              </button>
              <button className={`rounded-md w-10 h-10 ${maleGradient} text-white`}>
                <IonRouterLink routerLink='/home'>
                  <img src={detailSVG} className="rounded-md mx-auto w-4 fill-white" />
                </IonRouterLink>
              </button>
              <button className={`rounded-md w-10 h-10 ${maleGradient} text-white`} onClick={handleLocationClick}>
                <img src={locationSVG} className="rounded-md mx-auto w-4 fill-white" />
              </button>
            </div>
            {/* Find event with more detail conditions */}
            <FindDetailModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </AuthWrapper>
      </IonContent>
    </IonPage>
  );
};

export default FindOnMap;
