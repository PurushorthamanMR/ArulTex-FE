/**
 * Product API - all data from backend
 */
import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

/** Map BE product DTO to FE shape (barcode, category name, quantity, purchasedPrice, pricePerUnit, lowStock, discountPercent) */
function fromBackend(p) {
  if (!p) return null
  const rawBarCode = p.barCode ?? p.barcode
  const barcode = rawBarCode != null && rawBarCode !== '' ? String(rawBarCode).trim() : null
  return {
    ...p,
    barcode,
    category: p.category?.categoryName ?? '',
    categoryId: p.categoryId,
    quantity: p.stockQty ?? 0,
    purchasedPrice: p.costPrice != null ? Number(p.costPrice) : 0,
    pricePerUnit: p.sellingPrice != null ? Number(p.sellingPrice) : 0,
    lowStock: p.minStockLevel ?? 0,
    discountPercent: p.discountPercentage != null ? Number(p.discountPercentage) : 0
  }
}

/** Map FE product to BE save/update body */
function toBackend(body, isUpdate = false) {
  const payload = {
    productName: body.productName,
    barCode: body.barcode ?? body.barCode ?? null,
    categoryId: body.categoryId,
    supplierId: body.supplierId ?? null,
    costPrice: Number(body.purchasedPrice ?? body.costPrice ?? 0),
    sellingPrice: Number(body.pricePerUnit ?? body.sellingPrice ?? 0),
    discountPercentage: Number(body.discountPercent ?? body.discountPercentage ?? 0),
    stockQty: Number(body.quantity ?? body.stockQty ?? 0),
    minStockLevel: Number(body.lowStock ?? body.minStockLevel ?? 0),
    unit: body.unit || 'pcs',
    isActive: body.isActive !== false
  }
  if (isUpdate && body.id) payload.id = body.id
  return payload
}

export async function getAll(params = {}) {
  const { page = 1, pageSize = 10, categoryId, category, search: searchQ, isActive } = params
  const q = new URLSearchParams()
  q.set('pageNumber', String(page))
  q.set('pageSize', String(pageSize))
  if (categoryId != null && categoryId !== '') q.set('categoryId', String(categoryId))
  if (category != null && category !== '') q.set('categoryId', String(category))
  if (searchQ && String(searchQ).trim()) q.set('productName', String(searchQ).trim())
  if (isActive !== undefined && isActive !== null) q.set('isActive', isActive === true ? 'true' : 'false')
  const res = await fetch(`${BASE_URL}/product/getAllPaginated?${q}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const data = await handleResponse(res)
  return {
    content: (data.content || []).map(fromBackend),
    totalElements: data.totalElements ?? 0,
    totalPages: data.totalPages ?? 1,
    pageNumber: data.pageNumber ?? page,
    pageSize: data.pageSize ?? pageSize
  }
}

export async function getById(id) {
  const res = await fetch(`${BASE_URL}/product/getById?id=${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const data = await handleResponse(res)
  return fromBackend(data)
}

/**
 * Search products by barcode, product name, etc. (backend GET /product/search).
 * Use this when POS barcode is not in the loaded list so we fetch from product table.
 * @param {{ barCode?: string, productName?: string, isActive?: boolean }} params
 * @returns {Promise<Array>} List of products (FE shape)
 */
export async function search(params = {}) {
  const q = new URLSearchParams()
  if (params.barCode != null && String(params.barCode).trim() !== '') q.set('barCode', String(params.barCode).trim())
  if (params.productName != null && String(params.productName).trim() !== '') q.set('productName', String(params.productName).trim())
  if (params.isActive !== undefined && params.isActive !== null) q.set('isActive', params.isActive === true ? 'true' : 'false')
  const res = await fetch(`${BASE_URL}/product/search?${q}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list.map(fromBackend) : []
}

export async function getLowStock(activeOnly = true) {
  const q = new URLSearchParams()
  if (activeOnly === false) q.set('activeOnly', 'false')
  const res = await fetch(`${BASE_URL}/product/getLowStock?${q}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list.map(fromBackend) : []
}

export async function getLowStockPaginated(params = {}) {
  const { pageNumber = 1, pageSize = 10, categoryId, productName } = params
  const q = new URLSearchParams()
  q.set('pageNumber', String(pageNumber))
  q.set('pageSize', String(pageSize))
  if (categoryId) q.set('categoryId', String(categoryId))
  if (productName) q.set('productName', String(productName))
  const res = await fetch(`${BASE_URL}/product/getLowStockPaginated?${q}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const data = await handleResponse(res)
  return {
    content: (data.content || []).map(fromBackend),
    totalElements: data.totalElements ?? 0,
    totalPages: data.totalPages ?? 1,
    pageNumber: data.pageNumber ?? pageNumber,
    pageSize: data.pageSize ?? pageSize
  }
}

/** Generate barcode (optional: backend may allow null; frontend can use a placeholder) */
export function generateBarcode() {
  const prefix = '8901000'
  const r = Math.floor(Math.random() * 999999)
  return `${prefix}${String(r).padStart(6, '0')}`
}

export async function save(body) {
  const payload = toBackend(body, false)
  if (!payload.categoryId) throw new Error('Category is required')
  const res = await fetch(`${BASE_URL}/product/save`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  })
  const data = await handleResponse(res)
  return fromBackend(data)
}

export async function update(id, body) {
  const payload = toBackend({ ...body, id }, true)
  if (!payload.categoryId) throw new Error('Category is required')
  const res = await fetch(`${BASE_URL}/product/update`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  })
  const data = await handleResponse(res)
  return fromBackend(data)
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/product/delete?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  await handleResponse(res)
  return { success: true }
}

/** Final price after discount: pricePerUnit * (1 - discountPercent/100) */
export function calcFinalPrice(pricePerUnit, discountPercent) {
  const p = Number(pricePerUnit) || 0
  const d = Number(discountPercent) || 0
  return Math.round(p * (1 - d / 100) * 100) / 100
}
