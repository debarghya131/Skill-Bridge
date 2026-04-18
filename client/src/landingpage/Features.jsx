const coreFeatures = [
  {
    icon: '🎯',
    title: 'Smart Skill Matching',
    desc: 'Our algorithm matches students to opportunities based on verified skills, not college rank or resume brand names.',
    color: '#EEF2FF',
    accent: '#4F46E5',
  },
  {
    icon: '📂',
    title: 'Portfolio Showcase',
    desc: 'Build a living portfolio of real projects. Each completed gig adds to your proof-of-work — visible to every hiring MSME.',
    color: '#F0FDF4',
    accent: '#10B981',
  },
  {
    icon: '🏢',
    title: 'MSME Project Board',
    desc: 'Local businesses post micro-projects and part-time gigs. Students apply, deliver, and earn — all within the platform.',
    color: '#FFF7ED',
    accent: '#F97316',
  },
  {
    icon: '🔔',
    title: 'Instant Notifications',
    desc: 'Get alerted the moment a matching opportunity drops — no more refreshing job boards or missing deadlines.',
    color: '#F0F9FF',
    accent: '#0EA5E9',
  },
]

const wowFeatures = [
  {
    icon: '🏆',
    title: 'TrustScore™',
    tag: 'WOW Feature',
    desc: 'An AI-powered score (0–100) built from verified task completions, peer ratings, and skill assessments — completely independent of college name or CGPA.',
    highlight: true,
  },
  {
    icon: '⚡',
    title: 'SkillProof Challenges',
    tag: 'WOW Feature',
    desc: 'Prove a skill in under 10 minutes with a mini real-world task, graded instantly by AI. No resume needed — your output speaks.',
    highlight: true,
  },
  {
    icon: '🤖',
    title: 'AI Career Coach',
    tag: 'WOW Feature',
    desc: 'A conversational AI that reviews your profile, suggests skill gaps to fill, and tells you exactly which opportunities you are best positioned for.',
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
    <section id="features" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>What we offer</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Built for real opportunity.<br />Not for elite gatekeeping.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Every feature is designed to level the field — giving Tier-2/3 students the same shot as anyone else.
          </p>
        </div>

        {/* Core features grid */}
        <div style={{
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
        <div style={{
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
