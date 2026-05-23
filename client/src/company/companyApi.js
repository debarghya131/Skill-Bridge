const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const COMPANY_SESSION_KEY = 'skillbridge.company.session'

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

export function getCompanySessionToken() {
  return window.localStorage.getItem(COMPANY_SESSION_KEY) || ''
}

export function setCompanySessionToken(token) {
  window.localStorage.setItem(COMPANY_SESSION_KEY, token)
}

export function clearCompanySessionToken() {
  window.localStorage.removeItem(COMPANY_SESSION_KEY)
}

export async function signUpCompany(payload) {
  return request('/api/company/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function signInCompany(payload) {
  return request('/api/company/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function fetchCurrentCompany(token) {
  return request('/api/company/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyProfile(token, payload) {
  return request('/api/company/profile', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function logoutCompany(token) {
  return request('/api/company/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
}

export async function fetchCompanyGigManagement(token) {
  return request('/api/company/gigs', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyGigManagement(token, payload) {
  return request('/api/company/gigs', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchCompanyTalent(token) {
  return request('/api/company/talent', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function fetchCompanyWorkspace(token) {
  return request('/api/company/workspace', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyWorkspace(token, payload) {
  return request('/api/company/workspace', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchCompanyPayment(token) {
  return request('/api/company/payment', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyPayment(token, payload) {
  return request('/api/company/payment', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}
