'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ChevronDown, ChevronUp } from 'lucide-react'

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

export default function JournalPage() {
  const [scans, setScans] = useState<any[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from('scans').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false })
          .then(({ data }) => { if (data) setScans(data) })
      }
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-fraunces text-3xl font-bold" style={{color:'var(--text-primary)'}}>Cat Journal</h1>
        <span className="text-sm" style={{color:'var(--text-faint)'}}>{scans.length} entries</span>
      </div>

      {scans.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📖</div>
          <p style={{color:'var(--text-muted)'}}>Your journal is empty. Start scanning cats to fill it!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scans.map((scan: any) => (
            <div key={scan.id} className="rounded-2xl overflow-hidden card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🐱</span>
                    <div>
                      <p className="font-fraunces font-bold" style={{color:'var(--text-primary)'}}>{scan.result?.breedName || 'Unknown'}</p>
                      <p className="text-xs" style={{color:'var(--text-faint)'}}>{new Date(scan.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <RarityBadge rarity={scan.result?.rarity || 'Common'} />
                </div>

                {/* Personality traits */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {scan.result?.personalityTraits?.slice(0, 3).map((t: string) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs" style={{background:'var(--purple-bg)', color:'var(--purple)'}}>{t}</span>
                  ))}
                </div>

                <button
                  onClick={() => setExpanded(expanded === scan.id ? null : scan.id)}
                  className="flex items-center gap-1 text-xs font-semibold"
                  style={{color:'var(--accent)'}}
                >
                  {expanded === scan.id ? <><ChevronUp size={12}/> Less</> : <><ChevronDown size={12}/> More details</>}
                </button>

                {expanded === scan.id && (
                  <div className="mt-3 pt-3 border-t space-y-2" style={{borderColor:'var(--border)'}}>
                    <p className="text-xs" style={{color:'var(--text-faint)'}}>Origin: <span style={{color:'var(--text-primary)'}}>{scan.result?.origin}</span></p>
                    <p className="text-xs" style={{color:'var(--text-faint)'}}>Lifespan: <span style={{color:'var(--text-primary)'}}>{scan.result?.lifespan}</span></p>
                    <p className="text-xs" style={{color:'var(--text-faint)'}}>Care: <span style={{color:'var(--text-primary)'}}>{scan.result?.careGuide}</span></p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold mb-1" style={{color:'var(--text-faint)'}}>My Notes</p>
                      <textarea
                        value={notes[scan.id] || ''}
                        onChange={e => setNotes(prev => ({ ...prev, [scan.id]: e.target.value }))}
                        placeholder="Add a note about this cat..."
                        rows={2}
                        className="w-full text-xs px-3 py-2 rounded-lg outline-none resize-none"
                        style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
