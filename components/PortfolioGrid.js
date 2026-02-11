"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const PortfolioGrid = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = '';
  }, []);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, closeModal, prevImage, nextImage]);

  const createCloudinaryUrl = (url, width, height) => {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,f_auto,q_auto/`);
  };

  if (images.length === 0) {
    return (
      <div className="empty-state">
        <p>No photos yet. Upload some to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="portfolio-grid">
        {images.map((img, index) => (
          <div key={img.id || index} className="portfolio-item">
            <Image
              src={createCloudinaryUrl(img.url, 400, 400)}
              alt={`Photo ${index + 1}`}
              width={400}
              height={400}
              className="portfolio-img"
              onClick={() => openModal(index)}
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedImageIndex !== null && (
        <div className="modal" onClick={closeModal} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <span className="close" onClick={closeModal} aria-label="Close lightbox">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedImageIndex > 0 && (
              <span className="prev" onClick={prevImage} aria-label="Previous image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </span>
            )}
            <Image
              src={createCloudinaryUrl(images[selectedImageIndex].url, 1600, 1200)}
              alt={`Photo ${selectedImageIndex + 1}`}
              width={1600}
              height={1200}
              className="full-size-image"
              priority
            />
            {selectedImageIndex < images.length - 1 && (
              <span className="next" onClick={nextImage} aria-label="Next image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioGrid;
