# Hayden Henderson - Book Reviews & Short Stories

A modern React website for showcasing book reviews and short stories.

## Features

- **Home Page**: Welcome section with navigation to reviews and stories
- **Book Reviews**: Create, view, edit, and delete book reviews with optional cover images
- **Short Stories**: Create, view, edit, and delete short stories with a dedicated detail page
- **Responsive Design**: Mobile-friendly layout using TailwindCSS
- **Local Storage**: All data persists in browser localStorage
- **Image Uploads**: Support for base64 image uploads for book covers
- **Owner/Visitor Mode**: Public-facing portfolio with owner mode for content management
  - **Visitor Mode** (default): Clean read-only view for public visitors
  - **Owner Mode**: Full editing capabilities for content management
  - Enable owner mode via the "Admin" link in the footer (password: `admin`)

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

## Owner Mode

The website has two modes:

1. **Visitor Mode** (default): Public visitors see a clean, read-only view of all content
2. **Owner Mode**: Enables full editing capabilities

To enable Owner Mode:
1. Scroll to the footer
2. Click the "Admin" link
3. Enter the password: `admin`
4. You'll see "Owner Mode" indicator in the footer

When in Owner Mode, you can:
- Create new reviews and stories
- Edit existing content
- Delete content
- Upload cover images

To change the password, edit `OWNER_PASSWORD` in `src/contexts/OwnerContext.tsx`

## Customization

- **Bio Text**: Edit the `bio` variable in `src/components/HomeHero.tsx`
- **Profile Picture**: Place a `profile.jpg` file in the `public` directory (or update the path in `ReviewCard.tsx`)
- **Owner Password**: Change `OWNER_PASSWORD` in `src/contexts/OwnerContext.tsx`

## Papers Ingestion

You can ingest markdown files into your book reviews, short stories, and published works in two ways:

### Method 1: Browser Upload (Recommended for Published Website)

1. Enable Owner Mode on your published website (click "Admin" in the footer)
2. Click "Import Papers" in the footer
3. Upload your markdown files (drag and drop or click to select)
4. Files will be automatically ingested into the appropriate collections

This method works directly on your published website - no build step required!

### Method 2: Command Line (For Local Development)

1. Place your markdown files in the `papers` folder
2. Each file should start with frontmatter (YAML) specifying the type and metadata
3. Run the ingestion script:

```bash
npm run ingest:papers
```

### Markdown File Format

See `papers/README.md` for detailed format specifications. Each file should include:
- `type`: Either `review`, `story`, or `published`
- `title`: The title of the item
- `createdAt`: ISO date string (optional, defaults to current date)
- Additional fields depending on type (see examples in `papers/` folder)

### Example Files

Example markdown files are provided in the `papers/` folder:
- `example-review.md` - Book review format
- `example-story.md` - Short story format
- `example-published.md` - Published work format

## Data Storage

All reviews, stories, and published works are stored in browser localStorage:
- `reviews`: Array of review objects
- `stories`: Array of story objects
- `publishedWorks`: Array of published work objects

