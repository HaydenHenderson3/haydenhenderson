import { Review, Story, PublishedWork } from '../types'
import { storage } from './storage'

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

  // Simple YAML parser for our use case
  const frontmatter: any = {}
  const lines = frontmatterText.split('\n')
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    
    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    
    frontmatter[key] = value
  }

  return { frontmatter: frontmatter as PaperFrontmatter, body }
}

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50) + '-' + Date.now()
}

// Browser-compatible function for manual file upload
export function ingestMarkdownContent(content: string, filename: string): boolean {
  const parsed = parseFrontmatter(content)
  
  if (!parsed) {
    console.error(`Failed to parse frontmatter in ${filename}`)
    return false
  }

  const { frontmatter, body } = parsed
  const id = generateId(frontmatter.title)
  const createdAt = frontmatter.createdAt || new Date().toISOString()

  try {
    switch (frontmatter.type) {
      case 'review': {
        const review: Review = {
          id,
          title: frontmatter.title,
          text: body,
          createdAt,
        }
        storage.reviews.add(review)
        return true
      }
      
      case 'story': {
        const story: Story = {
          id,
          title: frontmatter.title,
          text: body,
          createdAt,
        }
        storage.stories.add(story)
        return true
      }
      
      case 'published': {
        const publishedWork: PublishedWork = {
          id,
          title: frontmatter.title,
          description: frontmatter.description || body.substring(0, 200),
          publicationDate: frontmatter.publicationDate,
          publisher: frontmatter.publisher,
          link: frontmatter.link,
          createdAt,
        }
        storage.publishedWorks.add(publishedWork)
        return true
      }
      
      default:
        console.error(`Unknown type: ${frontmatter.type} in ${filename}`)
        return false
    }
  } catch (error) {
    console.error(`Error ingesting ${filename}:`, error)
    return false
  }
}

