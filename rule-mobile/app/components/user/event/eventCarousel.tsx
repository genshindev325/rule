import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventCard from './eventCard';
import { IonRouterLink } from '@ionic/react';

interface EventCardProps {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
}

interface EventCarouselProps {
  events: EventCardProps[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // onAddImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100">
      <Slider {...settings}>
        {events.map((event, index) => (
          <div key={index} className="px-4 my-6">
            <IonRouterLink routerLink={`/event/payment?event=${encodeURIComponent(JSON.stringify(event))}`} className='text-black'>
              <EventCard {...event} />
            </IonRouterLink>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;
