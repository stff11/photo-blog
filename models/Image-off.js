import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  phash: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;