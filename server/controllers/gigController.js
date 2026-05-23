const Student = require('../models/Student')
const { buildDefaultGigState } = require('../config/gigDefaults')
const { reduceTemplateState } = require('../utils/templateState')

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

function buildGigState(student) {
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

  const opportunities = defaults.opportunities.map(item => ({
    ...item,
    status: typeof statusOverrides[item.id] === 'string' ? statusOverrides[item.id] : item.status,
  }))

  return {
    opportunities,
    browseGigs: defaults.browseGigs,
    savedGigIds,
    appliedGigIds,
    activeGigBase: defaults.activeGigBase,
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
  const gigState = buildGigState(student)

  const numericGigId = Number(gigId)
  const gigExists = gigState.browseGigs.some(gig => gig.id === numericGigId)

  if (!gigExists) {
    throw buildAuthError('GIG not found', 404)
  }

  if (!gigState.appliedGigIds.includes(numericGigId)) {
    gigState.appliedGigIds.push(numericGigId)
  }

  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function saveGig(token, gigId) {
  const student = await findStudentByToken(token)
  const gigState = buildGigState(student)

  const numericGigId = Number(gigId)
  const gigExists = gigState.browseGigs.some(gig => gig.id === numericGigId)

  if (!gigExists) {
    throw buildAuthError('GIG not found', 404)
  }

  if (!gigState.savedGigIds.includes(numericGigId)) {
    gigState.savedGigIds.push(numericGigId)
  }

  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function unsaveGig(token, gigId) {
  const student = await findStudentByToken(token)
  const gigState = buildGigState(student)

  const numericGigId = Number(gigId)
  gigState.savedGigIds = gigState.savedGigIds.filter(id => id !== numericGigId)

  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function acceptOpportunity(token, opportunityId) {
  const student = await findStudentByToken(token)
  const gigState = buildGigState(student)

  const numericOpportunityId = Number(opportunityId)
  const opportunity = gigState.opportunities.find(item => item.id === numericOpportunityId)

  if (!opportunity) {
    throw buildAuthError('Opportunity not found', 404)
  }

  opportunity.status = 'accepted'
  persistGigState(student, gigState)
  await student.save()
  return gigState
}

async function declineOpportunity(token, opportunityId) {
  const student = await findStudentByToken(token)
  const gigState = buildGigState(student)

  const numericOpportunityId = Number(opportunityId)
  const opportunity = gigState.opportunities.find(item => item.id === numericOpportunityId)

  if (!opportunity) {
    throw buildAuthError('Opportunity not found', 404)
  }

  opportunity.status = 'declined'
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
