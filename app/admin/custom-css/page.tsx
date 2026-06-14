'use client'
import SettingsForm from '@/components/admin/SettingsForm'
import { FileCode } from 'lucide-react'

export default function CustomCssPage() {
  return (
    <SettingsForm
      title="Custom CSS"
      subtitle="Injected site-wide after the theme styles — tweak anything without a deploy."
      icon={FileCode}
      fields={[
        { key: 'custom_css', label: 'CSS', type: 'code', placeholder: '/* Example */\n.navbar { backdrop-filter: blur(20px); }' },
      ]}
    />
  )
}
