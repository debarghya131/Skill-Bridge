const crypto = require('crypto')

function createRequestId() {
  return crypto.randomUUID()
}

function serializeError(error) {
  if (!error) {
    return undefined
  }

  return {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
  }
}

function writeLog(level, message, meta = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  }

  const output = JSON.stringify(payload)

  if (level === 'error') {
    console.error(output)
    return
  }

  if (level === 'warn') {
    console.warn(output)
    return
  }

  console.log(output)
}

module.exports = {
  createRequestId,
  serializeError,
  writeLog,
}
