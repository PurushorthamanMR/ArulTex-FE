/**
 * Sales API - all data from backend
 */
import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

/** GET /sales/getAll - recent sales (for dashboard) */
export async function getAll() {
  const res = await fetch(`${BASE_URL}/sales/getAll`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list : []
}

/** GET /sales/report/daily?date=YYYY-MM-DD */
export async function getReportDaily(date) {
  const d = date ? new Date(date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
  const res = await fetch(`${BASE_URL}/sales/report/daily?date=${d}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/monthly?year=YYYY&month=M */
export async function getReportMonthly(year, month) {
  const y = year ?? new Date().getFullYear()
  const m = month ?? new Date().getMonth() + 1
  const res = await fetch(`${BASE_URL}/sales/report/monthly?year=${y}&month=${m}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/by-category?fromDate=...&toDate=... */
export async function getReportByCategory(fromDate, toDate) {
  const params = new URLSearchParams()
  if (fromDate) params.set('fromDate', fromDate)
  if (toDate) params.set('toDate', toDate)
  const res = await fetch(`${BASE_URL}/sales/report/by-category?${params}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list : []
}
/** POST /sales/save - create a new sale */
export async function save(saleData) {
  const res = await fetch(`${BASE_URL}/sales/save`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saleData)
  })
  return handleResponse(res)
}
/** GET /sales/getById?id=... */
export async function getById(id) {
  const res = await fetch(`${BASE_URL}/sales/getById?id=${id}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** POST /sales/return - return sale (restore product quantities). body: { saleId, items: [{ saleItemId, returnQty }] } */
export async function returnSale(saleId, items) {
  const res = await fetch(`${BASE_URL}/sales/return`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ saleId, items })
  })
  return handleResponse(res)
}

/** GET /sales/report/yearly?year=YYYY */
export async function getReportYearly(year) {
  const y = year ?? new Date().getFullYear()
  const res = await fetch(`${BASE_URL}/sales/report/yearly?year=${y}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/trends */
export async function getTrends() {
  const res = await fetch(`${BASE_URL}/sales/report/trends`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/top-products?limit=10 */
export async function getTopProducts(limit = 10) {
  const res = await fetch(`${BASE_URL}/sales/report/top-products?limit=${limit}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/profitability */
export async function getProfitability() {
  const res = await fetch(`${BASE_URL}/sales/report/profitability`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/low-stock */
export async function getLowStock() {
  const res = await fetch(`${BASE_URL}/sales/report/low-stock`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/xReport — useOpenShift: true = current open shift; else fromDate/toDate */
export async function getXReport(params = {}) {
  const query = new URLSearchParams()
  if (params.userId) query.set('userId', String(params.userId))
  if (params.fromDate) query.set('fromDate', params.fromDate)
  if (params.toDate) query.set('toDate', params.toDate)
  if (params.shiftId) query.set('shiftId', String(params.shiftId))
  if (params.useOpenShift) query.set('useOpenShift', '1')
  const res = await fetch(`${BASE_URL}/sales/report/xReport?${query.toString()}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** GET /sales/report/zReport — useOpenShift: true = current open shift; else fromDate/toDate */
export async function getZReport(params = {}) {
  const query = new URLSearchParams()
  if (params.userId) query.set('userId', String(params.userId))
  if (params.fromDate) query.set('fromDate', params.fromDate)
  if (params.toDate) query.set('toDate', params.toDate)
  if (params.shiftId) query.set('shiftId', String(params.shiftId))
  if (params.useOpenShift) query.set('useOpenShift', '1')
  const res = await fetch(`${BASE_URL}/sales/report/zReport?${query.toString()}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}

/** POST /sales/report/zReport/close — closes current open shift + saves Z archive */
export async function closeZReport() {
  const res = await fetch(`${BASE_URL}/sales/report/zReport/close`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
  return handleResponse(res)
}

/** GET /sales/report/zReport/archives?limit=50 */
export async function getZReportArchives(limit = 50) {
  const res = await fetch(`${BASE_URL}/sales/report/zReport/archives?limit=${limit}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  const list = await handleResponse(res)
  return Array.isArray(list) ? list : []
}

/** GET /sales/report/zReport/archive?id= */
export async function getZReportArchiveById(id) {
  const res = await fetch(`${BASE_URL}/sales/report/zReport/archive?id=${id}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}
