import { useState, useRef } from 'react'
import { Review } from '../types'

interface ReviewFormProps {
  onSubmit: (review: Review) => void
  initialReview?: Review
  onCancel?: () => void
}

function ReviewForm({ onSubmit, initialReview, onCancel }: ReviewFormProps) {
  const [title, setTitle] = useState(initialReview?.title || '')
  const [text, setText] = useState(initialReview?.text || '')
  const [coverImageDataUrl, setCoverImageDataUrl] = useState<string | undefined>(
    initialReview?.coverImageDataUrl
  )
  const [errors, setErrors] = useState<{ title?: string; text?: string }>({})
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
    const newErrors: { title?: string; text?: string } = {}

    if (!title.trim()) {
      newErrors.title = 'Book title is required'
    }
    if (!text.trim()) {
      newErrors.text = 'Review text is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const review: Review = {
      id: initialReview?.id || crypto.randomUUID(),
      title: title.trim(),
      text: text.trim(),
      coverImageDataUrl,
      createdAt: initialReview?.createdAt || new Date().toISOString(),
    }

    onSubmit(review)
    
    if (!initialReview) {
      setTitle('')
      setText('')
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
          {initialReview ? 'Edit Review' : 'Create New Review'}
        </h2>
        <p className="text-gray-600 text-sm">Share your thoughts on a book you've read</p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Book Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all ${
            errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
          }`}
          placeholder="Enter book title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Review Text <span className="text-red-500">*</span>
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-y ${
            errors.text ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
          }`}
          placeholder="Write your review here..."
        />
        {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text}</p>}
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
          <div className="mt-4 rounded-xl overflow-hidden shadow-md inline-block">
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
          {initialReview ? 'Update Review' : 'Submit Review'}
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

export default ReviewForm

