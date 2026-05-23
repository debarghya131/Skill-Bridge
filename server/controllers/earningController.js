const Student = require('../models/Student')
const { buildDefaultEarningState } = require('../config/earningDefaults')
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

function sanitizeString(value, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function sanitizeWalletStats(list, fallback) {
  if (!Array.isArray(list)) {
    return clone(fallback)
  }

  return list.map((item, index) => ({
    label: sanitizeString(item?.label, fallback[index]?.label || ''),
    value: sanitizeString(item?.value, fallback[index]?.value || ''),
    tone: sanitizeString(item?.tone, fallback[index]?.tone || '#10B981'),
  }))
}

function sanitizePaymentHistory(list, fallback) {
  if (!Array.isArray(list)) {
    return clone(fallback)
  }

  return list.map((item, index) => ({
    id: Number(item?.id) || fallback[index]?.id || Date.now() + index,
    title: sanitizeString(item?.title, ''),
    company: sanitizeString(item?.company, ''),
    amount: sanitizeString(item?.amount, ''),
    date: sanitizeString(item?.date, ''),
    status: sanitizeString(item?.status, 'Processing'),
  }))
}

function sanitizeUpiAccounts(list, fallback) {
  if (!Array.isArray(list)) {
    return clone(fallback)
  }

  return list.map((item, index) => ({
    id: sanitizeString(item?.id, fallback[index]?.id || `upi-${index + 1}`),
    label: sanitizeString(item?.label, fallback[index]?.label || ''),
    value: sanitizeString(item?.value, fallback[index]?.value || ''),
  }))
}

function sanitizeEarningState(earningState) {
  const fallback = buildDefaultEarningState()
  const mergedState = mergeTemplateState(fallback, earningState)

  return {
    walletStats: sanitizeWalletStats(mergedState?.walletStats, fallback.walletStats),
    availableNow: sanitizeString(mergedState?.availableNow, fallback.availableNow),
    paymentHistory: sanitizePaymentHistory(mergedState?.paymentHistory, fallback.paymentHistory),
    upiAccounts: sanitizeUpiAccounts(mergedState?.upiAccounts, fallback.upiAccounts),
    selectedUpi: sanitizeString(mergedState?.selectedUpi, fallback.selectedUpi),
    withdrawAmount: sanitizeString(mergedState?.withdrawAmount, fallback.withdrawAmount),
  }
}

async function getStudentEarningState(token) {
  const student = await findStudentByToken(token)
  return sanitizeEarningState(student.earningState)
}

async function updateStudentEarningState(token, payload) {
  const student = await findStudentByToken(token)
  const nextState = sanitizeEarningState(payload.earningState)
  student.earningState = reduceTemplateState(nextState, buildDefaultEarningState())
  await student.save()
  return nextState
}

module.exports = {
  getStudentEarningState,
  updateStudentEarningState,
}
