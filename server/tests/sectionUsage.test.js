const test = require('node:test')
const assert = require('node:assert/strict')
const { buildUtcDayKey, consumeSectionOperation } = require('../utils/sectionUsage')

test('buildUtcDayKey uses UTC date formatting', () => {
  const date = new Date('2026-05-23T18:45:00.000Z')
  assert.equal(buildUtcDayKey(date), '2026-05-23')
})

test('consumeSectionOperation allows only two operations per section per day', () => {
  const entity = {}
  const first = consumeSectionOperation(entity, 'gig-center', 'GIG Center', 2, new Date('2026-05-23T10:00:00.000Z'))
  const second = consumeSectionOperation(entity, 'gig-center', 'GIG Center', 2, new Date('2026-05-23T16:00:00.000Z'))

  assert.equal(first.used, 1)
  assert.equal(first.remaining, 1)
  assert.equal(second.used, 2)
  assert.equal(second.remaining, 0)

  assert.throws(
    () => consumeSectionOperation(entity, 'gig-center', 'GIG Center', 2, new Date('2026-05-23T20:00:00.000Z')),
    error => {
      assert.equal(error.statusCode, 429)
      assert.match(error.message, /Daily GIG Center operation limit reached/i)
      return true
    },
  )
})

test('consumeSectionOperation tracks sections independently', () => {
  const entity = {}

  consumeSectionOperation(entity, 'gig-center', 'GIG Center', 2, new Date('2026-05-23T10:00:00.000Z'))
  const networkResult = consumeSectionOperation(entity, 'network', 'Network', 2, new Date('2026-05-23T11:00:00.000Z'))

  assert.equal(networkResult.used, 1)
  assert.equal(entity.dailySectionUsage['gig-center']['2026-05-23'], 1)
  assert.equal(entity.dailySectionUsage.network['2026-05-23'], 1)
})
