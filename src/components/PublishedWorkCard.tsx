import Markdown from 'react-markdown'
import { PublishedWork } from '../types'

interface PublishedWorkCardProps {
  work: PublishedWork
}

function PublishedWorkCard({ work }: PublishedWorkCardProps) {
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

          <div className="prose prose-lg max-w-none mb-6 text-gray-700">
            <Markdown>{work.description}</Markdown>
          </div>

          {work.link && (
            <div>
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
        </div>
      </div>
    </article>
  )
}

export default PublishedWorkCard
