const Student = require('../models/Student')
const { buildDefaultStudentProfile } = require('../config/studentDefaults')
const { createSessionToken, hashPassword, verifyPassword } = require('../utils/auth')

function normalizeEmail(email) {
  return email?.trim().toLowerCase() || ''
}

function normalizePhone(phone) {
  return phone?.replace(/\D/g, '') || ''
}

function createTrustScore() {
  return Math.floor(Math.random() * 200) + 720
}

function sanitizeStudent(student) {
  return {
    id: student._id.toString(),
    name: student.name,
    email: student.email || '',
    phone: student.phone || '',
    preferredLanguage: student.preferredLanguage || '',
    location: student.location || '',
    contactMethod: student.contactMethod,
    verificationMethod: student.verificationMethod,
    trustScore: student.trustScore,
    avatar: student.avatar || null,
    skills: Array.isArray(student.skills) ? student.skills : buildDefaultStudentProfile().skills,
    githubLink: Array.isArray(student.githubLink) ? student.githubLink : [],
    contactInfo: Array.isArray(student.contactInfo) ? student.contactInfo : [],
    projects: Array.isArray(student.projects) ? student.projects : buildDefaultStudentProfile().projects,
    videoUrl: student.videoUrl || null,
  }
}

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

async function signUpStudent(payload) {
  const contactMethod = payload.contactMethod === 'phone' ? 'phone' : 'email'
  const verificationMethod = payload.idMethod === 'digilocker' ? 'digilocker' : 'aadhaar'
  const email = normalizeEmail(payload.email)
  const phone = normalizePhone(payload.phone)

  if (!payload.name?.trim()) throw buildAuthError('Full name is required')
  if (!payload.password || payload.password.length < 8) throw buildAuthError('Password must be at least 8 characters')
  if (contactMethod === 'email' && !email) throw buildAuthError('A valid email address is required')
  if (contactMethod === 'phone' && phone.length !== 10) throw buildAuthError('A valid 10-digit phone number is required')
  if (!payload.location?.trim()) throw buildAuthError('Location is required')
  if (!payload.language?.trim()) throw buildAuthError('Preferred language is required')
  if (verificationMethod === 'aadhaar' && !payload.aadhaarNumber?.trim()) throw buildAuthError('Aadhaar number is required')
  if (verificationMethod === 'digilocker' && !payload.digilockerToken?.trim()) throw buildAuthError('DigiLocker ID is required')

  const existingStudent = await Student.findOne({
    $or: [
      ...(email ? [{ email }] : []),
      ...(phone ? [{ phone }] : []),
    ],
  })

  if (existingStudent) {
    throw buildAuthError('A student account with this contact already exists.', 409)
  }

  const student = await Student.create({
    name: payload.name.trim(),
    email: email || undefined,
    phone: phone || undefined,
    passwordHash: hashPassword(payload.password),
    preferredLanguage: payload.language.trim(),
    location: payload.location.trim(),
    contactMethod,
    verificationMethod,
    aadhaarNumber: verificationMethod === 'aadhaar' ? payload.aadhaarNumber.trim() : '',
    digilockerToken: verificationMethod === 'digilocker' ? payload.digilockerToken.trim() : '',
    trustScore: createTrustScore(),
    ...buildDefaultStudentProfile(),
  })

  const token = createSessionToken()
  student.sessions.push({ token })
  await student.save()

  return {
    token,
    student: sanitizeStudent(student),
  }
}

async function signInStudent(payload) {
  const contact = payload.contact?.trim() || ''

  if (!contact) throw buildAuthError('Email or phone is required')
  if (!payload.password) throw buildAuthError('Password is required')

  const email = normalizeEmail(contact)
  const phone = normalizePhone(contact)
  const student = await Student.findOne({
    $or: [
      { email },
      { phone },
    ],
  })

  if (!student || !verifyPassword(payload.password, student.passwordHash)) {
    throw buildAuthError('Invalid credentials', 401)
  }

  const token = createSessionToken()
  student.sessions.push({ token })
  await student.save()

  return {
    token,
    student: sanitizeStudent(student),
  }
}

async function getCurrentStudent(token) {
  const student = await findStudentByToken(token)
  return sanitizeStudent(student)
}

async function updateCurrentStudent(token, payload) {
  const student = await findStudentByToken(token)
  const updates = {}

  if (typeof payload.name === 'string' && payload.name.trim()) {
    updates.name = payload.name.trim()
  }

  if (payload.avatar === null || typeof payload.avatar === 'string') {
    updates.avatar = payload.avatar
  }

  if (Array.isArray(payload.skills)) {
    updates.skills = payload.skills.filter(item => typeof item === 'string' && item.trim()).map(item => item.trim())
  }

  if (Array.isArray(payload.githubLink)) {
    updates.githubLink = payload.githubLink
      .filter(item => item && typeof item.url === 'string' && item.url.trim())
      .map(item => ({
        icon: typeof item.icon === 'string' ? item.icon : '🐙',
        url: item.url.trim(),
        saved: item.saved !== false,
      }))
  }

  if (Array.isArray(payload.contactInfo)) {
    updates.contactInfo = payload.contactInfo
      .filter(item => item && typeof item.label === 'string' && typeof item.value === 'string' && item.value.trim())
      .map(item => ({
        label: item.label.trim(),
        value: item.value.trim(),
        saved: item.saved !== false,
      }))
  }

  if (Array.isArray(payload.projects)) {
    updates.projects = payload.projects.map(item => ({
      name: typeof item?.name === 'string' ? item.name : '',
      desc: typeof item?.desc === 'string' ? item.desc : '',
      link: typeof item?.link === 'string' ? item.link : '',
      demoLink: typeof item?.demoLink === 'string' ? item.demoLink : '',
      saved: item?.saved === true,
    }))
  }

  if (payload.videoUrl === null || typeof payload.videoUrl === 'string') {
    updates.videoUrl = payload.videoUrl
  }

  Object.assign(student, updates)
  await student.save()

  return sanitizeStudent(student)
}

async function logoutCurrentStudent(token) {
  const student = await findStudentByToken(token)
  student.sessions = student.sessions.filter(session => session.token !== token)
  await student.save()
}

module.exports = {
  getCurrentStudent,
  logoutCurrentStudent,
  signInStudent,
  signUpStudent,
  updateCurrentStudent,
}
