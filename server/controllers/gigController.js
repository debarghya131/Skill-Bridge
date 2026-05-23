const Student = require('../models/Student')
const { buildDefaultGigState } = require('../config/gigDefaults')

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

function ensureGigState(student) {
  if (!student.gigState) {
    student.gigState = buildDefaultGigState()
  }

  if (!Array.isArray(student.gigState.opportunities) || student.gigState.opportunities.length === 0) {
    student.gigState.opportunities = buildDefaultGigState().opportunities
  }

  if (!Array.isArray(student.gigState.browseGigs) || student.gigState.browseGigs.length === 0) {
    student.gigState.browseGigs = buildDefaultGigState().browseGigs
  }

  if (!Array.isArray(student.gigState.savedGigIds)) {
    student.gigState.savedGigIds = buildDefaultGigState().savedGigIds
  }

  if (!Array.isArray(student.gigState.appliedGigIds)) {
    student.gigState.appliedGigIds = buildDefaultGigState().appliedGigIds
  }

  if (!Array.isArray(student.gigState.activeGigBase) || student.gigState.activeGigBase.length === 0) {
    student.gigState.activeGigBase = buildDefaultGigState().activeGigBase
  }

  if (!Array.isArray(student.gigState.completedGigs) || student.gigState.completedGigs.length === 0) {
    student.gigState.completedGigs = buildDefaultGigState().completedGigs
  }
}

function sanitizeGigState(student) {
  ensureGigState(student)

  return {
    opportunities: student.gigState.opportunities,
    browseGigs: student.gigState.browseGigs,
    savedGigIds: student.gigState.savedGigIds,
    appliedGigIds: student.gigState.appliedGigIds,
    activeGigBase: student.gigState.activeGigBase,
    completedGigs: student.gigState.completedGigs,
  }
}

async function getStudentGigState(token) {
  const student = await findStudentByToken(token)
  ensureGigState(student)
  await student.save()
  return sanitizeGigState(student)
}

async function applyToGig(token, gigId) {
  const student = await findStudentByToken(token)
  ensureGigState(student)

  const numericGigId = Number(gigId)
  const gigExists = student.gigState.browseGigs.some(gig => gig.id === numericGigId)

  if (!gigExists) {
    throw buildAuthError('GIG not found', 404)
  }

  if (!student.gigState.appliedGigIds.includes(numericGigId)) {
    student.gigState.appliedGigIds.push(numericGigId)
  }

  await student.save()
  return sanitizeGigState(student)
}

async function saveGig(token, gigId) {
  const student = await findStudentByToken(token)
  ensureGigState(student)

  const numericGigId = Number(gigId)
  const gigExists = student.gigState.browseGigs.some(gig => gig.id === numericGigId)

  if (!gigExists) {
    throw buildAuthError('GIG not found', 404)
  }

  if (!student.gigState.savedGigIds.includes(numericGigId)) {
    student.gigState.savedGigIds.push(numericGigId)
  }

  await student.save()
  return sanitizeGigState(student)
}

async function unsaveGig(token, gigId) {
  const student = await findStudentByToken(token)
  ensureGigState(student)

  const numericGigId = Number(gigId)
  student.gigState.savedGigIds = student.gigState.savedGigIds.filter(id => id !== numericGigId)

  await student.save()
  return sanitizeGigState(student)
}

async function acceptOpportunity(token, opportunityId) {
  const student = await findStudentByToken(token)
  ensureGigState(student)

  const numericOpportunityId = Number(opportunityId)
  const opportunity = student.gigState.opportunities.find(item => item.id === numericOpportunityId)

  if (!opportunity) {
    throw buildAuthError('Opportunity not found', 404)
  }

  opportunity.status = 'accepted'
  await student.save()
  return sanitizeGigState(student)
}

async function declineOpportunity(token, opportunityId) {
  const student = await findStudentByToken(token)
  ensureGigState(student)

  const numericOpportunityId = Number(opportunityId)
  const opportunity = student.gigState.opportunities.find(item => item.id === numericOpportunityId)

  if (!opportunity) {
    throw buildAuthError('Opportunity not found', 404)
  }

  opportunity.status = 'declined'
  await student.save()
  return sanitizeGigState(student)
}

module.exports = {
  acceptOpportunity,
  applyToGig,
  declineOpportunity,
  getStudentGigState,
  saveGig,
  unsaveGig,
}
