import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

export async function getAll() {
  const res = await fetch(`${BASE_URL}/customer/getAll`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

export async function getById(id) {
  const res = await fetch(`${BASE_URL}/customer/getById?id=${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

export async function search(params = {}) {
  const q = new URLSearchParams()
  if (params.customerName && String(params.customerName).trim()) q.set('customerName', String(params.customerName).trim())
  if (params.phone && String(params.phone).trim()) q.set('phone', String(params.phone).trim())
  if (params.email && String(params.email).trim()) q.set('email', String(params.email).trim())
  if (params.isActive !== undefined && params.isActive !== '') q.set('isActive', params.isActive === true ? 'true' : 'false')
  const res = await fetch(`${BASE_URL}/customer/search?${q}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

export async function save(body) {
  const res = await fetch(`${BASE_URL}/customer/save`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body)
  })
  return handleResponse(res)
}

export async function update(id, body) {
  const res = await fetch(`${BASE_URL}/customer/update`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id, ...body })
  })
  return handleResponse(res)
}

export async function deleteCustomer(id) {
  const res = await fetch(`${BASE_URL}/customer/delete?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}
