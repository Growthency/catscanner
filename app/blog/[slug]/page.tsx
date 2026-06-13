import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import { createServerClient } from '@/lib/supabase-server'
import type { Post } from '@/lib/posts'

const getPost = cache(async (slug: string): Promise<Post | null> => {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    return (data as Post) || null
  } catch {
    return null
  }
})

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Article not found | CatScanner' }
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      images: post.featured_image ? [post.featured_image] : undefined,
      type: 'article',
    },
  }
}

function formatDate(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '88px' }}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={15} /> Back to Blog
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--purple-bg)', color: 'var(--purple)', border: '1px solid var(--border)' }}>
            {post.category}
          </span>
          {post.read_time && (
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}><Clock size={12} /> {post.read_time} read</span>
          )}
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}><Calendar size={12} /> {formatDate(post.publish_date || post.created_at)}</span>
        </div>

        <h1 className="font-fraunces font-black leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--text-primary)' }}>
          {post.title}
        </h1>

        {post.author_name && (
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>By {post.author_name}</p>
        )}

        {post.featured_image && (
          <img src={post.featured_image} alt={post.title} className="w-full rounded-2xl mb-8" style={{ border: '1px solid var(--border)' }} />
        )}

        <div className="post-body" style={{ color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: post.content || '' }} />
      </article>
    </div>
  )
}
