import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Refund Policy | CatScanner',
  description: 'When and how you can get a refund for CatScanner purchases.',
  alternates: { canonical: 'https://catscanner.org/refund' },
}

const sections: LegalSection[] = [
  {
    h: 'Merchant of Record',
    p: [
      'All payments are processed by Paddle.com Market Ltd, our Merchant of Record. Refunds are issued through Paddle back to your original payment method.',
    ],
  },
  {
    h: '7-Day Money-Back Guarantee',
    p: [
      'If you are not satisfied with a new premium subscription, you can request a full refund within 7 days of your initial purchase. This applies to first-time subscription purchases.',
    ],
  },
  {
    h: 'How to Request a Refund',
    p: [
      'Email support@catscanner.org from the address on your account, including your order or receipt ID (from your Paddle confirmation email). We aim to respond within 48 hours.',
    ],
  },
  {
    h: 'What Is Refundable',
    ul: [
      'First-time premium subscriptions, within the 7-day window.',
      'Accidental or duplicate charges.',
      'Charges resulting from a clear technical error on our side.',
    ],
  },
  {
    h: 'What Is Not Refundable',
    ul: [
      'Credits that have already been used to run scans.',
      'Subscription renewals after the first period (cancel before renewal to avoid being charged).',
      'Requests made outside the 7-day guarantee window, except where required by law.',
      'Accounts terminated for abuse or violation of our Terms.',
    ],
  },
  {
    h: 'Cancelling Your Subscription',
    p: [
      'You can cancel anytime from your account or via the link in your Paddle receipt. After cancelling, you keep access until the end of your current billing period. We do not provide pro-rated refunds for partial periods outside the guarantee window.',
    ],
  },
  {
    h: 'Processing Time',
    p: [
      'Approved refunds are processed by Paddle and typically appear on your statement within 5–10 business days, depending on your bank or card provider.',
    ],
  },
  {
    h: 'Chargebacks',
    p: [
      'If you have a problem with a charge, please contact us first — we can usually resolve it faster than a bank dispute.',
    ],
  },
]

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="June 14, 2026"
      intro="We want you to be happy with CatScanner. This Refund Policy explains when and how you can get a refund."
      sections={sections}
    />
  )
}
