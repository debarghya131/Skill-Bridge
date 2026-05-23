import { API_BASE_URL } from '../config/api'
import { toast } from '../ui/toast'

export async function apiRequest(path, options = {}) {
  const { silentErrorToast = false, ...fetchOptions } = options
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers || {}),
      },
      ...fetchOptions,
    })
  } catch (error) {
    const message = `Backend is not reachable at ${API_BASE_URL}. Start the server and try again.`

    if (!silentErrorToast) {
      toast.error(message, { title: 'Connection Error' })
    }

    throw new Error(message)
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.message || 'Request failed'
    const error = new Error(message)
    error.status = response.status
    error.payload = data

    if (!silentErrorToast) {
      if (response.status === 429) {
        toast.warning(message, { title: 'Rate Limit Reached', duration: 5600 })
      } else if (response.status >= 500) {
        toast.error(message, { title: 'Server Error' })
      } else {
        toast.error(message, { title: 'Action Failed' })
      }
    }

    throw error
  }

  return data
}
