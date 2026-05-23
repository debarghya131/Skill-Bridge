const Student = require('../models/Student')
const { buildTrustScoreFactors, buildTrustScoreSummary } = require('../config/trustScoreDefaults')
const { findModelByActiveToken, getSessionTtlMs } = require('../utils/session')

async function findStudentByToken(token) {
  return findModelByActiveToken(Student, token, 'Student', getSessionTtlMs(Number(process.env.SESSION_TTL_DAYS) || 30))
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
