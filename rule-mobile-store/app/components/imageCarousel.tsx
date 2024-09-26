import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import RemoveImageModal from './removeImageModal';
import { SERVER_URL } from '../config';

interface ImageCarouselProps {
  onAddImage: (newImage: string) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ onAddImage }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isVisibleRemoveImageModal, setIsVisibleRemoveImageModal] = useState(false);
  const [selectedImageId, setSelectedImageIndex] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);

  // Update slider when images change
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, [images]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    // slidesToShow: images.length < 3 ? images.length : 3,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
  };

  const handleAddImage = (newImage: string) => {
    setImages((prevImages) => [...prevImages, newImage]);
    onAddImage(newImage);
  };

  const handleRemoveImage = (index: number) => {
    setIsVisibleRemoveImageModal(true);
    setSelectedImageIndex(index);
  };

  const handleCancelRemoveImageModal = () => {
    setIsVisibleRemoveImageModal(false);
  };

  const handleConfirmRemoveImageModal = (index: number) => {
    setIsVisibleRemoveImageModal(false);
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.status === 200) {
          const data = await response.json();
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
    <div className="bg-gray-200 rounded w-full text-gray-800 overflow-hidden">
      <div className="slider-container w-full">
        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <div
              key={index}
              className="relative w-28 h-28 border-r-8 border-r-transparent -mb-2" // Use padding to create space
              onDoubleClick={() => handleRemoveImage(index)}
            >
              <Image
                src={src}
                alt={`image-${index}`}
                layout="fill"
                sizes="w-1/3"
                className="rounded object-cover"
              />
            </div>
          ))}
          <div className="flex flex-col items-center justify-center pl-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="flex h-28 items-center justify-center border-2 border-dashed hover:border-none border-gray-300 hover:bg-gray-300 duration-500 rounded cursor-pointer w-full"
            >
              <span className="text-2xl">+</span>
            </label>
          </div>
        </Slider>
      </div>
      <RemoveImageModal
        onCancel={handleCancelRemoveImageModal}
        onConfirm={() => handleConfirmRemoveImageModal(selectedImageId)}
        isVisible={isVisibleRemoveImageModal}
      />
    </div>
  );
};

export default ImageCarousel;
