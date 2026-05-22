const HIRING_RESULTS = [
  {
    id: 1,
    company: 'BrightEdge Labs',
    role: 'Frontend Intern',
    status: 'Selected',
    note: 'Congratulations! Offer letter shared by email.',
  },
  {
    id: 2,
    company: 'Nexa Foods',
    role: 'Content Assistant',
    status: 'Waitlisted',
    note: 'You are waitlisted. Final update expected this week.',
  },
]

export default function HiringResult() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {HIRING_RESULTS.map(result => (
        <div key={result.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)' }}>{result.role}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>🏢 {result.company}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: result.status === 'Selected' ? '#D1FAE5' : '#EFF6FF', color: result.status === 'Selected' ? '#065F46' : '#1D4ED8' }}>
              {result.status}
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--dark)' }}>{result.note}</div>
        </div>
      ))}
    </div>
  )
}
