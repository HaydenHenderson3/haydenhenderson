import { Link } from 'react-router-dom'
import { stories } from '../data/papers'

function Stories() {
  const getExcerpt = (text: string) => {
    // Strip markdown syntax for a clean plaintext excerpt
    const plain = text
      .replace(/^#{1,6}\s+/gm, '')       // headings
      .replace(/\*\*(.+?)\*\*/g, '$1')   // bold
      .replace(/\*(.+?)\*/g, '$1')       // italic
      .replace(/__(.+?)__/g, '$1')       // bold alt
      .replace(/_(.+?)_/g, '$1')         // italic alt
      .replace(/~~(.+?)~~/g, '$1')       // strikethrough
      .replace(/`(.+?)`/g, '$1')         // inline code
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
      .replace(/!\[.*?\]\(.+?\)/g, '')   // images
      .replace(/^\s*[-*+]\s+/gm, '')     // unordered lists
      .replace(/^\s*\d+\.\s+/gm, '')     // ordered lists
      .replace(/^\s*>\s+/gm, '')         // blockquotes
      .replace(/\n{2,}/g, ' ')           // collapse multiple newlines
      .replace(/\n/g, ' ')               // remaining newlines
      .trim()
    return plain.length > 120 ? plain.substring(0, 120) + '...' : plain
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

      <div className="space-y-6">
        {stories.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">✍️</div>
            <p className="text-gray-600 text-lg font-medium">No stories yet</p>
          </div>
        ) : (
          stories.map((story) => (
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
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Stories
