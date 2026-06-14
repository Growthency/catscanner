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
  views: number
  custom_css?: string
  custom_schema?: string
  publish_date: string | null
  created_at: string
  updated_at: string
}

export const POST_CATEGORIES = ['Guide', 'Breeds', 'Health', 'Insights', 'Technology']

// Default author persona shown on posts that don't set their own author.
// Photo is a copyright-safe AI-generated portrait (a person who does not exist).
export const DEFAULT_AUTHOR_PHOTO = '/author-avatar.webp'
export const DEFAULT_AUTHOR_NAME = 'Marcus Bennett'
export const DEFAULT_AUTHOR_ROLE = 'Cat Specialist'

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
  author_name: DEFAULT_AUTHOR_NAME,
  author_role: DEFAULT_AUTHOR_ROLE,
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
