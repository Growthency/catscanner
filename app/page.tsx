"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";

const PARTICLES = [
  { left: "5%", dur: 16, delay: 0, w: 14, opacity: 0.06 },
  { left: "12%", dur: 12, delay: 3, w: 18, opacity: 0.04 },
  { left: "20%", dur: 19, delay: 7, w: 12, opacity: 0.07 },
  { left: "28%", dur: 14, delay: 1, w: 16, opacity: 0.05 },
  { left: "36%", dur: 11, delay: 9, w: 20, opacity: 0.04 },
  { left: "44%", dur: 17, delay: 4, w: 14, opacity: 0.06 },
  { left: "52%", dur: 13, delay: 6, w: 18, opacity: 0.05 },
  { left: "60%", dur: 15, delay: 2, w: 12, opacity: 0.07 },
  { left: "68%", dur: 18, delay: 8, w: 16, opacity: 0.04 },
  { left: "76%", dur: 10, delay: 5, w: 20, opacity: 0.06 },
  { left: "84%", dur: 16, delay: 3, w: 14, opacity: 0.05 },
  { left: "92%", dur: 12, delay: 10, w: 18, opacity: 0.04 },
];

const BREED_CHART = [
  ["Abyssinian", "Short", "Ethiopia", "Active, intelligent"],
  ["American Bobtail", "Short/Long", "USA", "Bobbed tail"],
  ["American Curl", "Short/Long", "USA", "Curved ears"],
  ["American Shorthair", "Short", "USA", "Muscular, adaptable"],
  ["American Wirehair", "Short", "USA", "Wiry coat"],
  ["Balinese", "Long", "USA", "Siamese-like long hair"],
  ["Bengal", "Short", "USA", "Leopard-like spots"],
  ["Birman", "Long", "Myanmar", "Blue eyes, colorpoint"],
  ["Bombay", "Short", "USA", "Black coat"],
  ["British Longhair", "Long", "UK", "Plush coat"],
  ["British Shorthair", "Short", "UK", "Round face"],
  ["Burmese", "Short", "Myanmar", "Social and affectionate"],
  ["Burmilla", "Short", "UK", "Silver shaded coat"],
  ["Chartreux", "Short", "France", "Blue-gray coat"],
  ["Chausie", "Short", "USA", "Wild appearance"],
  ["Cornish Rex", "Short", "UK", "Curly coat"],
  ["Cymric", "Long", "Canada", "Tailless"],
  ["Devon Rex", "Short", "UK", "Large ears"],
  ["Donskoy", "Hairless", "Russia", "Wrinkled skin"],
  ["Egyptian Mau", "Short", "Egypt", "Natural spots"],
  ["Exotic Shorthair", "Short", "USA", "Persian-like face"],
  ["Havana Brown", "Short", "UK", "Chocolate coat"],
  ["Himalayan", "Long", "USA", "Persian-Siamese mix"],
  ["Japanese Bobtail", "Short/Long", "Japan", "Short tail"],
  ["Khao Manee", "Short", "Thailand", "White coat, blue eyes"],
  ["Korat", "Short", "Thailand", "Silver-blue coat"],
  ["Kurilian Bobtail", "Short/Long", "Russia", "Bobbed tail"],
  ["LaPerm", "Short/Long", "USA", "Curly fur"],
  ["Maine Coon", "Long", "USA", "Large size"],
  ["Manx", "Short", "Isle of Man", "Tailless"],
  ["Munchkin", "Short/Long", "USA", "Short legs"],
  ["Nebelung", "Long", "Russia", "Russian Blue-like"],
  ["Norwegian Forest Cat", "Long", "Norway", "Thick coat"],
  ["Ocicat", "Short", "USA", "Wild spotted look"],
  ["Oriental Longhair", "Long", "UK", "Elegant body"],
  ["Oriental Shorthair", "Short", "UK", "Large ears"],
  ["Persian", "Long", "Iran", "Flat face"],
  ["Peterbald", "Hairless", "Russia", "Elegant hairless"],
  ["Pixie-Bob", "Short/Long", "USA", "Bobtail"],
  ["Ragdoll", "Long", "USA", "Gentle temperament"],
  ["Russian Blue", "Short", "Russia", "Blue-gray coat"],
  ["Savannah", "Short", "USA", "Tall exotic breed"],
  ["Scottish Fold", "Short/Long", "Scotland", "Folded ears"],
  ["Selkirk Rex", "Short/Long", "USA", "Curly coat"],
  ["Siamese", "Short", "Thailand", "Blue eyes"],
  ["Siberian", "Long", "Russia", "Thick fur"],
  ["Singapura", "Short", "Singapore", "Small size"],
  ["Snowshoe", "Short", "USA", "White paws"],
  ["Sokoke", "Short", "Kenya", "Tree-like pattern"],
  ["Somali", "Long", "USA", "Abyssinian longhair"],
  ["Sphynx", "Hairless", "Canada", "Wrinkled skin"],
  ["Thai", "Short", "Thailand", "Traditional Siamese"],
  ["Tonkinese", "Short", "USA", "Siamese-Burmese mix"],
  ["Toyger", "Short", "USA", "Tiger-like pattern"],
  ["Turkish Angora", "Long", "Turkey", "Elegant body"],
  ["Turkish Van", "Long", "Turkey", "Color on head & tail"],
  ["Ukrainian Levkoy", "Hairless", "Ukraine", "Folded ears"],
  ["York Chocolate", "Long", "USA", "Chocolate coat"],
  ["Serengeti", "Short", "USA", "Long legs"],
  ["Highlander", "Short/Long", "USA", "Curved ears"],
  ["Lykoi", "Short", "USA", '"Wolf cat" appearance'],
  ["Ojos Azules", "Short", "USA", "Deep blue eyes"],
  ["American Ringtail", "Short/Long", "USA", "Ring-shaped tail"],
  ["Foldex", "Short/Long", "Canada", "Folded ears"],
  ["Dwelf", "Hairless", "USA", "Short legs + curled ears"],
  ["Elf Cat", "Hairless", "USA", "Curled ears"],
  ["Bambino", "Hairless", "USA", "Short legs"],
];

const FAQ_ITEMS = [
  {
    q: "What breed is my cat and how can I identify it?",
    a: "You can identify your cat's breed using an AI Cat Identifier that analyzes a photo of your cat. The tool uses artificial intelligence and computer vision to compare visual traits such as coat pattern, ear shape, and face structure with known breeds like the Maine Coon, Siamese cat, and Persian cat.",
  },
  {
    q: "How accurate is an AI cat breed scanner?",
    a: "A modern AI Cat Breed Scanner can achieve high accuracy when analyzing clear images. Using deep learning models and datasets such as the Oxford-IIIT Pet Dataset, the system compares thousands of feline images to detect breed patterns and return the most likely match.",
  },
  {
    q: "Can AI identify mixed breed cats?",
    a: "Yes. Many domestic cats are mixed breeds. AI scanners analyze dominant features such as fur pattern, body structure, and eye shape to estimate which breeds may be present, such as traits from the American Shorthair or Bengal cat.",
  },
  {
    q: "How many cat breeds exist in the world?",
    a: "Different cat registries recognize varying numbers of breeds. Organizations like the International Cat Association and Cat Fanciers' Association officially recognize around 40–70 standardized cat breeds worldwide.",
  },
  {
    q: "Is a cat breed identifier the same as a DNA test?",
    a: "No. A cat breed identifier uses AI image recognition to analyze visual traits, while a DNA test analyzes genetic markers. DNA tests from companies like Basepaws provide deeper ancestry data but require laboratory processing.",
  },
  {
    q: "Can AI identify cat breeds?",
    a: "Yes. Modern AI tools use computer vision and machine learning to analyze a cat's physical traits such as coat pattern, eye color, ear shape, and facial structure. An AI cat identifier compares these features with known breeds like the Maine Coon, Siamese cat, and Persian cat to predict the most likely breed.",
  },
  {
    q: "Is there a 3-3-3 rule for cats?",
    a: "Yes. The 3-3-3 rule for cats explains how cats adjust after adoption: 3 days to decompress, 3 weeks to learn routines, and about 3 months to feel fully comfortable in a new home. Animal organizations like the ASPCA often reference this guideline to help new cat owners understand feline behavior.",
  },
  {
    q: "Can Google identify cat breeds?",
    a: "Yes. Using tools like Google Lens, Google can analyze a cat photo through image recognition technology and suggest possible breeds. However, dedicated AI tools such as a Cat Breed Identifier or Cat Scanner are usually more specialized for detecting breeds like the Bengal cat or British Shorthair.",
  },
  {
    q: "How to identify cat breed by photo?",
    a: "You can identify a cat breed by uploading a photo to an AI Cat Breed Scanner. The system uses artificial intelligence to detect visual features like coat color, body structure, and facial shape, then compares them with known breed profiles such as the Ragdoll cat or Russian Blue.",
  },
  {
    q: 'What is "I love you" in cat language?',
    a: 'Cats do not use spoken language like humans, but they show affection through behaviors such as slow blinking, head-butting, purring, and rubbing against their owners. Animal behavior experts say a slow blink is one of the closest signals to "I love you" in feline communication.',
  },
  {
    q: 'How do you say "hi" in cat language?',
    a: "Cats often greet humans and other cats by rubbing their head or tail against them, making soft chirping sounds, or gently blinking their eyes. These behaviors are part of feline social communication and indicate friendliness and trust.",
  },
  {
    q: "What is the silent killer of cats?",
    a: 'One of the most common "silent killers" in cats is chronic kidney disease, a condition that develops gradually and may show few early symptoms. Veterinary organizations such as the American Veterinary Medical Association warn that regular veterinary checkups help detect kidney disease and other hidden health issues early.',
  },
];

async function hashImage(base64: string): Promise<string> {
  const data = Uint8Array.from(atob(base64.split(",")[1]), (c) =>
    c.charCodeAt(0),
  );
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function resizeImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 800;
      let { width, height } = img;
      if (width > max || height > max) {
        if (width > height) {
          height = (height / width) * max;
          width = max;
        } else {
          width = (width / height) * max;
          height = max;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.src = url;
  });
}

function RarityBadge({ rarity }: { rarity: string }) {
  const configs: Record<string, { bg: string; color: string }> = {
    Common: { bg: "rgba(156,163,175,0.2)", color: "#9ca3af" },
    Uncommon: { bg: "rgba(59,130,246,0.2)", color: "#60a5fa" },
    Rare: { bg: "rgba(167,139,250,0.3)", color: "#a78bfa" },
    "Very Rare": { bg: "rgba(251,191,36,0.25)", color: "#fbbf24" },
  };
  const c = configs[rarity] || configs.Common;
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: c.bg, color: c.color }}
    >
      {rarity}
    </span>
  );
}

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const colors: Record<string, string> = {
    High: "#22c55e",
    Medium: "#f59e0b",
    Low: "#ef4444",
  };
  const col = colors[confidence] || colors.Medium;
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${col}22`, color: col }}
    >
      {confidence} Confidence
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <button
        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold"
        style={{ color: "var(--text-primary)" }}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{q}</span>
        <span
          className="text-xl flex-shrink-0 transition-transform"
          style={{
            color: "var(--accent)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          className="px-6 pb-5 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [freeScans, setFreeScans] = useState(3);
  const [limitReached, setLimitReached] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas!.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas!.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167,139,250,0.4)";
        ctx.fill();
      });
      nodes.forEach((a, i) =>
        nodes.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(249,115,22,${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }),
      );
      animId = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    fetch("/api/scan-count")
      .then((r) => r.json())
      .then((d) => {
        if (d.count !== undefined) {
          const rem = Math.max(0, 3 - d.count);
          setFreeScans(rem);
          setLimitReached(rem === 0);
        }
      })
      .catch(() => {});
  }, []);

  function handleFileSelect(f: File) {
    setFile(f);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }

  async function handleScan() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const resized = await resizeImage(file);
      const imageHash = await hashImage(resized);
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: resized, imageHash }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setLimitReached(true);
        setFreeScans(0);
        setError("Free scan limit reached. Buy credits to continue scanning.");
        return;
      }
      if (res.status === 402) {
        setError("Insufficient credits. Please buy more.");
        return;
      }
      if (!res.ok) {
        setError(data.error || "Analysis failed.");
        return;
      }
      setResult(data);
      setFreeScans((prev) => Math.max(0, prev - 1));
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  }

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://catscanner.org/" },
        "headline": "Cat Scanner – Cat Breed AI Identifier By Pictures",
        "description": "Identify your cat instantly with our AI Cat Identifier. Upload a photo to detect cat breeds like Maine Coon, Siamese, Persian, Bengal, and 70+ feline breeds.",
        "image": ["https://catscanner.org/cat-scanner.webp"],
        "author": { "@type": "Organization", "name": "Cat Scanner" },
        "publisher": { "@type": "Organization", "name": "Cat Scanner", "logo": { "@type": "ImageObject", "url": "https://catscanner.org/cat-scanner.webp" } },
        "articleSection": "Cat Breed Identification",
        "keywords": ["Cat Scanner","Cat Breed AI Identifier","AI Cat Identifier","Cat Breed Scanner","Identify cat breed by picture","Cat breed detector","Cat breed recognition","Maine Coon","Siamese cat","Persian cat","Bengal cat","British Shorthair","Ragdoll","Russian Blue"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Can AI identify cat breeds?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Modern AI tools use computer vision and machine learning to analyze a cat's physical traits such as coat pattern, eye color, ear shape, and facial structure. An AI cat identifier compares these features with known breeds like the Maine Coon, Siamese cat, and Persian cat to predict the most likely breed." } },
          { "@type": "Question", "name": "Is there a 3-3-3 rule for cats?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The 3-3-3 rule for cats explains how cats adjust after adoption: 3 days to decompress, 3 weeks to learn routines, and about 3 months to feel fully comfortable in a new home. Animal organizations like the ASPCA often reference this guideline to help new cat owners understand feline behavior." } },
          { "@type": "Question", "name": "Can Google identify cat breeds?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Using tools like Google Lens, Google can analyze a cat photo through image recognition technology and suggest possible breeds. However, dedicated AI tools such as a Cat Breed Identifier or Cat Scanner are usually more specialized for detecting breeds like the Bengal cat or British Shorthair." } },
          { "@type": "Question", "name": "How to identify cat breed by photo?", "acceptedAnswer": { "@type": "Answer", "text": "You can identify a cat breed by uploading a photo to an AI Cat Breed Scanner. The system uses artificial intelligence to detect visual features like coat color, body structure, and facial shape, then compares them with known breed profiles such as the Ragdoll cat or Russian Blue." } },
          { "@type": "Question", "name": "What is \"I love you\" in cat language?", "acceptedAnswer": { "@type": "Answer", "text": "Cats do not use spoken language like humans, but they show affection through behaviors such as slow blinking, head-butting, purring, and rubbing against their owners. Animal behavior experts say a slow blink is one of the closest signals to \"I love you\" in feline communication." } },
          { "@type": "Question", "name": "How do you say \"hi\" in cat language?", "acceptedAnswer": { "@type": "Answer", "text": "Cats often greet humans and other cats by rubbing their head or tail against them, making soft chirping sounds, or gently blinking their eyes. These behaviors are part of feline social communication and indicate friendliness and trust." } },
          { "@type": "Question", "name": "What is the silent killer of cats?", "acceptedAnswer": { "@type": "Answer", "text": "One of the most common \"silent killers\" in cats is chronic kidney disease, a condition that develops gradually and may show few early symptoms. Veterinary organizations such as the American Veterinary Medical Association warn that regular veterinary checkups help detect kidney disease and other hidden health issues early." } }
        ]
      }
    ]
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Script id="schema-homepage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute select-none"
              style={{
                left: p.left,
                bottom: "-10%",
                fontSize: p.w,
                opacity: p.opacity,
                animation: `floatUp ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            >
              🐾
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-12">
          {/* Hero grid: text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 animate-fade-up"
                style={{
                  background: "var(--purple-bg)",
                  color: "var(--purple)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="pulse-dot inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                AI-POWERED · 500+ BREEDS · 3 FREE SCANS
              </div>
              <h1
                className="font-fraunces font-black leading-tight mb-4 animate-fade-up"
                style={{ fontSize: "clamp(2rem,3.8vw,3.2rem)", animationDelay: "0.1s" }}
              >
                <span className="gradient-text">Cat Scanner</span>
                <span style={{ color: "var(--text-primary)" }}> – Cat Breed</span>{" "}
                <span className="italic" style={{ color: "var(--purple)" }}>
                  AI Identifier By Pictures
                </span>
              </h1>
              {/* First two intro paragraphs in hero */}
              <p
                className="text-sm sm:text-base mb-3 animate-fade-up leading-relaxed"
                style={{ color: "var(--text-muted)", animationDelay: "0.15s" }}
              >
                A Cat Identifier is an artificial intelligence tool that helps
                users identify a cat&apos;s breed simply by analyzing a photo.
                With the help of advanced computer vision and machine learning,
                an AI Cat Breed Scanner examines visual features such as coat
                pattern, face shape, ear structure, and body proportions. The
                system then compares these characteristics against a large cat
                breed database to determine the most likely breed.
              </p>
              <p
                className="text-sm sm:text-base mb-6 animate-fade-up leading-relaxed"
                style={{ color: "var(--text-muted)", animationDelay: "0.2s" }}
              >
                Modern cat breed recognition technology uses trained neural
                networks to evaluate thousands of feline images. These models
                learn patterns found in common breeds like the Maine Coon,
                Siamese, Persian Cat, British Shorthair, Bengal Cat, and
                Ragdoll. By matching visual traits from your uploaded image with
                known breed characteristics, the AI can generate accurate breed
                predictions within seconds.
              </p>
              <div
                className="flex flex-wrap gap-3 mb-8 animate-fade-up"
                style={{ animationDelay: "0.25s" }}
              >
                <Link
                  href="/#scanner"
                  className="px-6 py-3 rounded-full font-semibold text-white transition-all glow-orange"
                  style={{ background: "var(--btn-primary)" }}
                >
                  Scan Your Cat →
                </Link>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 rounded-full font-semibold transition-all"
                  style={{
                    border: "1px solid var(--purple)",
                    color: "var(--purple)",
                    background: "var(--purple-bg)",
                  }}
                >
                  See How It Works
                </a>
              </div>
              <div
                className="flex flex-wrap gap-6 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                {[
                  ["500+", "Breeds"],
                  ["97%", "Accuracy"],
                  ["<30s", "Results"],
                  ["3", "Free Scans"],
                ].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div
                      className="text-2xl font-bold font-fraunces"
                      style={{ color: "var(--accent)" }}
                    >
                      {val}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: image */}
            <div className="flex justify-center lg:justify-end animate-float">
              <div style={{
                borderRadius: "2rem",
                border: "2px solid rgba(249,115,22,0.32)",
                boxShadow: "0 0 60px rgba(249,115,22,0.28)",
                background: "rgba(249,115,22,0.04)",
                padding: "0.75rem",
                width: "100%",
                maxWidth: "620px",
              }}>
                <img
                  src="/cat-scanner.webp"
                  alt="cat scanner"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1.5rem",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            style={{ color: "var(--text-faint)" }}
          >
            <div
              className="w-px h-8 animate-scroll-bounce"
              style={{ background: "var(--text-faint)" }}
            />
            <span className="text-xs uppercase tracking-widest">scroll</span>
          </div>
        </div>
      </section>

      {/* ── SCANNER ── */}
      <section
        id="scanner"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <h2
          className="font-fraunces text-4xl font-bold text-center mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Cat Identifier Online – AI Breed Scanner By Pictures 🐱
        </h2>
        <div className="text-center mb-8">
          {limitReached ? (
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{
                background: "rgba(249,115,22,0.1)",
                border: "1px solid rgba(249,115,22,0.3)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>
                Free scan limit reached.
              </span>
              <Link
                href="/pricing"
                className="font-semibold underline"
                style={{ color: "var(--accent)" }}
              >
                Buy Credits to Continue →
              </Link>
            </div>
          ) : (
            <p className="text-sm" style={{ color: "var(--accent)" }}>
              🐾 {freeScans} of 3 lifetime free scans remaining
            </p>
          )}
        </div>

        {!result ? (
          <div className="space-y-4">
            {!preview ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${isDragging ? "scale-105" : ""}`}
                style={{
                  borderColor: isDragging ? "var(--accent)" : "var(--purple)",
                  background: isDragging
                    ? "var(--accent-bg)"
                    : "var(--purple-bg)",
                }}
                onClick={() => document.getElementById("file-input")?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const f = e.dataTransfer.files[0];
                  if (f && f.type.startsWith("image/")) handleFileSelect(f);
                }}
              >
                <div className="text-7xl mb-4">🐱</div>
                <p
                  className="text-xl font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Drop your cat photo here
                </p>
                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  or click to browse
                </p>
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                  For best results: clear face photo in good lighting
                </p>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && handleFileSelect(e.target.files[0])
                  }
                />
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                <img
                  src={preview}
                  alt="Cat preview"
                  className="w-full max-h-80 object-contain"
                />
                <div className="p-4 flex gap-3 justify-center">
                  {loading ? (
                    <div
                      className="flex items-center gap-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span className="text-2xl animate-pulse">🐾</span>
                      <span>Analyzing your cat with AI...</span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleScan}
                        disabled={limitReached}
                        className="px-6 py-2.5 rounded-full font-semibold text-white transition-all glow-orange disabled:opacity-50"
                        style={{ background: "var(--btn-primary)" }}
                      >
                        Analyze Cat 🔍
                      </button>
                      <button
                        onClick={reset}
                        className="px-6 py-2.5 rounded-full font-semibold transition-all"
                        style={{
                          border: "1px solid var(--border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        Choose Another
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {error && (
              <div
                className="p-4 rounded-xl text-sm"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  color: "#ef4444",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className="rounded-2xl p-6 card-lift card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3
                    className="font-fraunces text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {result.breedName}
                  </h3>
                  <p
                    className="italic text-sm mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {result.fullBreedName}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <RarityBadge rarity={result.rarity} />
                  <ConfidenceBadge confidence={result.confidence} />
                </div>
              </div>
              {result.funFacts?.[0] && (
                <div
                  className="p-3 rounded-xl text-sm"
                  style={{
                    background: "var(--accent-bg)",
                    color: "var(--accent)",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  💡 {result.funFacts[0]}
                </div>
              )}
            </div>
            <div
              className="rounded-2xl p-6 card-lift"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Breed Profile
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ["Origin", result.origin],
                  ["Size", result.size],
                  ["Coat", result.coatType],
                  ["Lifespan", result.lifespan],
                  ["Weight", result.weightRange],
                  ["Energy", result.energyLevel],
                ].map(([label, val]) => (
                  <div key={label}>
                    <p
                      className="text-xs mb-1"
                      style={{ color: "var(--text-faint)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-6 card-lift"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Personality
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.personalityTraits?.map((trait: string) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      background: "var(--purple-bg)",
                      color: "var(--purple)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Affection
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {result.affectionLevel}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Vocalization
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {result.vocalization}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Energy
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {result.energyLevel}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="rounded-2xl p-6 card-lift"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Health & Care
              </h4>
              <p
                className="text-sm mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                {result.healthNotes}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Grooming
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {result.groomingNeeds}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Exercise
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {result.exerciseNeeds}
                  </p>
                </div>
              </div>
              {result.commonConditions?.length > 0 && (
                <div>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Common Conditions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.commonConditions.map((c: string) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          color: "#ef4444",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div
              className="rounded-2xl p-6 card-lift"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Diet & Nutrition
              </h4>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                {result.dietNotes}
              </p>
              <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                Feeding frequency:{" "}
                <span style={{ color: "var(--text-primary)" }}>
                  {result.feedingFrequency}
                </span>
              </p>
            </div>
            {result.similarBreeds?.length > 0 && (
              <div
                className="rounded-2xl p-6 card-lift"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h4
                  className="font-fraunces text-xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Similar Breeds
                </h4>
                <div className="space-y-3">
                  {result.similarBreeds.map((b: any) => (
                    <div
                      key={b.name}
                      className="p-3 rounded-xl"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {b.name}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: "var(--accent)" }}
                        >
                          {b.similarity}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {b.keyDifferences?.map((d: string) => (
                          <span
                            key={d}
                            className="text-xs"
                            style={{ color: "var(--text-faint)" }}
                          >
                            • {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div
              className="rounded-2xl p-6 card-lift"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Compatibility
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Kids
                  </p>
                  <span>{result.goodWithKids ? "✅" : "❌"}</span>
                </div>
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Dogs
                  </p>
                  <span>{result.goodWithDogs ? "✅" : "❌"}</span>
                </div>
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Cats
                  </p>
                  <span>{result.goodWithCats ? "✅" : "❌"}</span>
                </div>
              </div>
            </div>
            {result.funFacts?.length > 0 && (
              <div
                className="rounded-2xl p-6 card-lift"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h4
                  className="font-fraunces text-xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Fun Facts
                </h4>
                <ul className="space-y-2">
                  {result.funFacts.map((f: string, i: number) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span>🐾</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={reset}
              className="w-full py-3 rounded-full font-semibold transition-all"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                background: "var(--bg-card)",
              }}
            >
              Scan Another Cat
            </button>
          </div>
        )}
      </section>

      {/* ── REMAINING INTRO PARAGRAPHS ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <p
          className="text-base mb-4 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          For pet owners, breeders, and animal enthusiasts, a Cat Breed
          Identifier provides a fast and convenient way to answer a common
          question: &quot;What breed is my cat?&quot; Instead of relying on
          guesswork, users can upload a photo and receive an instant analysis
          powered by artificial intelligence.
        </p>
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          AI-powered cat identification tools are becoming increasingly popular
          because they combine image recognition, deep learning algorithms, and
          large breed datasets to make breed detection easier and more
          accessible for everyone.
        </p>
      </section>

      {/* ── HOW AI IDENTIFIES CAT BREEDS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How AI Identifies Cat Breeds from Photos
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            An AI Cat Breed Scanner works through a combination of computer
            vision, machine learning, and image classification models. When a
            user uploads a cat photo, the system processes the image and
            extracts important visual signals that are commonly associated with
            specific breeds.
          </p>
          {/* Image 2: cat identifier */}
          <div className="flex justify-center mb-8">
            <div style={{
              width: "100%",
              maxWidth: "860px",
              borderRadius: "1.5rem",
              border: "1px solid var(--border)",
              boxShadow: "0 0 40px rgba(167,139,250,0.25)",
              background: "var(--bg-card)",
              padding: "0.75rem",
            }}>
            <img
              src="/cat-identifier.webp"
              alt="cat breed identifier"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "1rem",
                display: "block",
              }}
            />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔬",
              title: "Image Analysis & Feature Extraction",
              color: "#f97316",
              desc: "The AI model scans the image to identify visual markers such as coat color and fur pattern, eye color and eye shape, ear size and positioning, facial structure and muzzle shape, body size and proportions, and tail length and fur density. These visual elements help the system distinguish between breeds such as Russian Blue, Abyssinian, Burmese, Savannah Cat, and Norwegian Forest Cat.",
            },
            {
              icon: "🧠",
              title: "Deep Learning & Neural Networks",
              color: "#a78bfa",
              desc: "Most modern cat breed identifiers use Convolutional Neural Networks (CNN), a type of deep learning architecture designed for image recognition tasks. CNN models are trained using thousands of labeled cat images from datasets like the Oxford-IIIT Pet Dataset.",
            },
            {
              icon: "🎯",
              title: "Pattern Recognition & Breed Matching",
              color: "#22c55e",
              desc: "Once the system extracts visual features, it compares them with patterns stored in the AI cat breed database. The AI calculates a confidence score to show how closely the scanned cat matches known breed characteristics. This combination of machine learning, neural networks, and pattern recognition allows AI tools to identify both purebred cats and mixed breed cats with impressive accuracy.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 card-lift card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3
                className="font-fraunces text-lg font-bold mb-3"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Key Features of the Cat Breed Identifier Tool
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            A modern AI Cat Identifier includes several intelligent features
            designed to make breed identification simple and informative for
            users. These features rely on advanced artificial intelligence
            models and a structured feline breed database.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "📸",
              title: "Photo Upload & Camera Scan",
              color: "#f97316",
              desc: "Users can upload an image from their device or take a new picture using their camera. The AI cat scanner then analyzes the photo instantly using image recognition technology.",
            },
            {
              icon: "⚡",
              title: "Instant Cat Breed Detection",
              color: "#a78bfa",
              desc: "Within seconds, the tool processes the image and provides a list of possible matches, such as Persian Cat, Maine Coon, Siamese, Bengal Cat, Scottish Fold, or British Shorthair.",
            },
            {
              icon: "📊",
              title: "Breed Confidence Score",
              color: "#22c55e",
              desc: "The system assigns a confidence percentage to each predicted breed. This score reflects how closely the scanned cat matches known visual patterns of a specific breed.",
            },
            {
              icon: "🔀",
              title: "Mixed Breed Recognition",
              color: "#3b82f6",
              desc: "Many domestic cats are not purebred. The AI can identify potential mixed breed combinations, helping users better understand their cat's genetic background.",
            },
            {
              icon: "📚",
              title: "Cat Breed Database & Breed Guide",
              color: "#f59e0b",
              desc: "Once a breed is identified, the tool provides detailed information about cat temperament and personality, typical body size and weight, grooming needs, common health conditions, lifespan, and activity level.",
            },
            {
              icon: "🎯",
              title: "Complete Feline Knowledge",
              color: "#ec4899",
              desc: "This transforms the Cat Breed Scanner from a simple identification tool into a complete feline knowledge resource for pet owners, breeders, and animal enthusiasts.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 card-lift card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3
                className="font-fraunces text-lg font-bold mb-2"
                style={{ color: f.color }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (existing) ── */}
      <section
        id="how-it-works"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <h2
          className="font-fraunces text-4xl font-bold text-center mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          How Cat Scanner Works? Tool Using Guide
        </h2>
        <p
          className="text-center mb-4 max-w-3xl mx-auto text-base leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Understanding how the scanner works helps users trust the result and
          also helps them provide better images for more accurate
          identification.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: "📸",
              title: "Upload Photo",
              desc: "Take or upload a clear photo of your cat. Best results with a front-facing shot in good lighting. The system resizes, adjusts orientation, detects the cat subject, and filters irrelevant background noise.",
            },
            {
              icon: "🧠",
              title: "AI Analysis",
              desc: "Our advanced AI powered by Claude analyzes over 500 breed characteristics in seconds using Convolutional Neural Networks trained on thousands of labeled cat images.",
            },
            {
              icon: "🐱",
              title: "Breed Results",
              desc: "Get a detailed breed identification with confidence score and rarity rating. Results include breed name, similar breeds, and basic breed information.",
            },
            {
              icon: "💡",
              title: "Care Insights",
              desc: "Receive personalized health, diet, and care recommendations for your cat's breed including temperament, size, and lifespan details.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl p-6 card-lift card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="absolute top-4 right-4 font-fraunces font-black text-5xl"
                style={{ color: "var(--text-faint)", lineHeight: 1 }}
              >
                0{i + 1}
              </span>
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3
                className="font-fraunces text-xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Extraction detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="font-fraunces text-xl font-bold mb-3"
              style={{ color: "var(--accent)" }}
            >
              Feature Extraction: Fur, Face & Body
            </h3>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Once the system isolates the cat, it begins extracting features —
              the visible traits the model uses to evaluate breed likelihood.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Fur color",
                "Coat pattern",
                "Eye color",
                "Eye shape",
                "Ear shape",
                "Tail length",
                "Body structure",
                "Facial features",
                "Whisker area",
                "Paw proportion",
              ].map((f) => (
                <span
                  key={f}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--purple-bg)",
                    color: "var(--purple)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="font-fraunces text-xl font-bold mb-3"
              style={{ color: "var(--purple)" }}
            >
              Breed Matching with Dataset
            </h3>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              After extracting features, the model compares them with a trained
              cat breed database built from annotated images, labeled breed
              examples, and augmented image sets. A strong system needs examples
              of:
            </p>
            <ul
              className="space-y-1 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {[
                "Adult cats and kittens",
                "Different lighting conditions",
                "Different coat colors within the same breed",
                "Face-only and full-body photos",
                "Purebred and mixed-looking edge cases",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span style={{ color: "var(--accent)" }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CAT CHARACTERISTICS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cat Characteristics Used for Breed Recognition
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            To accurately identify cat breeds, artificial intelligence analyzes
            a range of visual and structural feline traits. These
            characteristics act as identifiers that help differentiate between
            various breeds.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🐾",
              title: "Coat & Fur Pattern",
              color: "#f97316",
              desc: "AI systems analyze markings such as tabby patterns, spotted coats, solid colors, bicolor coats, and colorpoint patterns seen in breeds like the Siamese and Himalayan.",
            },
            {
              icon: "👁️",
              title: "Facial Structure & Eyes",
              color: "#a78bfa",
              desc: "The AI evaluates eye shape and color, muzzle width, nose structure, and whisker pads. Persian Cats have a distinctive flat face, while Abyssinian cats have a wedge-shaped head.",
            },
            {
              icon: "👂",
              title: "Ear Shape & Tail Structure",
              color: "#22c55e",
              desc: "Certain breeds have unique traits: folded ears in Scottish Fold cats, large pointed ears in Savannah cats, and thick fluffy tails in Norwegian Forest Cats.",
            },
            {
              icon: "📏",
              title: "Body Size & Build",
              color: "#3b82f6",
              desc: "The system analyzes overall body structure. Large breeds like the Maine Coon have a muscular frame, while breeds like the Russian Blue have a more slender, elegant build.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl p-6 card-lift"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3
                className="font-fraunces text-lg font-bold mb-2"
                style={{ color: c.color }}
              >
                {c.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR CAT BREEDS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Popular Cat Breeds Identified by the AI Cat Scanner
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            The AI Cat Breed Scanner can recognize many of the world&apos;s most
            well-known feline breeds. These breeds are defined by unique
            physical traits, personality patterns, and genetic backgrounds.
          </p>
          {/* Image 3: cat breed identifier */}
          <div className="flex justify-center mb-8">
            <div style={{
              width: "100%",
              maxWidth: "860px",
              borderRadius: "1.5rem",
              border: "1px solid var(--border)",
              boxShadow: "0 0 40px rgba(249,115,22,0.25)",
              background: "var(--bg-card)",
              padding: "0.75rem",
            }}>
              <img
                src="/cat-breed-identifier.webp"
                alt="cat breed identifier"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "1rem",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Long-haired */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🦁</span>
              <h3
                className="font-fraunces text-xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                Long-Haired Breeds
              </h3>
            </div>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Long-haired breeds are known for their thick coats and elegant
              appearance.
            </p>
            <ul className="space-y-3">
              {[
                {
                  name: "Persian Cat",
                  desc: "Famous for its flat face and luxurious long fur.",
                },
                {
                  name: "Maine Coon",
                  desc: "One of the largest domestic cat breeds with a bushy tail.",
                },
                {
                  name: "Ragdoll",
                  desc: "A gentle and affectionate breed known for its relaxed personality.",
                },
                {
                  name: "Norwegian Forest Cat",
                  desc: "Adapted to cold climates with dense fur and strong build.",
                },
                {
                  name: "Himalayan Cat",
                  desc: "A cross between Persian and Siamese with striking blue eyes.",
                },
              ].map((b) => (
                <li
                  key={b.name}
                  className="p-3 rounded-xl"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <p
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {b.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {b.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {/* Short-haired */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐈</span>
              <h3
                className="font-fraunces text-xl font-bold"
                style={{ color: "var(--purple)" }}
              >
                Short-Haired Breeds
              </h3>
            </div>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Short-haired cats require less grooming and often have sleek,
              low-maintenance coats.
            </p>
            <ul className="space-y-3">
              {[
                {
                  name: "British Shorthair",
                  desc: "Known for its round face and plush coat.",
                },
                {
                  name: "American Shorthair",
                  desc: "A hardy and adaptable breed with tabby markings.",
                },
                {
                  name: "Russian Blue",
                  desc: "Recognized for its silvery-blue coat and green eyes.",
                },
                {
                  name: "Burmese",
                  desc: "A muscular breed with a shiny coat and social personality.",
                },
                {
                  name: "Abyssinian",
                  desc: "One of the oldest known breeds with a ticked coat pattern.",
                },
              ].map((b) => (
                <li
                  key={b.name}
                  className="p-3 rounded-xl"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <p
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {b.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {b.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {/* Exotic */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✨</span>
              <h3
                className="font-fraunces text-xl font-bold"
                style={{ color: "#22c55e" }}
              >
                Exotic & Unique Breeds
              </h3>
            </div>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Some breeds have unusual physical features that make them easy for
              AI systems to detect.
            </p>
            <ul className="space-y-3">
              {[
                {
                  name: "Bengal Cat",
                  desc: "Leopard-like spotted coat pattern.",
                },
                {
                  name: "Savannah Cat",
                  desc: "Tall, exotic-looking breed with large ears.",
                },
                {
                  name: "Sphynx",
                  desc: "A hairless breed with distinctive skin texture.",
                },
                { name: "Scottish Fold", desc: "Famous for its folded ears." },
                {
                  name: "Oriental Shorthair",
                  desc: "Slender body and large ears.",
                },
              ].map((b) => (
                <li
                  key={b.name}
                  className="p-3 rounded-xl"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <p
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {b.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {b.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CAT BREED IDENTIFIER APP ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cat Breed Identifier App
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            The cat breed identifier app is designed to make AI accessible
            without complexity. It works as a web-based tool, meaning users
            don&apos;t need to install anything.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🌐",
              title: "Web-Based Cat Scanner Tool",
              color: "#f97316",
              points: [
                "Runs directly in browser",
                "No download required",
                "Works across all devices",
              ],
              extra:
                "This makes it easy for users to try instantly, which improves engagement.",
            },
            {
              icon: "📱",
              title: "Mobile Camera Scanner",
              color: "#a78bfa",
              points: [
                "Real-time camera scanning",
                "Instant image capture",
                "On-the-go identification",
              ],
              extra:
                "Especially useful for outdoor cats, shelter environments, and quick checks during adoption or rescue.",
            },
            {
              icon: "⚡",
              title: "Real-Time Detection",
              color: "#22c55e",
              points: [
                "Live scanning via camera",
                "Continuous detection",
                "Immediate feedback",
              ],
              extra:
                "This connects computer vision with real-time processing, making the experience more interactive and modern.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 card-lift card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3
                className="font-fraunces text-lg font-bold mb-3"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <ul className="space-y-2 mb-4">
                {item.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: item.color }}>✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-faint)" }}
              >
                {item.extra}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAT IDENTIFICATION FEATURES ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cat Identification Features
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Accurate cat breed identification depends on how well the system
            understands physical traits. A strong cat scanner AI evaluates
            multiple visual signals together to make a reliable prediction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "🐾",
              title: "Fur Color & Coat Pattern",
              color: "#f97316",
              content: [
                "Solid (single color)",
                "Tabby (striped or swirled)",
                "Spotted (e.g., Bengal)",
                "Pointed (e.g., Siamese)",
                "Ticked (e.g., Abyssinian)",
              ],
              extra:
                "The AI compares these patterns with labeled examples in its dataset. A Bengal cat is easier to identify due to its distinct spotted coat, while tabby patterns are more common and less breed-specific.",
            },
            {
              icon: "👁️",
              title: "Eye Shape & Eye Color",
              color: "#a78bfa",
              content: [
                "Round eyes → often seen in British Shorthair",
                "Almond-shaped eyes → common in Siamese or Oriental Shorthair",
                "Blue eyes → strong indicator for color-point breeds",
              ],
              extra:
                "Eye color is not always decisive alone, but in combination with coat and face shape, it improves accuracy.",
            },
            {
              icon: "👂",
              title: "Ear Shape & Tail Structure",
              color: "#22c55e",
              content: [
                "Folded ears → Scottish Fold",
                "Large upright ears → Oriental Shorthair",
                "Tufted ears → Maine Coon",
                "Long and bushy tail → Maine Coon-type traits",
                "Thin and sleek tail → Siamese-type traits",
              ],
              extra:
                "Structural features often act as strong signals that help distinguish specific breeds.",
            },
            {
              icon: "📐",
              title: "Body Size & Facial Features",
              color: "#3b82f6",
              content: [
                "Large and muscular → Maine Coon",
                "Compact and round → British Shorthair",
                "Slim and elongated → Siamese",
                "Flat face → Persian",
                "Wedge-shaped face → Oriental breeds",
                "Round face → British-type breeds",
              ],
              extra:
                "These features are processed together through feature extraction and pattern recognition, forming the foundation of accurate cat breed classification.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 card-lift"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <h3
                  className="font-fraunces text-xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
              </div>
              <ul className="space-y-2 mb-4">
                {item.content.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: item.color }}>•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p
                className="text-xs leading-relaxed p-3 rounded-xl"
                style={{
                  color: "var(--text-faint)",
                  background: "var(--bg-secondary)",
                }}
              >
                {item.extra}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAT BREED STANDARDS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2
          className="font-fraunces text-4xl font-bold mb-6 text-center"
          style={{ color: "var(--text-primary)" }}
        >
          Cat Breed Standards and Registries
        </h2>
        <div
          className="rounded-2xl p-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-base mb-4 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Cat breeds are officially recognized and classified by international
            cat registry organizations that define breed standards, genetics,
            and pedigree records. These organizations maintain detailed
            documentation about feline characteristics such as coat patterns,
            body structure, temperament, and genetic lineage.
          </p>
          <p
            className="text-base mb-4 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            The most widely recognized cat registries include{" "}
            <strong style={{ color: "var(--accent)" }}>
              The International Cat Association (TICA)
            </strong>
            ,{" "}
            <strong style={{ color: "var(--accent)" }}>
              Cat Fanciers&apos; Association (CFA)
            </strong>
            , and{" "}
            <strong style={{ color: "var(--accent)" }}>
              Fédération Internationale Féline (FIFe)
            </strong>
            . These organizations evaluate and register breeds based on strict
            criteria, helping breeders maintain consistent standards for
            recognized cats.
          </p>
          <p
            className="text-base mb-4 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            For example, the CFA and TICA breed standards define specific
            characteristics for breeds such as the Maine Coon, Siamese cat,
            Persian cat, and British Shorthair. These standards describe details
            like ear shape, coat texture, eye color, body proportions, and
            temperament.
          </p>
          <p
            className="text-base mb-4 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            An AI Cat Breed Scanner relies heavily on these official breed
            descriptions. The system is trained using labeled datasets that
            follow the same breed classifications used by major feline
            registries. This ensures the AI compares scanned cat images with
            standardized breed traits recognized worldwide.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            While many household cats are domestic mixed-breed cats, breed
            registries still provide valuable reference data that helps
            artificial intelligence models improve their identification
            accuracy.
          </p>
        </div>
      </section>

      {/* ── CAT PERSONALITY & BEHAVIOR ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cat Personality, Behavior, and Temperament
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Every cat breed has unique personality traits and behavioral
            patterns. Understanding these differences helps cat owners better
            care for their pets after identifying the breed with an AI Cat
            Identifier.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="font-fraunces text-xl font-bold mb-3"
              style={{ color: "var(--accent)" }}
            >
              Social & Affectionate Breeds
            </h3>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Some breeds are known for being highly social and affectionate.
              For example, the <strong>Ragdoll cat</strong> is famous for its
              calm temperament and tendency to relax when held. Similarly, the{" "}
              <strong>Burmese cat</strong> is known for strong attachment to
              human companions.
            </p>
          </div>
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="font-fraunces text-xl font-bold mb-3"
              style={{ color: "var(--purple)" }}
            >
              Energetic & Curious Breeds
            </h3>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Other breeds are energetic and curious. The{" "}
              <strong>Bengal cat</strong> and <strong>Abyssinian cat</strong>{" "}
              are extremely active breeds that enjoy climbing, exploring, and
              interactive play.
            </p>
          </div>
        </div>
        <div
          className="rounded-2xl p-6 mb-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="font-fraunces text-xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cat Personality Depends On:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Breed genetics",
              "Early socialization",
              "Environment & living conditions",
              "Interaction with humans & other pets",
            ].map((factor) => (
              <div
                key={factor}
                className="p-3 rounded-xl text-center text-sm"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-muted)",
                }}
              >
                {factor}
              </div>
            ))}
          </div>
        </div>
        <p
          className="text-base leading-relaxed text-center max-w-3xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          For instance, the <strong>Russian Blue</strong> is typically quiet and
          reserved around strangers but very loyal to its owner. Meanwhile, the{" "}
          <strong>Savannah cat</strong> is known for its exotic appearance and
          high energy level. Understanding temperament helps owners prepare for
          grooming routines, exercise needs, and behavioral training that match
          the natural instincts of each breed.
        </p>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Benefits of Using an AI Cat Breed Identifier
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            AI-powered pet identification tools are becoming popular because
            they provide fast and accurate insights about domestic animals. A
            Cat Breed Identifier offers several advantages for cat owners,
            breeders, veterinarians, and animal enthusiasts.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              title: "Fast Breed Identification",
              color: "#f97316",
              desc: "Instead of manually comparing cat images with breed guides, users can simply upload a photo and receive instant breed predictions.",
            },
            {
              icon: "📖",
              title: "Learn More About Your Cat",
              color: "#a78bfa",
              desc: "Knowing your cat's breed can help you understand its natural behavior, grooming needs, and potential health concerns.",
            },
            {
              icon: "🎓",
              title: "Educational Tool for Cat Lovers",
              color: "#22c55e",
              desc: "AI breed scanners help people learn about feline diversity and discover breeds they may never have encountered before.",
            },
            {
              icon: "🔀",
              title: "Useful for Mixed-Breed Cats",
              color: "#3b82f6",
              desc: "Most domestic cats are mixed breeds. AI scanners can identify dominant characteristics inherited from multiple breeds such as the American Shorthair or Oriental Shorthair.",
            },
            {
              icon: "📱",
              title: "Accessible & Easy to Use",
              color: "#f59e0b",
              desc: "Unlike genetic testing services, AI identification tools work instantly and do not require laboratory analysis.",
            },
            {
              icon: "🌍",
              title: "Widely Applicable",
              color: "#ec4899",
              desc: "Because of these advantages, AI cat recognition tools are becoming common in pet apps, veterinary software, and educational animal platforms.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-2xl p-6 card-lift card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3
                className="font-fraunces text-lg font-bold mb-2"
                style={{ color: b.color }}
              >
                {b.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI vs DNA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cat Breed Identification vs Cat DNA Testing
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            There are two main methods used to determine a cat&apos;s breed: AI
            image recognition tools and cat DNA testing kits. Each approach has
            its own benefits and limitations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🤖</span>
              <h3
                className="font-fraunces text-xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                AI Cat Breed Identification
              </h3>
            </div>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              AI scanners analyze visual features using computer vision and deep
              learning models. This method works instantly and requires only a
              photograph.
            </p>
            <h4
              className="font-semibold text-sm mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Advantages:
            </h4>
            <ul className="space-y-2 mb-4">
              {[
                "Instant results",
                "No laboratory testing required",
                "Accessible on smartphones and web tools",
                "Free or low-cost identification",
              ].map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span style={{ color: "#22c55e" }}>✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <p
              className="text-xs p-3 rounded-xl leading-relaxed"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-faint)",
              }}
            >
              Note: Visual analysis may not always detect complex genetic
              ancestry in mixed-breed cats.
            </p>
          </div>
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧬</span>
              <h3
                className="font-fraunces text-xl font-bold"
                style={{ color: "var(--purple)" }}
              >
                Cat DNA Testing
              </h3>
            </div>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Genetic testing uses laboratory analysis of a cat&apos;s DNA to
              identify ancestral breed markers. Companies like Basepaws provide
              feline DNA kits that analyze genetic data to determine breed
              heritage and health traits.
            </p>
            <h4
              className="font-semibold text-sm mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Advantages:
            </h4>
            <ul className="space-y-2 mb-4">
              {[
                "Deeper insight into genetic ancestry",
                "Detection of hereditary health markers",
                "Accurate mixed breed breakdown",
              ].map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span style={{ color: "#22c55e" }}>✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <p
              className="text-xs p-3 rounded-xl leading-relaxed"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-faint)",
              }}
            >
              Note: DNA testing can be expensive and requires waiting for lab
              results.
            </p>
          </div>
        </div>
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: "var(--accent-bg)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          <h3
            className="font-fraunces text-xl font-bold mb-2"
            style={{ color: "var(--accent)" }}
          >
            Which Method Is Better?
          </h3>
          <p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            For quick answers to the question &quot;What breed is my cat?&quot;,
            an AI Cat Breed Scanner is usually the easiest option. For detailed
            genetic ancestry or health information, DNA testing may provide
            deeper insights. Many cat owners use both approaches together to
            better understand their feline companions.
          </p>
        </div>
      </section>

      {/* ── BREED CHART ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cat Breed Chart — AI Cat Breed Scanner Database
          </h2>
          <p
            className="max-w-3xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            A Cat Breed Chart is a structured reference table that helps users
            compare and understand different cat breeds based on their physical
            traits, origin, coat type, and personality. For an AI Cat Breed
            Scanner, a breed chart acts as a foundational database that allows
            artificial intelligence and computer vision systems to compare
            uploaded cat photos with standardized breed features recognized by
            organizations such as the International Cat Association and the Cat
            Fanciers&apos; Association. By organizing feline breed data in a
            clear table format, a cat breed chart makes it easier for pet
            owners, breeders, and animal enthusiasts to quickly identify cat
            breeds and learn about their unique traits.
          </p>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--accent)", color: "#fff" }}>
                  <th className="px-4 py-3 text-left font-semibold">
                    Cat Breed
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Coat Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Origin</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Key Characteristics
                  </th>
                </tr>
              </thead>
              <tbody>
                {BREED_CHART.map(([breed, coat, origin, key], idx) => (
                  <tr
                    key={breed}
                    style={{
                      background:
                        idx % 2 === 0
                          ? "var(--bg-card)"
                          : "var(--bg-secondary)",
                    }}
                  >
                    <td
                      className="px-4 py-2.5 font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {breed}
                    </td>
                    <td
                      className="px-4 py-2.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {coat}
                    </td>
                    <td
                      className="px-4 py-2.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {origin}
                    </td>
                    <td
                      className="px-4 py-2.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {key}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="px-4 py-3 text-xs italic"
            style={{
              background: "var(--bg-card)",
              color: "var(--text-faint)",
              borderTop: "1px solid var(--border)",
            }}
          >
            Your AI cat scanner can expand this database with additional breeds.
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2
          className="font-fraunces text-4xl font-bold text-center mb-12"
          style={{ color: "var(--text-primary)" }}
        >
          Cat Lovers Love Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah M.",
              role: "Cat Breeder, UK",
              text: "The breed identification accuracy is incredible. I've been breeding cats for 15 years and this AI gets it right almost every time.",
            },
            {
              name: "James T.",
              role: "Veterinary Student, USA",
              text: "Perfect for studying breed characteristics. The health insights section is surprisingly detailed and accurate.",
            },
            {
              name: "Yuki N.",
              role: "Cat Café Owner, Japan",
              text: "We use CatScanner to identify breeds for our guests. It's fast, accurate, and our customers love learning about our cats!",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6 card-lift card-glow"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <span key={i} style={{ color: "#f59e0b" }}>
                      ★
                    </span>
                  ))}
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                "{t.text}"
              </p>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {t.name}
              </p>
              <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            People Also Ask – Cat Breed Identifier FAQ
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Common questions about AI cat breed identification answered
          </p>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249,115,22,0.1) 0%, rgba(167,139,250,0.06) 50%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2
            className="font-fraunces text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Discover Your Cat&apos;s Breed Today
          </h2>
          <p className="mb-8 text-lg" style={{ color: "var(--text-muted)" }}>
            Join thousands of cat lovers who have already unlocked their
            cat&apos;s story
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/#scanner"
              className="px-8 py-3 rounded-full font-semibold text-white glow-orange"
              style={{ background: "var(--btn-primary)" }}
            >
              Scan Free — No Signup →
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3 rounded-full font-semibold"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
