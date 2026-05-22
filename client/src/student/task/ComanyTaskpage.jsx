import { useState } from 'react'

const TASK_STAGES = [
  { key: 'brief', label: 'Brief', icon: '📋' },
  { key: 'submission', label: 'Submission', icon: '📤' },
  { key: 'feedback', label: 'Feedback', icon: '💬' },
]

export default function CompanyTaskpage({ opportunity }) {
  const [stage, setStage] = useState('brief')
  const [submissionLink, setSubmissionLink] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [note, setNote] = useState('')

  if (!opportunity) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', gap: 14 }}>
        <div style={{ fontSize: 40 }}>📋</div>
        <div style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 500 }}>No task assigned yet. Accept an invite from Opportunity tab.</div>
      </div>
    )
  }

  const tasks = [
    { id: 1, title: `Build a sample ${opportunity.matchedSkills[0]} project`, desc: `Create a small demo project showcasing your ${opportunity.matchedSkills[0]} skills. It should be functional, well-structured, and hosted on GitHub.`, points: 40, required: true },
    { id: 2, title: 'Submit a short intro video (60–90 sec)', desc: 'Record a 60–90 second video introducing yourself, your background, and why you are a good fit for this role.', points: 30, required: true },
    { id: 3, title: `Write a brief on your ${opportunity.matchedSkills[1] || opportunity.matchedSkills[0]} experience`, desc: 'Write 150–200 words about a real project or situation where you applied this skill.', points: 20, required: false },
    { id: 4, title: 'Share portfolio or relevant links', desc: 'Provide links to your GitHub, portfolio, or any relevant work that demonstrates your abilities.', points: 10, required: false },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B, #312E81)',
        borderRadius: 14, padding: '20px 24px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      }}>
        <div style={{
          width: 50, height: 50, borderRadius: 12, flexShrink: 0,
          background: opportunity.companyColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 900, fontSize: 20,
        }}>
          {opportunity.companyInitial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>{opportunity.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 2 }}>
            🏢 {opportunity.company} · 📍 {opportunity.location} · {opportunity.stipend}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 100, padding: '5px 16px', color: 'white', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>
          🗓 Deadline: {opportunity.deadline}
        </div>
      </div>

      {/* Stage tabs */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--white)', borderRadius: 10, padding: 5, border: '1px solid var(--border)', marginBottom: 20, width: 'fit-content' }}>
        {TASK_STAGES.map(s => (
          <button key={s.key} onClick={() => setStage(s.key)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 18px', borderRadius: 7, border: 'none',
            background: stage === s.key ? 'var(--primary)' : 'transparent',
            color: stage === s.key ? 'white' : 'var(--muted)',
            fontWeight: stage === s.key ? 700 : 500,
            fontSize: 13, cursor: 'pointer',
          }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Brief tab */}
      {stage === 'brief' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{
            background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12,
            padding: '14px 18px', fontSize: 13, color: '#166534',
          }}>
            <strong>🎉 You accepted this invite!</strong> Complete the tasks below and submit your work. {opportunity.company} will review and get back to you within 5–7 days.
          </div>

          {tasks.map(task => (
            <div key={task.id} style={{
              background: 'var(--white)', borderRadius: 12, padding: '18px 20px',
              border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--primary-light)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 13, marginTop: 1,
                  }}>{task.id}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--dark)', marginBottom: 4 }}>
                      {task.title}
                      {task.required && <span style={{ marginLeft: 8, fontSize: 11, background: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>Required</span>}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{task.desc}</div>
                  </div>
                </div>
                <div style={{ flexShrink: 0, background: '#EFF6FF', color: '#1D4ED8', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, marginLeft: 12 }}>
                  +{task.points} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission tab */}
      {stage === 'submission' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {submitted ? (
            <div style={{
              background: '#F0FDF4', border: '1.5px solid #10B981', borderRadius: 14,
              padding: '32px 24px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#065F46', marginBottom: 6 }}>Submission Received!</div>
              <div style={{ fontSize: 13, color: '#166534', marginBottom: 16 }}>
                {opportunity.company} has been notified. Expect a response within 5–7 business days.
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', background: 'white', borderRadius: 8, padding: '8px 14px', display: 'inline-block', border: '1px solid var(--border)' }}>
                🔗 {submissionLink}
              </div>
            </div>
          ) : (
            <>
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: '20px 22px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 14 }}>Submit Your Work</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>GitHub / Drive / Portfolio Link *</label>
                    <input
                      placeholder="https://github.com/yourname/project"
                      value={submissionLink}
                      onChange={e => setSubmissionLink(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Additional Note (optional)</label>
                    <textarea
                      placeholder="Any context or notes for the company..."
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <button
                    onClick={() => { if (submissionLink.trim()) setSubmitted(true) }}
                    className="btn-primary"
                    style={{ padding: '10px 24px', fontSize: 14, alignSelf: 'flex-start', opacity: submissionLink.trim() ? 1 : 0.5 }}
                  >
                    Submit Work →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Feedback tab */}
      {stage === 'feedback' && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          height: '40vh', gap: 14, color: 'var(--muted)',
        }}>
          <div style={{ fontSize: 40 }}>💬</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark)' }}>Waiting for company feedback</div>
          <div style={{ fontSize: 13 }}>Once {opportunity.company} reviews your submission, feedback will appear here.</div>
        </div>
      )}
    </div>
  )
}
