# Papers Folder

This folder contains markdown files that can be ingested into your book reviews, short stories, and published works.

## Format

Each markdown file should start with frontmatter (YAML) that specifies the type and metadata:

### Book Review Format

```markdown
---
type: review
title: Your Review Title
createdAt: 2024-01-15T00:00:00.000Z
---

Your review text goes here...
```

### Short Story Format

```markdown
---
type: story
title: Your Story Title
createdAt: 2024-01-15T00:00:00.000Z
---

Your story text goes here...
```

### Published Work Format

```markdown
---
type: published
title: Your Published Work Title
description: A brief description
publicationDate: 2024
publisher: Publisher Name (optional)
link: https://example.com (optional)
createdAt: 2024-01-15T00:00:00.000Z
---

Additional notes or content (optional)
```

## Usage

Run the ingestion script to process all markdown files in this folder:

```bash
npm run ingest:papers
```

Or use the utility function in your code to process files manually.

