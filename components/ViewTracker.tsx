'use client'
import { useEffect, useRef } from 'react'

// Fires once per page load to bump the post's view count.
export default function ViewTracker({ slug }: { slug: string }) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    fetch('/api/post-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {})
  }, [slug])
  return null
}
