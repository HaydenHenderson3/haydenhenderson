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

## Data Storage

All reviews and stories are stored in browser localStorage:
- `reviews`: Array of review objects
- `stories`: Array of story objects

