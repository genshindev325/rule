import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { current } from "@reduxjs/toolkit";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface MapProps {
  initLat: number;
  initLng: number;
  onLocationSelect: (position: { lat: number; lng: number }, mainAddress: string | null) => void;
}

interface GeocodeResponse {
  results: Array<{
    formatted_address: string;
    types: string[];
  }>;
  status: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const getMainAddress = (data: GeocodeResponse) => {
  const detailedResult = data.results.find(
    result =>
      result.types.includes('premise') ||
      result.types.includes('street_address') ||
      result.types.includes('route')
  );

  return detailedResult ? detailedResult.formatted_address : null;
}

const GoogleMapComponent: React.FC<MapProps> = ({ initLat, initLng, onLocationSelect }) => {
  const apiKey = 'AIzaSyD9CmNeN59mj51D4CTLrXFRU2QZUKwg_xc';
  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>({lat: initLat, lng: initLng});
  const [loading, setLoading] = useState(true);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setLoading(false);
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation && currentPosition === null) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPosition = { lat: latitude, lng: longitude };
          setCurrentPosition(userPosition);
          onLocationSelect(userPosition, null);
          setLoading(false);
        },
        (error) => {
          toast.error(`現在位置を取得する際にエラーが発生しました: ${error}`, {
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: 'text-xs sm:text-sm',
          });
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, [currentPosition, onLocationSelect]);

  // Handle marker drag event to update position
  const handleMarkerDragEnd = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newPosition = { lat, lng };
      setCurrentPosition(newPosition);
      
      // fetch address from lat and lng
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ja`);

        if (response) {
          const result = await response.json();
          const mainAddress = getMainAddress(result);
          onLocationSelect(newPosition, mainAddress); // Notify parent of new position after dragging
        } else {
          console.log(response);
        }
      } catch(error) {
        console.log(error)
      }
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
          center={currentPosition || {lat: initLat, lng: initLng}}
          zoom={12}
          onLoad={handleMapLoad}
          options={{
            scrollwheel: true,
            draggable: true, // Allow map dragging
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            keyboardShortcuts: false,
          }}
        >
          {/* Marker at the current position */}
          <Marker position={currentPosition} draggable={true} onDragEnd={handleMarkerDragEnd} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
