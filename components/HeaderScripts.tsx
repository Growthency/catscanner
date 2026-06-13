import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase-server'

// Enabled custom scripts (analytics, pixels, verification tags), cached for 60s.
const getEnabledScripts = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const supabase = createServerClient()
      const { data } = await supabase.from('header_scripts').select('code').eq('enabled', true)
      return (data || []).map((s: any) => s.code).filter(Boolean)
    } catch {
      return []
    }
  },
  ['header-scripts-enabled'],
  { revalidate: 60 },
)

// Server component — injects the enabled scripts into the page (SSR, so they execute on load).
export default async function HeaderScripts() {
  const scripts = await getEnabledScripts()
  if (!scripts.length) return null
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: scripts.join('\n') }} />
}
