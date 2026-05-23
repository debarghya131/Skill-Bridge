function buildDefaultCompanyProfile(overrides = {}) {
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

const {
  buildDefaultCompanyGigManagementState,
} = require('./companyGigDefaults')
const {
  buildDefaultCompanyWorkspaceState,
} = require('./companyWorkspaceDefaults')
const {
  buildDefaultCompanyPaymentState,
} = require('./companyPaymentDefaults')

const DEFAULT_COMPANY_DASHBOARD_STATE = {
  stats: [
    { label: 'Active GIGs', value: '2', icon: '📋' },
    { label: 'Applications', value: '7', icon: '📥' },
    { label: 'Total Talent', value: '4', icon: '👥' },
  ],
  matchedStudents: 4,
  recentHiringActivity: [
    { name: 'Aman Verma', status: 'Submitted interview task for Frontend Internship', when: '2 hours ago', color: '#1D4ED8', bg: '#DBEAFE' },
    { name: 'Ritika Sen', status: 'Shortlisted for Frontend Internship', when: 'Today', color: '#065F46', bg: '#D1FAE5' },
    { name: 'Priya Singh', status: 'Applied to Social Media Content Role', when: 'Yesterday', color: '#92400E', bg: '#FEF3C7' },
  ],
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildDefaultCompanyDashboardState() {
  return clone(DEFAULT_COMPANY_DASHBOARD_STATE)
}

module.exports = {
  buildDefaultCompanyDashboardState,
  buildDefaultCompanyGigManagementState,
  buildDefaultCompanyProfile,
  buildDefaultCompanyPaymentState,
  buildDefaultCompanyWorkspaceState,
  DEFAULT_COMPANY_DASHBOARD_STATE,
}
