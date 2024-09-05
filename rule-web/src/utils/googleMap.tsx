import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Notification from "./notification";

interface MapProps {
  onLocationSelect: (position: { lat: number; lng: number }) => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapComponent: React.FC<MapProps> = ({ onLocationSelect }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''; // Use env variable for API key
  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPosition = { lat: latitude, lng: longitude };
          setCurrentPosition(userPosition);
          onLocationSelect(userPosition); // Notify parent of initial location
        },
        (error) => {
          setNotification({message: `現在位置を取得する際にエラーが発生しました: ${error}`, type: 'error'});
        }
      );
    } else {
      setNotification({message: 'このブラウザはジオロケーションに対応していません。', type: 'error'});
    }
  }, []);

  // Handle marker drag event to update position
  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newPosition = { lat, lng };
      setCurrentPosition(newPosition);
      onLocationSelect(newPosition); // Notify parent of new position after dragging
    }
  };

  if (!apiKey) {
    return <div>エラー: Google Maps API キーがありません！</div>;
  }

  if (!currentPosition) {
    return <div>マップを読み込んでいます...</div>;
  }

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={12}
          onLoad={handleMapLoad}
          options={{
            scrollwheel: true,
            draggable: true, // Allow map dragging
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* Marker at the current position */}
          <Marker position={currentPosition} draggable={true} onDragEnd={handleMarkerDragEnd} />
        </GoogleMap>
      </LoadScript>
      {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
    </div>
  );
};

export default GoogleMapComponent;
