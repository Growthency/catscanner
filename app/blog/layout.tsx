import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore the world of cats with Cat Scanner Blog. Find expert advice, breed identification tips, and heartwarming stories about our feline friends.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
