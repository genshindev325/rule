// src/components/StarRating.tsx
import React, { useState } from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

interface StarRatingProps {
  rate: number; // The current rating
  onRateChange?: (newRate: number) => void; // Optional callback to handle rate changes
}

const StarRating: React.FC<StarRatingProps> = ({ rate, onRateChange }) => {
  const [hoveredRate, setHoveredRate] = useState<number | null>(null);
  const [selectedRate, setSelectedRate] = useState<number>(rate);

  const handleClick = (newRate: number) => {
    setSelectedRate(newRate);
    if (onRateChange) onRateChange(newRate);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRate(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRate(null);
  };

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex space-x-1">
      {stars.map((star) => {
        const isFilled = hoveredRate !== null ? hoveredRate > star : selectedRate >= star;
        return (
          <div
            key={star}
            className="relative cursor-pointer"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            {isFilled ? (
              <StarSolid className="w-6 h-6 bg-transparent text-blue-300" />
            ) : (
              <StarOutline className="w-6 h-6 text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
