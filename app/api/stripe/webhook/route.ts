import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, credits, packName } = session.metadata || {}

    if (userId && credits) {
      const supabase = createServerClient()
      const creditsNum = parseInt(credits)
      const amountPaid = (session.amount_total || 0) / 100

      await supabase.rpc('add_credits', { user_id: userId, amount: creditsNum })

      await supabase.from('transactions').insert({
        user_id: userId,
        stripe_payment_id: session.payment_intent as string,
        credits_added: creditsNum,
        amount_paid: amountPaid,
        pack_name: packName || '',
      })
    }
  }

  return NextResponse.json({ received: true })
}
