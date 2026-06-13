'use client'
import { ADMIN as C } from '@/lib/admin-theme'
import {
  Users, Calendar, Clock, TrendingUp, Activity, Eye, Layers,
  RefreshCw, ChevronDown, BarChart3, FileText, Globe,
} from 'lucide-react'

// ── Placeholder data (visual only — connect Google Analytics for live numbers) ──
const STATS_1 = [
  { label: 'Users (30d)', value: '903', icon: Users },
  { label: 'Users (7d)', value: '359', icon: Calendar },
  { label: 'Today', value: '63', icon: Clock },
  { label: 'New Users (30d)', value: '896', icon: TrendingUp },
]
const STATS_2 = [
  { label: 'Sessions (30d)', value: '1,173', icon: Activity },
  { label: 'Page Views (30d)', value: '2,046', icon: Eye },
  { label: 'Total Active Users', value: '903', icon: Layers },
]
const BARS = [38, 32, 40, 44, 48, 36, 30, 33, 28, 30, 46, 40, 55, 30, 28, 60, 58, 64, 72, 70, 62, 66, 74, 68, 56, 78, 82, 76, 80, 88, 100]
const PAGES = [
  { title: 'Cat Scanner - Free Cat Breed Identifier By Pictures Online', path: '/', views: 412 },
  { title: 'Top 10 Most Popular Cat Breeds in the World', path: '/most-popular-cat-breeds-in-the-world', views: 146 },
  { title: 'How to Use Cat Breed Scanner', path: '/how-to-use-cat-breed-scanner', views: 98 },
  { title: 'How to Identify Mixed Breed Cat with Pictures', path: '/how-to-identify-mixed-breed-cat', views: 76 },
  { title: 'How Can I Tell What Breed My Kitten Is', path: '/how-can-i-tell-what-breed-my-kitten-is', views: 61 },
  { title: 'How to Identify Kitten Breed By Pictures', path: '/how-to-identify-kitten-breed', views: 47 },
  { title: 'Pricing', path: '/pricing', views: 33 },
]
const COUNTRIES = [
  { name: 'United States', users: 506 },
  { name: 'Singapore', users: 101 },
  { name: 'Australia', users: 59 },
  { name: 'United Kingdom', users: 48 },
  { name: 'Canada', users: 37 },
  { name: 'India', users: 29 },
  { name: 'Germany', users: 21 },
]
const MAX_COUNTRY = Math.max(...COUNTRIES.map((c) => c.users))

function StatCard({ label, value, Icon }: { label: string; value: string; Icon: any }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium" style={{ color: C.muted }}>{label}</span>
        <Icon size={18} style={{ color: C.accent }} />
      </div>
      <p className="text-3xl font-bold" style={{ color: C.text }}>{value}</p>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: C.text }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: C.muted }}>Real-time data from Google Analytics &amp; Search Console</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted }}>
            <RefreshCw size={15} /> Clear Cache
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
            <Calendar size={15} /> Last 30 Days <ChevronDown size={15} />
          </button>
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: C.accent }}>
            <span className="w-2 h-2 rounded-full" style={{ background: C.accent }} /> GA4 Connected
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: C.accent }}>
            <span className="w-2 h-2 rounded-full" style={{ background: C.accent }} /> Search Console
          </span>
        </div>
      </div>

      {/* Sample-data notice */}
      <div className="rounded-xl px-4 py-2.5 text-sm flex items-center gap-2" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>
        <span>⚠️</span> Showing sample data. Connect Google Analytics to display your live numbers here.
      </div>

      {/* Stat cards — row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_1.map((s) => <StatCard key={s.label} label={s.label} value={s.value} Icon={s.icon} />)}
      </div>

      {/* Stat cards — row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS_2.map((s) => <StatCard key={s.label} label={s.label} value={s.value} Icon={s.icon} />)}
      </div>

      {/* Chart */}
      <div className="rounded-2xl p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: C.text }}>
            <BarChart3 size={18} style={{ color: C.accent }} /> Daily Active Users — Last 30 Days
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}>
              Daily Active Users <ChevronDown size={13} />
            </button>
            <span className="text-xs hidden sm:inline" style={{ color: C.faint }}>from Google Analytics</span>
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-52">
          {BARS.map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `linear-gradient(to top, ${C.accent}, #34d399)`, opacity: 0.55 + (h / 100) * 0.45 }} />
          ))}
        </div>
        <div className="flex justify-between mt-3 text-xs" style={{ color: C.faint }}>
          <span>May 13</span>
          <span>Jun 12</span>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="rounded-2xl p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: C.text }}>
              <FileText size={17} style={{ color: C.accent }} /> Top 25 Pages
            </h2>
            <span className="text-xs" style={{ color: C.faint }}>by pageviews</span>
          </div>
          <div className="space-y-1">
            {PAGES.map((p, i) => (
              <div key={p.path} className="flex items-center gap-3 py-2.5" style={{ borderBottom: i < PAGES.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <span className="text-sm font-bold w-6 shrink-0" style={{ color: C.accent }}>#{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate" style={{ color: C.text }}>{p.title}</p>
                  <p className="text-xs truncate" style={{ color: C.faint }}>{p.path}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold shrink-0" style={{ color: C.muted }}>
                  <Eye size={13} /> {p.views}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="rounded-2xl p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: C.text }}>
              <Globe size={17} style={{ color: C.accent }} /> Top 25 Countries
            </h2>
            <span className="text-xs" style={{ color: C.faint }}>by active users</span>
          </div>
          <div className="space-y-3">
            {COUNTRIES.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-sm font-bold w-6 shrink-0" style={{ color: C.accent }}>#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: C.text }}>{c.name}</span>
                    <span className="text-sm font-semibold" style={{ color: C.muted }}>{c.users}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: C.bg }}>
                    <div className="h-full rounded-full" style={{ width: `${(c.users / MAX_COUNTRY) * 100}%`, background: C.accent }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
