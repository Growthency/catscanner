import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | CatScanner',
  description: 'How CatScanner collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://catscanner.org/privacy' },
}

const sections: LegalSection[] = [
  {
    h: 'Information We Collect',
    ul: [
      'Account information: your email address and name when you sign up (managed through our authentication provider).',
      'Photos you upload: images you submit to the scanner for breed analysis.',
      'Usage data: pages visited, scans performed, device and browser type, and approximate location derived from your IP address.',
      'Payment information: handled entirely by our payment provider, Paddle — we never see or store your full card details.',
      'Cookies and similar technologies used to keep you signed in and to measure traffic.',
    ],
  },
  {
    h: 'How We Use Your Information',
    ul: [
      'Provide and operate the scanner and your account.',
      'Process credits, subscriptions, and payments.',
      'Maintain security, prevent fraud and abuse, and enforce our Terms.',
      'Analyze and improve our service and content.',
      'Send essential service messages (and marketing only where you have opted in).',
    ],
  },
  {
    h: 'Photos and AI Processing',
    p: [
      'Photos you upload are sent to our AI provider (Anthropic) solely to generate your breed report. They are not used to train AI models.',
      'We may cache analysis results to speed up repeat scans and reduce processing costs. You can request deletion of your data at any time.',
    ],
  },
  {
    h: 'Cookies and Analytics',
    p: [
      'We use Google Analytics to understand how visitors use the site. These cookies collect aggregated, pseudonymous data. You can block cookies in your browser or opt out of Google Analytics using Google’s opt-out tools.',
    ],
  },
  {
    h: 'Third-Party Service Providers',
    p: ['We share data only with trusted providers who help us run CatScanner:'],
    ul: [
      'Supabase — authentication, database, and image storage.',
      'Anthropic — AI image analysis.',
      'Google Analytics — website analytics.',
      'Paddle — payment processing and billing (Merchant of Record).',
      'Vercel — website hosting and content delivery.',
    ],
  },
  {
    h: 'Payments',
    p: [
      'Paddle.com Market Ltd acts as the Merchant of Record for all purchases. Your payment details are collected and processed securely by Paddle under their own privacy policy; CatScanner does not store card numbers.',
    ],
  },
  {
    h: 'Data Retention',
    p: [
      'We keep account and scan data for as long as your account is active, and as needed to comply with legal obligations. When you delete your account we remove your personal data, except where retention is legally required.',
    ],
  },
  {
    h: 'Your Rights',
    p: [
      'Depending on where you live (including under the GDPR and CCPA), you may have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing. To exercise any of these rights, email support@catscanner.org.',
    ],
  },
  {
    h: 'Data Security',
    p: [
      'We use industry-standard measures including encryption in transit (HTTPS) and access controls to protect your data. No method of transmission is 100% secure, but we work hard to safeguard your information.',
    ],
  },
  {
    h: 'Children’s Privacy',
    p: [
      'CatScanner is not directed to children under 13, and we do not knowingly collect data from them. If you believe a child has provided us personal data, contact us and we will delete it.',
    ],
  },
  {
    h: 'International Users',
    p: [
      'We operate globally and may process data in countries other than your own. We take steps to ensure your data is protected wherever it is processed.',
    ],
  },
  {
    h: 'Changes to This Policy',
    p: [
      'We may update this Privacy Policy from time to time. Material changes will be posted on this page with a new “Last updated” date.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 14, 2026"
      intro="CatScanner.org (“CatScanner”, “we”, “us”) provides an AI-powered cat breed identification service. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using CatScanner you agree to this policy."
      sections={sections}
    />
  )
}
