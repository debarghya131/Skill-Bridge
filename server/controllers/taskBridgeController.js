const Company = require('../models/Company')
const Student = require('../models/Student')
const TaskSubmission = require('../models/TaskSubmission')
const { buildDefaultCompanyGigManagementState } = require('../config/companyGigDefaults')
const { mergeTemplateState, clone } = require('../utils/templateState')

function buildAuthError(message, statusCode = 400) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

async function findStudentByToken(token) {
  if (!token) {
    throw buildAuthError('Missing session token', 401)
  }

  const student = await Student.findOne({ 'sessions.token': token })

  if (!student) {
    throw buildAuthError('Session expired. Please sign in again.', 401)
  }

  return student
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

function sanitizeGigManagementState(state) {
  const fallback = buildDefaultCompanyGigManagementState()
  const mergedState = mergeTemplateState(fallback, state)

  return {
    gigs: Array.isArray(mergedState?.gigs) ? clone(mergedState.gigs) : fallback.gigs,
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
    if (
      !groupedSkills.Beginner.includes(skill)
      && !groupedSkills.Intermediate.includes(skill)
      && !groupedSkills.Pro.includes(skill)
    ) {
      groupedSkills.Intermediate.push(skill)
    }
  })

  return groupedSkills
}

function sanitizeTaskSubmission(submission) {
  if (!submission) {
    return null
  }

  return {
    id: submission._id.toString(),
    studentId: submission.studentId.toString(),
    studentName: submission.studentName,
    studentLocation: submission.studentLocation || '',
    studentTrustScore: Number(submission.studentTrustScore) || 0,
    studentSkills: Array.isArray(submission.studentSkills) ? submission.studentSkills : [],
    studentSkillsByLevel: submission.studentSkillsByLevel || {},
    studentStreak: Number(submission.studentStreak) || 0,
    studentGithub: submission.studentGithub || '',
    studentContactInfo: Array.isArray(submission.studentContactInfo) ? submission.studentContactInfo : [],
    studentProjects: Array.isArray(submission.studentProjects) ? submission.studentProjects : [],
    studentVideoUrl: submission.studentVideoUrl || null,
    opportunityId: submission.opportunityId,
    gigTitle: submission.gigTitle,
    companyName: submission.companyName || '',
    companyLocation: submission.companyLocation || '',
    matchedSkills: Array.isArray(submission.matchedSkills) ? submission.matchedSkills : [],
    submissionLink: submission.submissionLink,
    note: submission.note || '',
    status: submission.status,
    feedback: submission.feedback || '',
    submittedAt: submission.submittedAt ? submission.submittedAt.toISOString() : null,
    reviewedAt: submission.reviewedAt ? submission.reviewedAt.toISOString() : null,
    createdAt: submission.createdAt ? submission.createdAt.toISOString() : null,
    updatedAt: submission.updatedAt ? submission.updatedAt.toISOString() : null,
  }
}

function normalizeTaskIdentity(payload) {
  const gigTitle = typeof payload?.gigTitle === 'string' ? payload.gigTitle.trim() : ''
  const opportunityId = Number.isFinite(Number(payload?.opportunityId)) ? Number(payload.opportunityId) : null

  if (!gigTitle) {
    throw buildAuthError('GIG title is required')
  }

  return {
    gigTitle,
    opportunityId,
  }
}

function buildStudentTaskProfile(student) {
  const skills = Array.isArray(student.skills) ? student.skills.filter(skill => typeof skill === 'string' && skill.trim()) : []
  const projects = Array.isArray(student.projects)
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
    studentName: student.name,
    studentLocation: student.location || '',
    studentTrustScore: Number(student.trustScore) || 0,
    studentSkills: skills,
    studentSkillsByLevel: skillsByLevel,
    studentStreak: streak,
    studentGithub: Array.isArray(student.githubLink) && student.githubLink[0] ? student.githubLink[0].url : '',
    studentContactInfo: Array.isArray(student.contactInfo) ? student.contactInfo : [],
    studentProjects: projects,
    studentVideoUrl: student.videoUrl || null,
  }
}

async function getStudentCompanyInterviewTask(token, payload) {
  const student = await findStudentByToken(token)
  const { gigTitle, opportunityId } = normalizeTaskIdentity(payload)

  const query = {
    studentId: student._id,
    gigTitle,
  }

  if (opportunityId !== null) {
    query.opportunityId = opportunityId
  }

  const taskSubmission = await TaskSubmission.findOne(query).sort({ updatedAt: -1 })
  return sanitizeTaskSubmission(taskSubmission)
}

async function submitStudentCompanyInterviewTask(token, payload) {
  const student = await findStudentByToken(token)
  const { gigTitle, opportunityId } = normalizeTaskIdentity(payload)
  const submissionLink = typeof payload?.submissionLink === 'string' ? payload.submissionLink.trim() : ''
  const note = typeof payload?.note === 'string' ? payload.note.trim() : ''
  const companyName = typeof payload?.companyName === 'string' ? payload.companyName.trim() : ''
  const companyLocation = typeof payload?.companyLocation === 'string' ? payload.companyLocation.trim() : ''
  const matchedSkills = Array.isArray(payload?.matchedSkills)
    ? payload.matchedSkills.filter(skill => typeof skill === 'string' && skill.trim())
    : []

  if (!submissionLink) {
    throw buildAuthError('Submission link is required')
  }

  const profile = buildStudentTaskProfile(student)
  const query = {
    studentId: student._id,
    gigTitle,
  }

  if (opportunityId !== null) {
    query.opportunityId = opportunityId
  }

  const taskSubmission = await TaskSubmission.findOneAndUpdate(
    query,
    {
      $set: {
        ...profile,
        gigTitle,
        opportunityId,
        companyName,
        companyLocation,
        matchedSkills,
        submissionLink,
        note,
        status: 'submitted',
        feedback: '',
        reviewedAt: null,
        submittedAt: new Date(),
      },
      $setOnInsert: {
        studentId: student._id,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  )

  return sanitizeTaskSubmission(taskSubmission)
}

async function getCompanyTaskSubmissions(token) {
  const company = await findCompanyByToken(token)
  const gigTitles = sanitizeGigManagementState(company.gigManagementState).gigs
    .map(gig => gig.title)
    .filter(Boolean)

  if (gigTitles.length === 0) {
    return []
  }

  const submissions = await TaskSubmission.find({
    gigTitle: { $in: gigTitles },
  }).sort({ submittedAt: -1, updatedAt: -1 })

  return submissions.map(sanitizeTaskSubmission)
}

async function reviewCompanyTaskSubmission(token, submissionId, payload) {
  const company = await findCompanyByToken(token)
  const gigTitles = sanitizeGigManagementState(company.gigManagementState).gigs
    .map(gig => gig.title)
    .filter(Boolean)

  const taskSubmission = await TaskSubmission.findById(submissionId)

  if (!taskSubmission) {
    throw buildAuthError('Task submission not found', 404)
  }

  if (!gigTitles.includes(taskSubmission.gigTitle)) {
    throw buildAuthError('You can only review submissions for your own GIGs', 403)
  }

  const allowedStatuses = new Set(['reviewed', 'ready_to_hire', 'needs_revision'])
  const nextStatus = typeof payload?.status === 'string' ? payload.status : ''

  if (!allowedStatuses.has(nextStatus)) {
    throw buildAuthError('A valid review status is required')
  }

  taskSubmission.status = nextStatus
  taskSubmission.feedback = typeof payload?.feedback === 'string' ? payload.feedback.trim() : ''
  taskSubmission.reviewedAt = new Date()

  await taskSubmission.save()

  return sanitizeTaskSubmission(taskSubmission)
}

module.exports = {
  getCompanyTaskSubmissions,
  getStudentCompanyInterviewTask,
  reviewCompanyTaskSubmission,
  submitStudentCompanyInterviewTask,
}
