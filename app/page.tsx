import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '6rem 2rem' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.75rem', fontWeight: 300, marginBottom: '1rem' }}>
          [Your Name]
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#4b5563', marginBottom: '2rem', fontWeight: 300 }}>
          Physics → Fusion → AI-Native Optical Design
        </p>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1.125rem' }}>
          <a
            href="https://linkedin.com/in/[your-profile]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/[your-handle]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>

      {/* Brief Overview */}
      <div style={{ maxWidth: '65ch' }}>
        <p>
          I studied physics at Stanford, conducted astrophysics research on black hole clustering,
          worked on nuclear fusion at Avalanche Energy, and am currently co-founder and CTO of a startup
          building AI-native optical design tools.
        </p>
        <p>
          <Link href="/experience">See my full experience →</Link>
        </p>
      </div>
    </div>
  );
}
