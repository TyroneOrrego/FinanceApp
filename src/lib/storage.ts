/**
 * Robust LocalStorage wrapper with error handling and quota-exceeded fallback.
 */
export const safeStorage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return defaultValue
      return JSON.parse(raw) as T
    } catch (err) {
      console.warn(`[safeStorage] Failed to read key "${key}":`, err)
      return defaultValue
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
      return true
    } catch (err) {
      console.error(`[safeStorage] Failed to write key "${key}":`, err)
      return false
    }
  },

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (err) {
      console.warn(`[safeStorage] Failed to remove key "${key}":`, err)
      return false
    }
  },
}
