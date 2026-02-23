import { BASE_URL } from './config'

/**
 * Set to true to use frontend mock data for testing without backend.
 */
export const USE_MOCK = false

// Mock categories: Baby Needs, Fancy Shop, Electronics, Plastic Items, Aluminum Items (sub-categories)
let mockCategories = [
  { id: 1, categoryName: 'Baby Clothing', isActive: true, createdAt: '2025-01-01T00:00:00', updatedAt: '2025-01-01T00:00:00' },
  { id: 2, categoryName: 'Diapers & Wipes', isActive: true, createdAt: '2025-01-02T00:00:00', updatedAt: '2025-01-02T00:00:00' },
  { id: 3, categoryName: 'Feeding Items', isActive: true, createdAt: '2025-01-03T00:00:00', updatedAt: '2025-01-03T00:00:00' },
  { id: 4, categoryName: 'Bath & Care', isActive: true, createdAt: '2025-01-04T00:00:00', updatedAt: '2025-01-04T00:00:00' },
  { id: 5, categoryName: 'Toys', isActive: true, createdAt: '2025-01-05T00:00:00', updatedAt: '2025-01-05T00:00:00' },
  { id: 6, categoryName: 'Baby Accessories', isActive: true, createdAt: '2025-01-06T00:00:00', updatedAt: '2025-01-06T00:00:00' },
  { id: 7, categoryName: 'Baby Bedding', isActive: true, createdAt: '2025-01-07T00:00:00', updatedAt: '2025-01-07T00:00:00' },
  { id: 8, categoryName: 'Baby Gear', isActive: true, createdAt: '2025-01-08T00:00:00', updatedAt: '2025-01-08T00:00:00' },
  { id: 9, categoryName: 'Hair Accessories', isActive: true, createdAt: '2025-01-09T00:00:00', updatedAt: '2025-01-09T00:00:00' },
  { id: 10, categoryName: 'Artificial Jewellery', isActive: true, createdAt: '2025-01-10T00:00:00', updatedAt: '2025-01-10T00:00:00' },
  { id: 11, categoryName: 'Handbags & Purses', isActive: true, createdAt: '2025-01-11T00:00:00', updatedAt: '2025-01-11T00:00:00' },
  { id: 12, categoryName: 'Gift Items', isActive: true, createdAt: '2025-01-12T00:00:00', updatedAt: '2025-01-12T00:00:00' },
  { id: 13, categoryName: 'Cosmetics & Beauty', isActive: true, createdAt: '2025-01-13T00:00:00', updatedAt: '2025-01-13T00:00:00' },
  { id: 14, categoryName: 'Stationery', isActive: true, createdAt: '2025-01-14T00:00:00', updatedAt: '2025-01-14T00:00:00' },
  { id: 15, categoryName: 'Party Items', isActive: true, createdAt: '2025-01-15T00:00:00', updatedAt: '2025-01-15T00:00:00' },
  { id: 16, categoryName: 'Ladies Accessories', isActive: true, createdAt: '2025-01-16T00:00:00', updatedAt: '2025-01-16T00:00:00' },
  { id: 17, categoryName: 'Mobile Accessories', isActive: true, createdAt: '2025-01-17T00:00:00', updatedAt: '2025-01-17T00:00:00' },
  { id: 18, categoryName: 'Small Home Appliances', isActive: true, createdAt: '2025-01-18T00:00:00', updatedAt: '2025-01-18T00:00:00' },
  { id: 19, categoryName: 'LED Bulbs & Lights', isActive: true, createdAt: '2025-01-19T00:00:00', updatedAt: '2025-01-19T00:00:00' },
  { id: 20, categoryName: 'Batteries', isActive: true, createdAt: '2025-01-20T00:00:00', updatedAt: '2025-01-20T00:00:00' },
  { id: 21, categoryName: 'Extension Cords', isActive: true, createdAt: '2025-01-21T00:00:00', updatedAt: '2025-01-21T00:00:00' },
  { id: 22, categoryName: 'Speakers', isActive: true, createdAt: '2025-01-22T00:00:00', updatedAt: '2025-01-22T00:00:00' },
  { id: 23, categoryName: 'Electric Fans', isActive: true, createdAt: '2025-01-23T00:00:00', updatedAt: '2025-01-23T00:00:00' },
  { id: 24, categoryName: 'Plastic Buckets & Tubs', isActive: true, createdAt: '2025-01-24T00:00:00', updatedAt: '2025-01-24T00:00:00' },
  { id: 25, categoryName: 'Water Bottles', isActive: true, createdAt: '2025-01-25T00:00:00', updatedAt: '2025-01-25T00:00:00' },
  { id: 26, categoryName: 'Storage Containers', isActive: true, createdAt: '2025-01-26T00:00:00', updatedAt: '2025-01-26T00:00:00' },
  { id: 27, categoryName: 'Plastic Chairs', isActive: true, createdAt: '2025-01-27T00:00:00', updatedAt: '2025-01-27T00:00:00' },
  { id: 28, categoryName: 'Kitchen Plastic Items', isActive: true, createdAt: '2025-01-28T00:00:00', updatedAt: '2025-01-28T00:00:00' },
  { id: 29, categoryName: 'Laundry Baskets', isActive: true, createdAt: '2025-01-29T00:00:00', updatedAt: '2025-01-29T00:00:00' },
  { id: 30, categoryName: 'Cooking Pots', isActive: true, createdAt: '2025-01-30T00:00:00', updatedAt: '2025-01-30T00:00:00' },
  { id: 31, categoryName: 'Frying Pans', isActive: true, createdAt: '2025-01-31T00:00:00', updatedAt: '2025-01-31T00:00:00' },
  { id: 32, categoryName: 'Aluminum Plates', isActive: true, createdAt: '2025-02-01T00:00:00', updatedAt: '2025-02-01T00:00:00' },
  { id: 33, categoryName: 'Kitchen Utensils', isActive: true, createdAt: '2025-02-02T00:00:00', updatedAt: '2025-02-02T00:00:00' },
  { id: 34, categoryName: 'Water Pots', isActive: true, createdAt: '2025-02-03T00:00:00', updatedAt: '2025-02-03T00:00:00' },
  { id: 35, categoryName: 'Lunch Boxes', isActive: true, createdAt: '2025-02-04T00:00:00', updatedAt: '2025-02-04T00:00:00' }
]

let mockIdCounter = 36

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

function getAuthHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

// ---------- Mock implementations ----------

async function mockGetAll() {
  await new Promise((r) => setTimeout(r, 300))
  return [...mockCategories]
}

async function mockGetById(id) {
  await new Promise((r) => setTimeout(r, 200))
  const found = mockCategories.find((c) => c.id === Number(id))
  if (!found) throw new Error('Category not found')
  return { ...found }
}

async function mockSearch(query) {
  await new Promise((r) => setTimeout(r, 200))
  if (!query || !String(query).trim()) return [...mockCategories]
  const q = String(query).toLowerCase()
  return mockCategories.filter((c) => c.categoryName.toLowerCase().includes(q))
}

async function mockSave(body) {
  await new Promise((r) => setTimeout(r, 300))
  const now = new Date().toISOString()
  const newCategory = {
    id: mockIdCounter++,
    categoryName: body.categoryName,
    isActive: body.isActive !== false,
    createdAt: now,
    updatedAt: now
  }
  mockCategories.push(newCategory)
  return newCategory
}

async function mockUpdate(id, body) {
  await new Promise((r) => setTimeout(r, 300))
  const idx = mockCategories.findIndex((c) => c.id === Number(id))
  if (idx === -1) throw new Error('Category not found')
  const updated = {
    ...mockCategories[idx],
    categoryName: body.categoryName ?? mockCategories[idx].categoryName,
    isActive: body.isActive !== undefined ? body.isActive : mockCategories[idx].isActive,
    updatedAt: new Date().toISOString()
  }
  mockCategories[idx] = updated
  return updated
}

async function mockDelete(id) {
  await new Promise((r) => setTimeout(r, 200))
  const idx = mockCategories.findIndex((c) => c.id === Number(id))
  if (idx === -1) throw new Error('Category not found')
  mockCategories.splice(idx, 1)
  return { success: true }
}

// ---------- Public API ----------

/**
 * GET all product categories
 * @returns {Promise<Array<{ id, categoryName, isActive, createdAt, updatedAt }>>}
 */
export async function getAll() {
  if (USE_MOCK) return mockGetAll()
  const res = await fetch(`${BASE_URL}/productCategory/getAll`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/**
 * GET category by id
 * @param {number|string} id
 * @returns {Promise<{ id, categoryName, isActive, createdAt, updatedAt }>}
 */
export async function getById(id) {
  if (USE_MOCK) return mockGetById(id)
  const res = await fetch(`${BASE_URL}/productCategory/getById?id=${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/**
 * Search categories (e.g. by name)
 * @param {string} query
 * @returns {Promise<Array<{ id, categoryName, isActive, createdAt, updatedAt }>>}
 */
export async function search(query) {
  if (USE_MOCK) return mockSearch(query)
  const params = new URLSearchParams()
  if (query && String(query).trim()) params.set('categoryName', String(query).trim())
  const res = await fetch(`${BASE_URL}/productCategory/search?${params}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/**
 * Create category
 * @param {{ categoryName: string, isActive?: boolean }} body
 * @returns {Promise<{ id, categoryName, isActive, createdAt, updatedAt }>}
 */
export async function save(body) {
  if (USE_MOCK) return mockSave(body)
  const res = await fetch(`${BASE_URL}/productCategory/save`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body)
  })
  return handleResponse(res)
}

/**
 * Update category
 * @param {number|string} id
 * @param {{ categoryName?: string, isActive?: boolean }} body
 * @returns {Promise<{ id, categoryName, isActive, createdAt, updatedAt }>}
 */
export async function update(id, body) {
  if (USE_MOCK) return mockUpdate(id, body)
  const res = await fetch(`${BASE_URL}/productCategory/update`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id, ...body })
  })
  return handleResponse(res)
}

/**
 * Delete category
 * @param {number|string} id
 * @returns {Promise<{ success?: boolean }>}
 */
export async function deleteCategory(id) {
  if (USE_MOCK) return mockDelete(id)
  const res = await fetch(`${BASE_URL}/productCategory/delete?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}
