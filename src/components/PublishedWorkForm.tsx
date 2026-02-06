import { useState, useRef } from 'react'
import { PublishedWork } from '../types'

interface PublishedWorkFormProps {
  onSubmit: (work: PublishedWork) => void
  initialWork?: PublishedWork
  onCancel?: () => void
}

function PublishedWorkForm({ onSubmit, initialWork, onCancel }: PublishedWorkFormProps) {
  const [title, setTitle] = useState(initialWork?.title || '')
  const [description, setDescription] = useState(initialWork?.description || '')
  const [publicationDate, setPublicationDate] = useState(initialWork?.publicationDate || '')
  const [publisher, setPublisher] = useState(initialWork?.publisher || '')
  const [link, setLink] = useState(initialWork?.link || '')
  const [coverImageDataUrl, setCoverImageDataUrl] = useState<string | undefined>(
    initialWork?.coverImageDataUrl
  )
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImageDataUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { title?: string; description?: string } = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const work: PublishedWork = {
      id: initialWork?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      publicationDate: publicationDate.trim() || undefined,
      publisher: publisher.trim() || undefined,
      link: link.trim() || undefined,
      coverImageDataUrl,
      createdAt: initialWork?.createdAt || new Date().toISOString(),
    }

    onSubmit(work)
    
    if (!initialWork) {
      setTitle('')
      setDescription('')
      setPublicationDate('')
      setPublisher('')
      setLink('')
      setCoverImageDataUrl(undefined)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {initialWork ? 'Edit Published Work' : 'Add Published Work'}
        </h2>
        <p className="text-gray-600 text-sm">Share your published works and publications</p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all ${
            errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
          }`}
          placeholder="Enter work title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all resize-y ${
            errors.description ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
          }`}
          placeholder="Enter description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700 mb-1">
            Publication Date (Optional)
          </label>
          <input
            type="text"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
            placeholder="e.g., 2023"
          />
        </div>
        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">
            Publisher (Optional)
          </label>
          <input
            type="text"
            id="publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
            placeholder="Enter publisher name"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
          Link (Optional)
        </label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
          placeholder="https://example.com"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image (Optional)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
        />
        {coverImageDataUrl && (
          <div className="mt-4 rounded-lg overflow-hidden shadow-md inline-block">
            <img
              src={coverImageDataUrl}
              alt="Cover preview"
              className="max-w-xs h-48 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
        >
          {initialWork ? 'Update Work' : 'Add Work'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default PublishedWorkForm

