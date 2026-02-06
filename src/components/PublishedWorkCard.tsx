import { useState } from 'react'
import { PublishedWork } from '../types'
import PublishedWorkForm from './PublishedWorkForm'
import { useOwner } from '../contexts/OwnerContext'

interface PublishedWorkCardProps {
  work: PublishedWork
  onDelete: (id: string) => void
  onUpdate: (id: string, updatedWork: Partial<PublishedWork>) => void
}

function PublishedWorkCard({ work, onDelete, onUpdate }: PublishedWorkCardProps) {
  const { isOwner } = useOwner()
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedWork: PublishedWork) => {
    onUpdate(work.id, updatedWork)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <PublishedWorkForm
        initialWork={work}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return (
    <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6">
        {work.coverImageDataUrl && (
          <div className="flex-shrink-0">
            <img
              src={work.coverImageDataUrl}
              alt={`${work.title} cover`}
              className="w-full sm:w-48 h-64 object-cover rounded-lg shadow-sm"
            />
          </div>
        )}
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{work.title}</h2>
          
          <div className="mb-4 space-y-1">
            {work.publicationDate && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Published:</span> {work.publicationDate}
              </p>
            )}
            {work.publisher && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Publisher:</span> {work.publisher}
              </p>
            )}
          </div>

          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
              {work.description}
            </p>
          </div>

          {work.link && (
            <div className="mb-6">
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
              >
                View Publication →
              </a>
            </div>
          )}

          {isOwner && (
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(work.id)}
                className="px-5 py-2.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default PublishedWorkCard

