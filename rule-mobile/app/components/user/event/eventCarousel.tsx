import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventCard from './eventCard';
import { IonRouterLink } from '@ionic/react';

interface EventCardProps {
  _id: string,
  eventName: string,
  category: string,
  coverImage: string,
  description: string,
  eventDate: string,
  eventStartTime: string,
  eventEndTime: string,
  maleFee: number,
  maleTotal: number,
  males: number,
  femaleFee: number,
  femaleTotal: number,
  females: number,
  store: {
    storeLat: number,
    storeLng: number,
    storeName: string,
    address: string,
    access1: string,
    access2: string,
    description: string,
  };
  status: string,
  createdAt: string
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

  return (
    // <div className="bg-gray-100">
      <Slider {...settings}>
        {events.map((event, index) => (
          <div key={index} className="px-4 my-2">
            <IonRouterLink routerLink={`/event/payment?event=${encodeURIComponent(JSON.stringify(event))}`} className='text-black'>
              <EventCard {...event} />
            </IonRouterLink>
          </div>
        ))}
      </Slider>
    // </div>
  );
};

export default EventCarousel;
