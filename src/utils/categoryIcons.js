/**
 * Frontend-only: 6 group icons for categories + extended picker icons.
 */
import {
  faTag,
  faBaby,
  faGem,
  faPen,
  faPlug,
  faUtensils,
  faBasketShopping,
  faBath,
  faPuzzlePiece,
  faBabyCarriage,
  faBed,
  faGift,
  faBagShopping,
  faSprayCanSparkles,
  faGlasses,
  faChampagneGlasses,
  faMobile,
  faLightbulb,
  faBatteryFull,
  faVolumeHigh,
  faFan,
  faBlender,
  faBox,
  faBoxArchive,
  faDroplet,
  faBottleWater,
  faChair,
  faFireBurner,
  faPlateWheat,
  faCartShopping,
  faStar,
  faHeart,
  faBook,
  faScissors
} from '@fortawesome/free-solid-svg-icons'

/** Group icon keys 1–6 (defaults for category groups) */
const GROUP_ICONS = {
  1: faBaby,
  2: faGem,
  3: faPen,
  4: faPlug,
  5: faUtensils,
  6: faBasketShopping
}

/** All picker icons: keys 1–6 (groups) + 7–36 (extra). Used for display and storage. */
const PICKER_ICONS = {
  ...GROUP_ICONS,
  7: faBath,
  8: faPuzzlePiece,
  9: faBabyCarriage,
  10: faBed,
  11: faGift,
  12: faBagShopping,
  13: faSprayCanSparkles,
  14: faGlasses,
  15: faChampagneGlasses,
  16: faMobile,
  17: faLightbulb,
  18: faBatteryFull,
  19: faVolumeHigh,
  20: faFan,
  21: faBlender,
  22: faBox,
  23: faBoxArchive,
  24: faDroplet,
  25: faBottleWater,
  26: faChair,
  27: faFireBurner,
  28: faPlateWheat,
  29: faCartShopping,
  30: faStar,
  31: faHeart,
  32: faBook,
  33: faScissors,
  34: faTag,
  35: faUtensils,
  36: faBasketShopping
}

/** Labels for picker icons (keys 1–36) */
const PICKER_LABELS = {
  1: 'Baby & Kids',
  2: 'Fancy & Beauty',
  3: 'Stationery & Party',
  4: 'Electronics',
  5: 'Kitchen',
  6: 'Plastic & Household',
  7: 'Bath',
  8: 'Puzzle',
  9: 'Carriage',
  10: 'Bed',
  11: 'Gift',
  12: 'Bag',
  13: 'Beauty',
  14: 'Glasses',
  15: 'Party',
  16: 'Mobile',
  17: 'Light',
  18: 'Battery',
  19: 'Speaker',
  20: 'Fan',
  21: 'Blender',
  22: 'Box',
  23: 'Archive',
  24: 'Droplet',
  25: 'Bottle',
  26: 'Chair',
  27: 'Cooker',
  28: 'Plate',
  29: 'Cart',
  30: 'Star',
  31: 'Heart',
  32: 'Book',
  33: 'Scissors',
  34: 'Tag',
  35: 'Utensils',
  36: 'Basket'
}

/** Category id (1–35) → group id (1–6) */
const CATEGORY_TO_GROUP = {
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1,   // Baby & Kids
  9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 16: 2,           // Fancy & Beauty
  14: 3, 15: 3,                                      // Stationery & Party
  17: 4, 18: 4, 19: 4, 20: 4, 21: 4, 22: 4, 23: 4,  // Electronics & Electrical
  30: 5, 31: 5, 32: 5, 33: 5, 34: 5, 35: 5,         // Kitchen & Cookware
  24: 6, 25: 6, 26: 6, 27: 6, 28: 6, 29: 6          // Plastic & Household
}

/** Default icon for category id (by group); used when no stored override */
const CATEGORY_ICONS = {}
for (let id = 1; id <= 35; id++) {
  const group = CATEGORY_TO_GROUP[id]
  CATEGORY_ICONS[id] = group != null ? GROUP_ICONS[group] : faTag
}

const STORAGE_KEY = 'arultex_category_icon_overrides'

function getStoredOverrides() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function setStoredOverride(categoryId, iconKey) {
  const overrides = getStoredOverrides()
  overrides[String(categoryId)] = iconKey
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  } catch (_) {}
}

/** Picker icon keys (1–36) */
const PICKER_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

/**
 * List of { iconKey, icon, label } for the icon picker (36 options, frontend only).
 */
export const CATEGORY_ICON_OPTIONS = PICKER_KEYS.map((iconKey) => ({
  iconKey,
  icon: PICKER_ICONS[iconKey],
  label: PICKER_LABELS[iconKey] || `Icon ${iconKey}`
}))

/**
 * Get stored icon key for a category (frontend only).
 * @param {number|string} categoryId
 * @returns {number|null} icon key 1–35 or null if not set
 */
export function getStoredIconKey(categoryId) {
  const id = categoryId != null ? String(categoryId) : null
  if (id == null) return null
  const overrides = getStoredOverrides()
  const key = overrides[id]
  return key != null ? Number(key) : null
}

/**
 * Save selected icon for a category (frontend only, localStorage).
 * Keys 1–36 (picker icons) are stored.
 * @param {number|string} categoryId
 * @param {number} iconKey 1–36
 */
export function setStoredIconKey(categoryId, iconKey) {
  const id = categoryId != null ? Number(categoryId) : null
  const key = iconKey != null ? Number(iconKey) : null
  if (id == null || key == null || key < 1 || key > 36) return
  setStoredOverride(id, key)
}

/**
 * Get default group id (1–6) for a category id.
 * @param {number|string} categoryId
 * @returns {number|null}
 */
export function getGroupForCategory(categoryId) {
  const id = categoryId != null ? Number(categoryId) : null
  return id != null ? (CATEGORY_TO_GROUP[id] ?? null) : null
}

/**
 * Get FontAwesome icon for a category (frontend only).
 * Uses stored selection (1–6) if set, else group icon by category id.
 * @param {number|string} categoryId - Category id
 * @returns {import('@fortawesome/fontawesome-svg-core').IconDefinition}
 */
export function getCategoryIcon(categoryId) {
  const id = categoryId != null ? Number(categoryId) : null
  const storedKey = getStoredIconKey(id)
  if (storedKey != null && PICKER_ICONS[storedKey]) return PICKER_ICONS[storedKey]
  const group = id != null ? CATEGORY_TO_GROUP[id] : null
  return (group != null && GROUP_ICONS[group]) ? GROUP_ICONS[group] : faTag
}

/**
 * Get icon by picker key 1–36 (for picker preview and display).
 * @param {number|null} iconKey 1–36
 */
export function getIconByKey(iconKey) {
  const k = iconKey != null ? Number(iconKey) : null
  return (k != null && PICKER_ICONS[k]) ? PICKER_ICONS[k] : faTag
}
