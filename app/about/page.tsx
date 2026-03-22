import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div style={{background:'var(--bg-primary)', minHeight:'100vh', paddingTop:'80px'}}>
      {/* Hero */}
      <section className="py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at center, rgba(167,139,250,0.08) 0%, transparent 60%)'}} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-7xl mb-6">🐱</div>
          <h1 className="font-fraunces text-5xl font-black mb-6" style={{color:'var(--text-primary)'}}>
            Built by Cat Lovers,<br />for Cat Lovers
          </h1>
          <p className="text-xl" style={{color:'var(--text-muted)'}}>
            Our mission is simple: help every cat owner understand their feline companion better.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ['500+', 'Breeds Identified'],
            ['97%', 'Accuracy Rate'],
            ['100K+', 'Scans Completed'],
            ['80+', 'Countries'],
          ].map(([val, label]) => (
            <div key={label} className="rounded-2xl p-5 text-center" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="font-fraunces text-3xl font-black mb-1" style={{color:'var(--accent)'}}>{val}</div>
              <div className="text-xs" style={{color:'var(--text-muted)'}}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-16">
        <div className="rounded-2xl p-8" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
          <h2 className="font-fraunces text-3xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Our Mission</h2>
          <p className="text-base mb-4" style={{color:'var(--text-muted)'}}>
            Every cat has a story. Whether you rescued a stray, adopted from a shelter, or brought home a kitten, understanding your cat&apos;s breed opens a window into their personality, health needs, and quirky behaviors.
          </p>
          <p className="text-base mb-4" style={{color:'var(--text-muted)'}}>
            We built CatScanner because we believe every cat owner deserves to understand their companion better — from first-time pet owners to experienced breeders and veterinarians.
          </p>
          <p className="text-base" style={{color:'var(--text-muted)'}}>
            Our AI identifies over 500 breeds with industry-leading accuracy, providing detailed insights into personality, health, care needs, and more — all in under 30 seconds.
          </p>
        </div>
      </section>

      {/* How we built it */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-16">
        <div className="rounded-2xl p-8" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
          <h2 className="font-fraunces text-3xl font-bold mb-4" style={{color:'var(--text-primary)'}}>How We Built It</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl" style={{background:'var(--accent-bg)'}}>🧠</div>
              <div>
                <h3 className="font-semibold mb-1" style={{color:'var(--text-primary)'}}>Claude AI by Anthropic</h3>
                <p className="text-sm" style={{color:'var(--text-muted)'}}>We use the latest Claude multimodal AI model, trained to recognize visual features like coat patterns, facial structure, ear shape, and body proportions.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl" style={{background:'var(--purple-bg)'}}>🔬</div>
              <div>
                <h3 className="font-semibold mb-1" style={{color:'var(--text-primary)'}}>Feline Genetics Expertise</h3>
                <p className="text-sm" style={{color:'var(--text-muted)'}}>Our AI prompts are crafted with input from veterinarians and feline genetics experts to ensure accuracy and practical value.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl" style={{background:'rgba(34,197,94,0.1)'}}>🔒</div>
              <div>
                <h3 className="font-semibold mb-1" style={{color:'var(--text-primary)'}}>Privacy First</h3>
                <p className="text-sm" style={{color:'var(--text-muted)'}}>We never store your original photos. Images are processed client-side and only a hash is used for caching results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-4">
        <h2 className="font-fraunces text-3xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Ready to Discover Your Cat&apos;s Breed?</h2>
        <Link href="/#scanner" className="inline-block px-8 py-3 rounded-full font-semibold text-white glow-orange" style={{background:'var(--btn-primary)'}}>
          Scan Your Cat Free →
        </Link>
      </section>
    </div>
  )
}
