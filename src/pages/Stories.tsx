import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StoryForm from '../components/StoryForm'
import { Story } from '../types'
import { storage } from '../utils/storage'
import { useOwner } from '../contexts/OwnerContext'

function Stories() {
  const { isOwner } = useOwner()
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    setStories(storage.stories.get())
  }, [])

  const handleAddStory = (story: Story) => {
    storage.stories.add(story)
    setStories(storage.stories.get())
  }

  const handleDeleteStory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      storage.stories.remove(id)
      setStories(storage.stories.get())
    }
  }

  const getExcerpt = (text: string) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Short Stories
        </h1>
        <p className="text-lg text-gray-600">Explore original narratives and creative writing</p>
      </div>
      
      {isOwner && (
        <div className="mb-12">
          <StoryForm onSubmit={handleAddStory} />
        </div>
      )}

      <div className="space-y-6">
        {stories.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">✍️</div>
            <p className="text-gray-600 text-lg font-medium">No stories yet</p>
            {isOwner && (
              <p className="text-gray-500 mt-2">Create your first story above!</p>
            )}
          </div>
        ) : (
          stories
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <Link to={`/stories/${story.id}`} className="block">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-slate-700 transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">{formatDate(story.createdAt)}</p>
                  <p className="text-gray-600 leading-relaxed text-base">{getExcerpt(story.text)}</p>
                </Link>
                {isOwner && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleDeleteStory(story.id)
                      }}
                      className="px-5 py-2.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default Stories

