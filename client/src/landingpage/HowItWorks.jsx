import { useNavigate } from 'react-router-dom'

const studentSteps = [
  {
    step: '01',
    title: 'Create your student profile',
    desc: 'Sign up, build your profile, add links, projects, intro video, and start with the same seeded dashboard experience used across the platform.',
    icon: '👤',
  },
  {
    step: '02',
    title: 'Verify skills and build TrustScore',
    desc: 'Use Skill Hub, retention tasks, and daily challenges to keep skills verified, improve TrustScore, and stay visible for real opportunities.',
    icon: '🏆',
  },
  {
    step: '03',
    title: 'Explore gigs and company invites',
    desc: 'Browse GIGs, receive direct company opportunities, accept interview tasks, and move through applied, active, completed, and saved flows.',
    icon: '💼',
  },
  {
    step: '04',
    title: 'Collaborate, earn, and grow',
    desc: 'Use Network, complete work, track earnings, withdraw payouts, and grow a profile that proves merit through action.',
    icon: '🚀',
  },
]

const companySteps = [
  {
    step: '01',
    title: 'Set up your business profile',
    desc: 'Create a company account, add business details, hiring categories, work modes, and contact info so students can trust the brand.',
    icon: '🏢',
  },
  {
    step: '02',
    title: 'Search talent and manage GIGs',
    desc: 'Post or manage GIGs, review applicants, explore talent by TrustScore and skills, and shortlist students from one workspace.',
    icon: '🔎',
  },
  {
    step: '03',
    title: 'Send interview tasks and track pipeline',
    desc: 'Move candidates through applications, interview tasks, reviews, and ready-to-hire stages with a structured hiring pipeline.',
    icon: '📨',
  },
  {
    step: '04',
    title: 'Run projects and payments',
    desc: 'Track delivery in Project Workspace, manage company wallet and payouts, and keep the full student-workflow connected to execution.',
    icon: '✅',
  },
]

function StepCard({ step, title, desc, icon, isLast }) {
  return (
    <div className="landing-step-card" style={{ display: 'flex', gap: '20px', position: 'relative' }}>
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          left: 28, top: 60,
          width: 2, height: 'calc(100% + 24px)',
          background: 'linear-gradient(to bottom, var(--border), transparent)',
        }} />
      )}
      {/* Step icon bubble */}
      <div style={{
        width: 56, height: 56, flexShrink: 0,
        background: 'var(--white)',
        border: '2px solid var(--border)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, zIndex: 1,
        boxShadow: 'var(--shadow-sm)',
      }}>{icon}</div>
      <div style={{ paddingTop: 4, paddingBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', marginBottom: 6 }}>
          STEP {step}
        </div>
        <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{title}</h4>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <section id="how-it-works" className="landing-section" style={{ padding: '100px 0', background: 'var(--white)' }}>
      <div className="container">
        {/* Header */}
        <div className="landing-section-header" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>How it works</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Two clear journeys.<br />One connected platform.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Students move from profile to TrustScore, gigs, network, and earnings. Companies move from business setup to talent search, GIG management, workspace, and payments.
          </p>
        </div>

        {/* Two column layout */}
        <div className="landing-how-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
        }}>
          {/* Student path */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--primary-light)', color: 'var(--primary)',
              padding: '10px 20px', borderRadius: 12,
              fontSize: 14, fontWeight: 700, marginBottom: 36,
            }}>
              🎓 For Students
            </div>
            <div>
              {studentSteps.map((s, i) => (
                <StepCard key={s.step} {...s} isLast={i === studentSteps.length - 1} />
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: 12 }}
              onClick={() => navigate('/student')}>
              Get Started Free →
            </button>
          </div>

          {/* Company path */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--accent-light)', color: 'var(--accent)',
              padding: '10px 20px', borderRadius: 12,
              fontSize: 14, fontWeight: 700, marginBottom: 36,
            }}>
              🏢 For Companies
            </div>
            <div>
              {companySteps.map((s, i) => (
                <StepCard key={s.step} {...s} isLast={i === companySteps.length - 1} />
              ))}
            </div>
            <button className="btn-accent" style={{ marginTop: 12 }}
              onClick={() => navigate('/company')}>
              Post a Project →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
