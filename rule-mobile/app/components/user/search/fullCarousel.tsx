// components/user/search/fullCarousel.tsx

import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface CarouselProps {
  items: string[];
}

const FullCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maleGradient = 'bg-gradient-to-r from-[#7c5ded] to-[#83d5f7]';

  const handleSwipedLeft = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipedRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    trackMouse: true, // Allows swipe via mouse dragging
  });

  return (
    <div {...handlers} className="relative overflow-hidden">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            <img
              src={item}
              alt={`Slide ${index + 1}`}
              className="w-full h-[200px] md:h-[400px] object-contain"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 py-6">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full ${
              index === currentIndex
                ? maleGradient
                : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FullCarousel;
