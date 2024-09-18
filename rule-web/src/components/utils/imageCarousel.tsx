import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Notification from '@/utils/notification';
import RemoveImageModal from './removeImageModal';

interface ImageCarouselProps {
  onAddImage: (newImage: string) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ onAddImage }) => {
  const [images, setImages] = useState<string[]>([]);
  const sliderRef = useRef<Slider>(null);

  // Update slider when images change
  useEffect(() => {
    if (sliderRef.current) {
      // sliderRef.current.slickGoTo(images.length - 1);
      sliderRef.current.slickPlay();
    }
  }, [images]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
  };

  const handleAddImage = (newImage: string) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("stress")
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
          // onAddImage(data.url); // Propagate image URL to parent if needed
          handleAddImage(data.url); // Add to internal state
        } else {
          console.log(`Failed to upload image. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="bg-gray-200 rounded w-full text-gray-800">
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-28 mr-2 -mb-2"
            onClick={() => handleRemoveImage(index)}
          >
            <Image
              src={src}
              alt={`image-${index}`}
              layout="fill"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="rounded object-cover"
            />
          </div>
        ))}
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
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
