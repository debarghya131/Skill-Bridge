const coreFeatures = [
  {
    icon: '💼',
    title: 'Student GIG Center',
    desc: 'Students can browse gigs, receive direct company invites, track applied roles, manage active work, and save opportunities from one dashboard.',
    color: '#EEF2FF',
    accent: '#4F46E5',
  },
  {
    icon: '🎯',
    title: 'Skill Hub + Daily Tasks',
    desc: 'Verified skills, renewals, upgrades, daily retention tasks, and skill-gap reports help students keep proof-of-skill fresh and visible.',
    color: '#F0FDF4',
    accent: '#10B981',
  },
  {
    icon: '🔎',
    title: 'MSME Talent Search',
    desc: 'Companies can search students by TrustScore, skills, and fit, then review profile details before sending interview tasks or shortlisting.',
    color: '#FFF7ED',
    accent: '#F97316',
  },
  {
    icon: '📁',
    title: 'Workspace + Payments',
    desc: 'From active project tracking to company payouts and student earnings, SkillBridge keeps execution, delivery, and payment in one flow.',
    color: '#F0F9FF',
    accent: '#0EA5E9',
  },
]

const wowFeatures = [
  {
    icon: '🏆',
    title: 'TrustScore™',
    tag: 'WOW Feature',
    desc: 'A visible credibility layer that grows through verified skills, project work, daily consistency, and task behavior instead of pedigree-based filtering.',
    highlight: true,
  },
  {
    icon: '⚡',
    title: 'AI-Proctored Skill Tasks',
    tag: 'WOW Feature',
    desc: 'Interview tasks, daily challenges, and skill retention checks are built around real output and integrity-aware signals, not resume claims alone.',
    highlight: true,
  },
  {
    icon: '🤝',
    title: 'Two-Sided Hiring System',
    tag: 'WOW Feature',
    desc: 'Students get profile, network, gig, trust, and earning flows while companies get business setup, gig management, workspace, and payment control.',
    highlight: true,
  },
]

function CoreCard({ icon, title, desc, color, accent }) {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '28px',
      transition: 'all 0.25s ease',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
      e.currentTarget.style.borderColor = accent
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none'
      e.currentTarget.style.boxShadow = 'none'
      e.currentTarget.style.borderColor = 'var(--border)'
    }}>
      <div style={{
        width: 52, height: 52, background: color, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, marginBottom: 18,
      }}>{icon}</div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--dark)', marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</p>
    </div>
  )
}

function WowCard({ icon, title, tag, desc }) {
  return (
    <div style={{
      background: 'linear-gradient(145deg, #0F172A 0%, #1E1B4B 100%)',
      borderRadius: 20,
      padding: '32px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(79,70,229,0.3)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none'
      e.currentTarget.style.boxShadow = 'none'
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: 'radial-gradient(circle, rgba(79,70,229,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        transform: 'translate(30%, -30%)',
      }} />
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(249,115,22,0.2)', color: '#FB923C',
        padding: '4px 12px', borderRadius: 100,
        fontSize: 12, fontWeight: 700, marginBottom: 16,
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>{tag}</div>
      <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 12, letterSpacing: '-0.01em' }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>{desc}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="landing-section" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div className="landing-section-header" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>What we offer</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Built around the product<br />students and companies actually use.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            From Skill Hub and TrustScore to GIG Management, Talent Search, Workspace, and Payments, the platform now mirrors the full hiring journey.
          </p>
        </div>

        {/* Core features grid */}
        <div className="landing-features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '64px',
        }}>
          {coreFeatures.map(f => <CoreCard key={f.title} {...f} />)}
        </div>

        {/* WOW features */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, #0F172A, #1E1B4B)',
            color: 'white', padding: '8px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 700,
          }}>
            ✨ Standout Features — built to impress
          </div>
        </div>
        <div className="landing-wow-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {wowFeatures.map(f => <WowCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>
  )
}
