import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase-server'
import { type Post } from '@/lib/posts'
import ArticleView from '@/components/ArticleView'

const getPost = cache(async (slug: string): Promise<Post | null> => {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').single()
    return (data as Post) || null
  } catch {
    return null
  }
})

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Article not found | CatScanner' }
  const title = post.meta_title || post.title
  const description = post.meta_description || post.excerpt || undefined
  const images = post.featured_image ? [post.featured_image] : undefined
  return {
    title,
    description,
    alternates: { canonical: `https://catscanner.org/${post.slug}` },
    openGraph: { title, description, images, type: 'article', url: `https://catscanner.org/${post.slug}`, publishedTime: post.publish_date || undefined },
    twitter: { card: 'summary_large_image', title, description, images },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  return <ArticleView post={post} />
}
