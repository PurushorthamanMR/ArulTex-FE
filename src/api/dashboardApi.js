/**
 * Dashboard API - all data from backend
 */
import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

/**
 * GET /dashboard/summary
 * @returns {Promise<{ totalSales, totalPurchases, lowStockCount, todaySales, monthSales }>}
 */
export async function getSummary() {
  const res = await fetch(`${BASE_URL}/dashboard/summary`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  return handleResponse(res)
}
