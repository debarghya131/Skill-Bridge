import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ACTION_WARNING = 'AI can detect cheating. Copy-paste, no typing, very fast typing, tab switching, idle-then-submit, same answers, multiple logins, rapid submissions, DevTools, and camera signals can reduce your TrustScore.'

const OPPORTUNITIES = [
  {
    id: 1,
    title: 'Frontend Internship',
    company: 'CodeNest Solutions',
    companyInitial: 'C',
    companyColor: '#6366F1',
    location: 'Remote',
    stipend: '₹10,000 / month',
    deadline: 'Apr 25, 2026',
    sentOn: '2 hours ago',
    message: 'Hi! We reviewed your React and UI/UX Design profile on SkillBridge and were impressed by your verified skill levels. We would love to have you join our frontend team for a 3-month internship.',
    matchedSkills: ['React', 'UI/UX Design'],
    duration: '3 months',
    type: 'Internship',
  },
  {
    id: 2,
    title: 'Social Media Content Role',
    company: 'Urban Threads',
    companyInitial: 'U',
    companyColor: '#EC4899',
    location: 'Kolkata',
    stipend: '₹6,000 / month',
    deadline: 'Apr 28, 2026',
    sentOn: '1 day ago',
    message: 'We came across your Content Marketing profile and think you would be a great fit for managing our Instagram and Facebook presence. We are a growing fashion brand looking for fresh creative talent.',
    matchedSkills: ['Content Marketing', 'SEO'],
    duration: '2 months',
    type: 'Part-Time GIG',
  },
  {
    id: 3,
    title: 'Data Analysis Project',
    company: 'Insight Labs',
    companyInitial: 'I',
    companyColor: '#0891B2',
    location: 'Bengaluru',
    stipend: '₹12,000 / month',
    deadline: 'Apr 30, 2026',
    sentOn: '3 days ago',
    message: 'Your SQL and Power BI skills caught our attention. We have a 2-month data analysis project involving sales dashboards and customer segmentation. Your TrustScore and verified badges make you a strong candidate.',
    matchedSkills: ['SQL', 'Power BI'],
    duration: '2 months',
    type: 'Project GIG',
  },
]

const TYPE_META = {
  'Internship':    { bg: '#EFF6FF', color: '#1D4ED8' },
  'Part-Time GIG': { bg: '#F3E8FF', color: '#7C3AED' },
  'Project GIG':   { bg: '#D1FAE5', color: '#065F46' },
}

export default function Opportunity({ onAcceptOpportunity }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(null)
  const [accepted, setAccepted] = useState([])
  const [declined, setDeclined] = useState([])

  const toggle = (id) => setExpanded(e => e === id ? null : id)

  return (
    <div>
      {/* Header banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B, #312E81)',
        borderRadius: 14, padding: '16px 22px', marginBottom: 18,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ fontSize: 28 }}>📬</div>
        <div>
          <div style={{ color: 'white', fontWeight: 800, fontSize: 15, marginBottom: 2 }}>Direct Invites from Companies</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
            These companies personally reviewed your SkillBridge profile and chose to reach out to you.
          </div>
        </div>
        <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.12)', borderRadius: 100, padding: '5px 14px', color: 'white', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>
          {OPPORTUNITIES.length - declined.length} New
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {OPPORTUNITIES.filter(o => !declined.includes(o.id)).map(item => {
          const isExpanded = expanded === item.id
          const isAccepted = accepted.includes(item.id)
          const typeMeta = TYPE_META[item.type] || { bg: 'var(--bg)', color: 'var(--muted)' }

          return (
            <div key={item.id} style={{
              background: 'var(--white)', borderRadius: 14,
              border: isAccepted ? '1.5px solid #10B981' : '1px solid var(--border)',
              boxShadow: isAccepted ? '0 0 0 3px #D1FAE5' : 'none',
              overflow: 'hidden', transition: 'all 0.2s',
            }}>
              {/* Top row */}
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* Company avatar */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: item.companyColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 900, fontSize: 18,
                }}>
                  {item.companyInitial}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--dark)' }}>{item.title}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, background: typeMeta.bg, color: typeMeta.color, padding: '2px 9px', borderRadius: 100 }}>{item.type}</span>
                    {isAccepted && <span style={{ fontSize: 11, fontWeight: 700, background: '#D1FAE5', color: '#065F46', padding: '2px 9px', borderRadius: 100 }}>✓ Accepted</span>}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
                    🏢 {item.company} · 📍 {item.location} · 🕐 Sent {item.sentOn}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    {item.matchedSkills.map(s => (
                      <span key={s} style={{ fontSize: 11, fontWeight: 700, background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 9px', borderRadius: 100 }}>
                        ✓ {s}
                      </span>
                    ))}
                    <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 4 }}>matched your profile</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)' }}>{item.stipend}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>⏳ Deadline: {item.deadline}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>📅 {item.duration}</div>
                </div>
              </div>

              {/* Expandable message */}
              <div style={{ padding: '0 20px 14px 20px' }}>
                {isExpanded && (
                  <div style={{
                    background: '#F8FAFF', borderRadius: 10, padding: '12px 14px', marginBottom: 12,
                    border: '1px solid var(--border)', fontSize: 13, color: 'var(--dark)', lineHeight: 1.6,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Message from {item.company}
                    </div>
                    "{item.message}"
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  {!isAccepted ? (
                    <>
                      <button
                        onClick={() => {
                          setAccepted(p => [...p, item.id])
                          setExpanded(null)
                          onAcceptOpportunity?.(item)
                          navigate('/student/task', {
                            state: {
                              taskType: 'company-interview',
                              opportunity: item,
                              showIntegrityWarning: true,
                            },
                          })
                        }}
                        className="btn-primary"
                        style={{ padding: '7px 18px', fontSize: 13 }}
                      >
                        Accept for Interview Task
                      </button>
                      <button
                        onClick={() => setDeclined(p => [...p, item.id])}
                        style={{
                          padding: '7px 14px', fontSize: 13, fontWeight: 600,
                          background: 'var(--bg)', color: 'var(--muted)',
                          border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer',
                        }}
                      >
                        Decline
                      </button>
                      <div style={{ width: '100%', fontSize: 11, fontWeight: 700, color: '#B91C1C', lineHeight: 1.5 }}>
                        {ACTION_WARNING}
                      </div>
                    </>
                  ) : (
                    <span style={{ fontSize: 13, color: '#10B981', fontWeight: 700 }}>
                      ✓ You accepted this invite — company will contact you shortly
                    </span>
                  )}
                  <button
                    onClick={() => toggle(item.id)}
                    style={{
                      marginLeft: 'auto', padding: '7px 14px', fontSize: 12, fontWeight: 600,
                      background: 'none', color: 'var(--primary)',
                      border: '1px solid var(--primary)', borderRadius: 8, cursor: 'pointer',
                    }}
                  >
                    {isExpanded ? 'Hide Message ▲' : 'Read Message ▼'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {OPPORTUNITIES.every(o => declined.includes(o.id)) && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', fontSize: 14 }}>
            No pending invites. Check back later for new company outreach.
          </div>
        )}
      </div>
    </div>
  )
}
