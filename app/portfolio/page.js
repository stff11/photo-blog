// /app/portfolio/page.js
import clientPromise from '../../utils/mongodb';
import PortfolioGrid from '../../components/PortfolioGrid';

async function fetchImages() {
  const client = await clientPromise;
  const db = client.db('my-photos');
  const imagesCollection = db.collection('photos');
  const images = await imagesCollection.find({}).sort({ timestamp: -1 }).toArray();

  return images.map((img) => ({
    id: img._id.toString(),
    url: img.url,
    public_id: img.public_id,
  }));
}

const PortfolioPage = async () => {
  const images = await fetchImages();

  return (
    <main>
      <div style={{ padding: '2rem 0 1rem', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem',
          fontWeight: 400,
          color: 'var(--foreground)',
          letterSpacing: '0.02em',
        }}>Portfolio</h1>
      </div>
      <PortfolioGrid images={images} />
    </main>
  );
};

export default PortfolioPage;
