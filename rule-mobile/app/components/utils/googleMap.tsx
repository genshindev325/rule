import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { formatDateTime } from './datetime';
import EventCarousel from '@/app/components/user/event/eventCarousel';
import FindDetailModal from '../user/event/findDetailModal';

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
    address: string,
    access1: string,
    access2: string,
    description: string,
  };
  status: string;
  createdAt: string;
}

interface GoogleMapComponentProps {
  events: EventProps[];
  address: string;
  className: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ events, address, className }, ref) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';
  const searchSVG = '/svg/search.svg';
  const detailSVG = '/svg/detail.svg';
  const locationSVG = '/svg/location.svg';

  // handle find modal...
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0] && results[0].geometry.location) {
          const location = results[0].geometry.location;
          map.setCenter(location);
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    },
    [address]
  );

  const panToCurrentLocation = useCallback(() => {
    console.log("sdfsdf")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.panTo({
              lat: latitude,
              lng: longitude,
            });
            mapRef.current.setZoom(15); // Optionally, set the zoom level after moving to the location
          }
        },
        () => {
          alert('Could not get your location');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, []);
  
  const handleClickOutside = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const renderCustomMarker = (event: EventProps) => (
    <OverlayView
      key={event._id}
      position={{ lat: event.store.storeLat, lng: event.store.storeLng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        className={`relative -top-[4rem] -left-[27px] w-[54px] h-[54px] p-1 cursor-pointer rounded-md ${maleGradient}`}
        onClick={() => setSelectedEvent(event)}
      >
        {/* Event image */}
        <div className="relative w-full h-full bg-white rounded-md overflow-hidden border-2 border-white">
          <img
            src={event.coverImage}
            alt={event.eventName}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Arrow for the marker */}
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#7f96f2]`} />
      </div>
    </OverlayView>
  );

  const renderCustomInfoWindow = (event: EventProps) => (
    <OverlayView
      position={{ lat: event.store.storeLat, lng: event.store.storeLng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="relative z-50 bottom-[-10px] -left-24 bg-white rounded-lg shadow-lg p-1 w-48">
        {/* Info Window Content */}
        <div className="text-left">
          <h3 className="font-bold text-xs mb-1">{event.eventName}</h3>
          <p className="text-xs mt-1">
            <strong>日付:</strong> {formatDateTime(event.eventDate)}
          </p>
          <p className="text-xs">
            <strong>住所:</strong> {event.store.address}
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
      </div>
    </OverlayView>
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      onLoad={handleMapLoad}
      onClick={handleClickOutside} // Close InfoWindow when clicking outside
      options={{
        scrollwheel: true,
        draggable: true,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      mapContainerClassName={`absolute inset-0 ${className}`}
    >
      {events.map((event) => event.store && renderCustomMarker(event))}      
      {selectedEvent && renderCustomInfoWindow(selectedEvent)}
      
      {/* image carousel and buttons */}
      <div className='absolute bottom-11 left-0 right-0 flex flex-col items-center justify-center'>
        <div className='h-28 w-full shadow bg-white/70'>
          <EventCarousel events={events}/>
        </div>
        <div className='flex flex-row justify-center items-center space-x-12 md:space-x-36 pt-6 z-10'>
          <button className={`rounded-md w-10 h-10 ${!isModalOpen ? maleGradient : 'bg-gray-800'} fill-white duration-1000`} onClick={handleOpenModal}>
            <img src={searchSVG} className="rounded-md mx-auto w-4 fill-white" />
          </button>
          <button className={`rounded-md w-10 h-10 ${maleGradient} text-white`}>
            <img src={detailSVG} className="rounded-md mx-auto w-4 fill-white" />
          </button>
          <button className={`rounded-md w-10 h-10 ${maleGradient} text-white`} onClick={panToCurrentLocation}>
            <img src={locationSVG} className="rounded-md mx-auto w-4 fill-white" />
          </button>
        </div>
      </div>
      {/* Find event with more detail conditions */}
      <FindDetailModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
