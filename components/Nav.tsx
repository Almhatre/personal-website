import Link from 'next/link';

export default function Nav() {
  return (
    <nav style={{ borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '1536px', margin: '0 auto', padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: '1.25rem', textDecoration: 'none' }}>
            [Your Name]
          </Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/experience" style={{ textDecoration: 'none' }}>
              Experience
            </Link>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              About
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
