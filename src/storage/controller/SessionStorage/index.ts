/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionStorageKeys } from 'storage/keys'

export class SessionStorage {
  private localMapper: Record<string, any> = {}

  /**
   * Get item from session storage
   * @param key
   * @param fallbackValue value to return if there is no data in memory or cannot access session storage
   * @returns value of the key
   */
  getItem<Value>(key: SessionStorageKeys, fallbackValue?: Value) {
    // Get from memory first
    if (this.localMapper[key]) {
      return this.localMapper[key] as Value
    }
    // Get from session storage
    try {
      const stringifiedItem = sessionStorage.getItem(key)
      if (!stringifiedItem) {
        if (fallbackValue !== undefined) return fallbackValue
        return null
      }
      const item = JSON.parse(stringifiedItem)
      if (!this.localMapper[key]) this.localMapper[key] = item
      return item
    } catch {
      if (fallbackValue !== undefined) return fallbackValue
      return null
    }
  }

  /**
   * Set item to session storage
   * @param key
   * @param value
   * @returns value of the key (null if failed)
   */
  setItem<Value>(key: SessionStorageKeys, value: Value) {
    // Set to memory
    this.localMapper[key] = value
    // Set to session storage
    try {
      const stringifiedValue = JSON.stringify(value)
      sessionStorage.setItem(key, stringifiedValue)
    } catch {}
  }

  /**
   * Remove item from session storage
   * @param key
   * @returns null
   */
  removeItem(key: SessionStorageKeys) {
    // Remove from memory
    delete this.localMapper[key]
    // Remove from session storage
    try {
      sessionStorage.removeItem(key)
    } catch {}
  }

  /**
   * Clear all data from session storage
   * @returns null
   */
  clear() {
    // Remove all data from memory
    this.localMapper = {}
    // Remove all data from session storage
    try {
      sessionStorage.clear()
    } catch {}
  }
}

const customSessionStorage = new SessionStorage()

export default customSessionStorage
