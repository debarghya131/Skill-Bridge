import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SKILLS_NEEDED = ['React', 'Node.js', 'Python', 'UI/UX Design', 'Content Writing', 'Canva', 'Excel/Sheets', 'Video Editing', 'SEO', 'Social Media', 'Data Analysis', 'WordPress']

const studentProfiles = [
  { name: 'Riya Sharma', college: 'Ranchi University', skills: ['React', 'Node.js', 'UI/UX Design'], score: 87, projects: 4 },
  { name: 'Aman Dubey', college: 'LNCT Bhopal', skills: ['Python', 'Data Analysis', 'Excel/Sheets'], score: 81, projects: 3 },
  { name: 'Priya Singh', college: 'BIT Mesra', skills: ['Canva', 'Social Media', 'Content Writing'], score: 79, projects: 5 },
  { name: 'Rohit Kumar', college: 'NIT Jamshedpur', skills: ['WordPress', 'SEO', 'UI/UX Design'], score: 83, projects: 6 },
]

export default function CompanyOnboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ company: '', location: '', task: '', budget: '', selectedSkills: [] })
  const [showDashboard, setShowDashboard] = useState(false)

  const toggleSkill = (skill) => {
    setForm(f => ({
      ...f,
      selectedSkills: f.selectedSkills.includes(skill)
        ? f.selectedSkills.filter(s => s !== skill)
        : [...f.selectedSkills, skill],
    }))
  }

  if (showDashboard) {
    return <CompanyDashboard form={form} onBack={() => navigate('/')} />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #FFF7ED 0%, #FFFFFF 60%, #F0F9FF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: 540 }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          fontSize: 14, fontWeight: 600, marginBottom: 32,
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}>← Back to Home</button>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 4,
              background: i <= step ? 'var(--accent)' : 'var(--border)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <div style={{
          background: 'var(--white)', borderRadius: 24,
          padding: '40px', boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
        }}>
          {step === 1 && <CompanyStep1 form={form} setForm={setForm} onNext={() => setStep(2)} />}
          {step === 2 && <CompanyStep2 form={form} toggleSkill={toggleSkill} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <CompanyStep3 form={form} onFinish={() => setShowDashboard(true)} onBack={() => setStep(2)} />}
        </div>
      </div>
    </div>
  )
}

function CompanyStep1({ form, setForm, onNext }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 8 }}>
          Step 1 of 3
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Tell us about your business
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>Local businesses of all sizes are welcome.</p>
      </div>

      {[
        { label: 'Company / Business Name', key: 'company', placeholder: 'e.g. Sharma Traders', type: 'text' },
        { label: 'City / Location', key: 'location', placeholder: 'e.g. Ranchi, Jharkhand', type: 'text' },
        { label: 'What do you need done?', key: 'task', placeholder: 'e.g. Build a product catalogue website', type: 'text' },
        { label: 'Budget (approx)', key: 'budget', placeholder: 'e.g. ₹5,000 / month', type: 'text' },
      ].map(field => (
        <div key={field.key} style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
            {field.label}
          </label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.key]}
            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
            style={{
              width: '100%', padding: '12px 16px',
              border: '1.5px solid var(--border)', borderRadius: 10,
              fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      ))}

      <button className="btn-accent" style={{ width: '100%', justifyContent: 'center' }}
        onClick={onNext} disabled={!form.company}>
        Continue →
      </button>
    </div>
  )
}

function CompanyStep2({ form, toggleSkill, onNext, onBack }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 8 }}>
          Step 2 of 3
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Skills you need
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>We will match you with verified students who have these skills.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
        {SKILLS_NEEDED.map(skill => {
          const selected = form.selectedSkills.includes(skill)
          return (
            <button key={skill} onClick={() => toggleSkill(skill)} style={{
              padding: '8px 18px', borderRadius: 100,
              border: `2px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
              background: selected ? 'var(--accent-light)' : 'var(--white)',
              color: selected ? 'var(--accent)' : 'var(--text)',
              fontSize: 14, fontWeight: 600, transition: 'all 0.15s', cursor: 'pointer',
            }}>
              {selected ? '✓ ' : ''}{skill}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
        <button className="btn-accent" onClick={onNext} disabled={form.selectedSkills.length === 0}
          style={{ flex: 2, justifyContent: 'center' }}>
          Find Talent →
        </button>
      </div>
    </div>
  )
}

function CompanyStep3({ form, onFinish, onBack }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 8 }}>
          Step 3 of 3
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Your project is ready!
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>Review and launch your project to find matched talent instantly.</p>
      </div>

      <div style={{
        background: 'var(--bg)', borderRadius: 14, padding: '20px 22px',
        border: '1px solid var(--border)', marginBottom: 24,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Project Summary</div>
        {[
          { label: 'Business', value: form.company || '—' },
          { label: 'Location', value: form.location || '—' },
          { label: 'Task', value: form.task || '—' },
          { label: 'Budget', value: form.budget || '—' },
          { label: 'Skills Needed', value: form.selectedSkills.join(', ') || '—' },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '8px 0', borderBottom: '1px solid var(--border)',
            fontSize: 14,
          }}>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{row.label}</span>
            <span style={{ color: 'var(--text)', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--primary-light)', borderRadius: 12, padding: '14px 18px',
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 20 }}>🤖</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', marginBottom: 2 }}>AI Matching active</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            We found <strong style={{ color: 'var(--primary)' }}>4 verified students</strong> matching your skill requirements.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
        <button className="btn-accent" onClick={onFinish} style={{ flex: 2, justifyContent: 'center' }}>
          View Matched Talent →
        </button>
      </div>
    </div>
  )
}

function CompanyDashboard({ form, onBack }) {
  const filtered = studentProfiles.filter(p =>
    p.skills.some(s => form.selectedSkills.includes(s))
  )
  const display = filtered.length > 0 ? filtered : studentProfiles

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          fontSize: 14, fontWeight: 600, marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}>← Back to Home</button>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
          borderRadius: 20, padding: '32px 36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 28, flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 6 }}>Company Dashboard</div>
            <h1 style={{ color: 'white', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>
              {form.company || 'Your Business'} 🏢
            </h1>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginTop: 6 }}>
              {form.location} · {form.task || 'Project posted'}
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)', borderRadius: 14, padding: '16px 24px', textAlign: 'center',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginBottom: 4 }}>Matched Students</div>
            <div style={{ color: 'white', fontSize: 40, fontWeight: 900, lineHeight: 1 }}>{display.length}</div>
          </div>
        </div>

        {/* Talent cards */}
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 16 }}>
          Top Talent Matches
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {display.map((p, i) => (
            <div key={p.name} style={{
              background: 'var(--white)', borderRadius: 16,
              padding: '22px 26px', border: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: 14,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `hsl(${(i * 60) + 220}, 70%, 55%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: 18, flexShrink: 0,
                }}>{p.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--dark)', marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{p.college} · {p.projects} projects completed</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.skills.map(s => (
                      <span key={s} style={{
                        background: form.selectedSkills.includes(s) ? 'var(--accent-light)' : 'var(--bg)',
                        color: form.selectedSkills.includes(s) ? 'var(--accent)' : 'var(--muted)',
                        padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                      }}>
                        {form.selectedSkills.includes(s) ? '✓ ' : ''}{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)' }}>{p.score}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>TrustScore™</div>
                </div>
                <button className="btn-accent" style={{ padding: '9px 20px', fontSize: 14 }}>
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
