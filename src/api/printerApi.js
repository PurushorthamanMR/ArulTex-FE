import { BASE_URL } from './config'
import { handleResponse, getAuthHeaders } from './apiHelpers'

/**
 * Send raw ZPL to backend printer service (which connects to Zebra via TCP 9100 or similar).
 *
 * Backend expected:
 * POST {BASE_URL}/printer/print-zpl
 * body: { zpl: string }
 */
export async function printZpl({ zpl }) {
  const res = await fetch(`${BASE_URL}/printer/print-zpl`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ zpl })
  })
  return handleResponse(res)
}

