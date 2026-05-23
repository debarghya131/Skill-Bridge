import { useEffect, useMemo, useState } from 'react'

const WORK_MODE_OPTIONS = ['Remote', 'Hybrid', 'On-site']

function calcCompletion(profile) {
  const checks = [
    profile.businessName.trim(),
    profile.location.trim(),
    profile.industry.trim(),
    profile.website.trim(),
    profile.teamSize.trim(),
    profile.description.trim(),
    profile.hiringCategories.trim(),
    profile.requiredSkills.trim(),
    profile.contactEmail.trim(),
    profile.contactPhone.trim(),
    profile.workModes.length > 0,
  ]

  const completed = checks.filter(Boolean).length
  return Math.round((completed / checks.length) * 100)
}

export default function SetupBusinessProfile({ profile, onSave }) {
  const [draft, setDraft] = useState(profile)

  useEffect(() => {
    setDraft(profile)
  }, [profile])

  const completion = useMemo(() => calcCompletion(draft), [draft])

  const updateField = (field, value) => {
    setDraft(current => ({ ...current, [field]: value }))
  }

  const toggleWorkMode = (mode) => {
    setDraft(current => ({
      ...current,
      workModes: current.workModes.includes(mode)
        ? current.workModes.filter(item => item !== mode)
        : [...current.workModes, mode],
    }))
  }

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
        borderRadius: 16,
        padding: '24px 28px',
        border: '1px solid #FED7AA',
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
          Business Profile
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--dark)', marginBottom: 8 }}>
          Edit your business profile
        </div>
        <div style={{ fontSize: 13, color: '#9A3412', maxWidth: 760, lineHeight: 1.6 }}>
          Update your business identity, work type, hiring goals, and contact details so students can trust your brand and apply with confidence.
        </div>
      </div>

      <div className="responsive-card-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Business Name', value: draft.businessName || 'Add business name', icon: '🏷️' },
          { label: 'Primary Location', value: draft.location || 'Add location', icon: '📍' },
          { label: 'Profile Status', value: `${completion}% Complete`, icon: '✅' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--white)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginBottom: 2 }}>{item.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px 24px', marginBottom: 18 }}>
        <div className="responsive-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Business Name</span>
            <input value={draft.businessName} onChange={e => updateField('businessName', e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Primary Location</span>
            <input value={draft.location} onChange={e => updateField('location', e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Industry</span>
            <input value={draft.industry} onChange={e => updateField('industry', e.target.value)} placeholder="EdTech, Retail, SaaS..." style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Website</span>
            <input value={draft.website} onChange={e => updateField('website', e.target.value)} placeholder="https://yourbusiness.com" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Team Size</span>
            <input value={draft.teamSize} onChange={e => updateField('teamSize', e.target.value)} placeholder="10-25 employees" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Hiring Categories</span>
            <input value={draft.hiringCategories} onChange={e => updateField('hiringCategories', e.target.value)} placeholder="Frontend, Marketing, Analytics" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 8 }}>Work Modes</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {WORK_MODE_OPTIONS.map(mode => {
              const active = draft.workModes.includes(mode)
              return (
                <button
                  key={mode}
                  onClick={() => toggleWorkMode(mode)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 100,
                    border: 'none',
                    cursor: 'pointer',
                    background: active ? 'var(--accent)' : 'var(--bg)',
                    color: active ? 'white' : 'var(--muted)',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {mode}
                </button>
              )
            })}
          </div>
        </div>

        <div className="responsive-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14, marginTop: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Contact Email</span>
            <input value={draft.contactEmail} onChange={e => updateField('contactEmail', e.target.value)} placeholder="hiring@business.com" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Contact Phone</span>
            <input value={draft.contactPhone} onChange={e => updateField('contactPhone', e.target.value)} placeholder="+91 98765 43210" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit' }} />
          </label>
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Business Description</span>
          <textarea value={draft.description} onChange={e => updateField('description', e.target.value)} rows={4} placeholder="Describe your company, mission, and hiring goals..." style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit', resize: 'none' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Required Skills</span>
          <textarea value={draft.requiredSkills} onChange={e => updateField('requiredSkills', e.target.value)} rows={3} placeholder="React, Node.js, Canva, Power BI..." style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit', resize: 'none' }} />
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Current completion: <strong style={{ color: 'var(--dark)' }}>{completion}%</strong>
          </div>
          <button className="btn-accent" onClick={() => onSave(draft)} style={{ padding: '10px 18px', fontSize: 13 }}>
            Save Business Profile
          </button>
        </div>
      </div>
    </div>
  )
}
