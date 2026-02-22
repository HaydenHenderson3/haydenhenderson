import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
// Import the lib directly to avoid pdf-parse's broken module.parent test-file loader
import pdf from 'pdf-parse/lib/pdf-parse.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PAPERS_DIR = path.resolve(__dirname, '..', 'papers')
const GENERATED_DIR = path.join(PAPERS_DIR, '.generated')

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

async function convertPdfs() {
  if (!fs.existsSync(PAPERS_DIR)) {
    console.log('No papers/ directory found, skipping PDF conversion.')
    return
  }

  const pdfFiles = fs.readdirSync(PAPERS_DIR).filter(f => f.toLowerCase().endsWith('.pdf'))

  if (pdfFiles.length === 0) {
    // Clean up .generated if no PDFs exist
    if (fs.existsSync(GENERATED_DIR)) {
      fs.rmSync(GENERATED_DIR, { recursive: true })
    }
    return
  }

  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true })
  }

  // Track which files we generate so we can clean up stale ones
  const generatedFiles = new Set<string>()

  for (const file of pdfFiles) {
    const filepath = path.join(PAPERS_DIR, file)
    const title = path.basename(file, path.extname(file))
    const slug = slugify(title)
    const stat = fs.statSync(filepath)
    const createdAt = stat.mtime.toISOString()

    try {
      const dataBuffer = fs.readFileSync(filepath)
      const data = await pdf(dataBuffer)
      const text = data.text.trim()

      const frontmatter = [
        '---',
        'type: story',
        `title: ${title}`,
        `createdAt: ${createdAt}`,
        '---',
      ].join('\n')

      const outputPath = path.join(GENERATED_DIR, `${slug}.md`)
      fs.writeFileSync(outputPath, `${frontmatter}\n\n${text}\n`)
      generatedFiles.add(`${slug}.md`)

      console.log(`Converted: ${file} -> .generated/${slug}.md`)
    } catch (error) {
      console.error(`Failed to convert ${file}:`, error)
    }
  }

  // Remove stale generated files that no longer correspond to a PDF
  const existingGenerated = fs.readdirSync(GENERATED_DIR)
  for (const file of existingGenerated) {
    if (!generatedFiles.has(file)) {
      fs.unlinkSync(path.join(GENERATED_DIR, file))
      console.log(`Removed stale: .generated/${file}`)
    }
  }
}

convertPdfs().catch(console.error)
