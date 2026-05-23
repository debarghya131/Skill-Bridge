const fs = require('fs')
const http = require('http')
const path = require('path')
const { connectToDatabase, getDatabaseStatus } = require('./config/db')
const {
  getCurrentCompany,
  getCurrentCompanyGigManagementState,
  getCurrentCompanyPaymentState,
  getCurrentCompanyProjectWorkspaceState,
  getCompanyTalentProfiles,
  logoutCurrentCompany,
  signInCompany,
  signUpCompany,
  updateCurrentCompany,
  updateCurrentCompanyGigManagementState,
  updateCurrentCompanyPaymentState,
  updateCurrentCompanyProjectWorkspaceState,
} = require('./controllers/companyController')
const {
  getCurrentStudent,
  logoutCurrentStudent,
  signInStudent,
  signUpStudent,
  updateCurrentStudent,
} = require('./controllers/studentController')
const {
  acceptOpportunity,
  applyToGig,
  declineOpportunity,
  getStudentGigState,
  saveGig,
  unsaveGig,
} = require('./controllers/gigController')
const { getStudentEarningState, updateStudentEarningState } = require('./controllers/earningController')
const { getStudentNetworkState, updateStudentNetworkState } = require('./controllers/networkController')
const { getStudentSkillHub, updateStudentSkillHub } = require('./controllers/skillHubController')
const { getStudentTrustScore } = require('./controllers/trustScoreController')
const { getBearerToken, readJsonBody } = require('./utils/request')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return
  }

  const content = fs.readFileSync(filePath, 'utf8')

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadEnvFile(path.join(__dirname, '.env'))

const port = Number(process.env.PORT) || 5000
const mongoUrl = process.env.MONGO_URL

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  res.end(JSON.stringify(payload))
}

async function handleCompanyApi(req, res, pathname) {
  try {
    if (req.method === 'POST' && pathname === '/api/company/signup') {
      const payload = await readJsonBody(req)
      const result = await signUpCompany(payload)
      sendJson(res, 201, result)
      return true
    }

    if (req.method === 'POST' && pathname === '/api/company/signin') {
      const payload = await readJsonBody(req)
      const result = await signInCompany(payload)
      sendJson(res, 200, result)
      return true
    }

    if (req.method === 'GET' && pathname === '/api/company/me') {
      const company = await getCurrentCompany(getBearerToken(req))
      sendJson(res, 200, { company })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/company/profile') {
      const payload = await readJsonBody(req)
      const company = await updateCurrentCompany(getBearerToken(req), payload)
      sendJson(res, 200, { company })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/company/gigs') {
      const gigManagementState = await getCurrentCompanyGigManagementState(getBearerToken(req))
      sendJson(res, 200, { gigManagementState })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/company/gigs') {
      const payload = await readJsonBody(req)
      const gigManagementState = await updateCurrentCompanyGigManagementState(getBearerToken(req), payload)
      sendJson(res, 200, { gigManagementState })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/company/talent') {
      const talentProfiles = await getCompanyTalentProfiles(getBearerToken(req))
      sendJson(res, 200, { talentProfiles })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/company/workspace') {
      const projectWorkspaceState = await getCurrentCompanyProjectWorkspaceState(getBearerToken(req))
      sendJson(res, 200, { projectWorkspaceState })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/company/workspace') {
      const payload = await readJsonBody(req)
      const projectWorkspaceState = await updateCurrentCompanyProjectWorkspaceState(getBearerToken(req), payload)
      sendJson(res, 200, { projectWorkspaceState })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/company/payment') {
      const paymentState = await getCurrentCompanyPaymentState(getBearerToken(req))
      sendJson(res, 200, { paymentState })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/company/payment') {
      const payload = await readJsonBody(req)
      const paymentState = await updateCurrentCompanyPaymentState(getBearerToken(req), payload)
      sendJson(res, 200, { paymentState })
      return true
    }

    if (req.method === 'POST' && pathname === '/api/company/logout') {
      await logoutCurrentCompany(getBearerToken(req))
      sendJson(res, 200, { status: 'ok' })
      return true
    }
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      status: 'error',
      message: error.message || 'Something went wrong',
    })
    return true
  }

  return false
}

async function handleStudentApi(req, res, pathname) {
  try {
    if (req.method === 'POST' && pathname === '/api/student/signup') {
      const payload = await readJsonBody(req)
      const result = await signUpStudent(payload)
      sendJson(res, 201, result)
      return true
    }

    if (req.method === 'POST' && pathname === '/api/student/signin') {
      const payload = await readJsonBody(req)
      const result = await signInStudent(payload)
      sendJson(res, 200, result)
      return true
    }

    if (req.method === 'GET' && pathname === '/api/student/me') {
      const student = await getCurrentStudent(getBearerToken(req))
      sendJson(res, 200, { student })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/student/profile') {
      const payload = await readJsonBody(req)
      const student = await updateCurrentStudent(getBearerToken(req), payload)
      sendJson(res, 200, { student })
      return true
    }

    if (req.method === 'POST' && pathname === '/api/student/logout') {
      await logoutCurrentStudent(getBearerToken(req))
      sendJson(res, 200, { status: 'ok' })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/student/gigs') {
      const gigState = await getStudentGigState(getBearerToken(req))
      sendJson(res, 200, { gigState })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/student/trustscore') {
      const trustScore = await getStudentTrustScore(getBearerToken(req))
      sendJson(res, 200, { trustScore })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/student/network') {
      const networkState = await getStudentNetworkState(getBearerToken(req))
      sendJson(res, 200, { networkState })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/student/earning') {
      const earningState = await getStudentEarningState(getBearerToken(req))
      sendJson(res, 200, { earningState })
      return true
    }

    if (req.method === 'GET' && pathname === '/api/student/skillhub') {
      const skillHub = await getStudentSkillHub(getBearerToken(req))
      sendJson(res, 200, { skillHub })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/student/skillhub') {
      const payload = await readJsonBody(req)
      const skillHub = await updateStudentSkillHub(getBearerToken(req), payload)
      sendJson(res, 200, { skillHub })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/student/network') {
      const payload = await readJsonBody(req)
      const networkState = await updateStudentNetworkState(getBearerToken(req), payload)
      sendJson(res, 200, { networkState })
      return true
    }

    if (req.method === 'PATCH' && pathname === '/api/student/earning') {
      const payload = await readJsonBody(req)
      const earningState = await updateStudentEarningState(getBearerToken(req), payload)
      sendJson(res, 200, { earningState })
      return true
    }

    const applyMatch = pathname.match(/^\/api\/student\/gigs\/(\d+)\/apply$/)
    if (req.method === 'POST' && applyMatch) {
      const gigState = await applyToGig(getBearerToken(req), applyMatch[1])
      sendJson(res, 200, { gigState })
      return true
    }

    const saveMatch = pathname.match(/^\/api\/student\/gigs\/(\d+)\/save$/)
    if (req.method === 'POST' && saveMatch) {
      const gigState = await saveGig(getBearerToken(req), saveMatch[1])
      sendJson(res, 200, { gigState })
      return true
    }

    if (req.method === 'DELETE' && saveMatch) {
      const gigState = await unsaveGig(getBearerToken(req), saveMatch[1])
      sendJson(res, 200, { gigState })
      return true
    }

    const acceptMatch = pathname.match(/^\/api\/student\/opportunities\/(\d+)\/accept$/)
    if (req.method === 'POST' && acceptMatch) {
      const gigState = await acceptOpportunity(getBearerToken(req), acceptMatch[1])
      sendJson(res, 200, { gigState })
      return true
    }

    const declineMatch = pathname.match(/^\/api\/student\/opportunities\/(\d+)\/decline$/)
    if (req.method === 'POST' && declineMatch) {
      const gigState = await declineOpportunity(getBearerToken(req), declineMatch[1])
      sendJson(res, 200, { gigState })
      return true
    }
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      status: 'error',
      message: error.message || 'Something went wrong',
    })
    return true
  }

  return false
}

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    res.end()
    return
  }

  if (await handleStudentApi(req, res, pathname)) {
    return
  }

  if (await handleCompanyApi(req, res, pathname)) {
    return
  }

  if (req.method === 'GET' && pathname === '/') {
    sendJson(res, 200, {
      name: 'SkillBridge API',
      status: 'ok',
      message: 'Backend is running.',
      health: '/health',
    })
    return
  }

  if (req.method === 'GET' && pathname === '/health') {
    sendJson(res, 200, {
      status: 'ok',
      database: getDatabaseStatus(),
      port,
      timestamp: new Date().toISOString(),
    })
    return
  }

  sendJson(res, 404, {
    status: 'error',
    message: 'Route not found',
  })
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the existing process or change PORT in server/.env.`)
  } else {
    console.error('HTTP server failed to start')
    console.error(error.message)
  }

  process.exit(1)
})

async function startServer() {
  try {
    await connectToDatabase(mongoUrl)
    console.log('MongoDB connected successfully')

    server.listen(port, () => {
      console.log(`SkillBridge backend running on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB')
    console.error(error.message)
    process.exit(1)
  }
}

startServer()
