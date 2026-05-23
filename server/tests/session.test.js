const test = require('node:test')
const assert = require('node:assert/strict')
const { getSessionTtlMs } = require('../utils/session')

test('getSessionTtlMs converts days to milliseconds', () => {
  assert.equal(getSessionTtlMs(1), 86_400_000)
  assert.equal(getSessionTtlMs(30), 2_592_000_000)
})
