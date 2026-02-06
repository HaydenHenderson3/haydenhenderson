import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { OwnerProvider } from './contexts/OwnerContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Reviews from './pages/Reviews'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import PublishedWorks from './pages/PublishedWorks'
import { initializeSamples } from './utils/storage'

function App() {
  useEffect(() => {
    initializeSamples()
  }, [])

  return (
    <OwnerProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/published-works" element={<PublishedWorks />} />
          </Routes>
        </Layout>
      </Router>
    </OwnerProvider>
  )
}

export default App

