import React, { useCallback, useRef } from 'react';
import { GoogleMap } from '@react-google-maps/api';

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

        // Ensure AdvancedMarkerElement is available
        // if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        //   new google.maps.marker.AdvancedMarkerElement({
        //     position: location,
        //     map,
        //   });
        // } else {
        //   console.error('AdvancedMarkerElement is not available.');
        // }
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
        scrollwheel: true, // Enable zooming with scroll
        draggable: true,   // Enable dragging with mouse
        zoomControl: false, // Hide zoom control (+ and - buttons)
        streetViewControl: false, // Hide street view control (human icon)
        mapTypeControl: false, // Hide map type control (e.g., satellite vs. roadmap)
        fullscreenControl: false, // Hide fullscreen control
      }}
      mapContainerClassName={`absolute inset-0 ${className}`}
    >
      {/* Additional Markers or Components can be added here */}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
