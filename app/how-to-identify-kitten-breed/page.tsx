import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'How to Identify Kitten Breed By Pictures?',
  description: "To identify a kitten's breed, observe key traits like coat pattern, eye color, ear shape, and body structure, then compare them with known breeds or use an AI Cat Breed Scanner.",
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://catscanner.org/how-to-identify-kitten-breed/#article",
      "headline": "How to Identify Kitten Breed By Pictures?",
      "description": "To identify a kitten's breed, observe key traits like coat pattern, eye color, ear shape, and body structure, then compare them with known breeds or use an AI Cat Breed Scanner.",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://catscanner.org/how-to-identify-kitten-breed/" },
      "author": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/" },
      "publisher": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/", "logo": { "@type": "ImageObject", "url": "https://catscanner.org/icon.svg" } },
      "datePublished": "2026-03-30",
      "dateModified": "2026-03-30",
      "inLanguage": "en",
      "keywords": ["how to identify kitten breed", "kitten breed identification", "AI cat breed scanner", "identify kitten by picture", "cat breed identifier"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://catscanner.org/how-to-identify-kitten-breed/#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Can you tell a kitten's breed by looking at it?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but only partially. Visual traits provide clues, but kittens may not show full breed characteristics until adulthood." } },
        { "@type": "Question", "name": "At what age can you identify a kitten's breed?", "acceptedAnswer": { "@type": "Answer", "text": "Around 8–12 weeks, some features become clearer, but full identification is easier when the cat matures." } },
        { "@type": "Question", "name": "Are most kittens purebred?", "acceptedAnswer": { "@type": "Answer", "text": "No. Most kittens are mixed breed cats without a registered pedigree." } },
        { "@type": "Question", "name": "Can AI identify kitten breeds accurately?", "acceptedAnswer": { "@type": "Answer", "text": "AI tools can estimate breed matches using image recognition, but results are based on probability rather than certainty." } }
      ]
    }
  ]
}

export default function HowToIdentifyKittenBreedPage() {
  return (
    <>
      <Script id="schema-kitten-breed" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main style={{ paddingTop: '80px', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', padding: '4rem 1rem 3rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '2rem', padding: '0.4rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.05em' }}>
              🐾 KITTEN GUIDE · AI BREED SCANNER · FREE TO USE
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              How to Identify{' '}
              <span style={{ color: 'var(--accent)' }}>Kitten Breed</span>
              <br />
              <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>By Pictures?</span>
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 1.25rem' }}>
              To <strong>identify a kitten&apos;s breed</strong>, observe key traits like coat pattern, eye color, ear shape, and body structure, then compare them with known breeds or use an <strong>AI Cat Breed Scanner</strong>. Because kittens are still developing, their features may not fully represent adult breed traits.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 2rem' }}>
              Tools powered by artificial intelligence, computer vision, and machine learning can analyze kitten photos and match them with breeds such as the <strong>Maine Coon</strong>, <strong>Siamese cat</strong>, or <strong>Persian cat</strong>, but results are usually estimates rather than exact matches.
            </p>
            <Link
              href="/#scanner"
              style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: '2rem', fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
            >
              Identify Your Kitten Free →
            </Link>
          </div>
        </section>

        {/* ── FEATURED IMAGE ── */}
        <section style={{ padding: '3rem 1rem 0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 40px rgba(249,115,22,0.12)' }}>
              <img
                src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=1200&q=80"
                alt="how to identify kitten breed"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── CONTENT WRAPPER ── */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem' }}>

          {/* ── UNDERSTANDING ── */}
          <section style={{ padding: '3rem 0 2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Understanding Kitten Breed Identification
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Identifying a kitten&apos;s breed is more complex than identifying an adult cat because kittens are still growing and their physical characteristics are not fully developed.
            </p>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Why Kitten Identification Is Challenging</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                'Features change as kittens grow',
                'Coat color and patterns may evolve',
                'Body size and shape are not fully formed',
                'Eye color often changes during early months',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: '0.75rem', fontSize: '0.97rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: '#ef4444' }}>⚠️</span> {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Most kittens are also <strong>mixed breed</strong> (domestic cats) rather than purebred, which makes identification based on appearance more difficult.
            </p>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Purebred vs Mixed Breed Kittens</h3>
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '1.25rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.97rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Type', 'Description', 'Example'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(249,115,22,0.04)' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>Purebred Kitten</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Comes from registered lineage</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Persian cat</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: 'var(--purple)' }}>Mixed Breed Kitten</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)' }}>Combination of multiple breeds</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)' }}>Domestic kitten</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Organizations like the <strong>Cat Fanciers&apos; Association</strong> define breed standards, but most kittens do not meet strict pedigree criteria.
            </p>
          </section>

          {/* ── KEY FEATURES ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Key Features to Identify Kitten Breed
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Even though kittens are still developing, certain visual traits can provide strong clues.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                {
                  icon: '🐾', title: 'Coat Color and Pattern', color: 'var(--accent)',
                  items: ['Tabby (striped patterns)', 'Colorpoint (light body, dark ears/face/tail)', 'Solid or bicolor coats'],
                  example: 'Colorpoint pattern → possible Siamese cat ancestry',
                },
                {
                  icon: '😺', title: 'Facial Structure and Eyes', color: 'var(--purple)',
                  items: ['Round face → British Shorthair traits', 'Flat face → Persian cat influence', 'Almond-shaped eyes → Siamese cat'],
                  example: null,
                },
                {
                  icon: '👂', title: 'Ears and Tail', color: '#0d9488',
                  items: ['Large ears → Savannah cat traits', 'Folded ears → Scottish Fold', 'Bushy tail → Maine Coon'],
                  example: null,
                },
                {
                  icon: '🐈', title: 'Body Shape and Fur Type', color: '#3b82f6',
                  items: ['Longhair → possible Persian or Maine Coon mix', 'Shorthair → common in domestic cats', 'Large paws → indicator of large breed ancestry'],
                  example: null,
                },
              ].map(({ icon, title, color, items, example }) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color, margin: 0 }}>{title}</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: example ? '0.8rem' : 0 }}>
                    {items.map(item => (
                      <li key={item} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  {example && (
                    <div style={{ background: 'var(--bg-secondary)', borderRadius: '0.6rem', padding: '0.6rem 0.9rem', fontSize: '0.87rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Example: {example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── IMAGE 2 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(124,58,237,0.1)' }}>
              <img
                src="https://images.unsplash.com/photo-1516750484197-82d9f0a79b8e?w=1200&q=80"
                alt="how to identify kitten breed"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── HOW AI WORKS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              How AI Cat Breed Scanners Identify Kitten Breeds
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Modern <strong>AI Cat Breed Identifiers</strong> use advanced technologies to analyze kitten images.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.85rem' }}>⚙️ Technologies Used</h3>
                {['Artificial Intelligence (AI)', 'Machine Learning', 'Computer Vision', 'Image Recognition', 'Convolutional Neural Networks (CNN)'].map(t => (
                  <div key={t} style={{ fontSize: '0.93rem', color: 'var(--text-muted)', padding: '0.3rem 0', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span> {t}
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--purple)', marginBottom: '0.85rem' }}>🔄 How the Process Works</h3>
                {[
                  ['1', 'Upload kitten photo'],
                  ['2', 'AI extracts features (coat, face, body)'],
                  ['3', 'System compares with breed database'],
                  ['4', 'Outputs predicted breeds with confidence score'],
                ].map(([num, step]) => (
                  <div key={step} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', padding: '0.3rem 0' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--purple)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{num}</span>
                    <span style={{ fontSize: '0.93rem', color: 'var(--text-muted)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: '0 0 0.4rem' }}><strong style={{ color: 'var(--text-primary)' }}>Example Output:</strong></p>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                A kitten may show: <strong>Ragdoll cat</strong> traits → soft coat, calm features &nbsp;|&nbsp; <strong>Russian Blue</strong> traits → gray coat, sleek body<br />
                👉 AI provides <em>probable matches</em>, not exact identification.
              </p>
            </div>
          </section>

          {/* ── STEP BY STEP ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Step-by-Step Guide to Identify Kitten Breed
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  step: '01', color: 'var(--accent)', title: 'Take a Clear Photo',
                  items: ['Use natural lighting', 'Capture front face and full body', 'Avoid blurry images'],
                },
                {
                  step: '02', color: 'var(--purple)', title: 'Upload to AI Cat Breed Scanner',
                  items: ['Upload image to a reliable Cat Scanner tool', 'Allow AI analysis to run', 'Wait for results'],
                },
                {
                  step: '03', color: '#0d9488', title: 'Review Breed Matches',
                  items: ['Top predicted breeds', 'Confidence score percentage', 'Similar breed suggestions'],
                },
                {
                  step: '04', color: '#3b82f6', title: 'Compare with Breed Characteristics',
                  items: ['Use cat breed charts', 'Visual comparison with known breeds', 'Read breed descriptions'],
                },
              ].map(({ step, color, title, items }) => (
                <div key={step} style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem' }}>
                  <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '0.85rem', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>{step}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Step {step}: {title}</h3>
                    {items.map(item => (
                      <div key={item} style={{ fontSize: '0.93rem', color: 'var(--text-muted)', padding: '0.2rem 0', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── QUICK REFERENCE TABLE ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Common Kitten Breed Clues (Quick Reference Table)
            </h2>
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.97rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Feature', 'Possible Breed Influence'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Blue eyes + colorpoint', 'Siamese cat'],
                    ['Long fluffy coat', 'Persian cat'],
                    ['Large ears', 'Savannah cat'],
                    ['Big paws', 'Maine Coon'],
                  ].map(([feature, breed], i) => (
                    <tr key={feature} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                      <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>{feature}</td>
                      <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--accent)', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>{breed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── IMAGE 3 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(249,115,22,0.08)' }}>
              <img
                src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=1200&q=80"
                alt="how to identify kitten breed"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── LIMITATIONS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Limitations of Identifying Kitten Breeds
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.1rem' }}>
              It&apos;s important to understand the limitations:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.25rem' }}>
              {[
                'Kittens change significantly with age',
                'Mixed breed traits can overlap',
                'Visual identification is not 100% accurate',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: '0.85rem', fontSize: '0.97rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: '#ef4444', flexShrink: 0 }}>⚠️</span> {item}
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                👉 For exact results, DNA testing services like <strong>Basepaws</strong> can analyze genetic ancestry.
              </p>
            </div>
          </section>

          {/* ── TIPS & BENEFITS ── */}
          <section style={{ padding: '2rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '1.1rem' }}>✅ Tips to Improve Accuracy</h2>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>Best Practices</h3>
                {[
                  'Take multiple photos (front, side, full body)',
                  'Wait until kitten is older (8–12 weeks+)',
                  'Compare multiple features, not just one',
                  'Use AI tools along with manual observation',
                ].map(tip => (
                  <div key={tip} style={{ fontSize: '0.92rem', color: 'var(--text-muted)', padding: '0.3rem 0', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span> {tip}
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--purple)', marginBottom: '1.1rem' }}>🎯 Benefits of Identifying Kitten Breed</h2>
                {[
                  ['🧠', 'Understand personality and behavior'],
                  ['✂️', 'Prepare for grooming needs'],
                  ['❤️', 'Anticipate health conditions'],
                  ['🥗', 'Improve diet and care planning'],
                ].map(([icon, benefit]) => (
                  <div key={benefit as string} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.4rem 0', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '1rem' }}>{icon}</span> {benefit}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  q: "Can you tell a kitten's breed by looking at it?",
                  a: 'Yes, but only partially. Visual traits provide clues, but kittens may not show full breed characteristics until adulthood.',
                },
                {
                  q: "At what age can you identify a kitten's breed?",
                  a: 'Around 8–12 weeks, some features become clearer, but full identification is easier when the cat matures.',
                },
                {
                  q: 'Are most kittens purebred?',
                  a: 'No. Most kittens are mixed breed cats without a registered pedigree.',
                },
                {
                  q: 'Can AI identify kitten breeds accurately?',
                  a: 'AI tools can estimate breed matches using image recognition, but results are based on probability rather than certainty.',
                },
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
                Start Identifying Your Kitten Today
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 1.75rem' }}>
                If you&apos;re wondering <em>&quot;What breed is my kitten?&quot;</em>, start by uploading a photo to an <strong>AI Cat Breed Scanner</strong>. Combine AI results with visual analysis to understand your kitten&apos;s unique traits and breed influences.
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
