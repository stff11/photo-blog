// /app/layout.js
import '../styles/globals.css';
import Navigation from '../components/Navigation'
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">  {/* Root HTML tag with language attribute */}
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}