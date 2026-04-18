import { useNavigate } from 'react-router-dom'

const studentSteps = [
  {
    step: '01',
    title: 'Create your skill profile',
    desc: 'Sign up and list what you know — React, Python, Canva, content writing. No resume required. No college name asked.',
    icon: '📝',
  },
  {
    step: '02',
    title: 'Prove it with SkillProof',
    desc: 'Take a 10-minute AI-graded mini task to earn a verified badge. Your TrustScore updates instantly.',
    icon: '⚡',
  },
  {
    step: '03',
    title: 'Get matched to real gigs',
    desc: 'Our algorithm surfaces the best-fit opportunities from local MSMEs. Apply in one click.',
    icon: '🎯',
  },
  {
    step: '04',
    title: 'Deliver, earn, grow',
    desc: 'Complete projects, collect reviews, and build a portfolio that proves your capability — not your college.',
    icon: '🚀',
  },
]

const companySteps = [
  {
    step: '01',
    title: 'Post your project',
    desc: 'Describe the task, set the budget, and list the skills needed. Takes under 5 minutes.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Browse verified talent',
    desc: 'See matched student profiles ranked by TrustScore and relevant skills — not college pedigree.',
    icon: '👀',
  },
  {
    step: '03',
    title: 'Hire and collaborate',
    desc: 'Connect directly, share files, track progress — all within the platform.',
    icon: '🤝',
  },
  {
    step: '04',
    title: 'Pay securely, rate the work',
    desc: 'Release payment on completion. Your rating helps students build their merit profile.',
    icon: '✅',
  },
]

function StepCard({ step, title, desc, icon, isLast }) {
  return (
    <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
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
    <section id="how-it-works" style={{ padding: '100px 0', background: 'var(--white)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>How it works</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Simple steps.<br />Real results.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Whether you are a student looking for your first break or a business looking for affordable talent —
            getting started takes minutes.
          </p>
        </div>

        {/* Two column layout */}
        <div style={{
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
