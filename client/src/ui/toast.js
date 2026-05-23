const listeners = new Set()
const recentToastTimestamps = new Map()

function emit(toast) {
  listeners.forEach(listener => {
    listener(toast)
  })
}

function createToast(type, message, options = {}) {
  if (!message) {
    return
  }

  const dedupeKey = `${type}:${message}`
  const now = Date.now()
  const lastShownAt = recentToastTimestamps.get(dedupeKey) || 0

  if (now - lastShownAt < (options.dedupeMs || 1800)) {
    return
  }

  recentToastTimestamps.set(dedupeKey, now)

  emit({
    id: `${now}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    title: options.title || '',
    message,
    duration: options.duration || (type === 'error' ? 5200 : 4200),
  })
}

export function subscribeToToasts(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const toast = {
  success(message, options) {
    createToast('success', message, options)
  },
  error(message, options) {
    createToast('error', message, options)
  },
  warning(message, options) {
    createToast('warning', message, options)
  },
  info(message, options) {
    createToast('info', message, options)
  },
}
