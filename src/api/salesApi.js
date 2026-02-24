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
