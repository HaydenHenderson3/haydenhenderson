import PublishedWorkCard from '../components/PublishedWorkCard'
import { publishedWorks } from '../data/papers'

function PublishedWorks() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Published Works
        </h1>
        <p className="text-lg text-gray-600">
          Published works and publications
        </p>
      </div>

      <div className="space-y-8">
        {publishedWorks.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-gray-600 text-lg font-medium">No published works yet</p>
          </div>
        ) : (
          publishedWorks.map((work) => (
            <PublishedWorkCard key={work.id} work={work} />
          ))
        )}
      </div>
    </div>
  )
}

export default PublishedWorks
