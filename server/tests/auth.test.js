const test = require('node:test')
const assert = require('node:assert/strict')
const { createSessionToken, hashPassword, verifyPassword } = require('../utils/auth')

test('hashPassword and verifyPassword validate the original password only', () => {
  const hashedPassword = hashPassword('password123')

  assert.equal(typeof hashedPassword, 'string')
  assert.notEqual(hashedPassword, 'password123')
  assert.equal(verifyPassword('password123', hashedPassword), true)
  assert.equal(verifyPassword('wrong-password', hashedPassword), false)
})

test('createSessionToken returns a non-empty token', () => {
  const token = createSessionToken()

  assert.equal(typeof token, 'string')
  assert.ok(token.length >= 32)
})
