import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { stories } from '../data/papers'

function StoryDetail() {
  const { id } = useParams<{ id: string }>()
  const story = stories.find(s => s.id === id) || null

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-gray-600 text-lg font-medium mb-4">Story not found</p>
          <Link
            to="/stories"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold"
          >
            ← Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  const date = new Date(story.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/stories"
        className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold mb-8"
      >
        ← Back to Stories
      </Link>

      <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8 sm:p-12">
        <header className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {story.title}
          </h1>
          <p className="text-sm text-gray-500">{date}</p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <Markdown>{story.text}</Markdown>
        </div>
      </article>
    </div>
  )
}

export default StoryDetail
