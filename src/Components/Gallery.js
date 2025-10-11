// src/components/Gallery.js
import React, { useState } from 'react';
import ImageItem from './ImageItem';
import Modal from './Modal';
import './Gallery.css';

// Array of image objects with URLs and names
const images = [
  { src: 'https://images.pexels.com/photos/707915/pexels-photo-707915.jpeg', name: 'Mountain View' },
  { src: 'https://images.pexels.com/photos/9789495/pexels-photo-9789495.jpeg', name: 'Foods' },
  { src: 'https://images.pexels.com/photos/29326301/pexels-photo-29326301/free-photo-of-night-scene-in-tokyo-s-vibrant-streets.jpeg', name: 'Tokyo Night' },
  { src: 'https://images.pexels.com/photos/8307686/pexels-photo-8307686.jpeg', name:'clothes' },
  { src: 'https://images.pexels.com/photos/29324559/pexels-photo-29324559/free-photo-of-fishing-boats-in-cape-town-harbor.jpeg', name: 'Fishing Boats' },
  { src: 'https://images.pexels.com/photos/5638751/pexels-photo-5638751.jpeg', name: 'Family Lights' },
  { src: 'https://images.pexels.com/photos/29327009/pexels-photo-29327009/free-photo-of-stylish-woman-posing-with-cars-at-autokhana-event.jpeg', name: 'Car Show' },
  { src: 'https://images.pexels.com/photos/15031962/pexels-photo-15031962/free-photo-of-a-beach-with-palm-trees-and-a-hut-on-the-shore.jpeg', name: 'Tropical Beach' },
  { src: 'https://images.pexels.com/photos/29309568/pexels-photo-29309568/free-photo-of-stunning-night-view-of-taipei-skyline-with-taipei-101.jpeg', name: 'City Skyline' },
  { src: 'https://images.pexels.com/photos/13804510/pexels-photo-13804510.jpeg', name: 'Desert Dunes' },
  { src: 'https://images.pexels.com/photos/7589980/pexels-photo-7589980.jpeg', name: 'Tech' },
  { src: 'https://images.pexels.com/photos/7888972/pexels-photo-7888972.jpeg', name: 'Art' }
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <ImageItem 
          key={index} 
          src={image.src} 
          name={image.name} 
          onClick={() => openModal(image)} 
        />
      ))}
      {selectedImage && <Modal src={selectedImage.src} name={selectedImage.name} onClose={closeModal} />}
    </div>
  );
}

export default Gallery;


