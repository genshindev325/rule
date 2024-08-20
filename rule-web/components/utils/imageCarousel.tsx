// components/utils/authContext.tsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  onAddImage: (newImage: string) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onAddImage }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onAddImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-200 rounded w-full">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-28 -mb-2">
            <Image
              src={src}
              alt={`image-${index}`}
              layout='fill'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="rounded object-cover"
            />
          </div>
        ))}
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="flex h-28 items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer"
          >
            <span className="text-2xl">+</span>
          </label>
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;
