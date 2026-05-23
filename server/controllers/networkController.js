const Student = require('../models/Student')
const { buildDefaultNetworkState } = require('../config/networkDefaults')
const { consumeSectionOperation } = require('../utils/sectionUsage')
const { clone, mergeTemplateState, reduceTemplateState } = require('../utils/templateState')
const { findModelByActiveToken, getSessionTtlMs } = require('../utils/session')

async function findStudentByToken(token) {
  return findModelByActiveToken(Student, token, 'Student', getSessionTtlMs(Number(process.env.SESSION_TTL_DAYS) || 30))
}

function sanitizeIdList(list, fallback) {
  if (!Array.isArray(list)) {
    return clone(fallback)
  }

  return Array.from(new Set(list.map(item => Number(item)).filter(Number.isFinite)))
}

function sanitizeList(list, fallback) {
  return Array.isArray(list) ? clone(list) : clone(fallback)
}

function sanitizeNetworkState(networkState) {
  const fallback = buildDefaultNetworkState()
  const mergedState = mergeTemplateState(fallback, networkState)

  return {
    home: {
      connectRequests: sanitizeIdList(mergedState?.home?.connectRequests, fallback.home.connectRequests),
      teamUpRequests: sanitizeIdList(mergedState?.home?.teamUpRequests, fallback.home.teamUpRequests),
    },
    myNetwork: {
      people: sanitizeList(mergedState?.myNetwork?.people, fallback.myNetwork.people),
      activity: sanitizeList(mergedState?.myNetwork?.activity, fallback.myNetwork.activity),
      teamUpRequests: sanitizeIdList(mergedState?.myNetwork?.teamUpRequests, fallback.myNetwork.teamUpRequests),
    },
    teamUp: {
      myRequests: sanitizeList(mergedState?.teamUp?.myRequests, fallback.teamUp.myRequests),
      incoming: sanitizeList(mergedState?.teamUp?.incoming, fallback.teamUp.incoming),
      accepted: sanitizeList(mergedState?.teamUp?.accepted, fallback.teamUp.accepted),
      sentRequests: sanitizeList(mergedState?.teamUp?.sentRequests, fallback.teamUp.sentRequests),
    },
  }
}

async function getStudentNetworkState(token) {
  const student = await findStudentByToken(token)
  return sanitizeNetworkState(student.networkState)
}

async function updateStudentNetworkState(token, payload) {
  const student = await findStudentByToken(token)
  const currentState = sanitizeNetworkState(student.networkState)
  const nextState = sanitizeNetworkState(payload.networkState)

  if (JSON.stringify(currentState) !== JSON.stringify(nextState)) {
    consumeSectionOperation(
      student,
      'network',
      'Network',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
  }

  student.networkState = reduceTemplateState(nextState, buildDefaultNetworkState())
  await student.save()
  return nextState
}

module.exports = {
  getStudentNetworkState,
  updateStudentNetworkState,
}
