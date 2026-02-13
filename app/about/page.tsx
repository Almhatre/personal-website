import MarkdownContent from '@/components/MarkdownContent';
import { getMarkdownContent } from '@/lib/markdown';

export default function About() {
  const personalContent = getMarkdownContent('personal.md');

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '3rem' }}>About</h1>
      <MarkdownContent content={personalContent} />
    </div>
  );
}
