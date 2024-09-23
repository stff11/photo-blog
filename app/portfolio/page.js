// /app/portfolio/page.js

import { MongoClient } from 'mongodb';
// import Image from 'next/image';
import PortfolioGrid from "../../components/PortfolioGrid";

// Fetch images from MongoDB
async function fetchImages() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('my-photos');
  const imagesCollection = db.collection('photos');
  const images = await imagesCollection.find({}).toArray();

  // Convert MongoDB-specific objects to plain objects
  const plainImages = images.map(img => ({
      id: img._id.toString(), // Convert ObjectID to string
      url: img.url,
      public_id: img.public_id,
      timestamp: img.timestamp,
      location: img.location, // If needed
  }));
  
  client.close();
  return plainImages;
}

const PortfolioPage = async () => {
  const images = await fetchImages();

  return <PortfolioGrid images={images} />;
};

export default PortfolioPage;