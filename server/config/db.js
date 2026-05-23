const mongoose = require('mongoose')

const READY_STATE_LABELS = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
}

function getDatabaseStatus() {
  return READY_STATE_LABELS[mongoose.connection.readyState] || 'unknown'
}

async function connectToDatabase(mongoUrl) {
  if (!mongoUrl) {
    throw new Error('MONGO_URL is missing. Add it to server/.env before starting the backend.')
  }

  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  })

  return mongoose.connection
}

module.exports = {
  connectToDatabase,
  getDatabaseStatus,
}
