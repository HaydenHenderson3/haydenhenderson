import ReviewCard from '../components/ReviewCard'
import { reviews } from '../data/papers'

function Reviews() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Book Reviews
        </h1>
        <p className="text-lg text-gray-600">
          Book reviews and recommendations
        </p>
      </div>

      <div className="space-y-8">
        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 text-lg font-medium">No reviews yet</p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  )
}

export default Reviews
