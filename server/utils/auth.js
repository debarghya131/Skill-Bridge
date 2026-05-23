const crypto = require('crypto')

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword || !storedPassword.includes(':')) {
    return false
  }

  const [salt, storedHash] = storedPassword.split(':')
  const derivedHash = crypto.scryptSync(password, salt, 64).toString('hex')
  const storedBuffer = Buffer.from(storedHash, 'hex')
  const derivedBuffer = Buffer.from(derivedHash, 'hex')

  if (storedBuffer.length !== derivedBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(storedBuffer, derivedBuffer)
}

function createSessionToken() {
  return crypto.randomBytes(32).toString('hex')
}

module.exports = {
  createSessionToken,
  hashPassword,
  verifyPassword,
}
