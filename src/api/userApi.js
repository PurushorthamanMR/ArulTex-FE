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

/**
 * POST /user/register - create a new user.
 * @param {Object} userDto
 * @returns {Promise<Object>} The created user DTO
 */
export async function register(userDto) {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userDto)
  })
  return handleResponse(res)
}

/**
 * GET /userRole/getAll - get all user roles.
 * @returns {Promise<Array>} Array of role objects
 */
export async function getAllRoles() {
  const res = await fetch(`${BASE_URL}/userRole/getAll`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/**
 * POST /user/update - update user details.
 * @param {Object} userDto
 * @returns {Promise<Object>} The updated user DTO
 */
export async function update(userDto) {
  const res = await fetch(`${BASE_URL}/user/update`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userDto)
  })
  return handleResponse(res)
}

/**
 * PUT /user/updateStatus - update user active/inactive status.
 * @param {number} userId
 * @param {boolean} status
 * @returns {Promise<Object>} Updated user DTO
 */
export async function updateStatus(userId, status) {
  const res = await fetch(`${BASE_URL}/user/updateStatus?userId=${userId}&status=${status}`, {
    method: 'PUT',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/**
 * PUT /user/updatePassword - update user password.
 * @param {number} userId
 * @param {string} password
 * @param {number} changedByUserId
 * @returns {Promise<Object>} Updated user DTO
 */
export async function updatePassword(userId, password, changedByUserId) {
  const res = await fetch(`${BASE_URL}/user/updatePassword?userId=${userId}&password=${password}&changedByUserId=${changedByUserId}`, {
    method: 'PUT',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}
