const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const STUDENT_SESSION_KEY = 'skillbridge.student.session'

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })
  } catch (error) {
    throw new Error(`Backend is not reachable at ${API_BASE_URL}. Start the server and try again.`)
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function getStudentSessionToken() {
  return window.localStorage.getItem(STUDENT_SESSION_KEY) || ''
}

export function setStudentSessionToken(token) {
  window.localStorage.setItem(STUDENT_SESSION_KEY, token)
}

export function clearStudentSessionToken() {
  window.localStorage.removeItem(STUDENT_SESSION_KEY)
}

export async function signUpStudent(payload) {
  return request('/api/student/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function signInStudent(payload) {
  return request('/api/student/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function fetchCurrentStudent(token) {
  return request('/api/student/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveStudentProfile(token, payload) {
  return request('/api/student/profile', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function logoutStudent(token) {
  return request('/api/student/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
}

export async function fetchStudentTrustScore(token) {
  return request('/api/student/trustscore', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function fetchStudentSkillHub(token) {
  return request('/api/student/skillhub', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveStudentSkillHub(token, payload) {
  return request('/api/student/skillhub', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchStudentNetwork(token) {
  return request('/api/student/network', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveStudentNetwork(token, payload) {
  return request('/api/student/network', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchStudentEarning(token) {
  return request('/api/student/earning', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveStudentEarning(token, payload) {
  return request('/api/student/earning', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchStudentGigs(token) {
  return request('/api/student/gigs', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function applyStudentGig(token, gigId) {
  return request(`/api/student/gigs/${gigId}/apply`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
}

export async function saveStudentGig(token, gigId) {
  return request(`/api/student/gigs/${gigId}/save`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
}

export async function unsaveStudentGig(token, gigId) {
  return request(`/api/student/gigs/${gigId}/save`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function acceptStudentOpportunity(token, opportunityId) {
  return request(`/api/student/opportunities/${opportunityId}/accept`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
}

export async function declineStudentOpportunity(token, opportunityId) {
  return request(`/api/student/opportunities/${opportunityId}/decline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
}

export async function fetchStudentCompanyInterviewTask(token, payload) {
  return request('/api/student/tasks/company-interview/load', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function submitStudentCompanyInterviewTask(token, payload) {
  return request('/api/student/tasks/company-interview/submit', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}
