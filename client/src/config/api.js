const defaultApiUrl = import.meta.env.DEV
  ? 'http://localhost:5000'
  : 'https://skillbridge-backend.onrender.com'

export const API_BASE_URL = (import.meta.env.VITE_API_URL?.trim() || defaultApiUrl)
  .replace(/\/+$/, '')
