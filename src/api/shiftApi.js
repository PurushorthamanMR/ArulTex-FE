/**
 * POS register shift — open / current (Z closes via sales closeZReport).
 */
import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

/** GET /shift/current — open shift or null */
export async function getCurrent() {
  const res = await fetch(`${BASE_URL}/shift/current`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** POST /shift/open */
export async function openShift() {
  const res = await fetch(`${BASE_URL}/shift/open`, {
    method: 'POST',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /shift/history?limit=100 */
export async function getShiftHistory(limit = 100) {
  const q = new URLSearchParams()
  if (limit != null) q.set('limit', String(limit))
  const res = await fetch(`${BASE_URL}/shift/history?${q.toString()}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}
