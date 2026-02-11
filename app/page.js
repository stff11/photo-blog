// /app/page.js
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main style={{ padding: 0 }}>
      <div className="homepage">
        <Image
          priority
          src="https://res.cloudinary.com/dgsr2qkwp/image/upload/v1727097072/uploads/avz990bn2i2lmtsp2p3z.jpg"
          alt="Featured photograph"
          fill
          className="background-image"
          sizes="100vw"
        />
        {/* Dark overlay for text contrast */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          zIndex: 1,
        }} />
        <div className="overlay-content">
          <h1 className="title">My Photo Album</h1>
          <Link href="/portfolio" className="btn">
            View Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
