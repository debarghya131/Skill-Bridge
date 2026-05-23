const Student = require('../models/Student')
const { buildDefaultSkillHubSkills } = require('../config/skillHubDefaults')

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

function sanitizeSkill(skill) {
  return {
    name: typeof skill.name === 'string' ? skill.name : '',
    level: Number(skill.level) || 0,
    stage: typeof skill.stage === 'string' ? skill.stage : 'Beginner',
    category: typeof skill.category === 'string' ? skill.category : 'Frontend',
    verified: skill.verified === true,
    renewalStatus: typeof skill.renewalStatus === 'string' ? skill.renewalStatus : 'unverified',
    renewalDue: typeof skill.renewalDue === 'string' ? skill.renewalDue : '-',
    trustGain: Number(skill.trustGain) || 0,
    trustLoss: Number(skill.trustLoss) || 0,
    createdOn: typeof skill.createdOn === 'string' ? skill.createdOn : '',
    lastEvent: typeof skill.lastEvent === 'string' ? skill.lastEvent : 'created',
    streak: Number(skill.streak) || 0,
    missedDays: Number(skill.missedDays) || 0,
  }
}

function syncProfileSkills(student) {
  const mergedSkills = buildStudentSkillHubSkills(student)
  student.skills = mergedSkills.map(skill => skill.name).filter(Boolean)
}

function buildStudentSkillHubSkills(student) {
  const defaults = buildDefaultSkillHubSkills().map(sanitizeSkill)
  const defaultNames = new Set(defaults.map(skill => skill.name.toLowerCase()))
  const addedSkills = Array.isArray(student.skillHubSkills)
    ? student.skillHubSkills
      .map(sanitizeSkill)
      .filter(skill => skill.name && !defaultNames.has(skill.name.toLowerCase()))
    : []

  return [...defaults, ...addedSkills]
}

async function getStudentSkillHub(token) {
  const student = await findStudentByToken(token)
  const mergedSkills = buildStudentSkillHubSkills(student)
  student.skills = mergedSkills.map(skill => skill.name).filter(Boolean)
  await student.save()

  return {
    skills: mergedSkills,
  }
}

async function updateStudentSkillHub(token, payload) {
  const student = await findStudentByToken(token)
  const defaults = buildDefaultSkillHubSkills().map(sanitizeSkill)
  const defaultNames = new Set(defaults.map(skill => skill.name.toLowerCase()))

  if (Array.isArray(payload.skills)) {
    student.skillHubSkills = payload.skills
      .map(sanitizeSkill)
      .filter(skill => skill.name && !defaultNames.has(skill.name.toLowerCase()))
  }

  syncProfileSkills(student)
  await student.save()

  return {
    skills: buildStudentSkillHubSkills(student),
  }
}

module.exports = {
  getStudentSkillHub,
  updateStudentSkillHub,
}
