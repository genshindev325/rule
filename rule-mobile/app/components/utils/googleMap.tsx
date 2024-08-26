import React, { useEffect, useRef } from 'react';

type EventProps = {
  _id: string;
  eventName: string;
  coverImage: string;
  store: {
    address: string;
    storeName: string;
    storeImages: string;
  };
};

type GoogleMapBackgroundProps = {
  apiKey: string;
  events: EventProps[];
};

const GoogleMapBackground: React.FC<GoogleMapBackgroundProps> = ({ apiKey, events }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || events.length === 0) return;

    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      document.body.appendChild(script);

      script.onload = () => {
        if (!google || !google.maps) return;

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: events[0].store.address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const map = new google.maps.Map(mapRef.current!, {
              center: results[0].geometry.location,
              zoom: 14,
              gestureHandling: 'greedy',
            });

            // Add markers for each event
            events.forEach(event => {
              geocoder.geocode({ address: event.store.address }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  new google.maps.Marker({
                    position: results[0].geometry.location,
                    map,
                    icon: {
                      url: event.coverImage,
                      scaledSize: new google.maps.Size(50, 50),
                    }
                  });
                } else {
                  console.error(`Geocode failed for address: ${event.store.address}, status: ${status}`);
                }
              });
            });
          } else {
            console.error(`Geocode failed for address: ${events[0].store.address}, status: ${status}`);
          }
        });
      };
    };

    loadGoogleMapsScript();
  }, [apiKey, events]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMapBackground;
