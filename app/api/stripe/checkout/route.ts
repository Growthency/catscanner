import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })
}

const PACKS: Record<string, { priceId: string | undefined; credits: number; name: string }> = {
  starter:  { priceId: process.env.STRIPE_STARTER_PRICE_ID,  credits: 120,  name: 'Starter Pack'  },
  explorer: { priceId: process.env.STRIPE_EXPLORER_PRICE_ID, credits: 550,  name: 'Explorer Pack' },
  pro:      { priceId: process.env.STRIPE_PRO_PRICE_ID,      credits: 1200, name: 'Pro Pack'       },
}

export async function POST(req: NextRequest) {
  try {
    const { packId, userId } = await req.json()
    const pack = PACKS[packId]
    if (!pack || !pack.priceId) {
      return NextResponse.json({ error: 'Invalid pack' }, { status: 400 })
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: pack.priceId, quantity: 1 }],
      metadata: { userId: userId || '', credits: pack.credits.toString(), packName: pack.name },
      success_url: `${baseUrl}/dashboard?payment=success`,
      cancel_url: `${baseUrl}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
