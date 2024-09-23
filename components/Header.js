// import Link from 'next/link'
// import Image from 'next/image'

export default function Header() {

  return (
    <header>
      <div className="header-content">
        <div className="logo-container">
        <h1>Photos</h1>
          {/* <Link href="/" className="logo-link">
            <Image src="/logo.png" alt="Zafferano di Sardegna DOP" width={100} height={80} />
          </Link> */}
        </div>
      </div>
    </header>
  )
}