const Company = require('../models/Company')
const Student = require('../models/Student')
const {
  buildDefaultCompanyDashboardState,
  buildDefaultCompanyGigManagementState,
  buildDefaultCompanyPaymentState,
  buildDefaultCompanyProfile,
  buildDefaultCompanyWorkspaceState,
} = require('../config/companyDefaults')
const { createSessionToken, hashPassword, verifyPassword } = require('../utils/auth')

function normalizeEmail(email) {
  return email?.trim().toLowerCase() || ''
}

function normalizePhone(phone) {
  return phone?.replace(/\D/g, '') || ''
}

function buildAuthError(message, statusCode = 400) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function sanitizeCompanyProfile(profile, fallback) {
  return {
    businessName: typeof profile?.businessName === 'string' ? profile.businessName : fallback.businessName,
    location: typeof profile?.location === 'string' ? profile.location : fallback.location,
    industry: typeof profile?.industry === 'string' ? profile.industry : '',
    website: typeof profile?.website === 'string' ? profile.website : '',
    teamSize: typeof profile?.teamSize === 'string' ? profile.teamSize : '',
    workModes: Array.isArray(profile?.workModes) ? profile.workModes.filter(item => typeof item === 'string' && item.trim()) : [],
    description: typeof profile?.description === 'string' ? profile.description : '',
    hiringCategories: typeof profile?.hiringCategories === 'string' ? profile.hiringCategories : '',
    requiredSkills: typeof profile?.requiredSkills === 'string' ? profile.requiredSkills : '',
    contactEmail: typeof profile?.contactEmail === 'string' ? profile.contactEmail : '',
    contactPhone: typeof profile?.contactPhone === 'string' ? profile.contactPhone : '',
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function sanitizeDashboardState(state) {
  const fallback = buildDefaultCompanyDashboardState()

  return {
    stats: Array.isArray(state?.stats) ? clone(state.stats) : fallback.stats,
    matchedStudents: Number(state?.matchedStudents) || fallback.matchedStudents,
    recentHiringActivity: Array.isArray(state?.recentHiringActivity)
      ? clone(state.recentHiringActivity)
      : fallback.recentHiringActivity,
  }
}

function sanitizeGigManagementState(state) {
  const fallback = buildDefaultCompanyGigManagementState()

  return {
    stats: Array.isArray(state?.stats) ? clone(state.stats) : fallback.stats,
    gigs: Array.isArray(state?.gigs) ? clone(state.gigs) : fallback.gigs,
    pipeline: Array.isArray(state?.pipeline) ? clone(state.pipeline) : fallback.pipeline,
    recentActivity: Array.isArray(state?.recentActivity) ? clone(state.recentActivity) : fallback.recentActivity,
    applicantsByGig: state?.applicantsByGig && typeof state.applicantsByGig === 'object'
      ? clone(state.applicantsByGig)
      : fallback.applicantsByGig,
  }
}

function sanitizeProjectWorkspaceState(state) {
  const fallback = buildDefaultCompanyWorkspaceState()

  return {
    projects: Array.isArray(state?.projects) ? clone(state.projects) : fallback.projects,
    selectedProjectId: typeof state?.selectedProjectId === 'string' ? state.selectedProjectId : fallback.selectedProjectId,
    statusFilter: typeof state?.statusFilter === 'string' ? state.statusFilter : fallback.statusFilter,
  }
}

function sanitizePaymentState(state) {
  const fallback = buildDefaultCompanyPaymentState()

  return {
    summary: Array.isArray(state?.summary) ? clone(state.summary) : fallback.summary,
    methods: Array.isArray(state?.methods) ? clone(state.methods) : fallback.methods,
    transactions: Array.isArray(state?.transactions) ? clone(state.transactions) : fallback.transactions,
    recommendedActions: Array.isArray(state?.recommendedActions) ? clone(state.recommendedActions) : fallback.recommendedActions,
  }
}

function buildSkillsByLevel(skillHubSkills, fallbackSkills) {
  const groupedSkills = {
    Beginner: [],
    Intermediate: [],
    Pro: [],
  }

  if (Array.isArray(skillHubSkills)) {
    skillHubSkills.forEach(skill => {
      if (!skill || typeof skill.name !== 'string' || !skill.name.trim()) {
        return
      }

      const stage = ['Beginner', 'Intermediate', 'Pro'].includes(skill.stage) ? skill.stage : 'Intermediate'
      if (!groupedSkills[stage].includes(skill.name)) {
        groupedSkills[stage].push(skill.name)
      }
    })
  }

  fallbackSkills.forEach(skill => {
    if (!groupedSkills.Intermediate.includes(skill) && !groupedSkills.Beginner.includes(skill) && !groupedSkills.Pro.includes(skill)) {
      groupedSkills.Intermediate.push(skill)
    }
  })

  return groupedSkills
}

function sanitizeTalentProfile(student) {
  const skills = Array.isArray(student.skills) ? student.skills.filter(skill => typeof skill === 'string' && skill.trim()) : []
  const savedProjects = Array.isArray(student.projects)
    ? student.projects
      .filter(project => project && (project.name || project.desc))
      .map(project => ({
        name: project.name || 'Student Project',
        desc: project.desc || 'Project details available on request.',
      }))
    : []

  const skillsByLevel = buildSkillsByLevel(student.skillHubSkills, skills)
  const streak = Array.isArray(student.skillHubSkills)
    ? Math.max(0, ...student.skillHubSkills.map(skill => Number(skill.streak) || 0))
    : 0

  return {
    id: student._id.toString(),
    name: student.name,
    college: 'SkillBridge Verified',
    location: student.location || 'Location not added',
    skills,
    skillsByLevel,
    streak,
    score: Number(student.trustScore) || 0,
    projects: Array.isArray(student.projects) ? student.projects.length : 0,
    github: Array.isArray(student.githubLink) && student.githubLink[0] ? student.githubLink[0].url : '',
    contactInfo: Array.isArray(student.contactInfo) ? clone(student.contactInfo) : [],
    intro: student.preferredLanguage
      ? `Verified student working confidently in ${student.preferredLanguage}.`
      : 'Verified SkillBridge student open to project-based opportunities.',
    savedProjects,
    videoUrl: student.videoUrl || null,
  }
}

function sanitizeCompany(company) {
  const fallbackProfile = buildDefaultCompanyProfile({
    businessName: company.businessName,
    location: company.location,
  })
  const businessProfile = sanitizeCompanyProfile(company.businessProfile, fallbackProfile)
  const dashboardState = sanitizeDashboardState(company.dashboardState)
  const gigManagementState = sanitizeGigManagementState(company.gigManagementState)
  const projectWorkspaceState = sanitizeProjectWorkspaceState(company.projectWorkspaceState)
  const paymentState = sanitizePaymentState(company.paymentState)

  return {
    id: company._id.toString(),
    businessName: company.businessName,
    email: company.email || '',
    phone: company.phone || '',
    location: company.location || '',
    contactMethod: company.contactMethod,
    verificationMethod: company.verificationMethod,
    businessProfile,
    dashboardState,
    gigManagementState,
    projectWorkspaceState,
    paymentState,
  }
}

async function findCompanyByToken(token) {
  if (!token) {
    throw buildAuthError('Missing session token', 401)
  }

  const company = await Company.findOne({ 'sessions.token': token })

  if (!company) {
    throw buildAuthError('Session expired. Please sign in again.', 401)
  }

  return company
}

async function signUpCompany(payload) {
  const contactMethod = payload.contactMethod === 'phone' ? 'phone' : 'email'
  const verificationMethod = payload.verificationMethod === 'udyam' ? 'udyam' : 'gstin'
  const email = normalizeEmail(payload.email)
  const phone = normalizePhone(payload.phone)

  if (!payload.companyName?.trim()) throw buildAuthError('Company name is required')
  if (!payload.password || payload.password.length < 8) throw buildAuthError('Password must be at least 8 characters')
  if (contactMethod === 'email' && !email) throw buildAuthError('A valid email address is required')
  if (contactMethod === 'phone' && phone.length !== 10) throw buildAuthError('A valid 10-digit phone number is required')
  if (!payload.location?.trim()) throw buildAuthError('Location is required')
  if (verificationMethod === 'gstin' && !payload.gstin?.trim()) throw buildAuthError('GSTIN is required')
  if (verificationMethod === 'udyam' && !payload.businessDoc?.trim()) throw buildAuthError('Business registration number is required')

  const existingCompany = await Company.findOne({
    $or: [
      ...(email ? [{ email }] : []),
      ...(phone ? [{ phone }] : []),
    ],
  })

  if (existingCompany) {
    throw buildAuthError('A company account with this contact already exists.', 409)
  }

  const businessName = payload.companyName.trim()
  const location = payload.location.trim()

  const company = await Company.create({
    businessName,
    email: email || undefined,
    phone: phone || undefined,
    passwordHash: hashPassword(payload.password),
    contactMethod,
    verificationMethod,
    gstin: verificationMethod === 'gstin' ? payload.gstin.trim() : '',
    businessDoc: verificationMethod === 'udyam' ? payload.businessDoc.trim() : '',
    location,
    businessProfile: buildDefaultCompanyProfile({ businessName, location }),
    dashboardState: buildDefaultCompanyDashboardState(),
    gigManagementState: buildDefaultCompanyGigManagementState(),
    projectWorkspaceState: buildDefaultCompanyWorkspaceState(),
    paymentState: buildDefaultCompanyPaymentState(),
  })

  const token = createSessionToken()
  company.sessions.push({ token })
  await company.save()

  return {
    token,
    company: sanitizeCompany(company),
  }
}

async function signInCompany(payload) {
  const contact = payload.contact?.trim() || ''

  if (!contact) throw buildAuthError('Email or phone is required')
  if (!payload.password) throw buildAuthError('Password is required')

  const email = normalizeEmail(contact)
  const phone = normalizePhone(contact)
  const company = await Company.findOne({
    $or: [
      { email },
      { phone },
    ],
  })

  if (!company || !verifyPassword(payload.password, company.passwordHash)) {
    throw buildAuthError('Invalid credentials', 401)
  }

  const token = createSessionToken()
  company.sessions.push({ token })
  await company.save()

  return {
    token,
    company: sanitizeCompany(company),
  }
}

async function getCurrentCompany(token) {
  const company = await findCompanyByToken(token)
  return sanitizeCompany(company)
}

async function updateCurrentCompany(token, payload) {
  const company = await findCompanyByToken(token)
  const fallbackProfile = buildDefaultCompanyProfile({
    businessName: company.businessName,
    location: company.location,
  })

  if (payload.businessProfile) {
    const businessProfile = sanitizeCompanyProfile(payload.businessProfile, fallbackProfile)
    company.businessProfile = businessProfile

    if (businessProfile.businessName.trim()) {
      company.businessName = businessProfile.businessName.trim()
    }

    company.location = businessProfile.location.trim()
  }

  if (payload.dashboardState) {
    company.dashboardState = sanitizeDashboardState(payload.dashboardState)
  }

  if (payload.gigManagementState) {
    company.gigManagementState = sanitizeGigManagementState(payload.gigManagementState)
  }

  if (payload.projectWorkspaceState) {
    company.projectWorkspaceState = sanitizeProjectWorkspaceState(payload.projectWorkspaceState)
  }

  if (payload.paymentState) {
    company.paymentState = sanitizePaymentState(payload.paymentState)
  }

  await company.save()

  return sanitizeCompany(company)
}

async function logoutCurrentCompany(token) {
  const company = await findCompanyByToken(token)
  company.sessions = company.sessions.filter(session => session.token !== token)
  await company.save()
}

async function getCurrentCompanyGigManagementState(token) {
  const company = await findCompanyByToken(token)
  return sanitizeGigManagementState(company.gigManagementState)
}

async function updateCurrentCompanyGigManagementState(token, payload) {
  const company = await findCompanyByToken(token)
  company.gigManagementState = sanitizeGigManagementState(payload.gigManagementState)
  await company.save()
  return sanitizeGigManagementState(company.gigManagementState)
}

async function getCurrentCompanyProjectWorkspaceState(token) {
  const company = await findCompanyByToken(token)
  return sanitizeProjectWorkspaceState(company.projectWorkspaceState)
}

async function updateCurrentCompanyProjectWorkspaceState(token, payload) {
  const company = await findCompanyByToken(token)
  company.projectWorkspaceState = sanitizeProjectWorkspaceState(payload.projectWorkspaceState)
  await company.save()
  return sanitizeProjectWorkspaceState(company.projectWorkspaceState)
}

async function getCurrentCompanyPaymentState(token) {
  const company = await findCompanyByToken(token)
  return sanitizePaymentState(company.paymentState)
}

async function updateCurrentCompanyPaymentState(token, payload) {
  const company = await findCompanyByToken(token)
  company.paymentState = sanitizePaymentState(payload.paymentState)
  await company.save()
  return sanitizePaymentState(company.paymentState)
}

async function getCompanyTalentProfiles(token) {
  await findCompanyByToken(token)
  const students = await Student.find().sort({ createdAt: -1 })
  return students.map(sanitizeTalentProfile)
}

module.exports = {
  getCurrentCompany,
  getCurrentCompanyGigManagementState,
  getCurrentCompanyPaymentState,
  getCurrentCompanyProjectWorkspaceState,
  getCompanyTalentProfiles,
  logoutCurrentCompany,
  signInCompany,
  signUpCompany,
  updateCurrentCompany,
  updateCurrentCompanyGigManagementState,
  updateCurrentCompanyPaymentState,
  updateCurrentCompanyProjectWorkspaceState,
}
