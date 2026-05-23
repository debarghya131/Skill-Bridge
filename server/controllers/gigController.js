const Student = require('../models/Student')
const TaskSubmission = require('../models/TaskSubmission')
const { buildDefaultGigState } = require('../config/gigDefaults')
const { consumeSectionOperation } = require('../utils/sectionUsage')
const { reduceTemplateState } = require('../utils/templateState')
const { buildAuthError, findModelByActiveToken, getSessionTtlMs } = require('../utils/session')

async function findStudentByToken(token) {
  return findModelByActiveToken(Student, token, 'Student', getSessionTtlMs(Number(process.env.SESSION_TTL_DAYS) || 30))
}

function buildBridgeActiveGig(opportunity) {
  return {
    id: 800 + opportunity.id,
    company: opportunity.company,
    location: opportunity.location,
    workMode: opportunity.location === 'Remote' ? 'Remote' : 'Hybrid',
    title: opportunity.title,
    budget: opportunity.stipend,
    tags: Array.isArray(opportunity.matchedSkills) ? opportunity.matchedSkills : [],
    posted: 'Task bridge activated',
    progress: opportunity.taskSubmissionStatus === 'ready_to_hire'
      ? 'Company marked you ready to hire'
      : 'Company reviewed your interview task',
    bridgeStatus: opportunity.taskSubmissionStatus,
  }
}

async function buildGigState(student) {
  const defaults = buildDefaultGigState()
  const savedGigIds = Array.isArray(student.gigState?.savedGigIds)
    ? student.gigState.savedGigIds.map(Number).filter(Number.isFinite)
    : defaults.savedGigIds
  const appliedGigIds = Array.isArray(student.gigState?.appliedGigIds)
    ? student.gigState.appliedGigIds.map(Number).filter(Number.isFinite)
    : defaults.appliedGigIds
  const legacyStatuses = Array.isArray(student.gigState?.opportunities)
    ? student.gigState.opportunities.reduce((acc, item) => {
      if (item && Number.isFinite(Number(item.id)) && typeof item.status === 'string') {
        acc[item.id] = item.status
      }
      return acc
    }, {})
    : {}
  const statusOverrides = student.gigState?.opportunityStatusById && typeof student.gigState.opportunityStatusById === 'object'
    ? { ...legacyStatuses, ...student.gigState.opportunityStatusById }
    : legacyStatuses
  const taskSubmissions = await TaskSubmission.find({ studentId: student._id }).sort({ updatedAt: -1 })
  const submissionsByOpportunityId = new Map()
  const submissionsByGigTitle = new Map()

  taskSubmissions.forEach(submission => {
    if (Number.isFinite(Number(submission.opportunityId)) && !submissionsByOpportunityId.has(Number(submission.opportunityId))) {
      submissionsByOpportunityId.set(Number(submission.opportunityId), submission)
    }

    if (submission.gigTitle && !submissionsByGigTitle.has(submission.gigTitle)) {
      submissionsByGigTitle.set(submission.gigTitle, submission)
    }
  })

  const opportunities = defaults.opportunities.map(item => ({
    ...item,
    status: typeof statusOverrides[item.id] === 'string' ? statusOverrides[item.id] : item.status,
  })).map(item => {
    const linkedSubmission = submissionsByOpportunityId.get(item.id) || submissionsByGigTitle.get(item.title)

    if (!linkedSubmission) {
      return item
    }

    return {
      ...item,
      taskSubmissionStatus: linkedSubmission.status,
      companyFeedback: linkedSubmission.feedback || '',
      submissionLink: linkedSubmission.submissionLink || '',
    }
  })

  const bridgeActiveGigs = opportunities
    .filter(item => item.taskSubmissionStatus === 'ready_to_hire' || item.taskSubmissionStatus === 'reviewed')
    .map(buildBridgeActiveGig)

  return {
    opportunities,
    browseGigs: defaults.browseGigs,
    savedGigIds,
    appliedGigIds,
    activeGigBase: [...bridgeActiveGigs, ...defaults.activeGigBase],
    completedGigs: defaults.completedGigs,
  }
}

function persistGigState(student, gigState) {
  const defaults = buildDefaultGigState()
  const opportunityStatusById = gigState.opportunities.reduce((acc, item, index) => {
    const defaultStatus = defaults.opportunities[index]?.status
    if (item.status && item.status !== defaultStatus) {
      acc[item.id] = item.status
    }
    return acc
  }, {})

  const nextState = {
    savedGigIds: gigState.savedGigIds,
    appliedGigIds: gigState.appliedGigIds,
    opportunityStatusById,
  }

  student.gigState = reduceTemplateState(nextState, {
    savedGigIds: defaults.savedGigIds,
    appliedGigIds: defaults.appliedGigIds,
    opportunityStatusById: {},
  })
}

async function getStudentGigState(token) {
  const student = await findStudentByToken(token)
  return buildGigState(student)
}

async function applyToGig(token, gigId) {
  const student = await findStudentByToken(token)
  const gigState = await buildGigState(student)

  const numericGigId = Number(gigId)
  const gigExists = gigState.browseGigs.some(gig => gig.id === numericGigId)

  if (!gigExists) {
    throw buildAuthError('GIG not found', 404)
  }

  if (!gigState.appliedGigIds.includes(numericGigId)) {
    consumeSectionOperation(
      student,
      'gig-center',
      'GIG Center',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
    gigState.appliedGigIds.push(numericGigId)
  }

  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function saveGig(token, gigId) {
  const student = await findStudentByToken(token)
  const gigState = await buildGigState(student)

  const numericGigId = Number(gigId)
  const gigExists = gigState.browseGigs.some(gig => gig.id === numericGigId)

  if (!gigExists) {
    throw buildAuthError('GIG not found', 404)
  }

  if (!gigState.savedGigIds.includes(numericGigId)) {
    consumeSectionOperation(
      student,
      'gig-center',
      'GIG Center',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
    gigState.savedGigIds.push(numericGigId)
  }

  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function unsaveGig(token, gigId) {
  const student = await findStudentByToken(token)
  const gigState = await buildGigState(student)

  const numericGigId = Number(gigId)
  const wasSaved = gigState.savedGigIds.includes(numericGigId)

  if (wasSaved) {
    consumeSectionOperation(
      student,
      'gig-center',
      'GIG Center',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
  }

  gigState.savedGigIds = gigState.savedGigIds.filter(id => id !== numericGigId)

  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function acceptOpportunity(token, opportunityId) {
  const student = await findStudentByToken(token)
  const gigState = await buildGigState(student)

  const numericOpportunityId = Number(opportunityId)
  const opportunity = gigState.opportunities.find(item => item.id === numericOpportunityId)

  if (!opportunity) {
    throw buildAuthError('Opportunity not found', 404)
  }

  if (opportunity.status !== 'accepted') {
    consumeSectionOperation(
      student,
      'gig-center',
      'GIG Center',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
    opportunity.status = 'accepted'
  }
  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function declineOpportunity(token, opportunityId) {
  const student = await findStudentByToken(token)
  const gigState = await buildGigState(student)

  const numericOpportunityId = Number(opportunityId)
  const opportunity = gigState.opportunities.find(item => item.id === numericOpportunityId)

  if (!opportunity) {
    throw buildAuthError('Opportunity not found', 404)
  }

  if (opportunity.status !== 'declined') {
    consumeSectionOperation(
      student,
      'gig-center',
      'GIG Center',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
    opportunity.status = 'declined'
  }
  persistGigState(student, gigState)
  await student.save()
  return gigState
}

module.exports = {
  acceptOpportunity,
  applyToGig,
  declineOpportunity,
  getStudentGigState,
  saveGig,
  unsaveGig,
}
