const test = require('node:test')
const assert = require('node:assert/strict')
const { createRateLimiter } = require('../utils/rateLimit')

test('rate limiter applies stricter limits to auth routes', () => {
  const limiter = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 100,
    authMaxRequests: 2,
  })

  const req = {
    method: 'POST',
    headers: {},
    socket: { remoteAddress: '127.0.0.1' },
  }

  const first = limiter.check(req, '/api/student/signin')
  const second = limiter.check(req, '/api/student/signin')
  const third = limiter.check(req, '/api/student/signin')

  assert.equal(first.limited, false)
  assert.equal(second.limited, false)
  assert.equal(third.limited, true)
  assert.ok(third.retryAfterMs > 0)
})

test('rate limiter skips health endpoints', () => {
  const limiter = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 1,
    authMaxRequests: 1,
  })

  const req = {
    method: 'GET',
    headers: {},
    socket: { remoteAddress: '127.0.0.1' },
  }

  const healthCheck = limiter.check(req, '/health')
  const secondHealthCheck = limiter.check(req, '/health')

  assert.equal(healthCheck.limited, false)
  assert.equal(secondHealthCheck.limited, false)
})
