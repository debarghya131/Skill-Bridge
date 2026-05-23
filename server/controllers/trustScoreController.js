const Student = require('../models/Student')
const { buildTrustScoreFactors, buildTrustScoreSummary } = require('../config/trustScoreDefaults')

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

async function getStudentTrustScore(token) {
  const student = await findStudentByToken(token)
  const factors = buildTrustScoreFactors(student)
  const summary = buildTrustScoreSummary(factors)

  return {
    trustScore: student.trustScore,
    factors,
    summary,
  }
}

module.exports = {
  getStudentTrustScore,
}
