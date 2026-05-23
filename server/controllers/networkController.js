const Student = require('../models/Student')
const { buildDefaultNetworkState } = require('../config/networkDefaults')
const { clone, mergeTemplateState, reduceTemplateState } = require('../utils/templateState')

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
  const nextState = sanitizeNetworkState(payload.networkState)
  student.networkState = reduceTemplateState(nextState, buildDefaultNetworkState())
  await student.save()
  return nextState
}

module.exports = {
  getStudentNetworkState,
  updateStudentNetworkState,
}
