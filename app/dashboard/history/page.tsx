'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, Trash2 } from 'lucide-react'

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

export default function HistoryPage() {
  const [scans, setScans] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const PER_PAGE = 20

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadScans(session.user.id)
    })
  }, [])

  async function loadScans(userId: string) {
    const { data } = await supabase.from('scans').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (data) setScans(data)
  }

  async function deleteScan(id: string) {
    await supabase.from('scans').delete().eq('id', id)
    setScans(prev => prev.filter(s => s.id !== id))
  }

  function exportCSV() {
    const rows = [['Date', 'Breed', 'Full Breed', 'Rarity', 'Confidence']]
    filtered.forEach(s => rows.push([
      new Date(s.created_at).toLocaleDateString(),
      s.result?.breedName || '',
      s.result?.fullBreedName || '',
      s.result?.rarity || '',
      s.result?.confidence || '',
    ]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'catscanner-history.csv'
    a.click()
  }

  const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Very Rare']
  const filtered = scans.filter(s => {
    const matchSearch = !search || s.result?.breedName?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || s.result?.rarity === filter
    return matchSearch && matchFilter
  })
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-fraunces text-3xl font-bold" style={{color:'var(--text-primary)'}}>Scan History</h1>
        <button onClick={exportCSV} className="text-sm px-4 py-2 rounded-full font-semibold" style={{border:'1px solid var(--border)', color:'var(--text-muted)'}}>
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:'var(--text-faint)'}} />
        <input
          type="text" placeholder="Search by breed name..." value={search} onChange={e=>setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{background:'var(--bg-card)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {rarities.map(r => (
          <button
            key={r}
            onClick={() => {setFilter(r); setPage(1)}}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: filter === r ? 'var(--accent)' : 'var(--bg-card)',
              color: filter === r ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${filter === r ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        {paginated.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🐱</div>
            <p style={{color:'var(--text-muted)'}}>No scans found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{borderBottom:'1px solid var(--border)'}}>
                {['Date', 'Breed', 'Rarity', 'Confidence', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-faint)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((scan: any) => (
                <tr key={scan.id} style={{borderBottom:'1px solid var(--border)'}}>
                  <td className="px-4 py-3 whitespace-nowrap" style={{color:'var(--text-faint)'}}>
                    {new Date(scan.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium" style={{color:'var(--text-primary)'}}>{scan.result?.breedName || '—'}</p>
                    <p className="text-xs" style={{color:'var(--text-faint)'}}>{scan.result?.fullBreedName}</p>
                  </td>
                  <td className="px-4 py-3"><RarityBadge rarity={scan.result?.rarity || 'Common'} /></td>
                  <td className="px-4 py-3" style={{color:'var(--text-muted)'}}>{scan.result?.confidence || '—'}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteScan(scan.id)} className="p-1.5 rounded-lg transition-colors" style={{color:'var(--text-faint)'}}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({length:totalPages}, (_,i) => i+1).map(p => (
            <button
              key={p} onClick={() => setPage(p)}
              className="w-8 h-8 rounded-full text-sm font-medium transition-all"
              style={{background: p===page ? 'var(--accent)' : 'var(--bg-card)', color: p===page ? '#fff' : 'var(--text-muted)', border:'1px solid var(--border)'}}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
