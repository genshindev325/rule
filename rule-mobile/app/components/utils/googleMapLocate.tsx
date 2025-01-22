import React, { useEffect, useRef } from 'react';

interface GoogleMapLocationProps {
  lat: number;
  lng: number;
}

const GoogleMapLocation: React.FC<GoogleMapLocationProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {    
    const initializeMap = async () => {
      if (!mapRef.current) return;
      
      try {
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const map = new Map(mapRef.current, {
          center: { lat, lng },
          zoom: 16,
          mapId: 'abcd1234efgh5678',
          zoomControl: false,
          scrollwheel: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        });
    
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat, lng },
          title: "Event Location",
        });

        return () => {
          marker.map = null;
        };
      } catch (error) {
        console.log('Failed to initialize Google Map:', error)
      }
    }

    initializeMap();
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{
        height: '150px',
        width: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    />
  );
};

export default GoogleMapLocation;
