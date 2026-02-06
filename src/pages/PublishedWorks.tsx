import { useState, useEffect } from 'react'
import PublishedWorkForm from '../components/PublishedWorkForm'
import PublishedWorkCard from '../components/PublishedWorkCard'
import { PublishedWork } from '../types'
import { storage } from '../utils/storage'
import { useOwner } from '../contexts/OwnerContext'

function PublishedWorks() {
  const { isOwner } = useOwner()
  const [works, setWorks] = useState<PublishedWork[]>([])

  useEffect(() => {
    setWorks(storage.publishedWorks.get())
  }, [])

  const handleAddWork = (work: PublishedWork) => {
    storage.publishedWorks.add(work)
    setWorks(storage.publishedWorks.get())
  }

  const handleDeleteWork = (id: string) => {
    if (window.confirm('Are you sure you want to delete this published work?')) {
      storage.publishedWorks.remove(id)
      setWorks(storage.publishedWorks.get())
    }
  }

  const handleUpdateWork = (id: string, updatedWork: Partial<PublishedWork>) => {
    storage.publishedWorks.update(id, updatedWork)
    setWorks(storage.publishedWorks.get())
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Published Works
        </h1>
        <p className="text-lg text-gray-600">
          {isOwner ? 'Manage your published works and publications' : 'Published works and publications'}
        </p>
      </div>
      
      {isOwner && (
        <div className="mb-12">
          <PublishedWorkForm onSubmit={handleAddWork} />
        </div>
      )}

      <div className="space-y-8">
        {works.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-gray-600 text-lg font-medium">No published works yet</p>
            {isOwner && (
              <p className="text-gray-500 mt-2">Add your first published work above!</p>
            )}
          </div>
        ) : (
          works
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((work) => (
              <PublishedWorkCard
                key={work.id}
                work={work}
                onDelete={handleDeleteWork}
                onUpdate={handleUpdateWork}
              />
            ))
        )}
      </div>
    </div>
  )
}

export default PublishedWorks

