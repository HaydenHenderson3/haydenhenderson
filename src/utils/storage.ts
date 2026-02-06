import { Review, Story, PublishedWork } from '../types'

const REVIEWS_KEY = 'reviews'
const STORIES_KEY = 'stories'
const PUBLISHED_WORKS_KEY = 'publishedWorks'
const SAMPLES_INITIALIZED_KEY = 'samplesInitialized'

const sampleReviews: Review[] = [
  {
    id: 'sample-review-1',
    title: 'Lorem Ipsum Dolor Sit',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-review-2',
    title: 'Consectetur Adipiscing Elit',
    text: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-review-3',
    title: 'Sed Do Eiusmod Tempor',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const sampleStories: Story[] = [
  {
    id: 'sample-story-1',
    title: 'Incipit Narratio Prima',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-story-2',
    title: 'Secunda Fabula',
    text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-story-3',
    title: 'Tertia Historia',
    text: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const samplePublishedWorks: PublishedWork[] = [
  {
    id: 'sample-work-1',
    title: 'Opus Primum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    publicationDate: '2023',
    publisher: 'Lorem Publishing',
    link: 'https://example.com',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-work-2',
    title: 'Secundum Opus',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    publicationDate: '2022',
    publisher: 'Ipsum Books',
    link: 'https://example.com',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-work-3',
    title: 'Tertium Opus',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    publicationDate: '2021',
    publisher: 'Dolor Press',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function initializeSamples() {
  const initialized = localStorage.getItem(SAMPLES_INITIALIZED_KEY)
  if (initialized === 'true') {
    return
  }

  // Only initialize if storage is empty
  const existingReviews = storage.reviews.get()
  const existingStories = storage.stories.get()
  const existingPublishedWorks = storage.publishedWorks.get()

  if (existingReviews.length === 0) {
    storage.reviews.set(sampleReviews)
  }

  if (existingStories.length === 0) {
    storage.stories.set(sampleStories)
  }

  if (existingPublishedWorks.length === 0) {
    storage.publishedWorks.set(samplePublishedWorks)
  }

  localStorage.setItem(SAMPLES_INITIALIZED_KEY, 'true')
}

export const storage = {
  reviews: {
    get: (): Review[] => {
      const data = localStorage.getItem(REVIEWS_KEY)
      return data ? JSON.parse(data) : []
    },
    set: (reviews: Review[]) => {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
    },
    add: (review: Review) => {
      const reviews = storage.reviews.get()
      reviews.push(review)
      storage.reviews.set(reviews)
    },
    remove: (id: string) => {
      const reviews = storage.reviews.get()
      const filtered = reviews.filter(r => r.id !== id)
      storage.reviews.set(filtered)
    },
    update: (id: string, updatedReview: Partial<Review>) => {
      const reviews = storage.reviews.get()
      const index = reviews.findIndex(r => r.id === id)
      if (index !== -1) {
        reviews[index] = { ...reviews[index], ...updatedReview }
        storage.reviews.set(reviews)
      }
    },
  },
  stories: {
    get: (): Story[] => {
      const data = localStorage.getItem(STORIES_KEY)
      return data ? JSON.parse(data) : []
    },
    set: (stories: Story[]) => {
      localStorage.setItem(STORIES_KEY, JSON.stringify(stories))
    },
    add: (story: Story) => {
      const stories = storage.stories.get()
      stories.push(story)
      storage.stories.set(stories)
    },
    remove: (id: string) => {
      const stories = storage.stories.get()
      const filtered = stories.filter(s => s.id !== id)
      storage.stories.set(filtered)
    },
    update: (id: string, updatedStory: Partial<Story>) => {
      const stories = storage.stories.get()
      const index = stories.findIndex(s => s.id === id)
      if (index !== -1) {
        stories[index] = { ...stories[index], ...updatedStory }
        storage.stories.set(stories)
      }
    },
  },
  publishedWorks: {
    get: (): PublishedWork[] => {
      const data = localStorage.getItem(PUBLISHED_WORKS_KEY)
      return data ? JSON.parse(data) : []
    },
    set: (works: PublishedWork[]) => {
      localStorage.setItem(PUBLISHED_WORKS_KEY, JSON.stringify(works))
    },
    add: (work: PublishedWork) => {
      const works = storage.publishedWorks.get()
      works.push(work)
      storage.publishedWorks.set(works)
    },
    remove: (id: string) => {
      const works = storage.publishedWorks.get()
      const filtered = works.filter(w => w.id !== id)
      storage.publishedWorks.set(filtered)
    },
    update: (id: string, updatedWork: Partial<PublishedWork>) => {
      const works = storage.publishedWorks.get()
      const index = works.findIndex(w => w.id === id)
      if (index !== -1) {
        works[index] = { ...works[index], ...updatedWork }
        storage.publishedWorks.set(works)
      }
    },
  },
}

