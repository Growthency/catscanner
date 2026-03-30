import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'How to Use Cat Breed Scanner? AI Cat Identifier by Photo Guide',
  description: 'A Cat Breed Scanner is an advanced AI-powered tool designed to identify cat breeds from images. Also known as a Cat Scanner, Cat Breed Identifier, or Cat Breed Recognition system, it uses deep learning algorithms trained on thousands of feline images.',
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://catscanner.org/how-to-use-cat-breed-scanner/#article",
      "headline": "How to Use Cat Breed Scanner? AI Cat Identifier by Photo Guide",
      "description": "A Cat Breed Scanner is an advanced AI-powered tool designed to identify cat breeds from images. Learn how to use it step by step.",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://catscanner.org/how-to-use-cat-breed-scanner/" },
      "author": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/" },
      "publisher": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/", "logo": { "@type": "ImageObject", "url": "https://catscanner.org/icon.svg" } },
      "datePublished": "2026-03-30",
      "dateModified": "2026-03-30",
      "image": ["https://catscanner.org/how-to-use-cat-breed-scanner.webp"],
      "inLanguage": "en",
      "keywords": ["how to use cat breed scanner", "AI cat identifier", "cat breed scanner", "cat breed identifier", "cat scanner guide"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://catscanner.org/how-to-use-cat-breed-scanner/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can AI identify cat breeds?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Modern AI Cat Breed Scanners use advanced computer vision, machine learning, and deep learning models to analyze a cat's physical traits such as coat pattern, eye color, ear shape, and facial structure. These systems compare the image with a large cat breed database trained on datasets like the Oxford-IIIT Pet Dataset to match breeds such as the Maine Coon, Siamese cat, and Persian cat with high accuracy." }
        },
        {
          "@type": "Question",
          "name": "How to identify cat breed by photo?",
          "acceptedAnswer": { "@type": "Answer", "text": "To identify a cat breed by photo, upload a clear image to an AI Cat Identifier or Cat Scanner tool. The system uses image recognition and pattern detection algorithms to analyze features like fur pattern, body structure, face shape, and whisker pads, then compares them with known breed profiles such as the Ragdoll cat, Russian Blue, or British Shorthair, providing instant breed predictions and confidence scores." }
        },
        {
          "@type": "Question",
          "name": "Can scanners detect mixed breeds?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Most AI Cat Breed Recognition systems are designed to detect mixed-breed cats by analyzing dominant visual traits and identifying similarities across multiple breeds. For example, a cat may show features of both the Bengal cat and American Shorthair, and the AI will return multiple possible matches with a breed confidence score, helping users understand their cat's likely genetic background." }
        }
      ]
    }
  ]
}

export default function HowToUseCatBreedScannerPage() {
  return (
    <>
      <Script id="schema-how-to-use" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main style={{ paddingTop: '80px', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', padding: '4rem 1rem 3rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '2rem', padding: '0.4rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.05em' }}>
              📸 AI GUIDE · STEP BY STEP · FREE TO USE
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              How to Use{' '}
              <span style={{ color: 'var(--accent)' }}>Cat Breed Scanner</span>
              <br />
              <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>AI Cat Identifier by Photo Guide</span>
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem' }}>
              Using a <strong>Cat Breed Scanner</strong> or <strong>AI Cat Identifier</strong> is simple: upload a clear photo of your cat, let the artificial intelligence system analyze features like coat pattern, face shape, and ear structure, and instantly receive a predicted breed with a confidence score. These tools use computer vision, machine learning, and image recognition to compare your cat with known breeds such as the Maine Coon, Siamese cat, and Persian cat. This makes it easy for pet owners to answer: <em>"What breed is my cat?"</em>
            </p>
            <Link
              href="/#scanner"
              style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: '2rem', fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(249,115,22,0.35)', transition: 'transform 0.2s' }}
            >
              Try Cat Scanner Free →
            </Link>
          </div>
        </section>

        {/* ── FEATURED IMAGE ── */}
        <section style={{ padding: '3rem 1rem 0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 40px rgba(249,115,22,0.12)' }}>
              <img
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80"
                alt="how to use cat breed scanner"
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
              Introduction to Cat Breed Scanner and AI Cat Identifier
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1rem' }}>
              A <strong>Cat Breed Scanner</strong> is an advanced AI-powered tool designed to identify cat breeds from images. Also known as a <strong>Cat Scanner</strong>, <strong>Cat Breed Identifier</strong>, or <strong>Cat Breed Recognition</strong> system, it uses deep learning algorithms trained on thousands of feline images.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>These tools rely on:</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {[
                ['🤖', 'Artificial Intelligence (AI)', 'to process images'],
                ['👁️', 'Computer Vision', 'to detect visual patterns'],
                ['🧠', 'Machine Learning models', 'to compare breed traits'],
              ].map(([icon, bold, rest]) => (
                <li key={bold} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', fontSize: '1rem' }}>
                  <span>{icon}</span>
                  <span><strong style={{ color: 'var(--text-primary)' }}>{bold}</strong> <span style={{ color: 'var(--text-muted)' }}>{rest}</span></span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)' }}>
              For example, when you upload a cat image, the system compares it with breed standards recognized by organizations like <strong>The International Cat Association</strong> and the <strong>Cat Fanciers&apos; Association</strong>. This makes cat identification faster, smarter, and accessible to everyone—from casual pet owners to breeders and veterinarians.
            </p>
          </section>

          {/* ── HOW AI WORKS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              How AI Cat Breed Scanner Works
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              An <strong>AI Cat Breed Scanner</strong> works by analyzing visual features using image recognition technology.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⚙️</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Core Technologies</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {['Convolutional Neural Networks (CNN)', 'Deep Learning models', 'Pattern recognition algorithms'].map(t => (
                    <li key={t} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, marginTop: '2px' }}>✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🔍</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>What the AI Detects</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {['Fur pattern and coat color', 'Eye color and shape', 'Ear size and structure', 'Facial features and muzzle', 'Body size and proportions'].map(t => (
                    <li key={t} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, marginTop: '2px' }}>✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)' }}>
              These features help distinguish breeds like the <strong>Bengal cat</strong> (spotted coat) or <strong>British Shorthair</strong> (round face and dense coat).
            </p>
          </section>

          {/* ── STEP BY STEP GUIDE ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Step-by-Step Guide to Using a Cat Scanner
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                {
                  step: '01',
                  title: 'Upload a Clear Cat Photo',
                  color: 'var(--accent)',
                  content: 'Choose a high-quality image using your smartphone camera, gallery upload, or a web-based tool.',
                  tips: ['Use natural lighting', 'Show full face and body', 'Avoid blurry or cropped images'],
                },
                {
                  step: '02',
                  title: 'AI Image Analysis and Feature Detection',
                  color: 'var(--purple)',
                  content: 'The AI scans the image using computer vision and machine learning to detect coat pattern (tabby, spotted, solid), face shape and whisker pads, ear position and tail length.',
                  tips: [],
                },
                {
                  step: '03',
                  title: 'Get Cat Breed Results Instantly',
                  color: '#0d9488',
                  content: 'Within seconds, the system provides a predicted breed, confidence score, and similar breed matches.',
                  tips: ['Ragdoll cat', 'Russian Blue', 'Scottish Fold'],
                },
                {
                  step: '04',
                  title: 'Explore Breed Details and Characteristics',
                  color: '#3b82f6',
                  content: 'After scanning, you can learn about personality and temperament, grooming needs, health traits, and lifespan and activity level.',
                  tips: [],
                },
              ].map(({ step, title, color, content, tips }) => (
                <div key={step} style={{ display: 'flex', gap: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: '1rem', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1rem' }}>{step}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Step {step}: {title}</h3>
                    <p style={{ fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: tips.length ? '0.75rem' : 0 }}>{content}</p>
                    {tips.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {tips.map(tip => (
                          <span key={tip} style={{ fontSize: '0.85rem', padding: '0.3rem 0.75rem', borderRadius: '2rem', background: `${color}18`, color, fontWeight: 600 }}>{tip}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── IMAGE 2 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(124,58,237,0.1)' }}>
              <img
                src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&q=80"
                alt="how to use cat breed scanner"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── KEY FEATURES ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Key Features of an AI Cat Breed Identifier
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              A modern <strong>Cat Breed Scanner</strong> tool includes several smart features:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent)' }}>⚡ Core Features</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Upload image or live camera scan', 'Instant breed detection', 'Breed confidence score', 'Mixed breed recognition', 'Cat breed database access'].map(f => (
                    <li key={f} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✓</span>{f}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--purple)' }}>🚀 Advanced Capabilities</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Compare multiple breeds', 'View breed similarity', 'Learn detailed breed profiles'].map(f => (
                    <li key={f} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--purple)' }}>✓</span>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── FEATURES AI USES ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Cat Features AI Uses to Identify Breeds
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              AI models rely on visual trait analysis to identify breeds accurately.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🐾', label: 'Coat Color & Pattern', detail: 'tabby, bicolor, spotted' },
                { icon: '😺', label: 'Face Shape', detail: 'flat, wedge, round' },
                { icon: '👁️', label: 'Eye Color', detail: 'blue, green, gold' },
                { icon: '👂', label: 'Ear Shape', detail: 'folded, pointed, wide-set' },
                { icon: '🐈', label: 'Body Structure', detail: 'muscular, slim, large' },
              ].map(({ icon, label, detail }) => (
                <div key={label} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{detail}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '1rem', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                For example: <strong style={{ color: 'var(--text-primary)' }}>Persian cat</strong> → flat face, long fur &nbsp;|&nbsp; <strong style={{ color: 'var(--text-primary)' }}>Savannah cat</strong> → tall body, large ears
              </p>
            </div>
          </section>

          {/* ── POPULAR BREEDS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Popular Cat Breeds You Can Identify
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              An <strong>AI Cat Scanner</strong> can detect many popular breeds.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { breed: 'Maine Coon', desc: 'Large, fluffy, gentle giant', emoji: '🦁' },
                { breed: 'Siamese Cat', desc: 'Blue eyes, colorpoint coat', emoji: '👁️' },
                { breed: 'Bengal Cat', desc: 'Wild spotted coat pattern', emoji: '🐆' },
                { breed: 'British Shorthair', desc: 'Round face, dense coat', emoji: '😼' },
                { breed: 'Ragdoll Cat', desc: 'Calm and affectionate', emoji: '🤍' },
              ].map(({ breed, desc, emoji }) => (
                <div key={breed} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <div style={{ fontSize: '1.5rem' }}>{emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{breed}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Mixed Breed Cats</h3>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                Most domestic cats are mixed breeds. AI detects dominant traits to estimate breed combinations.
              </p>
            </div>
          </section>

          {/* ── TIPS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Tips to Get More Accurate Results from Cat Scanner
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent)' }}>✅ Best Practices</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Use high-resolution images', 'Ensure proper lighting', 'Capture full body and face', 'Avoid shadows and blur'].map(t => (
                    <li key={t} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✓</span>{t}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--purple)' }}>🎯 What Improves Accuracy</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Clear fur pattern visibility', 'Natural angles', 'Single cat in frame'].map(t => (
                    <li key={t} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--purple)' }}>✓</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── COMMON MISTAKES ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Common Mistakes When Using Cat Breed Scanner
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Avoid these mistakes:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '⚠️', text: 'Uploading low-quality images' },
                { icon: '⚠️', text: 'Using dark or blurry photos' },
                { icon: '⚠️', text: 'Scanning kittens (features not fully developed)' },
                { icon: '⚠️', text: 'Expecting 100% accuracy for mixed breeds' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '0.9rem', padding: '0.9rem 1.1rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                  <span style={{ fontSize: '0.97rem', color: 'var(--text-muted)' }}>{text}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginTop: '1rem' }}>
              Understanding these limitations helps you interpret results better.
            </p>
          </section>

          {/* ── BENEFITS ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Benefits of Using an AI Cat Breed Scanner
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Why Use It?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '⚡', title: 'Fast & Easy', desc: 'Instant breed identification in seconds' },
                { icon: '🐾', title: 'Understand Behavior', desc: 'Learn personality traits per breed' },
                { icon: '👨‍⚕️', title: 'Useful for All', desc: 'Pet owners, breeders, veterinarians' },
                { icon: '📚', title: 'Educational', desc: 'Learn about feline diversity' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1.1rem', padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginTop: '1.25rem' }}>
              AI tools make cat breed recognition accessible without expert knowledge.
            </p>
          </section>

          {/* ── IMAGE 3 ── */}
          <section style={{ padding: '1rem 0 2rem' }}>
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 30px rgba(124,58,237,0.08)' }}>
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=80"
                alt="cat breed scanner ai identifier"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </section>

          {/* ── COMPARISON TABLE ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              AI Cat Scanner vs Cat DNA Testing
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              There are two main ways to identify cat breeds:
            </p>
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.97rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['Method', 'Speed', 'Cost', 'Accuracy'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(249,115,22,0.04)' }}>
                    <td style={{ padding: '0.9rem 1.25rem', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>AI Cat Scanner</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>⚡ Instant</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>Free / Low</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>High (visual)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.9rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>DNA Testing</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)' }}>Days / Weeks</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)' }}>Expensive</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--text-muted)' }}>High (genetic)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginTop: '1rem' }}>
              DNA testing services like <strong>Basepaws</strong> provide genetic insights, while AI tools are faster and easier to use.
            </p>
          </section>

          {/* ── FAQ ── */}
          <section style={{ padding: '2rem 0' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  q: 'Can AI identify cat breeds?',
                  a: 'Yes. Modern AI Cat Breed Scanners use advanced computer vision, machine learning, and deep learning models to analyze a cat\'s physical traits such as coat pattern, eye color, ear shape, and facial structure. These systems compare the image with a large cat breed database trained on datasets like the Oxford-IIIT Pet Dataset to match breeds such as the Maine Coon, Siamese cat, and Persian cat with high accuracy.'
                },
                {
                  q: 'How to identify cat breed by photo?',
                  a: 'To identify a cat breed by photo, upload a clear image to an AI Cat Identifier or Cat Scanner tool. The system uses image recognition and pattern detection algorithms to analyze features like fur pattern, body structure, face shape, and whisker pads, then compares them with known breed profiles such as the Ragdoll cat, Russian Blue, or British Shorthair, providing instant breed predictions and confidence scores.'
                },
                {
                  q: 'Can scanners detect mixed breeds?',
                  a: 'Yes. Most AI Cat Breed Recognition systems are designed to detect mixed-breed cats by analyzing dominant visual traits and identifying similarities across multiple breeds. For example, a cat may show features of both the Bengal cat and American Shorthair, and the AI will return multiple possible matches with a breed confidence score, helping users understand their cat\'s likely genetic background.'
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
                Start Using the Cat Breed Scanner Today
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 1.75rem' }}>
                If you&apos;ve ever wondered <em>&quot;What breed is my cat?&quot;</em>, now you have a fast and reliable answer. Upload your cat&apos;s photo, let AI analyze its features, and discover its breed instantly. Explore your cat&apos;s personality, behavior, and traits—all powered by AI Cat Breed Identification technology.
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
