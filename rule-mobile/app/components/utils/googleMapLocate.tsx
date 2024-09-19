import React, { useCallback, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

interface GoogleMapComponentProps {
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '200px',
};

const GoogleMapLocation: React.FC<GoogleMapComponentProps> = ({ lat, lng }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load the map and optionally geocode the address
  const handleMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;      
      // Set center of the map using lat/lng if no address is provided
      const center = { lat, lng };
      map.setCenter(center);
    },
    [lat, lng]
  );

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
      mapContainerClassName={`relative `}
    >
      {/* Add marker at the center of the map */}
      <Marker position={{ lat, lng, }} />
    </GoogleMap>
  );
};

export default GoogleMapLocation;
