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
 * POST /auth/forgot-password
 * @param {{ emailAddress: string }} payload
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function forgotPassword(payload) {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}

/**
 * POST /auth/reset-password
 * @param {{ token: string, newPassword: string }} payload
 * @returns {Promise<{ message: string }>}
 */
export async function resetPassword(payload) {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}
