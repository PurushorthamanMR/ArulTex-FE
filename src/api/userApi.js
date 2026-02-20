import { BASE_URL } from './config'

/**
 * Standard backend response shape: { status, errorCode, errorDescription, responseDto }
 */
function handleResponse(res) {
  return res.json().then((data) => {
    if (!res.ok) {
      const message = data?.errorDescription || res.statusText || 'Request failed'
      throw new Error(message)
    }
    if (data.status === false) {
      throw new Error(data.errorDescription || 'Request failed')
    }
    return data.responseDto
  })
}

/**
 * Headers for authenticated requests (includes JWT).
 * Use for endpoints that require Authorization: Bearer <token>.
 */
function getAuthHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

/**
 * POST /user/login
 * @param {{ username: string, password: string }} credentials - email as username, password
 * @returns {Promise<{ accessToken: string }>}
 */
export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  return handleResponse(res)
}

/**
 * GET /user/getByEmailAddress?emailAddress=...
 * @param {string} emailAddress
 * @returns {Promise<Array>} Array of user DTOs (length 0 or 1)
 */
export async function getByEmailAddress(emailAddress) {
  const params = new URLSearchParams({ emailAddress })
  const res = await fetch(`${BASE_URL}/user/getByEmailAddress?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return handleResponse(res)
}

/**
 * GET /user/getAllPage - paginated users (requires auth).
 * @param {{ pageNumber?: number, pageSize?: number, status?: boolean }} params
 * @returns {Promise<{ content, totalElements, totalPages, pageNumber, pageSize }>}
 */
export async function getAllPage(params = {}) {
  const { pageNumber = 1, pageSize = 10, status } = params
  const searchParams = new URLSearchParams({
    pageNumber: String(pageNumber),
    pageSize: String(pageSize)
  })
  if (status !== undefined && status !== null) {
    searchParams.set('status', String(status))
  }
  const res = await fetch(`${BASE_URL}/user/getAllPage?${searchParams}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}
