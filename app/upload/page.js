// /app/upload/page.js
// 'use client';
// import { useState } from 'react';
// import Button from '../../components/Button'

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!file) {
//       setUploadStatus('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setUploadStatus('Image uploaded successfully!');
//       } else {
//         setUploadStatus(data.message || 'Error uploading image.');
//       }
//     } catch (error) {
//       console.error(error);
//       setUploadStatus('An error occurred while uploading the image.');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload a New Photo</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <Button type="submit">Upload Photo</Button>
//       </form>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default UploadPage;


'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/Button';

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Photo added successfully!', { autoClose: 1000 }); // Show toast for 1 second
      } else {
        toast.error(data.message || 'Error uploading image.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while uploading the image.');
    }
  };

  return (
    <div>
      <h1>Upload a New Photo</h1>
      <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*,.heic,.heif" onChange={handleFileChange} />
        <Button type="submit">Upload Photo</Button>
      </form>

      <ToastContainer /> {/* Toastify container */}
    </div>
  );
};

export default UploadPage;