"use client";
import { useState } from 'react';
import Image from 'next/image';

const PortfolioGrid = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="portfolio-grid">
      {images.length > 0 ? (
        images.map((img, index) => (
          <div key={index} className="portfolio-item">
            <img
              src={img.url}
              alt={`Portfolio Image ${index + 1}`}
              fill="true" // Allow the image to fill the container
              sizes="(max-width: 1200px) 100vw, 300px"
              className="portfolio-img"
              onClick={() => openModal(index)} // Open modal on click
            />
            {/* {img.location && img.location.latitude && img.location.longitude && (
              <p>Location: {img.location.latitude}, {img.location.longitude}</p>
            )}
            {img.timestamp && (
              <p>Taken on: {new Date(img.timestamp).toLocaleDateString()}</p>
            )} */}
          </div>
        ))
      ) : (
        <p>No images to display.</p>
      )}

      {/* Modal for full-size image */}
      {selectedImageIndex !== null && (
        <div className="modal">
          <span className="close" onClick={closeModal}>X</span>
          <div className="modal-content">
            <span className="prev" onClick={prevImage}>&lt;</span>
            <Image
              src={images[selectedImageIndex].url}
              alt={`Full-size Image ${selectedImageIndex + 1}`}
              // width={800}
              // height={600}
              fill
              className="full-size-image"
            />
            <span className="next" onClick={nextImage}>&gt;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;