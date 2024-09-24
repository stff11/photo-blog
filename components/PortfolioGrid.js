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

  // Helper function to create optimized Cloudinary URLs while maintaining aspect ratio
  const createCloudinaryUrl = (url, width, height) => {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fit,f_auto,q_auto/`);
  };

  return (
    <div className="portfolio-grid">
      {images.length > 0 ? (
        images.map((img, index) => (
          <div key={index} className="portfolio-item">
            <Image
              src={createCloudinaryUrl(img.url, 300, 300)}
              alt={`Portfolio Image ${index + 1}`}
              width={300}
              height={300}
              className="portfolio-img"
              onClick={() => openModal(index)}
              loading="lazy"
            />
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
            {/* Conditionally hide "Previous" arrow if it's the first image */}
            <span
              className="prev"
              onClick={prevImage}
              style={{ display: selectedImageIndex === 0 ? 'none' : 'block' }}
            >
              &lt;
            </span>
            <Image
              src={createCloudinaryUrl(images[selectedImageIndex].url, 1600, 1000)}
              alt={`Full-size Image ${selectedImageIndex + 1}`}
              width={1600}
              height={1000}
              className="full-size-image"
            />
            {/* Conditionally hide "Next" arrow if it's the last image */}
            <span
              className="next"
              onClick={nextImage}
              style={{ display: selectedImageIndex === images.length - 1 ? 'none' : 'block' }}
            >
              &gt;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default PortfolioGrid;