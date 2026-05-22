import { useState } from 'react'
import Opportunity from './Opportunity'

const BROWSE_GIGS = [
  { id: 1, company: 'Gupta Electronics', location: 'Jamshedpur', workMode: 'On-site', title: 'React Dashboard', budget: '₹8,000/mo', match: 97, tags: ['React', 'UI/UX Design'], posted: '2 days ago' },
  { id: 2, company: 'Meera Boutique', location: 'Patna', workMode: 'Hybrid', title: 'Instagram Content', budget: '₹4,500/mo', match: 94, tags: ['Canva', 'Social Media'], posted: '3 days ago' },
  { id: 3, company: 'Sharma Traders', location: 'Ranchi', workMode: 'On-site', title: 'Excel Inventory System', budget: '₹3,000/project', match: 89, tags: ['Excel/Sheets', 'Data Analysis'], posted: '1 day ago' },
  { id: 4, company: 'TechPrint Solutions', location: 'Dhanbad', workMode: 'Remote', title: 'WordPress Site Revamp', budget: '₹6,000/project', match: 85, tags: ['WordPress', 'UI/UX Design'], posted: '5 days ago' },
  { id: 5, company: 'Arora Sweets', location: 'Lucknow', workMode: 'On-site', title: 'Menu Design & Branding', budget: '₹2,500/project', match: 78, tags: ['Canva', 'UI/UX Design'], posted: '1 day ago' },
  { id: 6, company: 'Nexus IT Hub', location: 'Bhopal', workMode: 'Remote', title: 'Python Data Pipeline', budget: '₹9,000/mo', match: 91, tags: ['Python', 'Data Analysis'], posted: '4 hours ago' },
]

const GIG_SUBNAV = [
  { key: 'opportunity', label: 'Opportunity', icon: '🎯' },
  { key: 'browse', label: 'Browse GIGs', icon: '🔍' },
  { key: 'applied', label: 'Applied GIGs', icon: '📤' },
  { key: 'active', label: 'Active GIG', icon: '⚡' },
  { key: 'completed', label: 'Completed GIGs', icon: '✅' },
  { key: 'saved', label: 'Saved GIGs', icon: '🔖' },
]

export default function GigCenter() {
  const [sub, setSub] = useState('opportunity')
  const [saved, setSaved] = useState([1, 4, 6])
  const [applied, setApplied] = useState([2, 6])

  const toggleSave = (id) => setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const applyGig = (id) => setApplied(p => p.includes(id) ? p : [...p, id])

  const savedGigs = BROWSE_GIGS.filter(g => saved.includes(g.id))
  const appliedGigs = BROWSE_GIGS.filter(g => applied.includes(g.id))
  const activeGigs = [
    {
      id: 201,
      company: 'PixelForge Studio',
      location: 'Bengaluru',
      workMode: 'Remote',
      title: 'Landing Page UI Revamp',
      budget: '₹7,500/project',
      tags: ['UI/UX Design', 'React'],
      posted: 'Started 2 days ago',
      progress: 'Milestone 2 of 4',
    },
    ...appliedGigs.slice(0, 1),
  ]
  const completedGigs = [
    { id: 99, company: 'Bajaj Kirana Store', location: 'Patna', workMode: 'On-site', title: 'Billing Sheet Setup', budget: '₹1,500/project', tags: ['Excel/Sheets'], completedOn: 'Mar 2025' },
    { id: 100, company: 'BrightLeaf Media', location: 'Delhi', workMode: 'Hybrid', title: 'Instagram Reel Pack', budget: '₹3,200/project', tags: ['Canva', 'Content Marketing'], completedOn: 'Feb 2025' },
    { id: 101, company: 'CodeTrail Labs', location: 'Remote', workMode: 'Remote', title: 'Portfolio Website Fixes', budget: '₹5,000/project', tags: ['React', 'UI/UX Design'], completedOn: 'Jan 2025' },
  ]

  const GigCard = ({ gig, showApply = false, showSave = false, status }) => (
    <div style={{
      background: 'var(--white)', borderRadius: 12, padding: '18px 22px',
      border: '1px solid var(--border)', transition: 'all 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)', marginBottom: 3 }}>{gig.title}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            🏢 {gig.company} · 📍 {gig.location}
            {gig.workMode ? ` · ${gig.workMode}` : ''}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--dark)' }}>{gig.budget}</div>
          {gig.match && <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>{gig.match}% match</div>}
          {gig.progress && <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700 }}>{gig.progress}</div>}
          {gig.completedOn && <div style={{ fontSize: 11, color: 'var(--muted)' }}>Done {gig.completedOn}</div>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {gig.tags.map(t => (
          <span key={t} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{t}</span>
        ))}
        {gig.posted && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)', alignSelf: 'center' }}>🕐 {gig.posted}</span>}
      </div>
      {status && (
        <div style={{ marginBottom: 10 }}>
          <span style={{
            padding: '3px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700,
            background: status === 'active' ? '#D1FAE5' : status === 'applied' ? '#EFF6FF' : '#FEF9C3',
            color: status === 'active' ? '#065F46' : status === 'applied' ? '#1D4ED8' : '#854D0E',
          }}>
            {status === 'active' ? '⚡ In Progress' : status === 'applied' ? '📤 Applied' : status}
          </span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        {showApply && (
          <button onClick={() => applyGig(gig.id)} className="btn-primary" style={{ padding: '7px 18px', fontSize: 13 }}
            disabled={applied.includes(gig.id)}>
            {applied.includes(gig.id) ? '✓ Applied' : 'Apply Now'}
          </button>
        )}
        {showSave && (
          <button onClick={() => toggleSave(gig.id)} style={{
            padding: '7px 14px', borderRadius: 7, border: '1.5px solid var(--border)',
            background: saved.includes(gig.id) ? 'var(--primary-light)' : 'var(--white)',
            color: saved.includes(gig.id) ? 'var(--primary)' : 'var(--muted)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            {saved.includes(gig.id) ? '🔖 Saved' : '🔖 Save'}
          </button>
        )}
      </div>
    </div>
  )

  const EmptyState = ({ icon, msg }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh', gap: 12 }}>
      <div style={{ fontSize: 40 }}>{icon}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>{msg}</div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, background: 'var(--white)', borderRadius: 12, padding: 6, border: '1px solid var(--border)', marginBottom: 24, flexWrap: 'wrap' }}>
        {GIG_SUBNAV.map(item => (
          <button key={item.key} onClick={() => setSub(item.key)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8, border: 'none',
            background: sub === item.key ? 'var(--primary)' : 'transparent',
            color: sub === item.key ? 'white' : 'var(--muted)',
            fontWeight: sub === item.key ? 700 : 500,
            fontSize: 13, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { if (sub !== item.key) e.currentTarget.style.background = 'var(--bg)' }}
          onMouseLeave={e => { if (sub !== item.key) e.currentTarget.style.background = 'transparent' }}>
            {item.icon} {item.label}
            {item.key === 'applied' && appliedGigs.length > 0 && (
              <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 100, padding: '0 6px', fontSize: 11, fontWeight: 800 }}>{appliedGigs.length}</span>
            )}
            {item.key === 'saved' && savedGigs.length > 0 && (
              <span style={{ background: sub === 'saved' ? 'rgba(255,255,255,0.3)' : 'var(--primary-light)', color: sub === 'saved' ? 'white' : 'var(--primary)', borderRadius: 100, padding: '0 6px', fontSize: 11, fontWeight: 800 }}>{savedGigs.length}</span>
            )}
          </button>
        ))}
      </div>

      {sub === 'browse' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>{BROWSE_GIGS.length} GIGs available for you</div>
          {BROWSE_GIGS.map(g => <GigCard key={g.id} gig={g} showApply showSave />)}
        </div>
      )}

      {sub === 'applied' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {appliedGigs.length > 0
            ? appliedGigs.map(g => <GigCard key={g.id} gig={g} status="applied" />)
            : <EmptyState icon="📤" msg="You haven't applied to any GIGs yet. Browse and apply!" />}
        </div>
      )}

      {sub === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeGigs.length > 0
            ? activeGigs.map(g => <GigCard key={g.id} gig={g} status="active" />)
            : <EmptyState icon="⚡" msg="No active GIGs right now. Apply to get started!" />}
        </div>
      )}

      {sub === 'completed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {completedGigs.map(g => <GigCard key={g.id} gig={g} />)}
        </div>
      )}

      {sub === 'saved' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {savedGigs.length > 0
            ? savedGigs.map(g => <GigCard key={g.id} gig={g} showApply showSave />)
            : <EmptyState icon="🔖" msg="No saved GIGs yet. Save GIGs from Browse to find them here!" />}
        </div>
      )}

      {sub === 'opportunity' && (
        <Opportunity />
      )}
    </div>
  )
}
