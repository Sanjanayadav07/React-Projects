// src/components/Modal.js
import React from 'react';
import './Modal.css';

function Modal({ src, name, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <img src={src} alt={name} />
        <p className="modal-image-name">{name}</p>
      </div>
    </div>
  );
}

export default Modal;
