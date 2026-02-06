import { useState, useEffect } from 'react'
import ReviewForm from '../components/ReviewForm'
import ReviewCard from '../components/ReviewCard'
import { Review } from '../types'
import { storage } from '../utils/storage'
import { useOwner } from '../contexts/OwnerContext'

function Reviews() {
  const { isOwner } = useOwner()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const loadReviews = () => {
      setReviews(storage.reviews.get())
    }
    
    loadReviews()
    
    // Listen for storage updates (e.g., from paper ingestion)
    window.addEventListener('storageUpdated', loadReviews)
    
    return () => {
      window.removeEventListener('storageUpdated', loadReviews)
    }
  }, [])

  const handleAddReview = (review: Review) => {
    storage.reviews.add(review)
    setReviews(storage.reviews.get())
  }

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      storage.reviews.remove(id)
      setReviews(storage.reviews.get())
    }
  }

  const handleUpdateReview = (id: string, updatedReview: Partial<Review>) => {
    storage.reviews.update(id, updatedReview)
    setReviews(storage.reviews.get())
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Book Reviews
        </h1>
        <p className="text-lg text-gray-600">
          {isOwner ? 'Share your thoughts on the books you\'ve read' : 'Book reviews and recommendations'}
        </p>
      </div>
      
      {isOwner && (
        <div className="mb-12">
          <ReviewForm onSubmit={handleAddReview} />
        </div>
      )}

      <div className="space-y-8">
        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 text-lg font-medium">No reviews yet</p>
            {isOwner && (
              <p className="text-gray-500 mt-2">Create your first review above!</p>
            )}
          </div>
        ) : (
          reviews
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onDelete={handleDeleteReview}
                onUpdate={handleUpdateReview}
              />
            ))
        )}
      </div>
    </div>
  )
}

export default Reviews

