import ExperienceSection from '@/components/ExperienceSection';
import { getMarkdownContent } from '@/lib/markdown';

export default function Experience() {
  const stanfordContent = getMarkdownContent('stanford.md');
  const avalancheContent = getMarkdownContent('avalanche.md');
  const startupContent = getMarkdownContent('startup.md');

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '3rem' }}>Experience</h1>

      <ExperienceSection
        title="Startup Co-founder & CTO"
        period="2023 - Present"
        content={startupContent}
      />

      <ExperienceSection
        title="Avalanche Energy"
        period="2022 - 2023"
        content={avalancheContent}
      />

      <ExperienceSection
        title="Stanford University"
        period="2020 - 2023"
        content={stanfordContent}
      />
    </div>
  );
}
