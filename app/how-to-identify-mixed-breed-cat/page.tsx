import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'How to Identify Mixed Breed Cat with Pictures?',
  description: 'To identify a mixed breed cat using pictures, analyze visible traits like coat pattern, face shape, ear structure, and body size, then compare them with known breeds or use an AI Cat Breed Scanner.',
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://catscanner.org/how-to-identify-mixed-breed-cat/#article",
      "headline": "How to Identify Mixed Breed Cat with Pictures?",
      "description": "To identify a mixed breed cat using pictures, analyze visible traits like coat pattern, face shape, ear structure, and body size, then compare them with known breeds or use an AI Cat Breed Scanner.",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://catscanner.org/how-to-identify-mixed-breed-cat/" },
      "author": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/" },
      "publisher": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/", "logo": { "@type": "ImageObject", "url": "https://catscanner.org/icon.svg" } },
      "datePublished": "2026-03-30",
      "dateModified": "2026-03-30",
      "inLanguage": "en",
      "keywords": ["how to identify mixed breed cat", "mixed breed cat identification", "cat breed scanner", "AI cat identifier", "identify cat breed by picture"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://catscanner.org/how-to-identify-mixed-breed-cat/#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Can mixed breed cats be identified accurately?", "acceptedAnswer": { "@type": "Answer", "text": "Mixed breed cats can be identified to an extent using visual analysis and AI Cat Breed Scanners, but results are based on probability, not certainty. These tools compare features like coat pattern and face shape with known breeds such as the Maine Coon or Siamese cat, but exact lineage requires DNA testing." } },
        { "@type": "Question", "name": "What breed is my mixed cat?", "acceptedAnswer": { "@type": "Answer", "text": "Your cat may not belong to a single breed but can show traits from multiple breeds. For example, a cat with long fur and a bushy tail may have influence from the Norwegian Forest Cat, while its facial features may resemble a Persian cat." } },
        { "@type": "Question", "name": "Can AI detect multiple breeds in one cat?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Advanced AI Cat Breed Identification systems can detect multiple breed influences by analyzing dominant and secondary features. The results often include several possible matches with a confidence score, helping you understand breed combinations." } },
        { "@type": "Question", "name": "How reliable is visual identification compared to DNA testing?", "acceptedAnswer": { "@type": "Answer", "text": "Visual identification using AI is fast and useful for estimating breed traits, but it cannot confirm genetic ancestry. DNA testing services like Basepaws provide more accurate results by analyzing genetic markers, though they require more time and cost." } },
        { "@type": "Question", "name": "Why do most cats not match a single breed?", "acceptedAnswer": { "@type": "Answer", "text": "Most domestic cats are mixed breeds due to uncontrolled breeding over generations. Unlike purebred cats registered by organizations like the Cat Fanciers' Association, mixed cats inherit diverse traits, making exact classification difficult." } }
      ]
    }
  ]
}

export default function HowToIdentifyMixedBreedCatPage() {
  return (
    <>
      <Script id="schema-mixed-breed" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main style={{ paddingTop: '80px', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', padding: '4rem 1rem 3rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '2rem', padding: '0.4rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--purple)', letterSpacing: '0.05em' }}>
              🐱 AI + VISUAL GUIDE · MIXED BREEDS · FREE SCANNER
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              How to Identify{' '}
              <span style={{ color: 'var(--purple)' }}>Mixed Breed Cat</span>
              <br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>with Pictures? (AI + Visual Guide)</span>
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 1.25rem' }}>
              To <strong>identify a mixed breed cat</strong> using pictures, analyze visible traits like coat pattern, face shape, ear structure, and body size, then compare them with known breeds or use an <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>AI Cat Breed Scanner</Link>.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 2rem' }}>
              Modern tools use computer vision and machine learning to detect similarities with breeds such as the <strong>Maine Coon</strong>, <strong>Siamese cat</strong>, or <strong>Bengal cat</strong>. While visual identification is helpful, mixed-breed cats often show combined traits, so results are usually probabilistic rather than exact.
            </p>
            <Link
              href="/#scanner"
              style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: '2rem', fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
            >
              Identify Your Cat Free →
            </Link>
          </div>
        </section>

        {/* ── FEATURED IMAGE ── */}
        <section style={{ padding: '3rem 1rem 0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 40px rgba(124,58,237,0.12)' }}>
              <img
                src="https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=1200&q=80"
                alt="how to identify mixed breed cat"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── CONTENT WRAPPER ── */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem' }}>

          {/* ── INTRO ── */}
          <section style={{ padding: '3rem 0 2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Introduction to Identifying Mixed Breed Cats
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1rem' }}>
              A <strong>mixed breed cat</strong>—often called a domestic cat—is a feline that does not belong to a single recognized pedigree breed. Unlike purebred cats registered by organizations such as <strong>The International Cat Association</strong> or the <strong>Cat Fanciers&apos; Association</strong>, most cats inherit traits from multiple generations.
            </p>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Why Most Cats Are Mixed Breed</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {['Random breeding over generations', 'Lack of pedigree tracking', 'Natural selection in domestic environments'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', fontSize: '1rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--purple)', fontWeight: 700 }}>•</span> {item}
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Can You Identify Cat Breed by Pictures?</h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Yes, but with limitations. Visual identification relies on observable traits, not genetics. That means:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {[
                ['✓', 'var(--accent)', 'You can detect dominant breed features'],
                ['✗', '#ef4444', 'You cannot confirm exact ancestry without DNA testing'],
                ['~', 'var(--purple)', 'AI tools provide probability-based matches, not guarantees'],
              ].map(([icon, color, text]) => (
                <li key={text as string} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.65rem 1rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', fontSize: '0.97rem' }}>
                  <span style={{ color: color as string, fontWeight: 700, flexShrink: 0 }}>{icon}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{text}</span>
                </li>
              ))}
            </ul>
            <div style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                💡 This is why tools like our <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>AI Cat Identifier</Link> are useful—they combine image recognition + breed databases to improve accuracy.
              </p>
            </div>
          </section>

          {/* ── GENETICS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Understanding Cat Breed Classification and Genetics
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              To identify a mixed breed cat accurately, it&apos;s important to understand how cat breed classification and genetics work together.
            </p>

            {/* Comparison table */}
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.97rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Type', 'Definition', 'Example'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(249,115,22,0.04)' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>Purebred</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Registered lineage with fixed traits</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Persian cat</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: 'var(--purple)' }}>Mixed Breed</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)' }}>Combination of multiple breeds</td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)' }}>Domestic Shorthair</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>How Genetics Influence Appearance</h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Mixed breed cats inherit traits such as:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { icon: '🐾', trait: 'Coat color & pattern' },
                { icon: '👁️', trait: 'Eye color' },
                { icon: '🐈', trait: 'Body size & structure' },
                { icon: '👂', trait: 'Ear shape' },
              ].map(({ icon, trait }) => (
                <div key={trait} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '0.85rem', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{trait}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: '1rem', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                For example: A cat with a <strong>colorpoint coat</strong> may have ancestry linked to the <strong>Siamese cat</strong>. A large fluffy cat may show traits of the <strong>Maine Coon</strong>.
              </p>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Limitations of Visual Identification</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {['Some traits overlap across multiple breeds', 'Environmental factors affect appearance', 'Kittens may not show full breed characteristics'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: '0.75rem', fontSize: '0.97rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: '#ef4444' }}>⚠️</span> {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '0.97rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              👉 This is why visual analysis + AI tools + optional DNA testing work best together.
            </p>
          </section>

          {/* ── HOW AI WORKS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              How AI and Image Recognition Identify Mixed Breed Cats
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Modern <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'underline' }}>AI Cat Breed Scanners</Link> use advanced technologies to analyze cat images and predict breed combinations.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🤖', label: 'Artificial Intelligence' },
                { icon: '🧠', label: 'Machine Learning' },
                { icon: '👁️', label: 'Computer Vision' },
                { icon: '🔬', label: 'Convolutional Neural Networks (CNN)' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.9rem', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{icon}</div>
                  <div style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>How the AI Process Works</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { num: '1', title: 'Image Upload', desc: 'User uploads a cat photo', color: 'var(--accent)' },
                { num: '2', title: 'Feature Extraction', desc: 'AI detects coat pattern, face shape, body structure', color: 'var(--purple)' },
                { num: '3', title: 'Pattern Matching', desc: 'Compares features with breed database', color: '#0d9488' },
                { num: '4', title: 'Prediction Output', desc: 'Returns multiple breed matches with confidence scores', color: '#3b82f6' },
              ].map(({ num, title, desc, color }) => (
                <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.9rem', padding: '0.9rem 1.1rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{num}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{title}</div>
                    <div style={{ fontSize: '0.87rem', color: 'var(--text-muted)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: '0 0 0.5rem' }}><strong style={{ color: 'var(--text-primary)' }}>Example of AI Detection:</strong></p>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                A cat may show: <strong>Spotted coat</strong> → similar to Bengal cat &nbsp;|&nbsp; <strong>Round face</strong> → similar to British Shorthair<br />
                👉 The AI will output <em>multiple possible breeds</em>, not just one.
              </p>
            </div>
          </section>

          {/* ── IMAGE 2 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(249,115,22,0.1)' }}>
              <img
                src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=1200&q=80"
                alt="how to identify mixed breed cat"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── VISUAL FEATURES ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Key Visual Features to Analyze in Cat Photos
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              To identify a mixed breed cat manually (or improve AI accuracy), focus on specific physical traits.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                {
                  icon: '🐾', title: 'Coat and Fur Analysis', color: 'var(--accent)',
                  points: ['Coat patterns: tabby, spotted, bicolor, colorpoint', 'Fur type: longhair vs shorthair', 'Color variations: solid, shaded, marbled'],
                  example: 'Spotted coat → Bengal cat traits | Long thick fur → Norwegian Forest Cat influence',
                },
                {
                  icon: '😺', title: 'Facial Structure Identification', color: 'var(--purple)',
                  points: ['Face shape (round, wedge, flat)', 'Eye color and spacing', 'Nose and whisker pads'],
                  example: 'Flat face → Persian cat | Almond-shaped eyes → Siamese cat',
                },
                {
                  icon: '🐈', title: 'Body and Physical Traits', color: '#0d9488',
                  points: ['Body size (small, medium, large)', 'Muscle structure', 'Tail length and thickness', 'Ear size and positioning'],
                  example: 'Large ears → Savannah cat traits | Stocky body → British Shorthair',
                },
              ].map(({ icon, title, color, points, example }) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: color, margin: 0 }}>{title}</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.9rem' }}>
                    {points.map(p => (
                      <li key={p} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color, fontWeight: 700 }}>✓</span> {p}
                      </li>
                    ))}
                  </ul>
                  <div style={{ background: 'var(--bg-secondary)', borderRadius: '0.6rem', padding: '0.65rem 0.9rem', fontSize: '0.87rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Example: {example}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── STEP BY STEP ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Step-by-Step Guide to Identify Mixed Breed Cat with Pictures
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                {
                  step: '01', color: 'var(--accent)',
                  title: 'Capture a High-Quality Cat Image',
                  content: 'Use natural lighting, capture front face + full body, and avoid blur or shadows.',
                  note: '📌 Better images = higher AI accuracy',
                },
                {
                  step: '02', color: 'var(--purple)',
                  title: 'Upload Image to AI Cat Breed Scanner',
                  content: 'Use a reliable Cat Scanner or AI Cat Identifier tool — upload photo, allow AI to process image, and wait a few seconds.',
                  note: null,
                },
                {
                  step: '03', color: '#0d9488',
                  title: 'Analyze Breed Results and Confidence Score',
                  content: 'The tool will show top breed matches, confidence percentage, and similar breed suggestions.',
                  note: 'Example: Ragdoll cat – 65% | Russian Blue – 30%',
                },
                {
                  step: '04', color: '#3b82f6',
                  title: 'Compare Traits with Known Breeds',
                  content: 'Cross-check results with cat breed charts, breed descriptions, and visual comparison. Focus on dominant traits, not exact matches.',
                  note: null,
                },
              ].map(({ step, color, title, content, note }) => (
                <div key={step} style={{ display: 'flex', gap: '1.1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem' }}>
                  <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '0.85rem', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>{step}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Step {step}: {title}</h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: note ? '0 0 0.6rem' : 0 }}>{content}</p>
                    {note && <div style={{ fontSize: '0.87rem', color: color, fontWeight: 600 }}>{note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── COMMON COMBINATIONS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Common Mixed Breed Cat Combinations (With Examples)
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Mixed breed cats often inherit traits from multiple ancestors, creating unique combinations that can still resemble well-known breeds. By analyzing visual traits, you can identify likely breed influences.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                {
                  title: 'Maine Coon Mix vs Domestic Longhair',
                  points: ['Large body, long fur, bushy tail → Maine Coon traits', 'Less defined facial structure → domestic longhair influence'],
                },
                {
                  title: 'Siamese Mix vs Colorpoint Cats',
                  points: ['Blue eyes + colorpoint coat → Siamese cat ancestry', 'Body shape may vary depending on mix'],
                },
                {
                  title: 'Bengal Mix vs Spotted Domestic Cats',
                  points: ['Leopard-like spots → Bengal cat traits', 'Softer pattern or smaller size → mixed domestic genetics'],
                },
                {
                  title: 'Persian Mix vs Longhair Cats',
                  points: ['Long dense coat → Persian cat influence', 'Face may not be fully flat → partial breed traits'],
                },
              ].map(({ title, points }) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.1rem 1.25rem' }}>
                  <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>🐱 {title}</h3>
                  {points.map(p => (
                    <p key={p} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.2rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>→</span> {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: '1rem', padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Key Insight:</strong> Mixed breed cats rarely match one breed perfectly. Instead, they show <strong>dominant traits</strong> (most visible features) and <strong>secondary traits</strong> (less obvious influences). 👉 AI tools help detect these layered characteristics.
              </p>
            </div>
          </section>

          {/* ── BREED CHARTS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Using Cat Breed Charts and Databases for Identification
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              A <strong>Cat Breed Chart</strong> is one of the most effective tools for comparing visual traits across breeds.
            </p>
            <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Example Comparison Table</h3>
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.97rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Feature', 'Possible Breed Match'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Long fur + large body', 'Maine Coon'],
                    ['Colorpoint coat + blue eyes', 'Siamese cat'],
                    ['Round face + dense coat', 'British Shorthair'],
                  ].map(([feat, breed], i) => (
                    <tr key={feat} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                      <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>{feat}</td>
                      <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>{breed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Role of Cat Registries</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Breed standards from organizations like The International Cat Association, Cat Fanciers&apos; Association, and Fédération Internationale Féline help define physical traits, coat patterns, and breed-specific characteristics.</p>
            <p style={{ fontSize: '0.97rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>👉 AI models use similar standardized data for training.</p>
          </section>

          {/* ── IMAGE 3 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(124,58,237,0.08)' }}>
              <img
                src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&q=80"
                alt="how to identify mixed breed cat"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── AI VS DNA ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              AI Cat Scanner vs Cat DNA Testing for Mixed Breeds
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {[
                {
                  title: '🤖 AI Cat Breed Scanner', color: 'var(--accent)',
                  uses: ['Computer vision', 'Image recognition', 'Pattern matching'],
                  pros: ['Instant results', 'Easy to use', 'Free or low cost'],
                  cons: ['Based on appearance only', 'Cannot confirm genetic lineage'],
                },
                {
                  title: '🧬 Cat DNA Testing', color: 'var(--purple)',
                  uses: ['Genetic marker analysis', 'Breed ancestry breakdown'],
                  pros: ['Accurate genetic breakdown', 'Detects hidden ancestry', 'Identifies health markers'],
                  cons: ['Expensive', 'Takes time (days/weeks)'],
                },
              ].map(({ title, color, uses, pros, cons }) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: `1px solid ${color}30`, borderRadius: '1.25rem', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color, marginBottom: '1rem' }}>{title}</h3>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uses</div>
                    {uses.map(u => <div key={u} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', padding: '0.2rem 0' }}>· {u}</div>)}
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Advantages</div>
                    {pros.map(p => <div key={p} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', padding: '0.2rem 0' }}>✓ {p}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Limitations</div>
                    {cons.map(c => <div key={c} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', padding: '0.2rem 0' }}>✗ {c}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.97rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Method', 'Speed', 'Accuracy', 'Cost'].map(h => (
                      <th key={h} style={{ padding: '0.85rem 1.1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(249,115,22,0.04)' }}>
                    <td style={{ padding: '0.85rem 1.1rem', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>AI Scanner</td>
                    <td style={{ padding: '0.85rem 1.1rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>⚡ Instant</td>
                    <td style={{ padding: '0.85rem 1.1rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Visual accuracy</td>
                    <td style={{ padding: '0.85rem 1.1rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Low</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem 1.1rem', fontWeight: 600, color: 'var(--purple)' }}>DNA Testing</td>
                    <td style={{ padding: '0.85rem 1.1rem', color: 'var(--text-muted)' }}>Days/Weeks</td>
                    <td style={{ padding: '0.85rem 1.1rem', color: 'var(--text-muted)' }}>Genetic accuracy</td>
                    <td style={{ padding: '0.85rem 1.1rem', color: 'var(--text-muted)' }}>High</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.97rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>👉 Best approach: Use AI first, then DNA if needed.</p>
          </section>

          {/* ── TIPS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Tips to Improve Accuracy When Identifying Mixed Breed Cats
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1rem' }}>✅ Best Practices</h3>
                {['Use high-resolution images', 'Capture multiple angles (front, side, full body)', 'Ensure good lighting', 'Focus on clear fur patterns'].map(t => (
                  <div key={t} style={{ fontSize: '0.93rem', color: 'var(--text-muted)', padding: '0.3rem 0', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✓</span> {t}</div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--purple)', marginBottom: '1rem' }}>🎯 Advanced Tips</h3>
                {['Analyze multiple features together, not just one', 'Compare with multiple breeds', 'Use AI confidence score wisely', 'Avoid relying on color alone'].map(t => (
                  <div key={t} style={{ fontSize: '0.93rem', color: 'var(--text-muted)', padding: '0.3rem 0', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--purple)' }}>✓</span> {t}</div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '1.1rem', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '0.9rem', padding: '0.9rem 1.1rem' }}>
              <p style={{ fontSize: '0.93rem', color: 'var(--text-muted)', margin: 0 }}>
                <strong>Example:</strong> A gray cat may look like Russian Blue, but without the correct eye shape and body structure, it may just be a mixed breed.
              </p>
            </div>
          </section>

          {/* ── COMMON MISTAKES ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Common Mistakes in Identifying Mixed Breed Cats
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { num: '1', title: 'Assuming Coat Pattern Equals Breed', desc: 'Tabby pattern ≠ specific breed. Many breeds share similar patterns.' },
                { num: '2', title: 'Ignoring Body Structure', desc: 'Body size and shape are crucial — not just color or fur.' },
                { num: '3', title: 'Expecting Exact Breed Matches', desc: 'Mixed breed cats are not purebred. AI results show probabilities, not certainty.' },
                { num: '4', title: 'Misreading AI Confidence Scores', desc: 'A 60% match ≠ exact breed. It indicates similarity, not confirmation.' },
                { num: '5', title: 'Identifying Kittens Too Early', desc: "Kittens don't show full breed traits. Features develop with age." },
              ].map(({ num, title, desc }) => (
                <div key={num} style={{ display: 'flex', gap: '1rem', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: '0.9rem', padding: '1rem 1.1rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{num}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{title}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── BENEFITS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Benefits of Identifying Mixed Breed Cats
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Understanding your cat&apos;s mixed breed background is not just about curiosity—it provides real insights into behavior, health, and care needs. Whether you use visual analysis or an <strong>AI Cat Breed Scanner</strong>, identifying breed influences helps you become a better pet owner.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  icon: '🧠', title: 'Better Understanding of Cat Behavior and Temperament', color: 'var(--accent)',
                  content: 'Different breeds have unique personalities. Ragdoll cat → calm and affectionate | Bengal cat → active and energetic. Understanding breed influences helps predict activity level, social behavior, and training response.',
                },
                {
                  icon: '✂️', title: 'Improved Grooming and Care Routine', color: 'var(--purple)',
                  content: 'Breed traits affect grooming needs. Long-haired cats (e.g., Persian cat mix) require regular brushing. Short-haired cats (e.g., American Shorthair mix) need minimal grooming.',
                },
                {
                  icon: '❤️', title: 'Early Awareness of Health Risks', color: '#ef4444',
                  content: 'Some breeds are prone to specific conditions. Maine Coon → heart-related issues. Siamese cat → respiratory concerns. Identifying breed influence helps monitor potential health risks and schedule preventive veterinary care.',
                },
                {
                  icon: '🥗', title: 'Smarter Nutrition and Lifestyle Choices', color: '#0d9488',
                  content: 'Breed traits influence diet requirements, exercise needs, and energy levels. Active breeds like Savannah cat need more stimulation than relaxed breeds like British Shorthair.',
                },
                {
                  icon: '🏠', title: 'Better Adoption and Pet Matching', color: '#3b82f6',
                  content: 'Identifying breed mix helps you choose a cat that fits your lifestyle, understand long-term care needs, and build a stronger bond.',
                },
              ].map(({ icon, title, color, content }) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{icon}</div>
                  <div>
                    <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color, marginBottom: '0.4rem' }}>{title}</h3>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>{content}</p>
                  </div>
                </div>
              ))}
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
                  q: 'Can mixed breed cats be identified accurately?',
                  a: 'Mixed breed cats can be identified to an extent using visual analysis and AI Cat Breed Scanners, but results are based on probability, not certainty. These tools compare features like coat pattern and face shape with known breeds such as the Maine Coon or Siamese cat, but exact lineage requires DNA testing.'
                },
                {
                  q: 'What breed is my mixed cat?',
                  a: 'Your cat may not belong to a single breed but can show traits from multiple breeds. For example, a cat with long fur and a bushy tail may have influence from the Norwegian Forest Cat, while its facial features may resemble a Persian cat.'
                },
                {
                  q: 'Can AI detect multiple breeds in one cat?',
                  a: 'Yes. Advanced AI Cat Breed Identification systems can detect multiple breed influences by analyzing dominant and secondary features. The results often include several possible matches with a confidence score, helping you understand breed combinations.'
                },
                {
                  q: 'How reliable is visual identification compared to DNA testing?',
                  a: 'Visual identification using AI is fast and useful for estimating breed traits, but it cannot confirm genetic ancestry. DNA testing services like Basepaws provide more accurate results by analyzing genetic markers, though they require more time and cost.'
                },
                {
                  q: 'Why do most cats not match a single breed?',
                  a: "Most domestic cats are mixed breeds due to uncontrolled breeding over generations. Unlike purebred cats registered by organizations like the Cat Fanciers' Association, mixed cats inherit diverse traits, making exact classification difficult."
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
            <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(249,115,22,0.08))', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🐱</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Identify Your Mixed Breed Cat Today
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 1.75rem' }}>
                Upload your cat&apos;s photo and let our AI analyze its features instantly. Discover breed combinations, personality traits, grooming needs, and more—all powered by advanced AI Cat Breed Identification technology.
              </p>
              <Link
                href="/#scanner"
                style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontWeight: 700, padding: '0.9rem 2.25rem', borderRadius: '2rem', fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
              >
                Scan Your Cat for Free →
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
