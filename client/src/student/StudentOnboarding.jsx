import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SKILLS = ['React', 'Node.js', 'Python', 'UI/UX Design', 'Content Writing', 'Canva', 'Excel/Sheets', 'Video Editing', 'SEO', 'Social Media', 'Data Analysis', 'WordPress']

const opportunities = [
  { company: 'Gupta Electronics', location: 'Jamshedpur', task: 'React Dashboard', budget: '₹8,000/mo', match: 97, tags: ['React', 'UI/UX Design'] },
  { company: 'Meera Boutique', location: 'Patna', task: 'Instagram Content', budget: '₹4,500/mo', match: 94, tags: ['Canva', 'Social Media'] },
  { company: 'Sharma Traders', location: 'Ranchi', task: 'Excel Inventory System', budget: '₹3,000/project', match: 89, tags: ['Excel/Sheets', 'Data Analysis'] },
  { company: 'TechPrint Solutions', location: 'Dhanbad', task: 'WordPress Site Revamp', budget: '₹6,000/project', match: 85, tags: ['WordPress', 'UI/UX Design'] },
]

export default function StudentOnboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', college: '', year: '', selectedSkills: [] })
  const [showDashboard, setShowDashboard] = useState(false)
  const [trustScore] = useState(Math.floor(Math.random() * 20) + 72)

  const toggleSkill = (skill) => {
    setForm(f => ({
      ...f,
      selectedSkills: f.selectedSkills.includes(skill)
        ? f.selectedSkills.filter(s => s !== skill)
        : [...f.selectedSkills, skill],
    }))
  }

  if (showDashboard) {
    return <StudentDashboard name={form.name} skills={form.selectedSkills} trustScore={trustScore} onBack={() => navigate('/')} />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #F0F4FF 0%, #FFFFFF 60%, #F0FDF4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        {/* Back */}
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
              background: i <= step ? 'var(--primary)' : 'var(--border)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--white)', borderRadius: 24,
          padding: '40px', boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
        }}>
          {step === 1 && (
            <Step1 form={form} setForm={setForm} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <Step2 form={form} toggleSkill={toggleSkill} onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <Step3 form={form} trustScore={trustScore} onFinish={() => setShowDashboard(true)} onBack={() => setStep(2)} />
          )}
        </div>
      </div>
    </div>
  )
}

function Step1({ form, setForm, onNext }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div className="section-label" style={{ marginBottom: 8 }}>Step 1 of 3</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Tell us about yourself
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>No college rank needed. Just who you are.</p>
      </div>

      {[
        { label: 'Full Name', key: 'name', placeholder: 'Your name', type: 'text' },
        { label: 'College / University', key: 'college', placeholder: 'e.g. XYZ Engineering College', type: 'text' },
        { label: 'Year of Study', key: 'year', placeholder: 'e.g. 2nd Year B.Tech', type: 'text' },
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
              fontSize: 15, outline: 'none',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      ))}

      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
        onClick={onNext} disabled={!form.name}>
        Continue →
      </button>
    </div>
  )
}

function Step2({ form, toggleSkill, onNext, onBack }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div className="section-label" style={{ marginBottom: 8 }}>Step 2 of 3</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          What can you do?
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>Pick your skills. We will find the right match.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
        {SKILLS.map(skill => {
          const selected = form.selectedSkills.includes(skill)
          return (
            <button key={skill} onClick={() => toggleSkill(skill)} style={{
              padding: '8px 18px', borderRadius: 100,
              border: `2px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
              background: selected ? 'var(--primary-light)' : 'var(--white)',
              color: selected ? 'var(--primary)' : 'var(--text)',
              fontSize: 14, fontWeight: 600,
              transition: 'all 0.15s',
            }}>
              {selected ? '✓ ' : ''}{skill}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
        <button className="btn-primary" onClick={onNext} disabled={form.selectedSkills.length === 0}
          style={{ flex: 2, justifyContent: 'center' }}>
          Continue →
        </button>
      </div>
    </div>
  )
}

function Step3({ form, trustScore, onFinish, onBack }) {
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  const runChallenge = () => {
    setRunning(true)
    setTimeout(() => { setRunning(false); setDone(true) }, 2200)
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div className="section-label" style={{ marginBottom: 8 }}>Step 3 of 3</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Your TrustScore™
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>
          Run a quick SkillProof challenge to earn verified badges and boost your score.
        </p>
      </div>

      {/* Score display */}
      <div style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, #1E1B4B 100%)',
        borderRadius: 16, padding: '28px',
        textAlign: 'center', marginBottom: 24,
      }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {form.name ? `${form.name}'s` : 'Your'} Initial Score
        </div>
        <div style={{
          fontSize: 72, fontWeight: 900, lineHeight: 1,
          background: 'linear-gradient(135deg, #A5B4FC, #60A5FA)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 8,
        }}>{trustScore}</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          out of 100 · <span style={{ color: '#10B981' }}>Based on {form.selectedSkills.length} skills listed</span>
        </div>
        {done && (
          <div style={{
            marginTop: 16,
            background: 'rgba(16,185,129,0.15)', color: '#34D399',
            padding: '8px 16px', borderRadius: 8,
            fontSize: 13, fontWeight: 600,
          }}>
            ✓ SkillProof completed! Score boosted by +5
          </div>
        )}
      </div>

      {/* Challenge button */}
      {!done ? (
        <button onClick={runChallenge} disabled={running} style={{
          width: '100%', padding: '14px',
          background: running ? 'var(--border)' : 'linear-gradient(135deg, var(--accent), #EA6C00)',
          color: running ? 'var(--muted)' : 'white',
          border: 'none', borderRadius: 10,
          fontSize: 15, fontWeight: 700,
          marginBottom: 14, transition: 'all 0.2s', cursor: running ? 'not-allowed' : 'pointer',
        }}>
          {running ? '⏳ Running SkillProof Challenge...' : '⚡ Take SkillProof Challenge (10 min)'}
        </button>
      ) : null}

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
        <button className="btn-primary" onClick={onFinish} style={{ flex: 2, justifyContent: 'center' }}>
          View My Dashboard →
        </button>
      </div>
    </div>
  )
}

function StudentDashboard({ name, skills, trustScore, onBack }) {
  const filteredOpps = opportunities.filter(o =>
    o.tags.some(t => skills.includes(t))
  ).slice(0, 3)

  const displayOpps = filteredOpps.length > 0 ? filteredOpps : opportunities.slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          fontSize: 14, fontWeight: 600, marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}>← Back to Home</button>

        {/* Welcome bar */}
        <div style={{
          background: 'linear-gradient(135deg, var(--dark) 0%, #1E1B4B 100%)',
          borderRadius: 20, padding: '32px 36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 28,
          flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 6 }}>Welcome back,</div>
            <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
              {name || 'Student'} 👋
            </h1>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 6 }}>
              {skills.length} skills verified · Profile 80% complete
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>TrustScore™</div>
            <div style={{
              fontSize: 56, fontWeight: 900,
              background: 'linear-gradient(135deg, #A5B4FC, #60A5FA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}>{trustScore}</div>
          </div>
        </div>

        {/* Skills */}
        <div style={{
          background: 'var(--white)', borderRadius: 16,
          padding: '24px 28px', border: '1px solid var(--border)',
          marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark)', marginBottom: 14 }}>Your Verified Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map(s => (
              <span key={s} style={{
                background: 'var(--primary-light)', color: 'var(--primary)',
                padding: '6px 14px', borderRadius: 100,
                fontSize: 13, fontWeight: 600,
              }}>✓ {s}</span>
            ))}
            {skills.length === 0 && <span style={{ color: 'var(--muted)', fontSize: 14 }}>No skills selected yet</span>}
          </div>
        </div>

        {/* Matched opportunities */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 16 }}>
            Matched Opportunities <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>({displayOpps.length} found)</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {displayOpps.map(opp => (
              <div key={opp.company} style={{
                background: 'var(--white)', borderRadius: 14,
                padding: '20px 24px', border: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: 14,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--dark)', marginBottom: 4 }}>{opp.company}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>📍 {opp.location} · {opp.task}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {opp.tags.map(t => (
                      <span key={t} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)' }}>{opp.budget}</div>
                    <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>
                      {opp.match}% match
                    </div>
                  </div>
                  <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 14 }}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
