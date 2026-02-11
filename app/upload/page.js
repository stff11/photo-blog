'use client';
import { useState, useRef, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Please select a valid image file.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 10MB.');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Photo uploaded successfully!', { autoClose: 2000 });
        clearFile();
      } else {
        toast.error(data.message || 'Error uploading image.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while uploading the image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main>
      <div style={{
        maxWidth: '600px',
        margin: '3rem auto',
        padding: '0 1.5rem',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'var(--foreground)',
        }}>Upload a Photo</h1>

        <form onSubmit={handleSubmit}>
          {/* Drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !file && inputRef.current?.click()}
            style={{
              border: `2px dashed ${dragActive ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              padding: preview ? '0' : '3rem 2rem',
              textAlign: 'center',
              cursor: file ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: dragActive ? 'var(--muted)' : 'transparent',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {preview ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                  aria-label="Remove selected image"
                >
                  X
                </button>
                <div style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.8rem',
                  color: 'var(--muted-foreground)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span>{file.name}</span>
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            ) : (
              <div>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p style={{
                  color: 'var(--foreground)',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem',
                }}>
                  Drop your image here, or click to browse
                </p>
                <p style={{
                  color: 'var(--muted-foreground)',
                  fontSize: '0.8rem',
                  margin: 0,
                }}>
                  JPG, PNG, WebP, GIF, HEIC up to 10MB
                </p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,.heic,.heif"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            aria-label="Select image file"
          />

          <button
            type="submit"
            className="btn"
            disabled={!file || uploading}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '0.875rem',
              fontSize: '0.85rem',
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>

        <ToastContainer
          position="bottom-center"
          theme="dark"
          toastStyle={{ fontSize: '0.875rem' }}
        />
      </div>
    </main>
  );
};

export default UploadPage;
