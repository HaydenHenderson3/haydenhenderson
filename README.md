# Hayden Henderson - Book Reviews & Short Stories

A static React website for showcasing book reviews, short stories, and published works. Content is managed via markdown files in the `papers/` folder and baked into the site at build time — every visitor sees the same content.

## Features

- **Home Page**: Welcome section with navigation to reviews, stories, and published works
- **Book Reviews**: Read-only display of book reviews
- **Short Stories**: Browse stories with a dedicated detail page for each
- **Published Works**: Showcase of publications with links, publisher info, and descriptions
- **Responsive Design**: Mobile-friendly layout using TailwindCSS
- **Static Content**: All content is loaded from markdown files at build time — no database or backend needed

## Tech Stack

- React 18 with TypeScript
- React Router for navigation
- TailwindCSS for styling
- Vite for build tooling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Managing Content

All content lives as markdown files in the `papers/` folder. To add or update content:

1. Create or edit a `.md` file in `papers/`
2. Include the required frontmatter (see format below)
3. Commit and redeploy

Changes are picked up automatically at build time via Vite's `import.meta.glob`.

### Markdown File Format

Each file starts with YAML frontmatter between `---` delimiters, followed by the body content.

#### Book Review

```markdown
---
type: review
title: Your Review Title
createdAt: 2024-01-15T00:00:00.000Z
---

Your review text goes here...
```

#### Short Story

```markdown
---
type: story
title: Your Story Title
createdAt: 2024-01-15T00:00:00.000Z
---

Your story text goes here...
```

#### Published Work

```markdown
---
type: published
title: Your Published Work Title
description: A brief description of the work
publicationDate: 2024
publisher: Publisher Name
link: https://example.com
createdAt: 2024-01-15T00:00:00.000Z
---
```

### Frontmatter Fields

| Field | Required | Types | Description |
|-------|----------|-------|-------------|
| `type` | Yes | all | `review`, `story`, or `published` |
| `title` | Yes | all | Title of the piece |
| `createdAt` | No | all | ISO date string (defaults to build time) |
| `description` | No | published | Short description; falls back to body text |
| `publicationDate` | No | published | Year or date of publication |
| `publisher` | No | published | Publisher name |
| `link` | No | published | URL to the publication |

## Customization

- **Bio Text**: Edit `src/components/HomeHero.tsx`
- **Profile Picture**: Place a `pp.jpg` file in the `public` directory
