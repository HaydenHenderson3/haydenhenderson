import { useState } from 'react'
import { useOwner } from '../contexts/OwnerContext'
import PaperIngestion from './PaperIngestion'

function Footer() {
  const { isOwner, toggleOwnerMode, enableOwnerMode } = useOwner()
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState('')
  const [showPaperIngestion, setShowPaperIngestion] = useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (enableOwnerMode(password)) {
      setShowPasswordPrompt(false)
      setPassword('')
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} Hayden Henderson. All rights reserved.
          </p>
          
          {!isOwner && !showPasswordPrompt && (
            <button
              onClick={() => setShowPasswordPrompt(true)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Admin
            </button>
          )}

          {showPasswordPrompt && (
            <form onSubmit={handlePasswordSubmit} className="flex gap-2 items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
              >
                Enter
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordPrompt(false)
                  setPassword('')
                }}
                className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </form>
          )}

          {isOwner && (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-700 font-medium">Owner Mode</span>
                <button
                  onClick={toggleOwnerMode}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Exit
                </button>
              </div>
              <button
                onClick={() => setShowPaperIngestion(!showPaperIngestion)}
                className="text-xs text-slate-600 hover:text-slate-800 transition-colors underline"
              >
                {showPaperIngestion ? 'Hide' : 'Import Papers'}
              </button>
            </div>
          )}
        </div>
        
        {isOwner && showPaperIngestion && (
          <div className="mt-6 max-w-2xl mx-auto">
            <PaperIngestion onIngestComplete={() => {
              // Pages will automatically refresh via storageUpdated event
            }} />
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer

