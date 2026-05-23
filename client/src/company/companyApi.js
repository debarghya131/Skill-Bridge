import { apiRequest } from '../lib/apiRequest'

const COMPANY_SESSION_KEY = 'skillbridge.company.session'

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
  return apiRequest('/api/company/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function signInCompany(payload) {
  return apiRequest('/api/company/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function fetchCurrentCompany(token) {
  return apiRequest('/api/company/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyProfile(token, payload) {
  return apiRequest('/api/company/profile', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function logoutCompany(token) {
  return apiRequest('/api/company/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  })
}

export async function fetchCompanyGigManagement(token) {
  return apiRequest('/api/company/gigs', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyGigManagement(token, payload) {
  return apiRequest('/api/company/gigs', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchCompanyTalent(token) {
  return apiRequest('/api/company/talent', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function fetchCompanyWorkspace(token) {
  return apiRequest('/api/company/workspace', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyWorkspace(token, payload) {
  return apiRequest('/api/company/workspace', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchCompanyPayment(token) {
  return apiRequest('/api/company/payment', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function saveCompanyPayment(token, payload) {
  return apiRequest('/api/company/payment', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function fetchCompanyTaskSubmissions(token) {
  return apiRequest('/api/company/tasks/submissions', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function reviewCompanyTaskSubmission(token, submissionId, payload) {
  return apiRequest(`/api/company/tasks/submissions/${submissionId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}
