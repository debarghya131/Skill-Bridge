const test = require('node:test')
const assert = require('node:assert/strict')
const { mergeTemplateState, reduceTemplateState } = require('../utils/templateState')

test('mergeTemplateState overlays object overrides on defaults', () => {
  const defaults = {
    stats: { open: 3, active: 1 },
    list: [1, 2, 3],
  }
  const override = {
    stats: { active: 4 },
  }

  const merged = mergeTemplateState(defaults, override)

  assert.deepEqual(merged, {
    stats: { open: 3, active: 4 },
    list: [1, 2, 3],
  })
})

test('reduceTemplateState strips values equal to defaults', () => {
  const defaults = {
    stats: { open: 3, active: 1 },
    flags: ['a'],
  }
  const value = {
    stats: { open: 3, active: 7 },
    flags: ['a'],
  }

  const reduced = reduceTemplateState(value, defaults)

  assert.deepEqual(reduced, {
    stats: { active: 7 },
  })
})
