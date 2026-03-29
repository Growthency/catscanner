import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Which Cat Breed is #1? Top 10 Most Popular Cats Globally',
  description: 'Is your favorite feline on the list? Check out the most popular cat breeds in the world right now, featuring the gentle Maine Coon, the vocal Siamese, and more.',
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://catscanner.org/most-popular-cat-breeds-in-the-world/#article",
      "headline": "Top 10 Most Popular Cat Breeds in the World",
      "description": "Explore the top 10 most popular cat breeds in the world, including temperament, size, grooming, and lifestyle fit for cat owners.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://catscanner.org/most-popular-cat-breeds-in-the-world/"
      },
      "about": [
        { "@type": "Thing", "name": "Most Popular Cat Breeds" },
        { "@type": "Thing", "name": "Domestic Cat" },
        { "@type": "Thing", "name": "Persian Cat" },
        { "@type": "Thing", "name": "Maine Coon" },
        { "@type": "Thing", "name": "Siamese Cat" },
        { "@type": "Thing", "name": "Ragdoll" },
        { "@type": "Thing", "name": "Bengal Cat" },
        { "@type": "Thing", "name": "British Shorthair" },
        { "@type": "Thing", "name": "Sphynx Cat" },
        { "@type": "Thing", "name": "Scottish Fold" },
        { "@type": "Thing", "name": "Russian Blue" },
        { "@type": "Thing", "name": "Abyssinian" }
      ],
      "author": { "@type": "Organization", "name": "CatScanner", "url": "https://catscanner.org/" },
      "publisher": {
        "@type": "Organization",
        "name": "CatScanner",
        "url": "https://catscanner.org/",
        "logo": { "@type": "ImageObject", "url": "https://catscanner.org/icon.svg" }
      },
      "datePublished": "2026-03-26",
      "dateModified": "2026-03-26",
      "inLanguage": "en",
      "keywords": ["top 10 most popular cat breeds in the world", "most popular cat breeds", "best cat breeds", "friendly cat breeds", "indoor cats", "cat breed comparison"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://catscanner.org/most-popular-cat-breeds-in-the-world/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is \"I love you\" in cat language?",
          "acceptedAnswer": { "@type": "Answer", "text": "Cats show affection through behavior such as slow blinking, purring, rubbing against you, and staying close. A slow blink is often seen as a cat's way of showing trust and love." }
        },
        {
          "@type": "Question",
          "name": "What are 7 big cats?",
          "acceptedAnswer": { "@type": "Answer", "text": "The term big cats often includes lion, tiger, leopard, jaguar, snow leopard, cheetah, and cougar. These are wild felines and are different from domestic cat breeds." }
        },
        {
          "@type": "Question",
          "name": "What Is the Friendliest Cat Breed?",
          "acceptedAnswer": { "@type": "Answer", "text": "Some of the friendliest cat breeds include Ragdoll, Maine Coon, and Siamese. They are known for affectionate, social, and people-oriented behavior." }
        },
        {
          "@type": "Question",
          "name": "What Is the Most Popular Cat Breed?",
          "acceptedAnswer": { "@type": "Answer", "text": "The most popular cat breeds often include Persian Cat, Maine Coon, and British Shorthair because of their appearance, temperament, and suitability as pets." }
        },
        {
          "@type": "Question",
          "name": "What is the #1 cutest cat?",
          "acceptedAnswer": { "@type": "Answer", "text": "Cutest is subjective, but Persian, Scottish Fold, and Ragdoll are often considered among the cutest cat breeds because of their soft coats, round faces, and expressive looks." }
        },
        {
          "@type": "Question",
          "name": "Who are the big 5 cats?",
          "acceptedAnswer": { "@type": "Answer", "text": "If people mean the five most famous big wild cats, they usually refer to lion, tiger, leopard, jaguar, and cheetah." }
        },
        {
          "@type": "Question",
          "name": "Which cat is the king of cats?",
          "acceptedAnswer": { "@type": "Answer", "text": "The lion is widely known as the king of cats because of its strength, dominance, and symbolic status among wild felines." }
        },
        {
          "@type": "Question",
          "name": "What is the #1 killer of cats?",
          "acceptedAnswer": { "@type": "Answer", "text": "For domestic cats, common leading causes of death include kidney disease, cancer, infections, and accidents, especially in outdoor cats. Regular veterinary care helps reduce risk." }
        }
      ]
    }
  ]
}

const TOP_10 = [
  'Persian Cat', 'Maine Coon', 'Siamese Cat', 'Ragdoll', 'Bengal Cat',
  'British Shorthair', 'Sphynx Cat', 'Scottish Fold', 'Russian Blue', 'Abyssinian',
]

const OVERVIEW_TABLE = [
  { breed: 'Persian', coat: 'Long-haired', energy: 'Low to moderate', grooming: 'High', appeal: 'Beauty, calmness' },
  { breed: 'Maine Coon', coat: 'Long-haired', energy: 'Moderate', grooming: 'Moderate to high', appeal: 'Friendly giant' },
  { breed: 'Siamese', coat: 'Short-haired', energy: 'High', grooming: 'Low', appeal: 'Social, expressive' },
  { breed: 'Ragdoll', coat: 'Semi-long', energy: 'Low to moderate', grooming: 'Moderate', appeal: 'Gentle companion' },
  { breed: 'Bengal', coat: 'Short-haired', energy: 'High', grooming: 'Low', appeal: 'Exotic look, activity' },
  { breed: 'British Shorthair', coat: 'Short-haired', energy: 'Low to moderate', grooming: 'Low', appeal: 'Easygoing pet' },
  { breed: 'Sphynx', coat: 'Hairless', energy: 'Moderate to high', grooming: 'Moderate', appeal: 'Unique appearance' },
  { breed: 'Scottish Fold', coat: 'Short/long', energy: 'Moderate', grooming: 'Moderate', appeal: 'Distinctive ears' },
  { breed: 'Russian Blue', coat: 'Short-haired', energy: 'Moderate', grooming: 'Low', appeal: 'Quiet elegance' },
  { breed: 'Abyssinian', coat: 'Short-haired', energy: 'High', grooming: 'Low', appeal: 'Athletic, intelligent' },
]

const SIZE_TABLE = [
  { breed: 'Persian', size: 'Medium', lifespan: '12–17 years', temperament: 'Calm, gentle' },
  { breed: 'Maine Coon', size: 'Large', lifespan: '12–15 years', temperament: 'Friendly, social' },
  { breed: 'Siamese', size: 'Medium', lifespan: '12–20 years', temperament: 'Vocal, active' },
  { breed: 'Ragdoll', size: 'Large', lifespan: '12–15 years', temperament: 'Affectionate, relaxed' },
  { breed: 'Bengal', size: 'Medium', lifespan: '12–16 years', temperament: 'Energetic, curious' },
  { breed: 'British Shorthair', size: 'Medium', lifespan: '12–20 years', temperament: 'Calm, independent' },
  { breed: 'Sphynx', size: 'Medium', lifespan: '8–14 years', temperament: 'Social, playful' },
  { breed: 'Scottish Fold', size: 'Medium', lifespan: '11–15 years', temperament: 'Gentle, quiet' },
  { breed: 'Russian Blue', size: 'Medium', lifespan: '15–20 years', temperament: 'Intelligent, reserved' },
  { breed: 'Abyssinian', size: 'Medium', lifespan: '12–15 years', temperament: 'Active, playful' },
]

const GROOMING_TABLE = [
  { breed: 'Persian', coat: 'Long-haired', grooming: 'High' },
  { breed: 'Maine Coon', coat: 'Long-haired', grooming: 'Moderate–High' },
  { breed: 'Siamese', coat: 'Short-haired', grooming: 'Low' },
  { breed: 'Ragdoll', coat: 'Semi-long', grooming: 'Moderate' },
  { breed: 'Bengal', coat: 'Short-haired', grooming: 'Low' },
  { breed: 'British Shorthair', coat: 'Short-haired', grooming: 'Low' },
  { breed: 'Sphynx', coat: 'Hairless', grooming: 'Moderate (skin care)' },
  { breed: 'Scottish Fold', coat: 'Short/Long', grooming: 'Moderate' },
  { breed: 'Russian Blue', coat: 'Short-haired', grooming: 'Low' },
  { breed: 'Abyssinian', coat: 'Short-haired', grooming: 'Low' },
]

const FAQS = [
  {
    q: 'What is "I love you" in cat language?',
    a: 'Cats show love through behavior, not words. Common signs include slow blinking, purring, rubbing against you, and sitting close. A slow blink is often considered a cat\'s way of saying "I trust you."',
  },
  {
    q: 'What are 7 big cats?',
    a: 'The term big cats usually refers to large wild members of the feline family: Lion, Tiger, Leopard, Jaguar, Snow Leopard, Cheetah, Cougar (Mountain Lion). These are different from domestic cat breeds.',
  },
  {
    q: 'What Is the Friendliest Cat Breed?',
    a: 'The friendliest cat breeds are typically Ragdoll (very affectionate), Maine Coon (social and gentle), and Siamese (interactive and vocal). They are known for strong human bonding and social behavior.',
  },
  {
    q: 'What Is the Most Popular Cat Breed?',
    a: 'The most popular cat breeds worldwide often include Persian Cat, Maine Coon, and British Shorthair. Popularity comes from a mix of appearance, temperament, and adaptability.',
  },
  {
    q: 'What is the #1 cutest cat?',
    a: '"Cutest" is subjective, but commonly loved breeds include Persian (fluffy and round), Scottish Fold (folded ears), and Ragdoll (soft expression). Their facial features and coat make them widely appealing.',
  },
  {
    q: 'Who are the big 5 cats?',
    a: 'If focusing only on wild cats, it typically means lion, tiger, leopard, jaguar, and cheetah. The safari "Big Five" is a different term that includes non-cat animals like elephant, rhino, and buffalo.',
  },
  {
    q: 'Which cat is the king of cats?',
    a: 'The lion is known as the "king of cats" because of its strength, dominance, and position at the top of the wild feline hierarchy.',
  },
  {
    q: 'What is the #1 killer of cats?',
    a: 'For domestic cats, the leading causes of death are kidney disease, cancer, infections and accidents (especially outdoor cats). Regular veterinary care and indoor safety can reduce risks.',
  },
]

export default function MostPopularCatBreedsPage() {
  return (
    <>
      <Script id="schema-popular-breeds" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <section
          className="pt-28 pb-16 px-4"
          style={{
            background: 'linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'var(--purple-bg)', color: 'var(--purple)', border: '1px solid var(--border)' }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              BREED GUIDE · 10 BREEDS · COMPLETE OVERVIEW
            </div>
            <h1
              className="font-fraunces font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: 'var(--text-primary)' }}
            >
              Top 10{' '}
              <span className="gradient-text">Most Popular Cat Breeds</span>{' '}
              in the World
            </h1>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
              The most popular cat breeds in the world are usually the ones that combine strong looks, appealing temperament, and practical pet-owner fit. Breeds like the{' '}
              <strong style={{ color: 'var(--accent)' }}>Persian Cat</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>Maine Coon</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>Siamese Cat</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>Ragdoll</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>Bengal Cat</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>British Shorthair</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>Sphynx Cat</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>Scottish Fold</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>Russian Blue</strong>, and{' '}
              <strong style={{ color: 'var(--accent)' }}>Abyssinian</strong> are widely recognized because they stand out in appearance, personality, and adaptability as domestic cats.
            </p>
            <p className="text-base leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              If you are comparing the top 10 cat breeds, this guide explains what makes each one popular, how they differ, and which type of feline may suit your home, lifestyle, and care expectations best.
            </p>
          </div>
        </section>

        {/* ── TOP 10 LIST ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-fraunces font-bold mb-4"
              style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'var(--text-primary)' }}
            >
              Top 10 Most Popular Cat Breeds in the World
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Popularity in cats is not just about beauty. A breed becomes widely loved when it consistently appears in homes, breed registries, adoption searches, online interest, and pet-owner recommendations. In other words, "popular" usually reflects a mix of global visibility, demand, temperament, care fit, and recognizability.
            </p>
            <p className="mb-6 font-semibold" style={{ color: 'var(--text-primary)' }}>
              The top 10 most popular cat breeds typically include:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {TOP_10.map((breed, i) => (
                <div
                  key={breed}
                  className="rounded-xl px-3 py-4 text-center font-semibold text-sm"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  <div className="text-xl font-black font-fraunces mb-1" style={{ color: 'var(--accent)' }}>{i + 1}</div>
                  {breed}
                </div>
              ))}
            </div>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              These breeds are all domestic cats, but they are popular for different reasons. Some are known for luxurious coats, some for affectionate behavior, some for intelligence and playfulness, and others for low-maintenance care or apartment-friendly living.
            </p>
          </div>
        </section>

        {/* ── IMAGE 1 ── */}
        <section className="px-4 pb-14">
          <div className="max-w-4xl mx-auto">
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 40px rgba(249,115,22,0.15)' }}>
              <img
                src="/cat-scanner.webp"
                alt="most popular cat breeds in the world"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── WHAT DEFINES A POPULAR BREED ── */}
        <section className="py-14 px-4" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-fraunces font-bold mb-6"
              style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}
            >
              What Defines a Popular Cat Breed
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              A popular cat breed usually checks several boxes at once:
            </p>
            <ul className="mb-8 space-y-2">
              {['Easy to recognize visually','Strong reputation among cat owners','Suitable for home life','Appealing personality or temperament','Broad media and social visibility','Regular presence in pedigree and breed association discussions'].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: 'var(--accent)', marginTop: '2px' }}>🐾</span>
                  <span style={{ color: 'var(--text-muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mb-4 font-semibold" style={{ color: 'var(--text-primary)' }}>Popularity can come from different sources. For example:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { breed: 'Persian Cat', reason: 'popular because of its iconic long coat and calm, elegant look.' },
                { breed: 'Maine Coon', reason: 'popular because of its large size, friendly personality, and family-friendly reputation.' },
                { breed: 'Bengal Cat', reason: 'stands out for its wild-looking coat pattern and high energy.' },
                { breed: 'British Shorthair', reason: 'remains popular because it is calm, sturdy, and relatively low maintenance.' },
              ].map(({ breed, reason }) => (
                <div key={breed} className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <p className="font-semibold mb-1" style={{ color: 'var(--accent)' }}>{breed}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>is {reason}</p>
                </div>
              ))}
            </div>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              That means popularity is a relationship between appearance, behavior, and everyday livability.
            </p>

            {/* Global Trends Table */}
            <h3 className="font-fraunces font-bold mt-10 mb-5" style={{ fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', color: 'var(--text-primary)' }}>
              Global Cat Popularity Trends
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Worldwide cat popularity is shaped by several trends:
            </p>
            <div className="overflow-x-auto rounded-xl mb-6" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--accent)', color: '#fff' }}>
                    <th className="text-left px-4 py-3 font-semibold">Trend</th>
                    <th className="text-left px-4 py-3 font-semibold">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Apartment living', 'Increases demand for adaptable indoor cats'],
                    ['Family pet preferences', 'Favors friendly and social breeds'],
                    ['Grooming expectations', 'Influences whether long-haired or short-haired breeds are preferred'],
                    ['Online visibility', 'Popular breeds get more exposure through photos, videos, and social media'],
                    ['Breed recognition', 'Cat associations such as CFA and TICA help formalize breed awareness'],
                  ].map(([trend, why], i) => (
                    <tr key={trend} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-hover)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{trend}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Some breeds perform well globally because they match modern lifestyles. Indoor cats, friendly cat breeds, and low maintenance cats tend to appeal to a wider audience than breeds that need constant attention or highly specialized environments.
            </p>
          </div>
        </section>

        {/* ── WHAT MAKES A CAT BREED POPULAR ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-fraunces font-bold mb-6" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              What Makes a Cat Breed Popular
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Not every beautiful cat becomes one of the most popular cat breeds in the world. Popularity usually comes from a combination of temperament, appearance, care needs, and home compatibility.
            </p>

            <div className="space-y-8">
              {/* Temperament */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-fraunces font-bold mb-3 text-xl" style={{ color: 'var(--accent)' }}>Temperament and Personality</h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  For most pet owners, personality matters just as much as looks. A cat that is affectionate, social, calm, or playful is more likely to earn long-term popularity.
                </p>
                <p className="mb-3 font-medium" style={{ color: 'var(--text-primary)' }}>Key temperament traits that influence popularity:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Affection level','Social behavior','Energy level','Intelligence','Playfulness','Calmness'].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-sm" style={{ background: 'var(--purple-bg)', color: 'var(--purple)', border: '1px solid var(--border)' }}>{t}</span>
                  ))}
                </div>
                <ul className="space-y-2">
                  {[
                    ['Ragdoll cats', 'loved for their gentle, affectionate nature.'],
                    ['Siamese cats', 'famous for being vocal, social, and interactive.'],
                    ['Russian Blue cats', 'often appreciated for being intelligent and loyal.'],
                    ['Abyssinians', 'attract owners who want an active, curious feline companion.'],
                  ].map(([breed, desc]) => (
                    <li key={breed} className="flex gap-2 text-sm">
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span style={{ color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-primary)' }}>{breed}</strong> are {desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Appearance */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-fraunces font-bold mb-3 text-xl" style={{ color: 'var(--purple)' }}>Appearance and Coat Type</h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Visual appeal plays a major role in breed popularity. Some breeds stand out because of their coat, eye color, face shape, or body structure.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { breed: 'Persian Cat', trait: 'luxurious long coat and distinctive face' },
                    { breed: 'Bengal Cat', trait: 'spotted or marbled coat pattern' },
                    { breed: 'Sphynx Cat', trait: 'hairless appearance' },
                    { breed: 'Siamese Cat', trait: 'pointed coat and striking blue eyes' },
                    { breed: 'British Shorthair', trait: 'dense plush coat and round build' },
                  ].map(({ breed, trait }) => (
                    <div key={breed} className="flex items-start gap-2 text-sm p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                      <span style={{ color: 'var(--accent)' }}>🐱</span>
                      <span style={{ color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-primary)' }}>{breed}:</strong> {trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adaptability */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-fraunces font-bold mb-3 text-xl" style={{ color: 'var(--accent)' }}>Adaptability for Indoor Living</h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Today, many of the most popular cat breeds are also the best indoor cats. A breed tends to gain popularity when it can adapt to indoor routines, family settings, limited space, regular human interaction, and predictable home environments.
                </p>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>This is why users frequently search for:</p>
                <div className="flex flex-wrap gap-2">
                  {['Best cat breeds for apartments','Best cat for families','Best cat breeds for beginners'].map(q => (
                    <span key={q} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid rgba(249,115,22,0.2)' }}>{q}</span>
                  ))}
                </div>
              </div>

              {/* Maintenance */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-fraunces font-bold mb-3 text-xl" style={{ color: 'var(--purple)' }}>Maintenance and Grooming Needs</h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Popularity is also shaped by how much work the breed requires. Care-related factors include grooming, shedding level, skin care, nutrition, health monitoring, and veterinary care needs.
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    'Persian Cats are beautiful, but their long coat means more grooming.',
                    'British Shorthairs and Russian Blues tend to be easier to maintain.',
                    'Sphynx Cats do not shed in the same way, but they need regular skin care.',
                    'Maine Coons have a thick coat, so maintenance matters even though they are widely loved.',
                  ].map(item => (
                    <li key={item} className="flex gap-2">
                      <span style={{ color: 'var(--accent)' }}>•</span>
                      <span style={{ color: 'var(--text-muted)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── OVERVIEW TABLE ── */}
        <section className="py-14 px-4" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-fraunces font-bold mb-4" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              Top 10 Cat Breeds List (Quick Overview)
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Before going breed by breed, it helps to look at the full list in one place. This overview makes the relationships between appearance, personality, size, grooming, and home suitability easier to understand.
            </p>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--accent)', color: '#fff' }}>
                    <th className="text-left px-4 py-3 font-semibold">Breed</th>
                    <th className="text-left px-4 py-3 font-semibold">Coat Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Energy Level</th>
                    <th className="text-left px-4 py-3 font-semibold">Grooming</th>
                    <th className="text-left px-4 py-3 font-semibold">Common Appeal</th>
                  </tr>
                </thead>
                <tbody>
                  {OVERVIEW_TABLE.map((row, i) => (
                    <tr key={row.breed} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-hover)' }}>
                      <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>{row.breed}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.coat}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.energy}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.grooming}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.appeal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── BREED DETAILS ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto space-y-14">

            {/* Persian */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🐱</span>
                <h2 className="font-fraunces font-bold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>1. Persian Cat</h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The Persian Cat is one of the most famous and instantly recognizable cat breeds in the world. Its popularity comes from a mix of beauty, calm temperament, and strong breed identity. When people imagine a luxurious house cat or classic pedigree cat, the Persian is often one of the first images that comes to mind.
              </p>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Origin and History</h3>
              <p className="mb-4 leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                Persians have long been associated with elegance and formal breed recognition. Their enduring popularity is tied to strong historical recognition, a distinct appearance, broad visibility in media and pet culture, and consistent demand among owners who want a calm indoor cat.
              </p>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Physical Appearance and Coat</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Long-haired coat','Rounded body','Full cheeks','Flat or shorter muzzle','Large expressive eyes','Dense, full fur texture'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t}</span>
                ))}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Personality and Temperament</h3>
              <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Calm, gentle, and quiet — the Persian is comfortable in stable indoor settings. It is not the best fit for someone wanting a highly athletic cat, but its charm comes from presence, softness, and calm companionship.
              </p>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Grooming and Care Needs</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The Persian requires regular brushing to prevent matting, ongoing coat maintenance, and hygiene attention around the face. It is best for owners who understand the grooming commitment.
              </p>
            </div>

            {/* Maine Coon */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🦁</span>
                <h2 className="font-fraunces font-bold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>2. Maine Coon</h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The Maine Coon is one of the most admired and widely loved cat breeds in the world. It combines size, personality, and a rugged but friendly appearance in a way that appeals to both experienced cat owners and first-time families.
              </p>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Size, Body Structure, and Coat</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Large cat breed','Strong bone structure','Broad chest','Long body','Thick coat','Often tufted ears','Full tail'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t}</span>
                ))}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Personality — The Gentle Giant</h3>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Friendly, social, intelligent, and playful without being overwhelming. The Maine Coon is a great fit for families and balances affection and independence well.
              </p>
              <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'var(--purple)', color: '#fff' }}>
                      <th className="text-left px-4 py-2">Breed</th>
                      <th className="text-left px-4 py-2">Coat</th>
                      <th className="text-left px-4 py-2">Grooming</th>
                      <th className="text-left px-4 py-2">Temperament</th>
                      <th className="text-left px-4 py-2">Best Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: 'var(--bg-card)' }}>
                      <td className="px-4 py-2 font-semibold" style={{ color: 'var(--text-primary)' }}>Persian</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>Long-haired</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>High</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>Calm, quiet</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>Heavy grooming owners</td>
                    </tr>
                    <tr style={{ background: 'var(--bg-card-hover)' }}>
                      <td className="px-4 py-2 font-semibold" style={{ color: 'var(--text-primary)' }}>Maine Coon</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>Long-haired</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>Moderate–High</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>Friendly, social</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>Families, large-cat lovers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Siamese */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">👁️</span>
                <h2 className="font-fraunces font-bold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>3. Siamese Cat</h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The Siamese Cat is one of the most recognizable and historically popular cat breeds in the world. Its unique combination of appearance, vocal personality, and strong social behavior makes it a standout among domestic cats.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Coat Pattern & Eyes', points: ['Short-haired coat','Slender athletic build','Color-point pattern','Bright blue eyes','Light body with darker extremities'] },
                  { title: 'Personality', points: ['Very vocal','Social and people-oriented','Intelligent','Seeks attention and interaction','Great for active households'] },
                ].map(({ title, points }) => (
                  <div key={title} className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <p className="font-semibold mb-3" style={{ color: 'var(--accent)' }}>{title}</p>
                    <ul className="space-y-1">
                      {points.map(p => <li key={p} className="text-sm flex gap-2"><span style={{ color: 'var(--accent)' }}>•</span><span style={{ color: 'var(--text-muted)' }}>{p}</span></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Ragdoll */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">💜</span>
                <h2 className="font-fraunces font-bold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>4. Ragdoll</h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The Ragdoll is one of the most loved cat breeds due to its gentle personality and strong indoor adaptability. It is often ranked among the best cat breeds for families. Known for its medium to large body, soft semi-long coat, blue eyes, and relaxed posture — the Ragdoll's popularity comes largely from its temperament: extremely affectionate, calm, enjoys being held, and friendly with people and other pets.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Ragdolls are highly suited for indoor living with low aggression and adaptation to apartments. Despite having longer fur, they require only moderate grooming and are less prone to matting than some long-haired breeds.
              </p>
            </div>

            {/* Bengal */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🐆</span>
                <h2 className="font-fraunces font-bold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>5. Bengal Cat</h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The Bengal Cat stands out among the most popular cat breeds because of its wild appearance and high energy level. It is one of the most visually striking domestic cats with its spotted or marbled leopard-like coat pattern and muscular, athletic body.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: '⚡', title: 'Energy', desc: 'High energy, loves climbing, needs stimulation' },
                  { icon: '🧠', title: 'Intelligence', desc: 'Highly curious and play-driven, needs interactive toys' },
                  { icon: '✂️', title: 'Grooming', desc: 'Short coat, low shedding maintenance — but needs active environment' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="rounded-xl p-4 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <p className="font-semibold mb-1 text-sm" style={{ color: 'var(--text-primary)' }}>{title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* British Shorthair */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🇬🇧</span>
                <h2 className="font-fraunces font-bold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>6. British Shorthair</h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The British Shorthair is one of the most balanced and widely loved cat breeds. Its calm personality, sturdy body, and low maintenance needs make it highly popular worldwide. Known for its dense plush short coat, round face, and compact sturdy body — it is a top choice for quiet homes and apartment living.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                British Shorthairs are calm, independent, and have low vocal behavior. They require minimal grooming with moderate shedding and adapt well to indoor living, smaller spaces, and consistent routines.
              </p>
            </div>

            {/* Sphynx */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">✨</span>
                <h2 className="font-fraunces font-bold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>7. Sphynx Cat</h2>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The Sphynx Cat is one of the most unique and recognizable cat breeds due to its hairless appearance. Its popularity comes from both its distinctive look and its highly affectionate, social personality. Unlike other cats, the Sphynx requires regular skin cleaning, protection from temperature changes, and management of oil buildup — making it a different type of maintenance, not low maintenance.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Sphynx cats are highly social, attention-seeking, and energetic. They are often searched under "most unique cat breeds" and "hairless cat breeds."
              </p>
            </div>
          </div>
        </section>

        {/* ── IMAGE 2 ── */}
        <section className="px-4 py-10" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 40px rgba(167,139,250,0.2)' }}>
              <img
                src="/cat-identifier.webp"
                alt="most popular cat breeds in the world"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLES ── */}
        <section className="py-14 px-4" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-fraunces font-bold mb-4" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              Cat Breed Comparison Table
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              A comparison table helps users quickly evaluate differences between the top 10 most popular cat breeds based on key attributes like size, lifespan, temperament, and maintenance.
            </p>

            <h3 className="font-fraunces font-semibold mb-4 text-lg" style={{ color: 'var(--text-primary)' }}>Size, Lifespan, and Temperament</h3>
            <div className="overflow-x-auto rounded-xl mb-10" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--purple)', color: '#fff' }}>
                    <th className="text-left px-4 py-3">Breed</th>
                    <th className="text-left px-4 py-3">Size</th>
                    <th className="text-left px-4 py-3">Lifespan</th>
                    <th className="text-left px-4 py-3">Temperament</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_TABLE.map((row, i) => (
                    <tr key={row.breed} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-hover)' }}>
                      <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>{row.breed}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.size}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.lifespan}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.temperament}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="font-fraunces font-semibold mb-4 text-lg" style={{ color: 'var(--text-primary)' }}>Grooming and Maintenance Level</h3>
            <div className="overflow-x-auto rounded-xl mb-10" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--accent)', color: '#fff' }}>
                    <th className="text-left px-4 py-3">Breed</th>
                    <th className="text-left px-4 py-3">Coat Type</th>
                    <th className="text-left px-4 py-3">Grooming Level</th>
                  </tr>
                </thead>
                <tbody>
                  {GROOMING_TABLE.map((row, i) => (
                    <tr key={row.breed} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-hover)' }}>
                      <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>{row.breed}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{row.coat}</td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            background: row.grooming === 'High' ? 'rgba(239,68,68,0.1)' : row.grooming === 'Low' ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.1)',
                            color: row.grooming === 'High' ? '#ef4444' : row.grooming === 'Low' ? '#16a34a' : 'var(--accent)',
                          }}
                        >
                          {row.grooming}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Best for ... */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Best for Families', icon: '👨‍👩‍👧', items: ['Maine Coon', 'Ragdoll', 'British Shorthair'] },
                { title: 'Best for Apartments', icon: '🏢', items: ['British Shorthair', 'Persian', 'Russian Blue'] },
                { title: 'Best for Active Homes', icon: '⚡', items: ['Bengal', 'Abyssinian', 'Siamese'] },
              ].map(({ title, icon, items }) => (
                <div key={title} className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="font-semibold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>{title}</p>
                  {items.map(b => <p key={b} className="text-sm py-1 border-b" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>→ {b}</p>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BREED CATEGORIES ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-fraunces font-bold mb-6" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              Cat Breed Categories
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Understanding categories helps simplify decision-making, especially for users comparing multiple breeds.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Long-Haired Cat Breeds', icon: '🌟', breeds: ['Persian','Maine Coon','Ragdoll','Birman'], note: 'Best for: owners who enjoy grooming and want a soft, luxurious coat' },
                { title: 'Short-Haired Cat Breeds', icon: '✂️', breeds: ['Siamese','Bengal','British Shorthair','Russian Blue','Abyssinian'], note: 'Best for: low-maintenance grooming and easy care' },
                { title: 'Hairless Cat Breeds', icon: '✨', breeds: ['Sphynx'], note: 'Best for: unique appearance (but requires skin care)' },
                { title: 'Large vs Small Breeds', icon: '📏', breeds: ['Large: Maine Coon, Ragdoll','Medium: Most popular breeds','Smaller: Siamese, Abyssinian'], note: 'Physical traits connect directly with care and lifestyle choices' },
              ].map(({ title, icon, breeds, note }) => (
                <div key={title} className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{icon}</span>
                    <h3 className="font-fraunces font-semibold" style={{ color: 'var(--accent)' }}>{title}</h3>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {breeds.map(b => <li key={b} className="text-sm flex gap-2"><span style={{ color: 'var(--accent)' }}>→</span><span style={{ color: 'var(--text-primary)' }}>{b}</span></li>)}
                  </ul>
                  <p className="text-xs italic" style={{ color: 'var(--text-faint)' }}>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIFESTYLE MATCH ── */}
        <section className="py-14 px-4" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-fraunces font-bold mb-6" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              Best Cat Breeds Based on Lifestyle
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Choosing the right cat is not just about popularity — it is about matching the breed with your daily life.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Best Cat Breeds for Families', items: [['Maine Coon','friendly and social'],['Ragdoll','gentle and affectionate'],['British Shorthair','calm and stable']] },
                { title: 'Best Cat Breeds for Apartments', items: [['British Shorthair','low energy, quiet'],['Persian','calm indoor companion'],['Russian Blue','adaptable and reserved']] },
                { title: 'Low Maintenance Cat Breeds', items: [['Siamese','easy care'],['Bengal','simple routines'],['Abyssinian','minimal grooming'],['British Shorthair','easy daily care']] },
                { title: 'Friendly and Social Cat Breeds', items: [['Siamese','highly interactive'],['Maine Coon','friendly and easygoing'],['Sphynx','attention-seeking and affectionate']] },
              ].map(({ title, items }) => (
                <div key={title} className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <h3 className="font-fraunces font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map(([breed, desc]) => (
                      <div key={breed} className="px-3 py-2 rounded-xl text-sm" style={{ background: 'var(--accent-bg)', border: '1px solid rgba(249,115,22,0.2)' }}>
                        <span className="font-semibold" style={{ color: 'var(--accent)' }}>{breed}</span>
                        <span className="ml-1" style={{ color: 'var(--text-muted)' }}>→ {desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CARE & MAINTENANCE ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-fraunces font-bold mb-6" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              Cat Breed Care and Maintenance
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Understanding care requirements is essential before choosing a breed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Long-haired', icon: '🌀', care: 'Daily brushing', examples: 'Persian, Maine Coon', level: 'High' },
                { title: 'Short-haired', icon: '✂️', care: 'Minimal grooming', examples: 'Siamese, British Shorthair', level: 'Low' },
                { title: 'Hairless', icon: '✨', care: 'Skin care routine', examples: 'Sphynx', level: 'Moderate' },
              ].map(({ title, icon, care, examples, level }) => (
                <div key={title} className="rounded-2xl p-5 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{care}</p>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-faint)' }}>{examples}</p>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                    {level} grooming
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <h3 className="font-fraunces font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Nutrition and Health Care</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                All cats require a balanced diet, clean water, and regular veterinary care. Breed-specific considerations may include coat-related nutrition, weight management, and skin sensitivity.
              </p>
              <div className="flex flex-wrap gap-2">
                {['High shedding → long-haired breeds','Moderate → some medium coats','Low shedding → short-haired breeds'].map(item => (
                  <span key={item} className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── IMAGE 3 ── */}
        <section className="px-4 py-10" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <div style={{ borderRadius: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '0.75rem', boxShadow: '0 0 40px rgba(249,115,22,0.18)' }}>
              <img
                src="/cat-breed-identifier.webp"
                alt="top 10 most popular cat breeds"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── WORLDWIDE TRENDS ── */}
        <section className="py-14 px-4" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-fraunces font-bold mb-6" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              Popular Cat Breeds Worldwide Trends
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Cat popularity changes over time based on lifestyle trends and pet ownership patterns.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'Most Owned Cat Breeds', icon: '🏆', content: 'Globally, breeds like Persian, Maine Coon, and British Shorthair remain consistently popular due to their adaptability and recognition.' },
                { title: 'Regional Popularity', icon: '🌍', content: 'Some breeds are more popular in urban regions (apartment-friendly cats), others preferred in larger homes (active or large breeds).' },
                { title: 'Adoption vs Pedigree', icon: '🏠', content: 'Many people adopt mixed breed domestic cats, while purebred cats remain popular for their predictable traits.' },
              ].map(({ title, icon, content }) => (
                <div key={title} className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="text-2xl mb-3">{icon}</div>
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-fraunces font-bold mb-8 text-center" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              FAQs – Popular Cat Breeds
            </h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <h3 className="font-semibold mb-3 flex items-start gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>Q.</span>
                    {q}
                  </h3>
                  <p className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--purple)', flexShrink: 0, fontWeight: 600 }}>A.</span>
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONCLUSION ── */}
        <section className="py-14 px-4" style={{ background: 'linear-gradient(160deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-fraunces font-bold mb-6 text-center" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-primary)' }}>
              Conclusion – Choosing the Right Cat Breed
            </h2>
            <p className="text-center mb-10 leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Choosing from the top 10 most popular cat breeds in the world is not about picking the most famous name — it is about finding the right fit.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-fraunces font-semibold mb-4" style={{ color: 'var(--accent)' }}>Matching Breed with Lifestyle</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>The best cat for you depends on:</p>
                <ul className="space-y-2">
                  {['Living space','Time available','Grooming preference','Desired personality'].map(i => (
                    <li key={i} className="text-sm flex gap-2"><span style={{ color: 'var(--accent)' }}>→</span><span style={{ color: 'var(--text-muted)' }}>{i}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-fraunces font-semibold mb-4" style={{ color: 'var(--purple)' }}>Each Breed Offers Something Unique</h3>
                <ul className="space-y-2">
                  {[
                    ['Persian','beauty and calm'],
                    ['Maine Coon','size and friendliness'],
                    ['Siamese','intelligence and communication'],
                    ['Bengal','energy and activity'],
                    ['British Shorthair','simplicity and balance'],
                  ].map(([breed, trait]) => (
                    <li key={breed} className="text-sm flex gap-2">
                      <span style={{ color: 'var(--accent)' }}>🐱</span>
                      <span style={{ color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-primary)' }}>{breed}</strong> → {trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center">
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Ready to identify your cat&apos;s breed instantly? Try our free AI scanner now.
              </p>
              <Link
                href="/#scanner"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all glow-orange"
                style={{ background: 'var(--btn-primary)', fontSize: '1rem' }}
              >
                🐾 Scan Your Cat Free →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
