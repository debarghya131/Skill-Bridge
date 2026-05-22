const HIRING_ALERTS = [
  {
    id: 1,
    company: 'Orbit Retail',
    role: 'React UI Intern',
    location: 'Kolkata',
    schedule: 'Interview on Monday, 11:00 AM',
    priority: 'High',
  },
  {
    id: 2,
    company: 'Pixel Craft Studio',
    role: 'Design Assistant',
    location: 'Remote',
    schedule: 'Portfolio review by April 22',
    priority: 'Medium',
  },
]

export default function HiringAlert() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {HIRING_ALERTS.map(alert => (
        <div key={alert.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)' }}>{alert.role}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>🏢 {alert.company} · 📍 {alert.location}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: alert.priority === 'High' ? '#FEE2E2' : '#FEF3C7', color: alert.priority === 'High' ? '#991B1B' : '#92400E' }}>
              {alert.priority}
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--dark)', marginBottom: 10 }}>🔔 {alert.schedule}</div>
          <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 12 }}>View Details</button>
        </div>
      ))}
    </div>
  )
}
