import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'How Can I Tell What Breed My Kitten Is?',
  description: 'Stop guessing! How can I tell what breed my kitten is? From paw shapes to coat patterns, uncover the hidden traits that prove your kitten is actually a rare breed.',
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://catscanner.org/how-can-i-tell-what-breed-my-kitten-is/#article",
      "headline": "How Can I Tell What Breed My Kitten Is?",
      "description": "Stop guessing! How can I tell what breed my kitten is? From paw shapes to coat patterns, uncover the hidden traits that prove your kitten is actually a rare breed.",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://catscanner.org/how-can-i-tell-what-breed-my-kitten-is/" },
      "image": ["https://catscanner.org/how-can-i-tell-what-breed-my-kitten-is-1.webp"],
      "author": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/" },
      "publisher": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/", "logo": { "@type": "ImageObject", "url": "https://catscanner.org/icon.svg" } },
      "datePublished": "2026-03-30",
      "dateModified": "2026-03-30",
      "inLanguage": "en",
      "keywords": ["how can I tell what breed my kitten is", "kitten breed identification", "AI cat breed scanner", "what breed is my kitten", "identify kitten breed by picture"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://catscanner.org/how-can-i-tell-what-breed-my-kitten-is/#faq",
      "mainEntity": [
        { "@type": "Question", "name": "How can I tell what breed my kitten is?", "acceptedAnswer": { "@type": "Answer", "text": "You can tell what breed your kitten is by observing visual traits like coat pattern, face shape, ear structure, and body size, then comparing them with known breeds or uploading a photo to an AI Cat Breed Scanner. Most results are estimates since many kittens are mixed breed." } },
        { "@type": "Question", "name": "Is AI Cat Scanner accurate for kittens?", "acceptedAnswer": { "@type": "Answer", "text": "AI Cat Scanners provide probability-based estimates for kittens, not exact answers. Since kittens are still developing, results may change as the cat matures. For genetic accuracy, DNA testing services like Basepaws are recommended." } },
        { "@type": "Question", "name": "What age is best to identify a kitten's breed?", "acceptedAnswer": { "@type": "Answer", "text": "Around 8–12 weeks, features become clearer. Full identification is more reliable when the cat matures, as coat patterns, face shape, and body structure become more defined with age." } },
        { "@type": "Question", "name": "Are most kittens purebred?", "acceptedAnswer": { "@type": "Answer", "text": "No. Most kittens are mixed breed cats without a registered pedigree. The majority of domestic kittens are domestic shorthairs, domestic longhairs, or mixed breed combinations." } }
      ]
    }
  ]
}

export default function HowCanITellWhatBreedMyKittenIsPage() {
  return (
    <>
      <Script id="schema-kitten-breed-tell" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main style={{ paddingTop: '80px', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', padding: '4rem 1rem 3rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '2rem', padding: '0.4rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.05em' }}>
              🐱 REAL EXPERIENCE + AI GUIDE · KITTEN BREEDS
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              How Can I Tell{' '}
              <span style={{ color: 'var(--accent)' }}>What Breed</span>
              <br />
              <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>My Kitten Is?</span>
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 1.25rem' }}>
              I remember the first time someone asked me, <em>&quot;What breed is your kitten?&quot;</em> — and honestly, I had no clear answer. The kitten looked a bit like a <strong>Siamese cat</strong> because of its eyes, but the fluffy coat reminded me of a <strong>Maine Coon</strong>. That&apos;s when I realized identifying a kitten&apos;s breed isn&apos;t as simple as it sounds.
            </p>
            <div style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '1rem', padding: '1rem 1.25rem', maxWidth: '680px', margin: '0 auto 2rem', textAlign: 'left' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                💡 <strong style={{ color: 'var(--text-primary)' }}>The truth is:</strong> to tell what breed your kitten is, you need to combine visual observation (coat, face, body) with tools like an <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>AI Cat Breed Scanner</Link>. Even then, most results are estimates—because many kittens are mixed breed cats, not purebred.
              </p>
            </div>
            <Link
              href="/#scanner"
              style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: '2rem', fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
            >
              Find My Kitten&apos;s Breed →
            </Link>
          </div>
        </section>

        {/* ── FEATURED IMAGE ── */}
        <section style={{ padding: '3rem 1rem 0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 40px rgba(249,115,22,0.12)' }}>
              <img
                src="/how-can-i-tell-what-breed-my-kitten-is-1.webp"
                alt="how can I tell what breed my kitten is"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── CONTENT WRAPPER ── */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem' }}>

          {/* ── WHY HARD ── */}
          <section style={{ padding: '3rem 0 2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Why It&apos;s Hard to Identify a Kitten&apos;s Breed?
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              From my experience, kittens are like unfinished puzzles. Their features are still developing, which makes breed identification tricky.
            </p>
            <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>What Makes It Difficult?</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {[
                'Their eye color changes (many start with blue eyes)',
                'Their coat pattern may evolve over weeks',
                'Their body structure isn\'t fully formed yet',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1rem', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: '0.75rem', fontSize: '0.97rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: '#ef4444', flexShrink: 0 }}>⚠️</span> {item}
                </li>
              ))}
            </ul>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', padding: '1rem 1.25rem', marginBottom: '1rem', borderLeft: '3px solid var(--accent)' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                For example, a kitten that later grows into a long-haired cat may initially look like a regular domestic shorthair. Even breeds like the <strong>Persian cat</strong> don&apos;t always show their signature flat face clearly at a very young age.
              </p>
            </div>
            <p style={{ fontSize: '0.97rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>👉 That&apos;s why early guesses are often wrong.</p>
          </section>

          {/* ── WHAT I LOOK AT ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              What I First Look at When Identifying a Kitten
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              When someone shows me a kitten and asks about its breed, I don&apos;t jump to conclusions. I look at a few key features first.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                {
                  icon: '🐾', title: 'Coat Pattern and Color', color: 'var(--accent)',
                  intro: 'This is usually the first clue:',
                  items: ['Colorpoint pattern → often linked to Siamese cat', 'Spotted coat → possible Bengal cat influence', 'Solid gray coat → could resemble Russian Blue'],
                  note: "But here's the catch: coat patterns are not exclusive to one breed.",
                },
                {
                  icon: '😺', title: 'Face Shape and Eyes', color: 'var(--purple)',
                  intro: 'I always check:',
                  items: ['Round face → British Shorthair traits', 'Flat face → Persian cat influence', 'Almond-shaped eyes → Siamese cat'],
                  note: null,
                },
                {
                  icon: '🐈', title: 'Ears, Tail, and Body', color: '#0d9488',
                  intro: 'Some features stand out immediately:',
                  items: ['Large ears → may hint at Savannah cat', 'Bushy tail + big paws → often linked to Maine Coon'],
                  note: 'Still, I treat these as clues, not proof.',
                },
              ].map(({ icon, title, color, intro, items, note }) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color, margin: 0 }}>{title}</h3>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>{intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: note ? '0.75rem' : 0 }}>
                    {items.map(item => (
                      <li key={item} style={{ fontSize: '0.93rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>→</span> {item}
                      </li>
                    ))}
                  </ul>
                  {note && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0, borderTop: `1px solid var(--border)`, paddingTop: '0.6rem' }}>{note}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* ── IMAGE 2 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(124,58,237,0.1)' }}>
              <img
                src="/how-can-i-tell-what-breed-my-kitten-is-2.webp"
                alt="how can I tell what breed my kitten is"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── AI SCANNER ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              The Moment I Started Using AI Cat Breed Scanners
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.1rem' }}>
              After guessing wrong a few times, I started using our <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>AI Cat Breed Scanner</Link>, and honestly—it changed everything.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>These tools use:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🤖', label: 'Artificial Intelligence' },
                { icon: '👁️', label: 'Computer Vision' },
                { icon: '🧠', label: 'Machine Learning Models' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.9rem', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{icon}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              They analyze a kitten&apos;s features and compare them with a large breed database.
            </p>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>How I Use Cat Breed Scanners</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
              {[
                { n: '1', text: 'Take a clear photo (front face + body)', color: 'var(--accent)' },
                { n: '2', text: 'Upload it to a Cat Scanner tool', color: 'var(--purple)' },
                { n: '3', text: 'Wait a few seconds', color: '#0d9488' },
                { n: '4', text: 'Review breed matches + confidence score', color: '#3b82f6' },
              ].map(({ n, text, color }) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.85rem', padding: '0.85rem 1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{n}</div>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{text}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>What the Results Look Like</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Instead of giving one answer, the tool might say:</p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '0.85rem', padding: '0.75rem 1.25rem', fontWeight: 700, color: 'var(--accent)', fontSize: '0.97rem' }}>Ragdoll cat – 60%</div>
              <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '0.85rem', padding: '0.75rem 1.25rem', fontWeight: 700, color: 'var(--purple)', fontSize: '0.97rem' }}>Maine Coon – 30%</div>
            </div>
            <p style={{ fontSize: '0.97rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              And that&apos;s actually more realistic—because most kittens are mixed breed.
            </p>
          </section>

          {/* ── MIXED BREEDS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              What I Learned About Mixed Breed Kittens
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1rem' }}>
              One big realization: <strong>most kittens are not purebred</strong>.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Organizations like the <strong>Cat Fanciers&apos; Association</strong> only recognize specific pedigree cats, but the majority of kittens you see are:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginBottom: '1.5rem' }}>
              {['Domestic shorthair', 'Domestic longhair', 'Mixed breed combinations'].map(tag => (
                <span key={tag} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '2rem', padding: '0.4rem 1rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '1rem', padding: '1.1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>❌ Instead of asking</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>&quot;What exact breed is my kitten?&quot;</p>
              </div>
              <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '1rem', padding: '1.1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✅ Better to ask</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>&quot;What breeds might be influencing my kitten?&quot;</p>
              </div>
            </div>
          </section>

          {/* ── IMAGE 3 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(124,58,237,0.08)' }}>
              <img
                src="/how-can-i-tell-what-breed-my-kitten-is-3.webp"
                alt="how can I tell what breed my kitten is"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── TIPS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              My Personal Tips for Getting Better Results
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1rem' }}>✅ Practical Tips</h3>
                {['Take photos in natural lighting', 'Capture multiple angles', 'Focus on clear fur patterns', 'Don\'t rely on just one feature'].map(tip => (
                  <div key={tip} style={{ fontSize: '0.93rem', color: 'var(--text-muted)', padding: '0.3rem 0', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span> {tip}
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444', marginBottom: '1rem' }}>❌ What to Avoid</h3>
                {['Blurry or dark photos', 'Guessing based only on color', 'Expecting a perfect match', 'Identifying very young kittens (under 6–8 weeks)'].map(tip => (
                  <div key={tip} style={{ fontSize: '0.93rem', color: 'var(--text-muted)', padding: '0.3rem 0', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span> {tip}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── AI VS DNA ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              AI vs DNA Testing (My Honest Take)
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Some people ask me: <em>&quot;Should I use DNA testing instead?&quot;</em> Here&apos;s how I explain it:
            </p>
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '1.25rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.97rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Method', 'My Experience'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(249,115,22,0.04)' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>AI Cat Scanner</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Fast, easy, great for estimation</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--purple)' }}>DNA Testing (like Basepaws)</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)' }}>Accurate but slower and expensive</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                👉 I usually recommend: <strong style={{ color: 'var(--accent)' }}>Start with AI</strong> — use DNA only if you need exact genetic details.
              </p>
            </div>
          </section>

          {/* ── FINAL THOUGHTS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              So… What Breed Is Your Kitten?
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              If you ask me today, I&apos;ll give you a more honest answer than before:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '1rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>👉</span> Your kitten probably isn&apos;t one breed.
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '1rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>👉</span> It&apos;s a mix of traits from multiple ancestors.
              </div>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              And that&apos;s actually what makes it unique.
            </p>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>💬 Final Advice (From Real Experience)</h3>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1rem' }}>
                If someone asks you <em>&quot;What breed is your kitten?&quot;</em> you can confidently say:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-card)', borderRadius: '0.85rem', padding: '0.9rem 1.1rem', borderLeft: '3px solid var(--accent)', fontSize: '0.97rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  &quot;It looks like it has traits of a Maine Coon and maybe a Siamese cat mix.&quot;
                </div>
                <div style={{ background: 'var(--bg-card)', borderRadius: '0.85rem', padding: '0.9rem 1.1rem', borderLeft: '3px solid var(--purple)', fontSize: '0.97rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  &quot;I checked using the <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>AI Cat Breed Scanner</Link> — it shows a few likely matches.&quot;
                </div>
              </div>
              <p style={{ fontSize: '0.97rem', color: 'var(--text-muted)', margin: '1rem 0 0', fontStyle: 'italic' }}>
                And honestly, that&apos;s the most accurate answer you can give.
              </p>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { q: 'How can I tell what breed my kitten is?', a: "You can tell what breed your kitten is by observing visual traits like coat pattern, face shape, ear structure, and body size, then comparing them with known breeds or uploading a photo to an AI Cat Breed Scanner. Most results are estimates since many kittens are mixed breed." },
                { q: 'Is AI Cat Scanner accurate for kittens?', a: 'AI Cat Scanners provide probability-based estimates for kittens, not exact answers. Since kittens are still developing, results may change as the cat matures. For genetic accuracy, DNA testing services like Basepaws are recommended.' },
                { q: "What age is best to identify a kitten's breed?", a: 'Around 8–12 weeks, features become clearer. Full identification is more reliable when the cat matures, as coat patterns, face shape, and body structure become more defined with age.' },
                { q: 'Are most kittens purebred?', a: 'No. Most kittens are mixed breed cats without a registered pedigree. The majority of domestic kittens are domestic shorthairs, domestic longhairs, or mixed breed combinations.' },
              ].map(({ q, a }) => (
                <div key={q} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.6rem' }}>❓ {q}</h3>
                  <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section style={{ padding: '2rem 0 4rem' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(124,58,237,0.08))', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🐱</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Find Out Your Kitten&apos;s Breed Today
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 1.75rem' }}>
                Upload your kitten&apos;s photo and let AI analyze its features. Get breed matches with confidence scores in seconds—completely free.
              </p>
              <Link
                href="/#scanner"
                style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontWeight: 700, padding: '0.9rem 2.25rem', borderRadius: '2rem', fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
              >
                Scan Your Kitten for Free →
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
