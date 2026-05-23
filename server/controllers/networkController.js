const Student = require('../models/Student')
const { buildDefaultNetworkState } = require('../config/networkDefaults')

function buildAuthError(message, statusCode = 400) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
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

  return {
    home: {
      connectRequests: sanitizeIdList(networkState?.home?.connectRequests, fallback.home.connectRequests),
      teamUpRequests: sanitizeIdList(networkState?.home?.teamUpRequests, fallback.home.teamUpRequests),
    },
    myNetwork: {
      people: sanitizeList(networkState?.myNetwork?.people, fallback.myNetwork.people),
      activity: sanitizeList(networkState?.myNetwork?.activity, fallback.myNetwork.activity),
      teamUpRequests: sanitizeIdList(networkState?.myNetwork?.teamUpRequests, fallback.myNetwork.teamUpRequests),
    },
    teamUp: {
      myRequests: sanitizeList(networkState?.teamUp?.myRequests, fallback.teamUp.myRequests),
      incoming: sanitizeList(networkState?.teamUp?.incoming, fallback.teamUp.incoming),
      accepted: sanitizeList(networkState?.teamUp?.accepted, fallback.teamUp.accepted),
      sentRequests: sanitizeList(networkState?.teamUp?.sentRequests, fallback.teamUp.sentRequests),
    },
  }
}

function ensureNetworkState(student) {
  student.networkState = sanitizeNetworkState(student.networkState)
}

async function getStudentNetworkState(token) {
  const student = await findStudentByToken(token)
  ensureNetworkState(student)
  await student.save()
  return student.networkState
}

async function updateStudentNetworkState(token, payload) {
  const student = await findStudentByToken(token)
  student.networkState = sanitizeNetworkState(payload.networkState)
  await student.save()
  return student.networkState
}

module.exports = {
  getStudentNetworkState,
  updateStudentNetworkState,
}
