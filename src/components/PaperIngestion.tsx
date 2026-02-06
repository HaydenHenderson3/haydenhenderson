import { useState, useRef } from 'react'
import { ingestMarkdownContent } from '../utils/ingestPapers'

interface PaperIngestionProps {
  onIngestComplete?: () => void
}

function PaperIngestion({ onIngestComplete }: PaperIngestionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
      return { success: false, error: `${file.name} is not a markdown file` }
    }

    try {
      const content = await file.text()
      const success = ingestMarkdownContent(content, file.name)
      return { success, error: success ? null : `Failed to parse ${file.name}` }
    } catch (error) {
      return { success: false, error: `Error reading ${file.name}: ${error}` }
    }
  }

  const processFiles = async (files: FileList) => {
    setIsProcessing(true)
    setResults(null)

    const fileArray = Array.from(files)
    let successCount = 0
    let failedCount = 0
    const errors: string[] = []

    for (const file of fileArray) {
      const result = await handleFile(file)
      if (result.success) {
        successCount++
      } else {
        failedCount++
        if (result.error) {
          errors.push(result.error)
        }
      }
    }

    setResults({ success: successCount, failed: failedCount, errors })
    setIsProcessing(false)

    // Dispatch custom event to notify pages of data changes
    window.dispatchEvent(new CustomEvent('storageUpdated'))

    if (onIngestComplete) {
      onIngestComplete()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Papers from Markdown</h3>
      <p className="text-sm text-gray-600 mb-4">
        Upload markdown files from your papers folder. Each file should have frontmatter specifying the type (review, story, or published).
      </p>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging 
            ? 'border-slate-500 bg-slate-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".md,.markdown"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />
        
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mb-3"></div>
            <p className="text-gray-600">Processing files...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-700 font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              Markdown files (.md, .markdown)
            </p>
          </div>
        )}
      </div>

      {results && (
        <div className={`mt-4 p-4 rounded-lg ${
          results.failed === 0 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`font-medium mb-2 ${
            results.failed === 0 ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {results.failed === 0 
              ? `✓ Successfully ingested ${results.success} file(s)` 
              : `Ingested ${results.success} file(s), ${results.failed} failed`
            }
          </p>
          {results.errors.length > 0 && (
            <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
              {results.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p className="font-medium mb-1">File Format:</p>
        <pre className="bg-gray-50 p-2 rounded text-left overflow-x-auto">
{`---
type: review | story | published
title: Your Title
createdAt: 2024-01-15T00:00:00.000Z
---

Your content here...`}
        </pre>
      </div>
    </div>
  )
}

export default PaperIngestion

