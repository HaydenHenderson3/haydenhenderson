export interface Review {
  id: string
  title: string
  text: string
  coverImageDataUrl?: string
  createdAt: string
}

export interface Story {
  id: string
  title: string
  text: string
  createdAt: string
}

export interface PublishedWork {
  id: string
  title: string
  description: string
  publicationDate?: string
  publisher?: string
  link?: string
  coverImageDataUrl?: string
  createdAt: string
}

