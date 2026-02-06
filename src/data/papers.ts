import { Review, Story, PublishedWork } from '../types'

interface PaperFrontmatter {
  type: 'review' | 'story' | 'published'
  title: string
  createdAt?: string
  description?: string
  publicationDate?: string
  publisher?: string
  link?: string
}

function parseFrontmatter(content: string): { frontmatter: PaperFrontmatter; body: string } | null {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return null
  }

  const frontmatterText = match[1]
  const body = match[2].trim()

  const frontmatter: Record<string, string> = {}
  const lines = frontmatterText.split('\n')

  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    frontmatter[key] = value
  }

  return { frontmatter: frontmatter as unknown as PaperFrontmatter, body }
}

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

// Load all markdown files from papers/ at build time
const paperFiles = import.meta.glob('/papers/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const allReviews: Review[] = []
const allStories: Story[] = []
const allPublishedWorks: PublishedWork[] = []

for (const [filepath, content] of Object.entries(paperFiles)) {
  const parsed = parseFrontmatter(content)
  if (!parsed) {
    console.warn(`Could not parse frontmatter in ${filepath}`)
    continue
  }

  const { frontmatter, body } = parsed
  const id = generateId(frontmatter.title)
  const createdAt = frontmatter.createdAt || new Date().toISOString()

  switch (frontmatter.type) {
    case 'review':
      allReviews.push({
        id,
        title: frontmatter.title,
        text: body,
        createdAt,
      })
      break

    case 'story':
      allStories.push({
        id,
        title: frontmatter.title,
        text: body,
        createdAt,
      })
      break

    case 'published':
      allPublishedWorks.push({
        id,
        title: frontmatter.title,
        description: frontmatter.description || body.substring(0, 200),
        publicationDate: frontmatter.publicationDate,
        publisher: frontmatter.publisher,
        link: frontmatter.link,
        createdAt,
      })
      break

    default:
      console.warn(`Unknown type "${frontmatter.type}" in ${filepath}`)
  }
}

// Sort by date, newest first
allReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
allStories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
allPublishedWorks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

export const reviews: Review[] = allReviews
export const stories: Story[] = allStories
export const publishedWorks: PublishedWork[] = allPublishedWorks

