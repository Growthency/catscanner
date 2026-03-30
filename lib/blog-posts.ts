export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image: string
  imageAlt: string
  featured?: boolean
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '/most-popular-cat-breeds-in-the-world',
    title: 'Top 10 Most Popular Cat Breeds in the World',
    excerpt: 'Explore the top 10 most popular cat breeds worldwide — from Persian to Bengal. Learn about their temperament, grooming needs, and which breed fits your lifestyle best.',
    category: 'Breeds',
    readTime: '12 min',
    date: '2026-03-26',
    image: '/most-popular-cat-breeds-in-the-world.webp',
    imageAlt: 'most popular cat breeds in the world',
    featured: true,
  },
  {
    slug: '/how-to-use-cat-breed-scanner',
    title: 'How to Use Cat Breed Scanner? AI Cat Identifier by Photo Guide',
    excerpt: 'Learn how to use a Cat Breed Scanner step by step. Upload a photo, let AI analyze coat pattern, face shape, and ear structure, and instantly get your cat\'s breed.',
    category: 'Guide',
    readTime: '10 min',
    date: '2026-03-30',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
    imageAlt: 'how to use cat breed scanner',
  },
]

export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Breeds:     { bg: 'rgba(167,139,250,0.15)', text: 'var(--purple)' },
  Guide:      { bg: 'rgba(249,115,22,0.15)',  text: 'var(--accent)' },
  Insights:   { bg: 'rgba(20,184,166,0.15)',  text: '#0d9488' },
  Health:     { bg: 'rgba(239,68,68,0.15)',   text: '#ef4444' },
  Technology: { bg: 'rgba(59,130,246,0.15)',  text: '#3b82f6' },
}

export const CATEGORY_GRADIENTS: Record<string, string> = {
  Breeds:     'linear-gradient(135deg, #a78bfa22, #f9731622)',
  Guide:      'linear-gradient(135deg, #f9731622, #fb923c22)',
  Insights:   'linear-gradient(135deg, #14b8a622, #06b6d422)',
  Health:     'linear-gradient(135deg, #ef444422, #f9731622)',
  Technology: 'linear-gradient(135deg, #3b82f622, #a78bfa22)',
}

export const POSTS_PER_PAGE = 9
