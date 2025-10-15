// src/components/ImageItem.js
import React from 'react';
import './ImageItem.css';

function ImageItem({ src, name, onClick }) {
  return (
    <div className="image-item" onClick={onClick}>
      <img src={src} alt={name} />
      <p className="image-name">{name}</p>
    </div>
  );
}

export default ImageItem;

