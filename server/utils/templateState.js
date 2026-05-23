function clone(value) {
  if (value === undefined) {
    return undefined
  }

  return JSON.parse(JSON.stringify(value))
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

function mergeTemplateState(defaultState, overrideState) {
  if (overrideState === undefined) {
    return clone(defaultState)
  }

  if (Array.isArray(defaultState)) {
    return Array.isArray(overrideState) ? clone(overrideState) : clone(defaultState)
  }

  if (isPlainObject(defaultState)) {
    const merged = clone(defaultState) || {}

    if (!isPlainObject(overrideState)) {
      return merged
    }

    Object.entries(overrideState).forEach(([key, value]) => {
      merged[key] = Object.prototype.hasOwnProperty.call(defaultState, key)
        ? mergeTemplateState(defaultState[key], value)
        : clone(value)
    })

    return merged
  }

  return clone(overrideState)
}

function reduceTemplateState(value, defaultState) {
  if (value === undefined) {
    return undefined
  }

  if (defaultState === undefined) {
    return clone(value)
  }

  if (Array.isArray(value) || Array.isArray(defaultState)) {
    return deepEqual(value, defaultState) ? undefined : clone(value)
  }

  if (isPlainObject(value) && isPlainObject(defaultState)) {
    const reduced = {}

    Object.keys(value).forEach(key => {
      const nextValue = reduceTemplateState(value[key], defaultState[key])
      if (nextValue !== undefined) {
        reduced[key] = nextValue
      }
    })

    return Object.keys(reduced).length > 0 ? reduced : undefined
  }

  return deepEqual(value, defaultState) ? undefined : clone(value)
}

module.exports = {
  clone,
  mergeTemplateState,
  reduceTemplateState,
}
