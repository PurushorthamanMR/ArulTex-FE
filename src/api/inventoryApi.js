/**
 * Inventory API - all data from backend
 */
import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

/** GET /inventory/getAll */
export async function getAll() {
  const res = await fetch(`${BASE_URL}/inventory/getAll`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list : []
}

/** GET /inventory/search?productId=...&transactionType=...&fromDate=...&toDate=... */
export async function search(params = {}) {
  const q = new URLSearchParams()
  if (params.productId != null) q.set('productId', params.productId)
  if (params.transactionType) q.set('transactionType', params.transactionType)
  if (params.userId != null) q.set('userId', params.userId)
  if (params.fromDate) q.set('fromDate', params.fromDate)
  if (params.toDate) q.set('toDate', params.toDate)
  const url = q.toString() ? `${BASE_URL}/inventory/search?${q}` : `${BASE_URL}/inventory/getAll`
  const res = await fetch(url, { method: 'GET', headers: getAuthHeaders() })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list : []
}
