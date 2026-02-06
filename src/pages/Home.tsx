import { Link } from 'react-router-dom'
import HomeHero from '../components/HomeHero'

function Home() {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/reviews"
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-900 transition-colors text-center"
          >
            View Book Reviews
          </Link>
          <Link
            to="/stories"
            className="w-full sm:w-auto px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition-colors text-center"
          >
            Read Short Stories
          </Link>
          <Link
            to="/published-works"
            className="w-full sm:w-auto px-8 py-4 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 transition-colors text-center"
          >
            Published Works
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

