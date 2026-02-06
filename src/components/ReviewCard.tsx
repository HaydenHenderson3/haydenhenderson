import Markdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { Review } from '../types'

interface ReviewCardProps {
  review: Review
}

function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="relative">
          <img
            src="/pp.jpg"
            alt="Hayden Henderson"
            className="w-14 h-14 rounded-lg object-cover ring-2 ring-slate-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56"%3E%3Crect fill="%23e0f2fe" width="56" height="56" rx="8"/%3Ctext fill="%23064794" font-family="sans-serif" font-size="24" font-weight="600" dy=".3em" x="50%25" y="50%25" text-anchor="middle"%3EHH%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-lg">Hayden Henderson</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{review.title}</h2>

      {review.coverImageDataUrl && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
          <img
            src={review.coverImageDataUrl}
            alt={`${review.title} cover`}
            className="w-full max-w-md h-64 object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-700">
        <Markdown remarkPlugins={[remarkBreaks]}>{review.text}</Markdown>
      </div>
    </article>
  )
}

export default ReviewCard
