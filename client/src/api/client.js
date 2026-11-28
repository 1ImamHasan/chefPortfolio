const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  const token = sessionStorage.getItem('chef_admin_token')

  const headers = {
    ...options.headers,
  }

  // If body is not FormData, add JSON header
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  // Add Bearer token fallback if present
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // sends httpOnly cookies
  }

  if (options.body && !(options.body instanceof FormData) && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText || 'Request failed' }
    }
    const error = new Error(errorData.message || 'Request failed')
    error.status = response.status
    error.data = errorData
    throw error
  }

  return response.json()
}

export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: 'POST', body, ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: 'PUT', body, ...options }),
  patch: (endpoint, body, options) => request(endpoint, { method: 'PATCH', body, ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
  upload: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request('/upload', { method: 'POST', body: formData })
  },
}
