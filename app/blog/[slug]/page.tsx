import { permanentRedirect } from 'next/navigation'

// Blog posts now live at the top level (/slug). Permanently redirect the old
// /blog/slug URLs so any existing links and indexed pages keep working.
export default function LegacyBlogPostRedirect({ params }: { params: { slug: string } }) {
  permanentRedirect(`/${params.slug}`)
}
