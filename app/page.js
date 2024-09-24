// /app/page.js
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/Button';

const HomePage = () => {
  return (
    <main className="no-padding">
    <div className="homepage">
      <Image 
        priority="true"
        src="https://res.cloudinary.com/dgsr2qkwp/image/upload/v1727097072/uploads/avz990bn2i2lmtsp2p3z.jpg" 
        alt="Chosen Image"
        fill="true"
        className="background-image"
      />
      {/* Title and button overlaid on the image */}
      <div className="overlay-content">
        <h1 className="title">My Photo Album</h1>
        <Link href="/portfolio">
          <Button>View Portfolio</Button>
        </Link>
      </div>
    </div>
    </main>
  )
};

export default HomePage;