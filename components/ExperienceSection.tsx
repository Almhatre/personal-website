import MarkdownContent from './MarkdownContent';

interface ExperienceSectionProps {
  title: string;
  period?: string;
  content: string;
}

export default function ExperienceSection({
  title,
  period,
  content
}: ExperienceSectionProps) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 style={{ fontSize: '1.875rem', fontWeight: 300 }}>{title}</h2>
        {period && (
          <p style={{ color: '#4b5563', fontSize: '1.125rem' }}>{period}</p>
        )}
      </div>
      <MarkdownContent content={content} />
    </section>
  );
}
