import * as fs from 'fs'
import * as path from 'path'
import { ingestMarkdownContent } from '../src/utils/ingestPapers'

// Run ingestion
const papersFolder = process.argv[2] || './papers'
const absolutePath = path.resolve(papersFolder)

if (!fs.existsSync(absolutePath)) {
  console.error(`Papers folder not found: ${absolutePath}`)
  process.exit(1)
}

const files = fs.readdirSync(absolutePath)
const markdownFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.markdown'))

if (markdownFiles.length === 0) {
  console.log('No markdown files found in papers folder')
  process.exit(0)
}

console.log(`Found ${markdownFiles.length} markdown file(s) to ingest...\n`)

let successCount = 0
for (const file of markdownFiles) {
  const filePath = path.join(absolutePath, file)
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    if (ingestMarkdownContent(content, file)) {
      successCount++
      console.log(`✓ Ingested: ${file}`)
    } else {
      console.error(`✗ Failed to ingest: ${file}`)
    }
  } catch (error) {
    console.error(`✗ Error reading ${file}:`, error)
  }
}

console.log(`\n✓ Successfully ingested ${successCount}/${markdownFiles.length} file(s)`)

