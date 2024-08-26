// components/GoogleMapBackground.tsx

import React, { useEffect, useRef } from 'react';

interface GoogleMapBackgroundProps {
  apiKey: string;
  lat: number;
  lng: number;
  zoom: number;
}

const GoogleMapBackground: React.FC<GoogleMapBackgroundProps> = ({ apiKey, lat, lng, zoom }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
          disableDefaultUI: true, // Disable default UI for background map
        });

        // Set the map to be non-interactive
        map.setOptions({
          gestureHandling: 'none',
          zoomControl: false,
        });
      }
    };

    // Load the Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }
  }, [apiKey, lat, lng, zoom]);

  return <div ref={mapRef} className="absolute inset-0" />;
};

export default GoogleMapBackground;
