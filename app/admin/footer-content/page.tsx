'use client'
import SettingsForm from '@/components/admin/SettingsForm'
import { PanelBottom } from 'lucide-react'

export default function FooterContentPage() {
  return (
    <SettingsForm
      title="Footer Content"
      subtitle="Everything in the public footer — edits go live without a deploy."
      icon={PanelBottom}
      fields={[
        { key: 'footer_brand', label: 'Brand Description', type: 'textarea', placeholder: 'AI-powered cat breed identification' },
        { key: 'footer_email', label: 'Contact Email', type: 'email', placeholder: 'support@catscanner.org' },
        { key: 'footer_copyright', label: 'Copyright Text (year is added automatically)', type: 'text', placeholder: 'CatScanner.org · English · For informational purposes only' },
        { key: 'footer_disclaimer', label: 'Safety Disclaimer', type: 'textarea', placeholder: 'CatScanner.org results are for informational purposes only. Always consult a veterinarian for medical advice.' },
      ]}
    />
  )
}
