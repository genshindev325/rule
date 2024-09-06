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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    <div className="bg-gray-200 rounded">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="pr-4">
            <Image
              src={src}
              alt={`image-${index}`}
              width={300}
              height={200}
              className="rounded"
            />
          </div>
        ))}
        <div className="flex items-center justify-center px-2 h-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer"
          >
            <span className="text-2xl">+</span>
          </label>
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;
