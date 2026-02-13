# Personal Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a professional personal website showcasing academic background (Stanford physics, astrophysics research), professional experience (Avalanche Energy, startup CTO), and personal interests.

**Architecture:** Next.js 15 with App Router, TypeScript, and Tailwind CSS. Three-page structure: Home (hero + overview), Experience (Stanford/Avalanche/Startup sections), About (personal interests). Content stored in markdown files for easy editing.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, React Markdown, GitHub, Vercel

---

## Task 1: Initialize Next.js Project

**Files:**
- Creates entire Next.js project structure

**Step 1: Create Next.js app with TypeScript and Tailwind**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

When prompted:
- ✓ Would you like to use TypeScript? Yes
- ✓ Would you like to use ESLint? Yes
- ✓ Would you like to use Tailwind CSS? Yes
- ✓ Would you like to use `src/` directory? No
- ✓ Would you like to use App Router? Yes
- ✓ Would you like to customize the default import alias? No

Expected: Creates project structure with `app/`, `public/`, `tailwind.config.ts`, etc.

**Step 2: Verify installation**

Run:
```bash
npm run dev
```

Expected: Server starts on http://localhost:3000, shows default Next.js page

Stop the server (Ctrl+C)

**Step 3: Install markdown dependencies**

Run:
```bash
npm install react-markdown remark-gfm gray-matter
```

Expected: Packages installed successfully

**Step 4: Clean up default files**

Run:
```bash
rm app/page.tsx app/globals.css
```

Expected: Default files removed

---

## Task 2: Set Up Project Structure

**Files:**
- Create: `app/globals.css`
- Create: `content/stanford.md`
- Create: `content/avalanche.md`
- Create: `content/startup.md`
- Create: `content/personal.md`
- Create: `public/.gitkeep`

**Step 1: Create content directory with placeholder markdown files**

Run:
```bash
mkdir -p content
```

Create `content/stanford.md`:
```markdown
# Physics at Stanford

[Content to be added - Stanford physics background, astrophysics research, black hole clustering paper]
```

Create `content/avalanche.md`:
```markdown
# Avalanche Energy

[Content to be added - fusion work at Avalanche Energy]
```

Create `content/startup.md`:
```markdown
# Startup Journey

[Content to be added - dropping out, co-founder and CTO role, AI-native optical design]
```

Create `content/personal.md`:
```markdown
# Personal

[Content to be added - piano, gym, hobbies]
```

**Step 2: Create globals.css with Tailwind and typography base**

Create `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  /* Academic typography defaults */
  h1 {
    @apply text-4xl font-serif font-light tracking-tight mb-6;
  }

  h2 {
    @apply text-3xl font-serif font-light tracking-tight mb-4 mt-8;
  }

  h3 {
    @apply text-2xl font-serif font-light mb-3 mt-6;
  }

  p {
    @apply text-lg leading-relaxed mb-4;
  }

  a {
    @apply text-foreground underline underline-offset-4 hover:text-gray-600 transition-colors;
  }
}
```

**Step 3: Update Tailwind config for academic aesthetic**

Modify `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        'reading': '65ch',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Task 3: Create Root Layout with Navigation

**Files:**
- Create: `app/layout.tsx`
- Create: `components/Nav.tsx`

**Step 1: Create Nav component**

Create `components/Nav.tsx`:
```typescript
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-serif no-underline hover:text-gray-600">
            [Your Name]
          </Link>
          <div className="flex gap-8">
            <Link href="/experience" className="no-underline hover:text-gray-600">
              Experience
            </Link>
            <Link href="/about" className="no-underline hover:text-gray-600">
              About
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-gray-600"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: Create root layout**

Create `app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "[Your Name] - Personal Website",
  description: "Physics, AI, and startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased">
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
```

**Step 3: Verify navigation renders**

Run:
```bash
npm run dev
```

Visit http://localhost:3000

Expected: See navigation bar with links (pages will 404 for now)

---

## Task 4: Create Home Page with Hero

**Files:**
- Create: `app/page.tsx`

**Step 1: Create home page with hero section**

Create `app/page.tsx`:
```typescript
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-24">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-6xl font-light mb-4">
          [Your Name]
        </h1>
        <p className="text-2xl text-gray-600 mb-8 font-light">
          Physics → Fusion → AI-Native Optical Design
        </p>

        {/* Social Links */}
        <div className="flex gap-6 text-lg">
          <a
            href="https://linkedin.com/in/[your-profile]"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/[your-handle]"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            Twitter
          </a>
        </div>
      </div>

      {/* Brief Overview */}
      <div className="prose prose-lg max-w-reading">
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
```

**Step 2: Test home page**

Run: `npm run dev` (if not already running)

Visit http://localhost:3000

Expected: Clean hero section with name, tagline, social links, brief overview

---

## Task 5: Create Experience Page with Markdown Rendering

**Files:**
- Create: `app/experience/page.tsx`
- Create: `components/MarkdownContent.tsx`
- Create: `components/ExperienceSection.tsx`
- Create: `lib/markdown.ts`

**Step 1: Create markdown utilities**

Create `lib/markdown.ts`:
```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getMarkdownContent(filename: string) {
  const fullPath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  return content;
}
```

**Step 2: Create MarkdownContent component**

Create `components/MarkdownContent.tsx`:
```typescript
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-reading">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

**Step 3: Create ExperienceSection component**

Create `components/ExperienceSection.tsx`:
```typescript
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
        <h2 className="text-3xl font-light">{title}</h2>
        {period && (
          <p className="text-gray-600 text-lg">{period}</p>
        )}
      </div>
      <MarkdownContent content={content} />
    </section>
  );
}
```

**Step 4: Create experience page**

Create `app/experience/page.tsx`:
```typescript
import ExperienceSection from '@/components/ExperienceSection';
import { getMarkdownContent } from '@/lib/markdown';

export default function Experience() {
  const stanfordContent = getMarkdownContent('stanford.md');
  const avalancheContent = getMarkdownContent('avalanche.md');
  const startupContent = getMarkdownContent('startup.md');

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-5xl font-light mb-12">Experience</h1>

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
```

**Step 5: Test experience page**

Run: `npm run dev`

Visit http://localhost:3000/experience

Expected: Three sections rendered with placeholder markdown content

---

## Task 6: Create About Page

**Files:**
- Create: `app/about/page.tsx`

**Step 1: Create about page**

Create `app/about/page.tsx`:
```typescript
import MarkdownContent from '@/components/MarkdownContent';
import { getMarkdownContent } from '@/lib/markdown';

export default function About() {
  const personalContent = getMarkdownContent('personal.md');

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-5xl font-light mb-12">About</h1>
      <MarkdownContent content={personalContent} />
    </div>
  );
}
```

**Step 2: Test about page**

Run: `npm run dev`

Visit http://localhost:3000/about

Expected: About page renders with placeholder personal content

---

## Task 7: Initialize Git and Create Initial Commit

**Files:**
- Create: `.gitignore`
- Modify: All project files (initial commit)

**Step 1: Verify .gitignore exists**

Run:
```bash
cat .gitignore
```

Expected: Should include `node_modules/`, `.next/`, etc. (created by create-next-app)

If missing, create `.gitignore`:
```
# dependencies
node_modules/
.pnp/

# testing
coverage/

# next.js
.next/
out/
build/

# misc
.DS_Store
*.pem

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**Step 2: Initialize git repository**

Run:
```bash
git init
```

Expected: "Initialized empty Git repository"

**Step 3: Add all files**

Run:
```bash
git add .
```

**Step 4: Create initial commit**

Run:
```bash
git commit -m "$(cat <<'EOF'
Initial commit: Personal website scaffolding

- Next.js 15 with TypeScript and Tailwind
- Three-page structure: Home, Experience, About
- Markdown content support
- Academic aesthetic styling
- Navigation component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

Expected: Commit created successfully

**Step 5: Verify git status**

Run:
```bash
git log --oneline
```

Expected: Shows initial commit

---

## Task 8: Push to GitHub

**Files:**
- None (git operations only)

**Step 1: Create GitHub repository**

Instructions for user:
1. Go to https://github.com/new
2. Repository name: `personal-website` (or preferred name)
3. Keep it public or private
4. Do NOT initialize with README (we have local commits)
5. Click "Create repository"

**Step 2: Add remote and push**

Run (replace with your GitHub username and repo name):
```bash
git remote add origin https://github.com/[username]/[repo-name].git
git branch -M main
git push -u origin main
```

Expected: Code pushed to GitHub successfully

**Step 3: Verify on GitHub**

Visit your repository URL

Expected: All files visible on GitHub

---

## Next Steps

**Content Population:**
The scaffolding is complete. Next steps (to be done in Claude web sessions):

1. **Add content to markdown files:**
   - `content/stanford.md` - Physics background, research details, paper link
   - `content/avalanche.md` - Fusion work details
   - `content/startup.md` - Startup journey, CTO role
   - `content/personal.md` - Piano, gym, hobbies

2. **Enhance styling with inspiration sites:**
   - Refine typography in `app/globals.css`
   - Adjust spacing, colors, layout
   - Add photo to home page

3. **Deploy to Vercel:**
   - Use `vercel:deploy` skill or manual Vercel setup
   - Connect GitHub repo for auto-deployments

4. **Add resume PDF:**
   - Place resume at `public/resume.pdf`

**The site is now ready for content and design iteration in web sessions!**
