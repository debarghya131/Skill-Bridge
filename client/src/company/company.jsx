import { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GigManagement from './GigManagement'
import PaymentSection from './PaymentSection'
import SetupBusinessProfile from './SetupBusinessProfile'
import ProjectWorkspace from './ProjectWorkspace'

const studentProfiles = [
  {
    name: 'Riya Sharma',
    college: 'Ranchi University',
    location: 'Ranchi',
    skills: ['React', 'Node.js', 'UI/UX Design'],
    skillsByLevel: { Pro: ['React'], Intermediate: ['Node.js', 'UI/UX Design'], Beginner: [] },
    streak: 21,
    score: 870,
    projects: 4,
    github: 'github.com/riyasharma',
    contactInfo: [
      { label: 'Email', value: 'riya.sharma@skillbridge.demo' },
      { label: 'WhatsApp', value: '+91 98765 41001' },
    ],
    intro: 'Frontend-focused student with strong UI thinking and clean React project execution.',
    savedProjects: [
      { name: 'Creator Portfolio Studio', desc: 'Built a React portfolio builder with reusable page sections and export-ready layouts.' },
      { name: 'Campus Event Landing Page', desc: 'Designed and shipped a polished event promo site with ticket CTA sections and motion cards.' },
    ],
  },
  {
    name: 'Aman Dubey',
    college: 'LNCT Bhopal',
    location: 'Bhopal',
    skills: ['Python', 'Data Analysis', 'Excel/Sheets'],
    skillsByLevel: { Pro: ['Python'], Intermediate: ['Data Analysis'], Beginner: ['Excel/Sheets'] },
    streak: 12,
    score: 810,
    projects: 3,
    github: 'github.com/amandubey',
    contactInfo: [
      { label: 'Email', value: 'aman.dubey@skillbridge.demo' },
      { label: 'LinkedIn', value: 'linkedin.com/in/aman-dubey-data' },
    ],
    intro: 'Data-focused builder who enjoys turning raw business data into usable dashboards and reports.',
    savedProjects: [
      { name: 'Sales Trend Analyzer', desc: 'Created a dashboard to track monthly sales movement and identify low-performing product lines.' },
      { name: 'Inventory Health Tracker', desc: 'Built an Excel system to flag restock urgency, aging stock, and reorder patterns.' },
    ],
  },
  {
    name: 'Priya Singh',
    college: 'BIT Mesra',
    location: 'Ranchi',
    skills: ['Canva', 'Social Media', 'Content Writing'],
    skillsByLevel: { Pro: ['Content Writing'], Intermediate: ['Social Media'], Beginner: ['Canva'] },
    streak: 8,
    score: 790,
    projects: 5,
    github: 'portfolio.priyasingh.in',
    contactInfo: [
      { label: 'Email', value: 'priya.singh@skillbridge.demo' },
      { label: 'Instagram', value: '@priyawrites' },
    ],
    intro: 'Content creator with strong campaign storytelling, post design consistency, and audience-focused writing.',
    savedProjects: [
      { name: 'Festival Campaign Pack', desc: 'Produced a full content calendar, promo post set, and caption framework for a festive brand launch.' },
      { name: 'Brand Voice Guide', desc: 'Defined content tone, visual style, and CTA format for recurring social media posts.' },
    ],
  },
  {
    name: 'Rohit Kumar',
    college: 'NIT Jamshedpur',
    location: 'Jamshedpur',
    skills: ['WordPress', 'SEO', 'UI/UX Design'],
    skillsByLevel: { Pro: ['SEO'], Intermediate: ['WordPress'], Beginner: ['UI/UX Design'] },
    streak: 15,
    score: 830,
    projects: 6,
    github: 'github.com/rohitkumar',
    contactInfo: [
      { label: 'Email', value: 'rohit.kumar@skillbridge.demo' },
      { label: 'Phone', value: '+91 98765 41004' },
    ],
    intro: 'Website and SEO enthusiast focused on performance, accessibility, and practical small-business websites.',
    savedProjects: [
      { name: 'Local Business Website Revamp', desc: 'Improved information architecture, page loading speed, and lead capture sections.' },
      { name: 'SEO Audit Board', desc: 'Created a simple audit sheet for keyword gaps, metadata fixes, and content opportunities.' },
    ],
  },
]

const SKILL_LEVELS = ['All', 'Beginner', 'Intermediate', 'Pro']
const VERIFIED_SKILL_SET = new Set(['React', 'Node.js', 'UI/UX Design', 'Python', 'SEO', 'Content Writing'])
const DEMO_VIDEO_URL = '/src/assets/otherintroduction.mp4'

const LEVEL_META = {
  Pro: { bg: '#F3E8FF', color: '#7C3AED' },
  Intermediate: { bg: '#EFF6FF', color: '#1D4ED8' },
  Beginner: { bg: '#F0FDF4', color: '#15803D' },
}

function getSkillLevel(profile, skill) {
  if (!profile.skillsByLevel) return null
  for (const [level, list] of Object.entries(profile.skillsByLevel)) {
    if (list.includes(skill)) return level
  }
  return null
}

const NAV_ITEMS = [
  { key: 'business',  icon: '🏢', label: 'My Business' },
  { key: 'profile',   icon: '🛠️', label: 'Setup Business Profile' },
  { key: 'gig',       icon: '📋', label: 'GIG Management' },
  { key: 'talent',    icon: '🔍', label: 'Talent Search' },
  { key: 'workspace', icon: '🗂️',  label: 'Project Workspace' },
  { key: 'payment',   icon: '💳', label: 'Payment' },
]

function ComingSoon({ icon, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
      <div style={{ fontSize: 52 }}>{icon}</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)' }}>{label}</h2>
      <span style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '6px 18px', borderRadius: 100, fontSize: 13, fontWeight: 700 }}>Coming Soon</span>
    </div>
  )
}

function TalentProfileModal({ profile, onClose }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [levelFilter, setLevelFilter] = useState('All')

  if (!profile) return null

  const verifiedSkills = profile.skills.filter(skill => VERIFIED_SKILL_SET.has(skill))
  const levels = ['All', 'Pro', 'Intermediate', 'Beginner']
  const filteredSkills = levelFilter === 'All'
    ? (verifiedSkills.length > 0 ? verifiedSkills : profile.skills)
    : (profile.skillsByLevel?.[levelFilter] ?? [])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 1000,
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        width: '100%',
        maxWidth: 560,
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--white)',
        borderRadius: 20,
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--dark) 0%, #1E1B4B 100%)',
          borderRadius: '20px 20px 0 0',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A5B4FC, #60A5FA)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 900,
              border: '3px solid rgba(255,255,255,0.2)',
            }}>
              {profile.name[0]}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{profile.name}</div>
                <span style={{ fontSize: 10, fontWeight: 800, background: '#10B981', color: 'white', padding: '2px 10px', borderRadius: 100 }}>
                  ✓ Verified
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                  color: 'white', fontSize: 13, fontWeight: 800,
                  padding: '4px 12px', borderRadius: 100,
                  boxShadow: '0 0 12px rgba(99,102,241,0.6)',
                  letterSpacing: '0.01em',
                }}>
                  ⭐ {profile.score} <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.85 }}>/ 1000</span>
                </span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>TrustScore™</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.12)',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Skills</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {levels.map(lv => {
                  const meta = lv === 'All' ? { bg: '#F1F5F9', color: '#475569' } : LEVEL_META[lv]
                  return (
                    <button key={lv} onClick={() => setLevelFilter(lv)} style={{
                      fontSize: 11, fontWeight: 700,
                      background: levelFilter === lv ? meta.color : meta.bg,
                      color: levelFilter === lv ? 'white' : meta.color,
                      padding: '3px 9px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    }}>
                      {lv}
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {filteredSkills.length === 0
                ? <span style={{ fontSize: 13, color: 'var(--muted)' }}>No {levelFilter} skills</span>
                : filteredSkills.map(skill => {
                  const level = getSkillLevel(profile, skill)
                  const levelMeta = level ? LEVEL_META[level] : null
                  return (
                    <span key={skill} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'var(--primary-light)', color: 'var(--primary)',
                      padding: '5px 12px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                    }}>
                      {skill}
                      {verifiedSkills.includes(skill) && <span style={{ background: '#10B981', color: 'white', fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 100 }}>✓</span>}
                      {levelMeta && <span style={{ background: levelMeta.bg, color: levelMeta.color, fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 100 }}>{level}</span>}
                      <span style={{ background: '#FFF7ED', color: '#EA580C', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                        {profile.streak || 0} d streak
                      </span>
                    </span>
                  )
                })}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Intro Video</div>
            <div style={{ background: '#000', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/7', maxWidth: 460 }}>
              <video ref={videoRef} src={DEMO_VIDEO_URL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onEnded={() => setIsPlaying(false)} />
            </div>
            <button
              onClick={togglePlay}
              style={{
                marginTop: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 18px',
                borderRadius: 7,
                border: isPlaying ? '1.5px solid #FCA5A5' : '1.5px solid #DC2626',
                background: isPlaying ? '#FEF2F2' : '#EF4444',
                color: isPlaying ? '#EF4444' : 'white',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {isPlaying ? '⏹ Stop' : '▶ Play'}
            </button>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>GitHub</div>
            {profile.github ? (
              <div style={{ background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '12px 14px', fontSize: 13, color: 'var(--dark)' }}>
                {profile.github}
              </div>
            ) : (
              <span style={{ color: 'var(--muted)', fontSize: 13 }}>No links added</span>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Contact</div>
            {profile.contactInfo?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {profile.contactInfo.map((item, index) => (
                  <div key={`${item.label}-${index}`} style={{ background: 'var(--bg)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--dark)', fontWeight: 600 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ color: 'var(--muted)', fontSize: 13 }}>No contact details added</span>
            )}
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Projects</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
              {profile.savedProjects.map(project => (
                <div key={project.name} style={{ background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '14px 16px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{project.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 12 }}>{project.desc}</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a href="https://github.com/topics/project" target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>🔗 View</a>
                    <a href="https://github.com/topics/project" target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 700, color: '#10B981' }}>🧪 Demo Link</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CompanyDashboard() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const companyName = state?.companyName || 'Your Business'
  const location = state?.location || ''

  const [active, setActive] = useState('business')
  const [selectedTalent, setSelectedTalent] = useState(null)
  const [talentFilters, setTalentFilters] = useState({
    minTrustScore: 0,
    location: 'All',
    skill: 'All',
    level: 'All',
  })
  const [businessProfile, setBusinessProfile] = useState({
    businessName: companyName,
    location,
    industry: '',
    website: '',
    teamSize: '',
    workModes: [],
    description: '',
    hiringCategories: '',
    requiredSkills: '',
    contactEmail: '',
    contactPhone: '',
  })

  const availableLocations = ['All', ...new Set(studentProfiles.map(profile => profile.location))]
  const availableSkills = ['All', ...new Set(studentProfiles.flatMap(profile => profile.skills))]

  const filteredTalent = studentProfiles.filter(profile => {
    const trustPass = profile.score >= talentFilters.minTrustScore
    const locationPass = talentFilters.location === 'All' || profile.location === talentFilters.location
    const skillPass = talentFilters.skill === 'All' || profile.skills.includes(talentFilters.skill)
    const levelPass = talentFilters.level === 'All'
      ? true
      : (profile.skillsByLevel?.[talentFilters.level] || []).length > 0

    return trustPass && locationPass && skillPass && levelPass
  })

  const resetTalentFilters = () => {
    setTalentFilters({
      minTrustScore: 0,
      location: 'All',
      skill: 'All',
      level: 'All',
    })
  }

  const businessFields = [
    businessProfile.businessName,
    businessProfile.location,
    businessProfile.industry,
    businessProfile.website,
    businessProfile.teamSize,
    businessProfile.description,
    businessProfile.hiringCategories,
    businessProfile.requiredSkills,
    businessProfile.contactEmail,
    businessProfile.contactPhone,
  ]
  const completedFields = businessFields.filter(Boolean).length
  const profileCompletion = Math.round((completedFields / businessFields.length) * 100)
  const checklist = [
    { label: 'Business name and location', done: Boolean(businessProfile.businessName && businessProfile.location) },
    { label: 'Industry, website, and team size', done: Boolean(businessProfile.industry && businessProfile.website && businessProfile.teamSize) },
    { label: 'Work mode and hiring categories', done: Boolean(businessProfile.workModes.length > 0 && businessProfile.hiringCategories) },
    { label: 'Company description and required skills', done: Boolean(businessProfile.description && businessProfile.requiredSkills) },
    { label: 'Contact details for applicants', done: Boolean(businessProfile.contactEmail && businessProfile.contactPhone) },
  ]
  const doneChecklist = checklist.filter(item => item.done).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Navbar */}
      <nav style={{
        height: 52, background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, var(--accent), #EA580C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: 13,
          }}>S</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--dark)', letterSpacing: '-0.02em' }}>SkillBridge</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 10px', borderRadius: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #EA580C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 13, flexShrink: 0,
            }}>{businessProfile.businessName[0]?.toUpperCase() || 'B'}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', lineHeight: 1.2 }}>{businessProfile.businessName}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{businessProfile.location || 'Business'}</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Sidebar */}
        <aside style={{
          width: 220, background: 'var(--white)',
          borderRight: '1px solid var(--border)',
          padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4,
          position: 'sticky', top: 52, height: 'calc(100vh - 52px)', overflowY: 'auto',
        }}>
          {NAV_ITEMS.map(item => (
            <button key={item.key} onClick={() => setActive(item.key)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 9, border: 'none',
              background: active === item.key ? 'var(--accent-light)' : 'transparent',
              color: active === item.key ? 'var(--accent)' : 'var(--muted)',
              fontWeight: active === item.key ? 700 : 500,
              fontSize: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (active !== item.key) e.currentTarget.style.background = 'var(--bg)' }}
            onMouseLeave={e => { if (active !== item.key) e.currentTarget.style.background = 'transparent' }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 9, border: 'none',
            background: 'transparent', color: '#EF4444',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', width: '100%',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontSize: 16 }}>🚪</span> Logout
          </button>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>

          {active === 'business' && (
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                borderRadius: 16, padding: '24px 28px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 20, flexWrap: 'wrap', gap: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 900, fontSize: 22,
                  }}>{businessProfile.businessName[0]?.toUpperCase() || 'B'}</div>
                  <div>
                    <h2 style={{ color: 'white', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{businessProfile.businessName} 🏢</h2>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{businessProfile.location || 'Location not set'}</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '14px 22px', textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginBottom: 2 }}>Matched Students</div>
                  <div style={{ color: 'white', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{studentProfiles.length}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
                {[
                  { label: 'Active GIGs', value: '2', icon: '📋' },
                  { label: 'Applications', value: '7', icon: '📥' },
                  { label: 'Total Talent', value: `${studentProfiles.length}`, icon: '👥' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'var(--white)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{stat.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--dark)', marginBottom: 2 }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 16, marginBottom: 20 }}>
                <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>Business Setup Health</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>Complete profile details to increase applicant trust and improve match quality.</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, background: '#D1FAE5', color: '#065F46', padding: '4px 9px', borderRadius: 100 }}>
                      {profileCompletion}% complete
                    </span>
                  </div>

                  <div style={{ height: 9, borderRadius: 999, background: '#E2E8F0', marginBottom: 14, overflow: 'hidden' }}>
                    <div style={{ width: `${profileCompletion}%`, height: '100%', background: 'linear-gradient(90deg, #22C55E, #16A34A)' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                    {checklist.map(item => (
                      <div key={item.label} style={{ background: 'var(--bg)', borderRadius: 9, border: '1px solid var(--border)', padding: '9px 10px', fontSize: 12, color: item.done ? '#065F46' : 'var(--muted)', fontWeight: 600 }}>
                        {item.done ? '✅' : '⬜'} {item.label}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActive('profile')}
                    style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Complete Setup Profile
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--dark)', marginBottom: 8 }}>Quick Actions</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button onClick={() => setActive('gig')} className="btn-accent" style={{ fontSize: 12, padding: '8px 12px', justifyContent: 'center' }}>Create / Manage GIGs</button>
                      <button onClick={() => setActive('talent')} style={{ fontSize: 12, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--text)', fontWeight: 700, cursor: 'pointer' }}>
                        Search Talent
                      </button>
                      <button onClick={() => setActive('workspace')} style={{ fontSize: 12, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--text)', fontWeight: 700, cursor: 'pointer' }}>
                        Open Project Workspace
                      </button>
                    </div>
                  </div>

                  <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--dark)', marginBottom: 6 }}>Setup Checklist Progress</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{doneChecklist}/{checklist.length} tasks complete</div>
                    <span style={{ fontSize: 11, fontWeight: 700, background: doneChecklist === checklist.length ? '#D1FAE5' : '#FEF3C7', color: doneChecklist === checklist.length ? '#065F46' : '#92400E', padding: '4px 9px', borderRadius: 100 }}>
                      {doneChecklist === checklist.length ? 'Profile Ready for Hiring' : 'Action Needed'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '18px 20px' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark)', marginBottom: 10 }}>Recent Hiring Activity</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[
                    { name: 'Aman Verma', status: 'Submitted interview task for Frontend Internship', when: '2 hours ago', color: '#1D4ED8', bg: '#DBEAFE' },
                    { name: 'Ritika Sen', status: 'Shortlisted for Frontend Internship', when: 'Today', color: '#065F46', bg: '#D1FAE5' },
                    { name: 'Priya Singh', status: 'Applied to Social Media Content Role', when: 'Yesterday', color: '#92400E', bg: '#FEF3C7' },
                  ].map(item => (
                    <div key={item.name + item.status} style={{ background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '11px 12px' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.5 }}>{item.status}</div>
                      <span style={{ fontSize: 11, fontWeight: 700, background: item.bg, color: item.color, padding: '3px 8px', borderRadius: 100 }}>
                        {item.when}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'talent' && (
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--dark)', marginBottom: 16 }}>
                Top Talent Matches <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>({filteredTalent.length} found)</span>
              </h3>

              <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '14px 16px', marginBottom: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr auto', gap: 10, alignItems: 'end', marginBottom: 10 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Min TrustScore
                    </span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="range"
                        min={0}
                        max={1000}
                        value={talentFilters.minTrustScore}
                        onChange={e => setTalentFilters(current => ({ ...current, minTrustScore: Number(e.target.value) }))}
                        style={{ width: '100%' }}
                      />
                      <input
                        type="number"
                        min={0}
                        max={1000}
                        value={talentFilters.minTrustScore}
                        onChange={e => setTalentFilters(current => ({ ...current, minTrustScore: Math.max(0, Math.min(1000, Number(e.target.value) || 0)) }))}
                        style={{ width: 66, padding: '8px 9px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, fontFamily: 'inherit' }}
                      />
                    </div>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Location
                    </span>
                    <select
                      value={talentFilters.location}
                      onChange={e => setTalentFilters(current => ({ ...current, location: e.target.value }))}
                      style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, background: 'var(--white)', fontFamily: 'inherit' }}
                    >
                      {availableLocations.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Skill
                    </span>
                    <select
                      value={talentFilters.skill}
                      onChange={e => setTalentFilters(current => ({ ...current, skill: e.target.value }))}
                      style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, background: 'var(--white)', fontFamily: 'inherit' }}
                    >
                      {availableSkills.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <button
                    onClick={resetTalentFilters}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--border)',
                      background: 'var(--white)',
                      color: 'var(--muted)',
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: 'pointer',
                      height: 'fit-content',
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {SKILL_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setTalentFilters(current => ({ ...current, level }))}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 100,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 700,
                        background: talentFilters.level === level ? 'var(--accent)' : 'var(--bg)',
                        color: talentFilters.level === level ? 'white' : 'var(--muted)',
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredTalent.map((p, i) => (
                  <div key={p.name} style={{
                    background: 'var(--white)', borderRadius: 12,
                    padding: '18px 22px', border: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: 12, transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: `hsl(${(i * 60) + 220}, 70%, 55%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 800, fontSize: 17, flexShrink: 0,
                      }}>{p.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)', marginBottom: 2 }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 7 }}>{p.college} · {p.location} · {p.projects} projects</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {p.skills.map(s => (
                            <span key={s} style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>
                              {s}
                            </span>
                          ))}
                          {talentFilters.level !== 'All' && (p.skillsByLevel?.[talentFilters.level] || []).map(levelSkill => (
                            <span key={`${levelSkill}-${talentFilters.level}`} style={{ background: '#EDE9FE', color: '#6D28D9', padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                              {levelSkill} ({talentFilters.level})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--dark)' }}>{p.score}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>TrustScore™</div>
                      </div>
                      <button
                        onClick={() => setSelectedTalent(p)}
                        style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--text)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
                {filteredTalent.length === 0 && (
                  <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', padding: '24px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 13, fontWeight: 600 }}>
                    No students match these filters. Try lowering TrustScore or selecting broader skills.
                  </div>
                )}
              </div>
            </div>
          )}

          {active === 'profile' && (
            <SetupBusinessProfile profile={businessProfile} onSave={setBusinessProfile} />
          )}

          {active === 'gig'       && <GigManagement />}
          {active === 'workspace' && <ProjectWorkspace />}
          {active === 'payment'   && <PaymentSection />}

        </main>
      </div>
      <TalentProfileModal profile={selectedTalent} onClose={() => setSelectedTalent(null)} />
    </div>
  )
}
