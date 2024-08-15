import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventCard from './eventCard';

interface EventCarouselProps {
  events: object[];
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
          <div key={index} className="px-4 mt-12">
            {/* <EventCard {...event} /> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;
