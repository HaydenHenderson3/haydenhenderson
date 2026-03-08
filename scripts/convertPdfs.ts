import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PAPERS_DIR = path.resolve(__dirname, '..', 'papers')
const GENERATED_DIR = path.join(PAPERS_DIR, 'generated')
const PUBLIC_STORIES_DIR = path.resolve(__dirname, '..', 'public', 'stories')

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

function convertPdfs() {
  if (!fs.existsSync(PAPERS_DIR)) {
    return
  }

  const pdfFiles = fs.readdirSync(PAPERS_DIR).filter(f => f.toLowerCase().endsWith('.pdf'))

  if (pdfFiles.length === 0) {
    if (fs.existsSync(GENERATED_DIR)) {
      fs.rmSync(GENERATED_DIR, { recursive: true })
    }
    if (fs.existsSync(PUBLIC_STORIES_DIR)) {
      fs.rmSync(PUBLIC_STORIES_DIR, { recursive: true })
    }
    return
  }

  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true })
  }
  if (!fs.existsSync(PUBLIC_STORIES_DIR)) {
    fs.mkdirSync(PUBLIC_STORIES_DIR, { recursive: true })
  }

  const generatedFiles = new Set<string>()
  const copiedPdfs = new Set<string>()

  for (const file of pdfFiles) {
    const filepath = path.join(PAPERS_DIR, file)
    const title = path.basename(file, path.extname(file))
    const slug = slugify(title)
    const stat = fs.statSync(filepath)
    const createdAt = stat.mtime.toISOString()
    const pdfPublicPath = `/stories/${slug}.pdf`

    // Copy the PDF to public/stories/ for static serving
    const destPath = path.join(PUBLIC_STORIES_DIR, `${slug}.pdf`)
    fs.copyFileSync(filepath, destPath)
    copiedPdfs.add(`${slug}.pdf`)

    // Write a metadata-only markdown file
    const frontmatter = [
      '---',
      'type: story',
      `title: ${title}`,
      `pdfFile: ${pdfPublicPath}`,
      `createdAt: ${createdAt}`,
      '---',
    ].join('\n')

    const outputPath = path.join(GENERATED_DIR, `${slug}.md`)
    fs.writeFileSync(outputPath, `${frontmatter}\n`)
    generatedFiles.add(`${slug}.md`)

    console.log(`Processed: ${file} -> public/stories/${slug}.pdf`)
  }

  // Clean up stale generated markdown files
  const existingGenerated = fs.readdirSync(GENERATED_DIR)
  for (const file of existingGenerated) {
    if (!generatedFiles.has(file)) {
      fs.unlinkSync(path.join(GENERATED_DIR, file))
    }
  }

  // Clean up stale copied PDFs
  const existingPdfs = fs.readdirSync(PUBLIC_STORIES_DIR)
  for (const file of existingPdfs) {
    if (!copiedPdfs.has(file)) {
      fs.unlinkSync(path.join(PUBLIC_STORIES_DIR, file))
    }
  }
}

convertPdfs()
