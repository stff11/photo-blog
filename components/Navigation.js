import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none', color: 'var(--foreground)' }}>
            Photos
          </Link>
        </li>
        <li><Link href="/portfolio">Portfolio</Link></li>
        <li><Link href="/upload">Upload</Link></li>
      </ul>
    </nav>
  )
}
