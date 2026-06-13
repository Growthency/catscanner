export type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  meta_title: string
  meta_description: string
  tags: string
  category: string
  author_name: string
  author_role: string
  author_photo: string
  access_type: 'free' | 'premium'
  status: 'draft' | 'published'
  featured: boolean
  read_time: string
  publish_date: string | null
  created_at: string
  updated_at: string
}

export const POST_CATEGORIES = ['Guide', 'Breeds', 'Health', 'Insights', 'Technology']

// Shown as the author avatar when a post has no author photo.
export const DEFAULT_AUTHOR_PHOTO = '/icon.svg'

export const EMPTY_POST: Partial<Post> = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  featured_image: '',
  meta_title: '',
  meta_description: '',
  tags: '',
  category: 'Guide',
  author_name: 'CatScanner Team',
  author_role: 'Cat Specialist',
  author_photo: '',
  access_type: 'free',
  status: 'draft',
  featured: false,
  read_time: '5 min',
}

// Turn a title into a URL-safe slug.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
