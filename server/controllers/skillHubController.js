const Student = require('../models/Student')
const { buildDefaultSkillHubSkills } = require('../config/skillHubDefaults')
const { consumeSectionOperation } = require('../utils/sectionUsage')
const { findModelByActiveToken, getSessionTtlMs } = require('../utils/session')

async function findStudentByToken(token) {
  return findModelByActiveToken(Student, token, 'Student', getSessionTtlMs(Number(process.env.SESSION_TTL_DAYS) || 30))
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

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right)
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
  const currentSkills = buildStudentSkillHubSkills(student)

  if (Array.isArray(payload.skills)) {
    const nextCustomSkills = payload.skills
      .map(sanitizeSkill)
      .filter(skill => skill.name && !defaultNames.has(skill.name.toLowerCase()))

    const nextSkills = [...defaults, ...nextCustomSkills]

    if (!sameJson(currentSkills, nextSkills)) {
      consumeSectionOperation(
        student,
        'skill-hub',
        'Skill Hub',
        Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
      )
    }

    student.skillHubSkills = nextCustomSkills
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
