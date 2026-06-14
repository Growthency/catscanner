import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase-server'

// Theme-color overrides + custom CSS, cached for 30s. Injected site-wide so edits go live without a deploy.
const getCustomization = unstable_cache(
  async (): Promise<Record<string, string>> => {
    try {
      const supabase = createServerClient()
      const { data } = await supabase.from('site_settings').select('key,value')
        .in('key', ['theme_accent', 'theme_gradient_mid', 'theme_gradient_end', 'custom_css'])
      return Object.fromEntries((data || []).map((r: any) => [r.key, r.value || '']))
    } catch {
      return {}
    }
  },
  ['site-customization'],
  { revalidate: 30 },
)

export default async function SiteCustomization() {
  const s = await getCustomization()
  let css = ''

  const a = s.theme_accent, m = s.theme_gradient_mid, e = s.theme_gradient_end
  if (a) {
    css += `:root,[data-theme="light"],[data-theme="dark"]{--accent:${a}!important;--btn-primary:${a}!important;--accent-glow:${m || a}!important;}`
  }
  if (a && m && e) {
    css += `.gradient-text{background:linear-gradient(135deg,${a},${m},${e})!important;-webkit-background-clip:text!important;background-clip:text!important;-webkit-text-fill-color:transparent!important;}`
  }
  if (s.custom_css) css += '\n' + s.custom_css

  if (!css.trim()) return null
  return <style id="site-customization" dangerouslySetInnerHTML={{ __html: css }} />
}
