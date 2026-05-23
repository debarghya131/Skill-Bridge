const Student = require('../models/Student')
const { buildDefaultEarningState } = require('../config/earningDefaults')

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

  return {
    walletStats: sanitizeWalletStats(earningState?.walletStats, fallback.walletStats),
    availableNow: sanitizeString(earningState?.availableNow, fallback.availableNow),
    paymentHistory: sanitizePaymentHistory(earningState?.paymentHistory, fallback.paymentHistory),
    upiAccounts: sanitizeUpiAccounts(earningState?.upiAccounts, fallback.upiAccounts),
    selectedUpi: sanitizeString(earningState?.selectedUpi, fallback.selectedUpi),
    withdrawAmount: sanitizeString(earningState?.withdrawAmount, fallback.withdrawAmount),
  }
}

function ensureEarningState(student) {
  student.earningState = sanitizeEarningState(student.earningState)
}

async function getStudentEarningState(token) {
  const student = await findStudentByToken(token)
  ensureEarningState(student)
  await student.save()
  return student.earningState
}

async function updateStudentEarningState(token, payload) {
  const student = await findStudentByToken(token)
  student.earningState = sanitizeEarningState(payload.earningState)
  await student.save()
  return student.earningState
}

module.exports = {
  getStudentEarningState,
  updateStudentEarningState,
}
