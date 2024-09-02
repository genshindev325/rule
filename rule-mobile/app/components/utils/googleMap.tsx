import React, { useCallback, useRef } from 'react';
import { GoogleMap } from '@react-google-maps/api';

interface StoreProps {
  
}

interface GoogleMapComponentProps {
  apiKey: string;
  address: string;
  className: string
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ apiKey, address, className }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Center map to the address
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0] && results[0].geometry.location) {
        const location = results[0].geometry.location;
        map.setCenter(location);
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }, [address]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      onLoad={handleMapLoad}
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
      {/* Additional Markers or Components can be added here */}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
