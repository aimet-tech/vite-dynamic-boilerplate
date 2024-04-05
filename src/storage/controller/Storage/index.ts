/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Datastore from 'storage/controller/Datastore'
import { StorageKeys } from 'storage/keys'

class Storage {
  private localMapper: Record<string, any> = {}

  /**
   * Get item from storage
   * @param key
   * @param fallbackValue value to return if there is no data in memory cannot access storage
   * @returns value of the key
   */
  async getItem<Value>(key: StorageKeys, fallbackValue?: Value) {
    // Get from memory first
    if (this.localMapper[key]) {
      return this.localMapper[key] as Value
    }
    // Get from persistence storage
    try {
      const item = ((await Datastore.instance?.getItem(key)) as Value) ?? null
      if (!this.localMapper[key]) this.localMapper[key] = item
      return item
    } catch {
      if (fallbackValue !== undefined) return fallbackValue
      return null
    }
  }

  /**
   * Set item to storage
   * @param key
   * @param value
   * @returns value of the key (null if failed)
   */
  async setItem<Value>(key: StorageKeys, value: Value) {
    // Set to memory
    this.localMapper[key] = value
    // Set to persistence storage
    try {
      await Datastore.instance?.setItem(key, value)
    } catch {}
  }

  /**
   * Remove item from storage
   * @param key
   * @returns null
   */
  async removeItem(key: StorageKeys) {
    // Remove from memory
    delete this.localMapper[key]
    // Remove from persistence storage
    try {
      await Datastore.instance?.removeItem(key)
    } catch {}
  }

  /**
   * Clear all data from storage
   * @returns null
   */
  async clear() {
    // Remove all data from memory
    this.localMapper = {}
    // Remove all data from persistence storage
    try {
      await Datastore.instance?.clear()
    } catch {}
  }
}

const storage = new Storage()

export default storage
