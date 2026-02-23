/**
 * Purchase API - all data from backend
 */
import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

/** Save: create purchase + items. body: { supplierId, userId?, purchaseDate?, status?, items: [{ productId, quantity, costPrice }] } */
export async function save(body) {
  const payload = {
    supplierId: Number(body.supplierId),
    userId: body.userId ?? null,
    purchaseDate: body.purchaseDate ? new Date(body.purchaseDate).toISOString() : undefined,
    status: body.status || 'Completed',
    items: (body.items || []).map((it) => ({
      productId: Number(it.productId),
      quantity: Math.max(0, Number(it.quantity) || 0),
      costPrice: Number(it.costPrice) || 0
    }))
  }
  const res = await fetch(`${BASE_URL}/purchase/save`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}

/** Update purchase and replace items */
export async function update(id, body) {
  const payload = {
    id: Number(id),
    supplierId: body.supplierId != null ? Number(body.supplierId) : undefined,
    status: body.status,
    userId: body.userId,
    items: (body.items || []).map((it) => ({
      productId: Number(it.productId),
      quantity: Math.max(0, Number(it.quantity) || 0),
      costPrice: Number(it.costPrice) || 0
    }))
  }
  const res = await fetch(`${BASE_URL}/purchase/update`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  })
  return handleResponse(res)
}

export async function getAll(params = {}) {
  const { search: searchQ, supplierId, status, page = 1, pageSize = 20 } = params
  const q = new URLSearchParams()
  if (searchQ && String(searchQ).trim()) q.set('purchaseNo', String(searchQ).trim())
  if (supplierId != null && supplierId !== '') q.set('supplierId', String(supplierId))
  if (status != null && status !== '') q.set('status', status)
  const url = q.toString() ? `${BASE_URL}/purchase/search?${q}` : `${BASE_URL}/purchase/getAll`
  const res = await fetch(url, { method: 'GET', headers: getAuthHeaders() })
  const list = await handleResponse(res)
  const content = Array.isArray(list) ? list : []
  const total = content.length
  const start = (page - 1) * pageSize
  return {
    content: content.slice(start, start + pageSize),
    totalElements: total,
    totalPages: Math.ceil(total / pageSize) || 1,
    pageNumber: page,
    pageSize
  }
}

export async function getById(id) {
  const res = await fetch(`${BASE_URL}/purchase/getById?id=${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

export async function getByProductId(productId) {
  const res = await fetch(`${BASE_URL}/purchase/getByProductId?productId=${encodeURIComponent(productId)}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

export async function search(params) {
  return getAll(params)
}

export async function deletePurchase(id) {
  const res = await fetch(`${BASE_URL}/purchase/delete?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  await handleResponse(res)
  return { success: true }
}


