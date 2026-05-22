import { useMemo, useState } from 'react'

const GIG_STATS = [
  { label: 'Open GIGs', value: '4', tone: '#1D4ED8', bg: '#DBEAFE', icon: '📋' },
  { label: 'Applications', value: '26', tone: '#065F46', bg: '#D1FAE5', icon: '📥' },
  { label: 'Interview Tasks Sent', value: '9', tone: '#92400E', bg: '#FEF3C7', icon: '🚀' },
  { label: 'Active Hires', value: '3', tone: '#7C3AED', bg: '#EDE9FE', icon: '⚡' },
]

const GIG_LIST = [
  {
    id: 1,
    title: 'Frontend Internship',
    mode: 'Remote',
    budget: '₹10,000 / month',
    applicants: 11,
    shortlisted: 4,
    interviewTasks: 3,
    status: 'Hiring',
    skills: ['React', 'UI/UX Design'],
    postedOn: 'Posted 2 days ago',
  },
  {
    id: 2,
    title: 'Social Media Content Role',
    mode: 'Hybrid',
    budget: '₹6,000 / month',
    applicants: 8,
    shortlisted: 3,
    interviewTasks: 2,
    status: 'Reviewing',
    skills: ['Canva', 'Content Marketing'],
    postedOn: 'Posted 4 days ago',
  },
  {
    id: 3,
    title: 'Node.js API Task',
    mode: 'On-site',
    budget: '₹12,000 / month',
    applicants: 5,
    shortlisted: 2,
    interviewTasks: 2,
    status: 'In Progress',
    skills: ['Node.js', 'REST APIs'],
    postedOn: 'Posted 1 week ago',
  },
]

const RECENT_ACTIVITY = [
  'Riya Sharma completed the Frontend Internship interview task.',
  'Aman Dubey applied for Node.js API Task 3 hours ago.',
  'Priya Singh was shortlisted for Social Media Content Role.',
  'Rohit Kumar submitted portfolio links for UI project review.',
]

const statusMeta = {
  Hiring: { bg: '#D1FAE5', color: '#065F46' },
  Reviewing: { bg: '#FEF3C7', color: '#92400E' },
  'In Progress': { bg: '#EDE9FE', color: '#7C3AED' },
}

const APPLICANTS_BY_GIG = {
  1: [
    {
      id: 'g1-a1',
      name: 'Aman Verma',
      trustScore: 920,
      location: 'Delhi',
      college: 'NSUT Delhi',
      skills: ['React', 'UI/UX Design', 'Figma'],
      intro: 'Frontend-focused builder with strong component architecture and polished UI systems.',
      projects: ['Creator Portfolio Studio', 'Campus Event Landing Page', 'Design System Kit'],
    },
    {
      id: 'g1-a2',
      name: 'Ritika Sen',
      trustScore: 870,
      location: 'Bengaluru',
      college: 'PES University',
      skills: ['React', 'Tailwind', 'UI/UX Design'],
      intro: 'Ships responsive interfaces quickly and enjoys startup landing pages and dashboards.',
      projects: ['Skill Swap Marketplace', 'Hackathon Demo Site'],
    },
  ],
  2: [
    {
      id: 'g2-a1',
      name: 'Sneha Iyer',
      trustScore: 860,
      location: 'Bengaluru',
      college: 'Christ University',
      skills: ['Content Marketing', 'SEO', 'Canva'],
      intro: 'Campaign storyteller with strong social copy and creative post planning.',
      projects: ['Campus Fest Growth Campaign', 'SEO Content Sprint'],
    },
    {
      id: 'g2-a2',
      name: 'Priya Singh',
      trustScore: 790,
      location: 'Ranchi',
      college: 'BIT Mesra',
      skills: ['Content Writing', 'Social Media', 'Canva'],
      intro: 'Strong at audience-first writing and structured weekly social calendars.',
      projects: ['Festival Campaign Pack', 'Brand Voice Guide'],
    },
  ],
  3: [
    {
      id: 'g3-a1',
      name: 'Ravi Kumar',
      trustScore: 900,
      location: 'Lucknow',
      college: 'IIIT Lucknow',
      skills: ['Node.js', 'REST APIs', 'MongoDB'],
      intro: 'Backend engineer with strong API design and auth/role access patterns.',
      projects: ['Job Board API', 'Inventory Service Layer'],
    },
    {
      id: 'g3-a2',
      name: 'Kabir Nair',
      trustScore: 905,
      location: 'Hyderabad',
      college: 'IIIT Hyderabad',
      skills: ['Node.js', 'PostgreSQL', 'React'],
      intro: 'Full-stack builder focused on scalable service architecture and product delivery.',
      projects: ['SaaS Billing Console', 'Mentor Match Platform'],
    },
  ],
}

function CreateGigModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '',
    mode: 'Remote',
    budget: '',
    status: 'Hiring',
    skills: '',
  })

  if (!open) return null

  const updateField = (key, value) => setForm(current => ({ ...current, [key]: value }))

  const handleSubmit = e => {
    e.preventDefault()
    const trimmedTitle = form.title.trim()
    const trimmedBudget = form.budget.trim()
    const skills = form.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(Boolean)

    if (!trimmedTitle || !trimmedBudget) return

    onCreate({
      title: trimmedTitle,
      mode: form.mode,
      budget: trimmedBudget,
      status: form.status,
      skills: skills.length > 0 ? skills : ['General'],
    })

    setForm({
      title: '',
      mode: 'Remote',
      budget: '',
      status: 'Hiring',
      skills: '',
    })
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
        zIndex: 1200,
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--white)',
          borderRadius: 16,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)' }}>Create New GIG</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Add role details to publish this GIG.</div>
          </div>
          <button type="button" onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--muted)', fontSize: 18, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Role Title *</span>
            <input
              value={form.title}
              onChange={e => updateField('title', e.target.value)}
              placeholder="e.g. Frontend Internship"
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }}
              required
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Work Mode</span>
            <select value={form.mode} onChange={e => updateField('mode', e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, background: 'var(--white)', fontFamily: 'inherit' }}>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Status</span>
            <select value={form.status} onChange={e => updateField('status', e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, background: 'var(--white)', fontFamily: 'inherit' }}>
              <option>Hiring</option>
              <option>Reviewing</option>
              <option>In Progress</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Budget *</span>
            <input
              value={form.budget}
              onChange={e => updateField('budget', e.target.value)}
              placeholder="e.g. ₹15,000 / month"
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }}
              required
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Skills (comma separated)</span>
            <input
              value={form.skills}
              onChange={e => updateField('skills', e.target.value)}
              placeholder="React, UI/UX Design"
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }}
            />
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid var(--border)', padding: '14px 20px' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--muted)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" className="btn-accent" style={{ padding: '8px 14px', fontSize: 12 }}>
            Create GIG
          </button>
        </div>
      </form>
    </div>
  )
}

function ApplicantsModal({ gig, applicants, onClose, onViewProfile }) {
  if (!gig) return null

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
        maxWidth: 760,
        maxHeight: '88vh',
        overflowY: 'auto',
        background: 'var(--white)',
        borderRadius: 16,
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)' }}>{gig.title} Applicants</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{applicants.length} candidate{applicants.length !== 1 ? 's' : ''} available</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--muted)', fontSize: 18, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {applicants.map(applicant => (
            <div key={applicant.id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--dark)', marginBottom: 3 }}>{applicant.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 7 }}>{applicant.college} · {applicant.location}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {applicant.skills.map(skill => (
                    <span key={skill} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--dark)' }}>{applicant.trustScore}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>TrustScore</div>
                <button className="btn-accent" onClick={() => onViewProfile(applicant)} style={{ padding: '8px 14px', fontSize: 12 }}>
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ApplicantProfileModal({ applicant, onClose }) {
  if (!applicant) return null

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
        zIndex: 1100,
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        width: '100%',
        maxWidth: 680,
        background: 'var(--white)',
        borderRadius: 16,
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '22px 24px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 6 }}>{applicant.name}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 10px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                ⭐ {applicant.trustScore} / 1000
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{applicant.college} · {applicant.location}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 18, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>About Applicant</div>
          <div style={{ fontSize: 13, color: 'var(--dark)', lineHeight: 1.65, marginBottom: 14 }}>{applicant.intro}</div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {applicant.skills.map(skill => (
              <span key={skill} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 10px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                {skill}
              </span>
            ))}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Recent Projects</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginBottom: 16 }}>
            {applicant.projects.map(project => (
              <div key={project} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: 'var(--dark)', fontWeight: 700 }}>
                {project}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn-accent" style={{ padding: '9px 16px', fontSize: 12 }}>Contact Applicant</button>
            <button style={{ padding: '9px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--text)', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
              Send Interview Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GigManagement() {
  const [gigs, setGigs] = useState(GIG_LIST)
  const [isCreateGigOpen, setIsCreateGigOpen] = useState(false)
  const [selectedGigId, setSelectedGigId] = useState(null)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  const selectedGig = useMemo(
    () => gigs.find(gig => gig.id === selectedGigId) || null,
    [gigs, selectedGigId],
  )
  const selectedGigApplicants = useMemo(
    () => (selectedGigId ? APPLICANTS_BY_GIG[selectedGigId] || [] : []),
    [selectedGigId],
  )

  const createGig = data => {
    const nextId = gigs.length ? Math.max(...gigs.map(item => item.id)) + 1 : 1
    const newGig = {
      id: nextId,
      title: data.title,
      mode: data.mode,
      budget: data.budget,
      applicants: 0,
      shortlisted: 0,
      interviewTasks: 0,
      status: data.status,
      skills: data.skills,
      postedOn: 'Posted just now',
    }
    setGigs(current => [newGig, ...current])
    setSelectedGigId(newGig.id)
    setSelectedApplicant(null)
    setIsCreateGigOpen(false)
  }

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
        borderRadius: 16,
        padding: '24px 28px',
        border: '1px solid #FED7AA',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            GIG Management
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--dark)', marginBottom: 8 }}>
            Manage hiring, interview tasks, and student pipeline
          </div>
          <div style={{ fontSize: 13, color: '#9A3412', maxWidth: 700, lineHeight: 1.6 }}>
            Track every posted GIG, review incoming talent, send interview tasks, and monitor who is ready for selection.
          </div>
        </div>

        <button
          className="btn-accent"
          onClick={() => setIsCreateGigOpen(true)}
          style={{ padding: '10px 18px', fontSize: 13, alignSelf: 'flex-start' }}
        >
          + Create New GIG
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {GIG_STATS.map(item => (
          <div key={item.label} style={{ background: 'var(--white)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--dark)', marginBottom: 4 }}>{item.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 10 }}>{item.label}</div>
            <span style={{ fontSize: 11, fontWeight: 700, background: item.bg, color: item.tone, padding: '4px 10px', borderRadius: 100 }}>
              Live snapshot
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 0.95fr', gap: 16 }}>
        <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px 24px' }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>Posted GIGs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {gigs.map(gig => {
              const meta = statusMeta[gig.status]
              return (
                <div key={gig.id} style={{ background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark)' }}>{gig.title}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, background: meta.bg, color: meta.color, padding: '3px 9px', borderRadius: 100 }}>
                          {gig.status}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, background: '#EFF6FF', color: '#1D4ED8', padding: '3px 9px', borderRadius: 100 }}>
                          {gig.mode}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{gig.budget} · {gig.postedOn}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>Interview Tasks Sent</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--dark)' }}>{gig.interviewTasks}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
                    {[
                      { label: 'Applicants', value: gig.applicants },
                      { label: 'Shortlisted', value: gig.shortlisted },
                      { label: 'Pending Review', value: Math.max(gig.applicants - gig.shortlisted, 0) },
                    ].map(item => (
                      <div key={item.label} style={{ background: 'var(--white)', borderRadius: 10, border: '1px solid var(--border)', padding: '10px 12px' }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)' }}>{item.value}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                    {gig.skills.map(skill => (
                      <span key={skill} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 10px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      className="btn-accent"
                      onClick={() => {
                        setSelectedGigId(gig.id)
                        setSelectedApplicant(null)
                      }}
                      style={{ padding: '8px 16px', fontSize: 12 }}
                    >
                      View Applicants
                    </button>
                    <button style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--text)', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
                      Send Interview Task
                    </button>
                    <button style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--muted)', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
                      Edit GIG
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px 24px' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>Hiring Pipeline</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'New Applications', value: '12', bg: '#EFF6FF', color: '#1D4ED8' },
                { label: 'Interview Task Pending', value: '7', bg: '#FEF3C7', color: '#92400E' },
                { label: 'Task Submitted', value: '5', bg: '#EDE9FE', color: '#7C3AED' },
                { label: 'Ready to Hire', value: '3', bg: '#D1FAE5', color: '#065F46' },
              ].map(item => (
                <div key={item.label} style={{ background: item.bg, color: item.color, borderRadius: 10, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
                  <span style={{ fontSize: 13 }}>{item.label}</span>
                  <span style={{ fontSize: 20, fontWeight: 900 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px 24px' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>Recent Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {RECENT_ACTIVITY.map(item => (
                <div key={item} style={{ background: 'var(--bg)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: 'var(--dark)', lineHeight: 1.55 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ApplicantsModal
        gig={selectedGig}
        applicants={selectedGigApplicants}
        onClose={() => setSelectedGigId(null)}
        onViewProfile={setSelectedApplicant}
      />
      <ApplicantProfileModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />
      <CreateGigModal
        open={isCreateGigOpen}
        onClose={() => setIsCreateGigOpen(false)}
        onCreate={createGig}
      />
    </div>
  )
}
