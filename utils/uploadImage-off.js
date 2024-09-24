import { uploadImage } from './cloudinary';
import Image from '../models/Image-off';
import dbConnect from './mongodb';
import exifr from 'exifr';

export const addImage = async (filePath) => {
  await dbConnect();

  // Extract EXIF data (location, timestamp) from the image
  const exifData = await exifr.parse(filePath);

  const uploadResult = await uploadImage(filePath);
  const newPhash = uploadResult.phash;

  // Check for duplicates using `phash`
  const existingImage = await Image.findOne({ phash: newPhash });
  if (existingImage) {
    return null;  // Duplicate found
  }

  // Prepare metadata for MongoDB (including location and timestamp)
  const newImage = new Image({
    url: uploadResult.secure_url,
    phash: newPhash,
    location: {
      latitude: exifData.latitude || null,
      longitude: exifData.longitude || null,
    },
    timestamp: exifData.DateTimeOriginal || new Date(), // Fallback to current date if missing
  });

  await newImage.save();
  return newImage;
};