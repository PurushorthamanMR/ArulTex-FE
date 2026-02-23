/**
 * Supplier API - all data from backend
 */
import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

export async function getAll(params = {}) {
  const { search: searchQ, isActive } = params
  const q = new URLSearchParams()
  if (searchQ && String(searchQ).trim()) q.set('supplierName', String(searchQ).trim())
  if (isActive !== undefined && isActive !== null) q.set('isActive', isActive ? 'true' : 'false')
  const url = q.toString() ? `${BASE_URL}/supplier/search?${q}` : `${BASE_URL}/supplier/getAll`
  const res = await fetch(url, { method: 'GET', headers: getAuthHeaders() })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list : []
}

export async function getById(id) {
  const res = await fetch(`${BASE_URL}/supplier/getById?id=${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

export async function save(body) {
  const payload = {
    supplierName: body.supplierName || '',
    phone: body.phone || body.mobileNumber || '',
    email: body.email || null,
    address: body.address || null,
    isActive: body.isActive !== false
  }
  const res = await fetch(`${BASE_URL}/supplier/save`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}

export async function update(id, body) {
  const payload = {
    id: Number(id),
    supplierName: body.supplierName,
    phone: body.phone ?? body.mobileNumber ?? '',
    email: body.email !== undefined ? body.email : undefined,
    address: body.address !== undefined ? body.address : undefined,
    isActive: body.isActive !== undefined ? body.isActive : undefined
  }
  const res = await fetch(`${BASE_URL}/supplier/update`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}

export async function deleteSupplier(id) {
  const res = await fetch(`${BASE_URL}/supplier/delete?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  await handleResponse(res)
  return { success: true }
}
