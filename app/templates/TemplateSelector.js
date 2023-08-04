'use client'
import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import ModalImage from './ModalImage';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from 'next/navigation'

const TemplateSelector = () => {
  const templates = [
    {image: 'https://i.imgur.com/9EhI6th.jpg', route: '/resume/template-1'},
    {image: 'https://i.imgur.com/1AyTrjL.jpg', route: '/resume/template-2'},
  ]
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const handleSelectImage = (image, route) => {
    setSelectedImage(image);
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = () => {
    console.log(`Selected route: ${selectedRoute}`);
    setIsModalOpen(false);
    router.push(selectedRoute)
  };

  return (
    <div className='mb-20'>
      <h2 className="text-2xl text-center font-bold mb-4 mt-5 text-slate-800">Elige tu plantilla</h2>
      <div className="flex flex-col justify-center items-start md:items-center overflow-x-auto">
          <ImageCarousel templates={templates} onSelectImage={handleSelectImage}/>
          {selectedImage && (
            <ModalImage
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              image={selectedImage}
              onSelect={handleSelect}
            />
          )}
      </div>
    </div>
  );
};

export default TemplateSelector;
