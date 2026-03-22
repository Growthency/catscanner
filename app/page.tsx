'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const PARTICLES = [
  {left:'5%', dur:16, delay:0, w:14, opacity:0.06},
  {left:'12%',dur:12, delay:3, w:18, opacity:0.04},
  {left:'20%',dur:19, delay:7, w:12, opacity:0.07},
  {left:'28%',dur:14, delay:1, w:16, opacity:0.05},
  {left:'36%',dur:11, delay:9, w:20, opacity:0.04},
  {left:'44%',dur:17, delay:4, w:14, opacity:0.06},
  {left:'52%',dur:13, delay:6, w:18, opacity:0.05},
  {left:'60%',dur:15, delay:2, w:12, opacity:0.07},
  {left:'68%',dur:18, delay:8, w:16, opacity:0.04},
  {left:'76%',dur:10, delay:5, w:20, opacity:0.06},
  {left:'84%',dur:16, delay:3, w:14, opacity:0.05},
  {left:'92%',dur:12, delay:10, w:18, opacity:0.04},
]

async function hashImage(base64: string): Promise<string> {
  const data = Uint8Array.from(atob(base64.split(',')[1]), c => c.charCodeAt(0))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function resizeImage(file: File): Promise<string> {
  return new Promise(resolve => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const max = 800
      let { width, height } = img
      if (width > max || height > max) {
        if (width > height) { height = (height / width) * max; width = max }
        else { width = (width / height) * max; height = max }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }
    img.src = url
  })
}

function RarityBadge({ rarity }: { rarity: string }) {
  const configs: Record<string, {bg:string,color:string}> = {
    Common: {bg:'rgba(156,163,175,0.2)',color:'#9ca3af'},
    Uncommon: {bg:'rgba(59,130,246,0.2)',color:'#60a5fa'},
    Rare: {bg:'rgba(167,139,250,0.3)',color:'#a78bfa'},
    'Very Rare': {bg:'rgba(251,191,36,0.25)',color:'#fbbf24'},
  }
  const c = configs[rarity] || configs.Common
  return <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:c.bg, color:c.color}}>{rarity}</span>
}

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const colors: Record<string,string> = { High: '#22c55e', Medium: '#f59e0b', Low: '#ef4444' }
  const col = colors[confidence] || colors.Medium
  return <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:`${col}22`, color:col}}>{confidence} Confidence</span>
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [freeScans, setFreeScans] = useState(3)
  const [limitReached, setLimitReached] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const nodes = Array.from({length:40}, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
    }))
    function draw() {
      ctx.clearRect(0,0,canvas!.width,canvas!.height)
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy
        if(n.x<0||n.x>canvas!.width) n.vx*=-1
        if(n.y<0||n.y>canvas!.height) n.vy*=-1
        ctx.beginPath(); ctx.arc(n.x,n.y,2,0,Math.PI*2)
        ctx.fillStyle='rgba(167,139,250,0.4)'; ctx.fill()
      })
      nodes.forEach((a,i) => nodes.slice(i+1).forEach(b => {
        const dist=Math.hypot(a.x-b.x,a.y-b.y)
        if(dist<120) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y)
          ctx.strokeStyle=`rgba(249,115,22,${0.15*(1-dist/120)})`; ctx.stroke()
        }
      }))
      animId=requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    fetch('/api/scan-count').then(r=>r.json()).then(d=>{
      if(d.count!==undefined){ const rem=Math.max(0,3-d.count); setFreeScans(rem); setLimitReached(rem===0) }
    }).catch(()=>{})
  }, [])

  function handleFileSelect(f: File) {
    setFile(f); setResult(null); setError(null)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  async function handleScan() {
    if (!file) return
    setLoading(true); setError(null)
    try {
      const resized = await resizeImage(file)
      const imageHash = await hashImage(resized)
      const res = await fetch('/api/analyze', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({imageBase64:resized, imageHash}),
      })
      const data = await res.json()
      if(res.status===429){ setLimitReached(true); setFreeScans(0); setError('Daily free scan limit reached. Buy credits to continue.'); return }
      if(res.status===402){ setError('Insufficient credits. Please buy more.'); return }
      if(!res.ok){ setError(data.error||'Analysis failed.'); return }
      setResult(data); setFreeScans(prev=>Math.max(0,prev-1))
    } catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  function reset() { setFile(null); setPreview(null); setResult(null); setError(null) }

  return (
    <div style={{background:'var(--bg-primary)', minHeight:'100vh'}}>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{opacity:0.5}} />
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p,i) => (
            <div key={i} className="absolute select-none" style={{left:p.left, bottom:'-10%', fontSize:p.w, opacity:p.opacity, animation:`floatUp ${p.dur}s ease-in-out ${p.delay}s infinite`}}>🐾</div>
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-fade-up" style={{background:'var(--purple-bg)', color:'var(--purple)', border:'1px solid var(--border)'}}>
                <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{background:'var(--accent)'}} />
                AI-POWERED · 500+ BREEDS · 3 FREE DAILY
              </div>
              <h1 className="font-fraunces font-black leading-tight mb-6 animate-fade-up" style={{fontSize:'clamp(3rem,7vw,5.8rem)', animationDelay:'0.1s'}}>
                <span style={{color:'var(--text-primary)'}}>Identify Any</span><br />
                <span className="italic" style={{color:'transparent', WebkitTextStroke:'2px var(--purple)'}}>Cat Breed</span><br />
                <span className="gradient-text">Instantly & Accurately</span>
              </h1>
              <p className="text-lg mb-8 animate-fade-up" style={{color:'var(--text-muted)', animationDelay:'0.2s'}}>
                Upload a photo. Our AI analyzes breed, personality, health traits, and care tips in seconds.
              </p>
              <div className="flex flex-wrap gap-3 mb-10 animate-fade-up" style={{animationDelay:'0.3s'}}>
                <Link href="/#scanner" className="px-6 py-3 rounded-full font-semibold text-white transition-all glow-orange" style={{background:'var(--btn-primary)'}}>
                  Scan Your Cat →
                </Link>
                <a href="#how-it-works" className="px-6 py-3 rounded-full font-semibold transition-all" style={{border:'1px solid var(--purple)', color:'var(--purple)', background:'var(--purple-bg)'}}>
                  See How It Works
                </a>
              </div>
              <div className="flex flex-wrap gap-6 animate-fade-up" style={{animationDelay:'0.4s'}}>
                {[['500+','Breeds'],['97%','Accuracy'],['<30s','Results'],['3','Free/Day']].map(([val,label])=>(
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold font-fraunces" style={{color:'var(--accent)'}}>{val}</div>
                    <div className="text-xs" style={{color:'var(--text-faint)'}}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex text-9xl animate-float select-none" style={{marginRight:'4rem'}}>🐱</div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{color:'var(--text-faint)'}}>
            <div className="w-px h-8 animate-scroll-bounce" style={{background:'var(--text-faint)'}} />
            <span className="text-xs uppercase tracking-widest">scroll</span>
          </div>
        </div>
      </section>

      {/* SCANNER */}
      <section id="scanner" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="font-fraunces text-4xl font-bold text-center mb-3" style={{color:'var(--text-primary)'}}>Scan Your Cat 🐱</h2>
        <div className="text-center mb-8">
          {limitReached ? (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl" style={{background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.3)'}}>
              <span style={{color:'var(--accent)'}}>Daily limit reached.</span>
              <Link href="/pricing" className="font-semibold underline" style={{color:'var(--accent)'}}>Buy Credits to Continue →</Link>
            </div>
          ) : (
            <p className="text-sm" style={{color:'var(--accent)'}}>🐾 {freeScans} of 3 free scans remaining today</p>
          )}
        </div>

        {!result ? (
          <div className="space-y-4">
            {!preview ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${isDragging?'scale-105':''}`}
                style={{borderColor:isDragging?'var(--accent)':'var(--purple)', background:isDragging?'var(--accent-bg)':'var(--purple-bg)'}}
                onClick={() => document.getElementById('file-input')?.click()}
                onDragOver={e => {e.preventDefault(); setIsDragging(true)}}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => {e.preventDefault(); setIsDragging(false); const f=e.dataTransfer.files[0]; if(f&&f.type.startsWith('image/')) handleFileSelect(f)}}
              >
                <div className="text-7xl mb-4">🐱</div>
                <p className="text-xl font-semibold mb-1" style={{color:'var(--text-primary)'}}>Drop your cat photo here</p>
                <p className="text-sm mb-3" style={{color:'var(--text-muted)'}}>or click to browse</p>
                <p className="text-xs" style={{color:'var(--text-faint)'}}>For best results: clear face photo in good lighting</p>
                <input id="file-input" type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&handleFileSelect(e.target.files[0])} />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border" style={{borderColor:'var(--border)', background:'var(--bg-card)'}}>
                <img src={preview} alt="Cat preview" className="w-full max-h-80 object-contain" />
                <div className="p-4 flex gap-3 justify-center">
                  {loading ? (
                    <div className="flex items-center gap-3" style={{color:'var(--text-muted)'}}>
                      <span className="text-2xl animate-pulse">🐾</span>
                      <span>Analyzing your cat with AI...</span>
                    </div>
                  ) : (
                    <>
                      <button onClick={handleScan} disabled={limitReached} className="px-6 py-2.5 rounded-full font-semibold text-white transition-all glow-orange disabled:opacity-50" style={{background:'var(--btn-primary)'}}>
                        Analyze Cat 🔍
                      </button>
                      <button onClick={reset} className="px-6 py-2.5 rounded-full font-semibold transition-all" style={{border:'1px solid var(--border)', color:'var(--text-muted)'}}>
                        Choose Another
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {error && <div className="p-4 rounded-xl text-sm" style={{background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.2)'}}>{error}</div>}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header card */}
            <div className="rounded-2xl p-6 card-lift card-glow" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-fraunces text-3xl font-bold" style={{color:'var(--text-primary)'}}>{result.breedName}</h3>
                  <p className="italic text-sm mt-1" style={{color:'var(--text-muted)'}}>{result.fullBreedName}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <RarityBadge rarity={result.rarity} />
                  <ConfidenceBadge confidence={result.confidence} />
                </div>
              </div>
              {result.funFacts?.[0] && (
                <div className="p-3 rounded-xl text-sm" style={{background:'var(--accent-bg)', color:'var(--accent)', border:'1px solid rgba(249,115,22,0.2)'}}>
                  💡 {result.funFacts[0]}
                </div>
              )}
            </div>

            {/* Breed profile */}
            <div className="rounded-2xl p-6 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <h4 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Breed Profile</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[['Origin',result.origin],['Size',result.size],['Coat',result.coatType],['Lifespan',result.lifespan],['Weight',result.weightRange],['Energy',result.energyLevel]].map(([label,val])=>(
                  <div key={label}><p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>{label}</p><p className="font-semibold text-sm" style={{color:'var(--text-primary)'}}>{val}</p></div>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div className="rounded-2xl p-6 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <h4 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Personality</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.personalityTraits?.map((trait:string) => (
                  <span key={trait} className="px-3 py-1 rounded-full text-sm font-medium" style={{background:'var(--purple-bg)', color:'var(--purple)', border:'1px solid var(--border)'}}>{trait}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>Affection</p><p style={{color:'var(--text-primary)'}}>{result.affectionLevel}</p></div>
                <div><p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>Vocalization</p><p style={{color:'var(--text-primary)'}}>{result.vocalization}</p></div>
                <div><p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>Energy</p><p style={{color:'var(--text-primary)'}}>{result.energyLevel}</p></div>
              </div>
            </div>

            {/* Health & Care */}
            <div className="rounded-2xl p-6 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <h4 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Health & Care</h4>
              <p className="text-sm mb-3" style={{color:'var(--text-muted)'}}>{result.healthNotes}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>Grooming</p><p className="text-sm font-semibold" style={{color:'var(--text-primary)'}}>{result.groomingNeeds}</p></div>
                <div><p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>Exercise</p><p className="text-sm font-semibold" style={{color:'var(--text-primary)'}}>{result.exerciseNeeds}</p></div>
              </div>
              {result.commonConditions?.length>0 && (
                <div><p className="text-xs mb-2" style={{color:'var(--text-faint)'}}>Common Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {result.commonConditions.map((c:string) => <span key={c} className="px-2 py-0.5 rounded text-xs" style={{background:'rgba(239,68,68,0.1)', color:'#ef4444'}}>{c}</span>)}
                </div></div>
              )}
            </div>

            {/* Diet */}
            <div className="rounded-2xl p-6 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <h4 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Diet & Nutrition</h4>
              <p className="text-sm mb-2" style={{color:'var(--text-muted)'}}>{result.dietNotes}</p>
              <p className="text-xs" style={{color:'var(--text-faint)'}}>Feeding frequency: <span style={{color:'var(--text-primary)'}}>{result.feedingFrequency}</span></p>
            </div>

            {/* Similar Breeds */}
            {result.similarBreeds?.length>0 && (
              <div className="rounded-2xl p-6 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
                <h4 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Similar Breeds</h4>
                <div className="space-y-3">
                  {result.similarBreeds.map((b:any) => (
                    <div key={b.name} className="p-3 rounded-xl" style={{background:'var(--bg-secondary)'}}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm" style={{color:'var(--text-primary)'}}>{b.name}</span>
                        <span className="text-xs font-bold" style={{color:'var(--accent)'}}>{b.similarity}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {b.keyDifferences?.map((d:string) => <span key={d} className="text-xs" style={{color:'var(--text-faint)'}}>• {d}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compatibility */}
            <div className="rounded-2xl p-6 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <h4 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Compatibility</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><p className="text-sm mb-1" style={{color:'var(--text-muted)'}}>Kids</p><span>{result.goodWithKids?'✅':'❌'}</span></div>
                <div><p className="text-sm mb-1" style={{color:'var(--text-muted)'}}>Dogs</p><span>{result.goodWithDogs?'✅':'❌'}</span></div>
                <div><p className="text-sm mb-1" style={{color:'var(--text-muted)'}}>Cats</p><span>{result.goodWithCats?'✅':'❌'}</span></div>
              </div>
            </div>

            {/* Fun Facts */}
            {result.funFacts?.length>0 && (
              <div className="rounded-2xl p-6 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
                <h4 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Fun Facts</h4>
                <ul className="space-y-2">
                  {result.funFacts.map((f:string,i:number) => <li key={i} className="flex gap-2 text-sm" style={{color:'var(--text-muted)'}}><span>🐾</span><span>{f}</span></li>)}
                </ul>
              </div>
            )}

            <button onClick={reset} className="w-full py-3 rounded-full font-semibold transition-all" style={{border:'1px solid var(--border)', color:'var(--text-muted)', background:'var(--bg-card)'}}>
              Scan Another Cat
            </button>
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-fraunces text-4xl font-bold text-center mb-3" style={{color:'var(--text-primary)'}}>How It Works</h2>
        <p className="text-center mb-12" style={{color:'var(--text-muted)'}}>Four simple steps to discover your cat&apos;s breed</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {icon:'📸', title:'Upload Photo', desc:'Take or upload a clear photo of your cat. Best results with a front-facing shot in good lighting.'},
            {icon:'🧠', title:'AI Analysis', desc:'Our advanced AI powered by Claude analyzes over 500 breed characteristics in seconds.'},
            {icon:'🐱', title:'Breed Results', desc:'Get a detailed breed identification with confidence score and rarity rating.'},
            {icon:'💡', title:'Care Insights', desc:"Receive personalized health, diet, and care recommendations for your cat's breed."},
          ].map((step,i) => (
            <div key={step.title} className="relative rounded-2xl p-6 card-lift card-glow" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <span className="absolute top-4 right-4 font-fraunces font-black text-5xl" style={{color:'var(--text-faint)', lineHeight:1}}>0{i+1}</span>
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-fraunces text-xl font-bold mb-2" style={{color:'var(--text-primary)'}}>{step.title}</h3>
              <p className="text-sm" style={{color:'var(--text-muted)'}}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-fraunces text-4xl font-bold text-center mb-3" style={{color:'var(--text-primary)'}}>Everything You Need</h2>
        <p className="text-center mb-12" style={{color:'var(--text-muted)'}}>Comprehensive cat breed intelligence at your fingertips</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {icon:'🔍', title:'Breed Identification', desc:'500+ breeds from around the world', color:'#f97316'},
            {icon:'😸', title:'Personality Profile', desc:'Temperament, behavior, energy level', color:'#a78bfa'},
            {icon:'❤️', title:'Health Insights', desc:'Common conditions, lifespan, vet tips', color:'#ef4444'},
            {icon:'🍽️', title:'Care Guide', desc:'Grooming, diet, exercise requirements', color:'#14b8a6'},
            {icon:'🐾', title:'Similar Breeds', desc:'Visual comparison with related breeds', color:'#3b82f6'},
            {icon:'📚', title:'Scan History', desc:'Save and review all your past scans', color:'#f59e0b'},
          ].map(feature => (
            <div key={feature.title} className="rounded-2xl p-6 card-lift card-glow" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-fraunces text-lg font-bold mb-2" style={{color:feature.color}}>{feature.title}</h3>
              <p className="text-sm" style={{color:'var(--text-muted)'}}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR BREEDS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-fraunces text-4xl font-bold text-center mb-12" style={{color:'var(--text-primary)'}}>Popular Breeds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {name:'Persian Cat', tag:'Gentle & Regal', fact:'Known for their flat faces and long silky coats, Persians are one of the oldest cat breeds in the world.'},
            {name:'Maine Coon', tag:'Gentle Giant', fact:'Maine Coons are the largest domestic cat breed, known for their tufted ears and dog-like personalities.'},
            {name:'Siamese', tag:'Vocal & Social', fact:'Siamese cats are one of the first distinctly recognized breeds of Asian cat, famous for their blue eyes.'},
          ].map(breed => (
            <div key={breed.name} className="rounded-2xl p-6 card-lift card-glow" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="text-5xl mb-3 text-center">🐱</div>
              <h3 className="font-fraunces text-xl font-bold text-center mb-1" style={{color:'var(--text-primary)'}}>{breed.name}</h3>
              <p className="text-center text-sm font-medium mb-3" style={{color:'var(--accent)'}}>{breed.tag}</p>
              <p className="text-sm text-center" style={{color:'var(--text-muted)'}}>{breed.fact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-fraunces text-4xl font-bold text-center mb-12" style={{color:'var(--text-primary)'}}>Cat Lovers Love Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {name:'Sarah M.', role:'Cat Breeder, UK', text:"The breed identification accuracy is incredible. I've been breeding cats for 15 years and this AI gets it right almost every time."},
            {name:'James T.', role:'Veterinary Student, USA', text:'Perfect for studying breed characteristics. The health insights section is surprisingly detailed and accurate.'},
            {name:'Yuki N.', role:'Cat Café Owner, Japan', text:"We use CatScanner to identify breeds for our guests. It's fast, accurate, and our customers love learning about our cats!"},
          ].map(t => (
            <div key={t.name} className="rounded-2xl p-6 card-lift card-glow" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="flex items-center gap-1 mb-3">{Array(5).fill(null).map((_,i)=><span key={i} style={{color:'#f59e0b'}}>★</span>)}</div>
              <p className="text-sm mb-4" style={{color:'var(--text-muted)'}}>"{t.text}"</p>
              <p className="font-semibold text-sm" style={{color:'var(--text-primary)'}}>{t.name}</p>
              <p className="text-xs" style={{color:'var(--text-faint)'}}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at center, rgba(249,115,22,0.1) 0%, rgba(167,139,250,0.06) 50%, transparent 70%)'}} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-fraunces text-4xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Discover Your Cat&apos;s Breed Today</h2>
          <p className="mb-8 text-lg" style={{color:'var(--text-muted)'}}>Join thousands of cat lovers who have already unlocked their cat&apos;s story</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/#scanner" className="px-8 py-3 rounded-full font-semibold text-white glow-orange" style={{background:'var(--btn-primary)'}}>Scan Free — No Signup →</Link>
            <Link href="/pricing" className="px-8 py-3 rounded-full font-semibold" style={{border:'1px solid var(--border)', color:'var(--text-muted)'}}>View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
