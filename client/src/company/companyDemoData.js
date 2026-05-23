export function buildDefaultCompanyProfile(overrides = {}) {
  return {
    businessName: overrides.businessName || 'Your Business',
    location: overrides.location || '',
    industry: '',
    website: '',
    teamSize: '',
    workModes: [],
    description: '',
    hiringCategories: '',
    requiredSkills: '',
    contactEmail: '',
    contactPhone: '',
  }
}

export function mergeCompanyProfile(profile = {}, overrides = {}) {
  return {
    ...buildDefaultCompanyProfile(overrides),
    businessName: typeof profile.businessName === 'string' ? profile.businessName : (overrides.businessName || 'Your Business'),
    location: typeof profile.location === 'string' ? profile.location : (overrides.location || ''),
    industry: typeof profile.industry === 'string' ? profile.industry : '',
    website: typeof profile.website === 'string' ? profile.website : '',
    teamSize: typeof profile.teamSize === 'string' ? profile.teamSize : '',
    workModes: Array.isArray(profile.workModes) ? profile.workModes : [],
    description: typeof profile.description === 'string' ? profile.description : '',
    hiringCategories: typeof profile.hiringCategories === 'string' ? profile.hiringCategories : '',
    requiredSkills: typeof profile.requiredSkills === 'string' ? profile.requiredSkills : '',
    contactEmail: typeof profile.contactEmail === 'string' ? profile.contactEmail : '',
    contactPhone: typeof profile.contactPhone === 'string' ? profile.contactPhone : '',
  }
}

export function buildDefaultCompanyDashboardState() {
  return {
    stats: [
      { label: 'Active GIGs', value: '2', icon: '📋' },
      { label: 'Applications', value: '7', icon: '📥' },
      { label: 'Total Talent', value: '4', icon: '👥' },
    ],
    matchedStudents: 4,
    recentHiringActivity: [
      {
        name: 'Aman Verma',
        status: 'Submitted interview task for Frontend Internship',
        when: '2 hours ago',
        color: '#1D4ED8',
        bg: '#DBEAFE',
      },
      {
        name: 'Ritika Sen',
        status: 'Shortlisted for Frontend Internship',
        when: 'Today',
        color: '#065F46',
        bg: '#D1FAE5',
      },
      {
        name: 'Priya Singh',
        status: 'Applied to Social Media Content Role',
        when: 'Yesterday',
        color: '#92400E',
        bg: '#FEF3C7',
      },
    ],
  }
}

export function mergeCompanyDashboardState(state = {}) {
  const defaults = buildDefaultCompanyDashboardState()

  return {
    stats: Array.isArray(state.stats) ? state.stats : defaults.stats,
    matchedStudents: typeof state.matchedStudents === 'number' ? state.matchedStudents : defaults.matchedStudents,
    recentHiringActivity: Array.isArray(state.recentHiringActivity) ? state.recentHiringActivity : defaults.recentHiringActivity,
  }
}
