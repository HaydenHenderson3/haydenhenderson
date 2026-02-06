import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:h-20 py-4 sm:py-0">
          <Link 
            to="/" 
            className="text-2xl font-bold text-slate-800 hover:text-slate-900 transition-colors mb-4 sm:mb-0"
          >
            Hayden Henderson
          </Link>
          <div className="flex space-x-1 sm:space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive('/')
                  ? 'bg-slate-800 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/reviews"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive('/reviews')
                  ? 'bg-slate-800 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Book Reviews
            </Link>
            <Link
              to="/stories"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive('/stories')
                  ? 'bg-slate-800 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Short Stories
            </Link>
            <Link
              to="/published-works"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive('/published-works')
                  ? 'bg-slate-800 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Published Works
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

