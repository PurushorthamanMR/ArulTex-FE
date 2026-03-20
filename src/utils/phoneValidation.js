// Phone validation helper shared across pages.
// Rule: accept optional leading `+` and 8-15 digits total.

export function normalizePhoneInput(value) {
  const raw = value == null ? '' : String(value)
  // Keep only separators that people commonly type (spaces, hyphen, parentheses).
  return raw.trim().replace(/[ \-()]/g, '')
}

export function isValidPhoneNumber(value) {
  const normalized = normalizePhoneInput(value)
  if (!normalized) return false
  return /^\+?\d{8,15}$/.test(normalized)
}

export function getPhoneValidationError(value) {
  if (!isValidPhoneNumber(value)) return 'Enter a valid phone number (8-15 digits).'
  return ''
}

