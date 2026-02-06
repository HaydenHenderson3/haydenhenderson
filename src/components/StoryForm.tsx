import { useState } from 'react'
import { Story } from '../types'

interface StoryFormProps {
  onSubmit: (story: Story) => void
  initialStory?: Story
  onCancel?: () => void
}

function StoryForm({ onSubmit, initialStory, onCancel }: StoryFormProps) {
  const [title, setTitle] = useState(initialStory?.title || '')
  const [text, setText] = useState(initialStory?.text || '')
  const [errors, setErrors] = useState<{ title?: string; text?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { title?: string; text?: string } = {}

    if (!title.trim()) {
      newErrors.title = 'Story title is required'
    }
    if (!text.trim()) {
      newErrors.text = 'Story text is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const story: Story = {
      id: initialStory?.id || crypto.randomUUID(),
      title: title.trim(),
      text: text.trim(),
      createdAt: initialStory?.createdAt || new Date().toISOString(),
    }

    onSubmit(story)
    
    if (!initialStory) {
      setTitle('')
      setText('')
    }
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {initialStory ? 'Edit Story' : 'Create New Story'}
        </h2>
        <p className="text-gray-600 text-sm">Share your creative writing with the world</p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Story Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all ${
            errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
          }`}
          placeholder="Enter story title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Story Text <span className="text-red-500">*</span>
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-y ${
            errors.text ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
          }`}
          placeholder="Write your story here..."
        />
        {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
        >
          {initialStory ? 'Update Story' : 'Submit Story'}
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

export default StoryForm

