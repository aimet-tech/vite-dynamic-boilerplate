/* eslint-disable no-empty */
import { createInstance } from '@rayriffy/datastore'
import { AsyncStore } from 'storage/controller/Datastore/types'

class Datastore {
  private static _instance: AsyncStore | undefined

  static get instance() {
    if (!this._instance) {
      try {
        this._instance = createInstance('dmind-datastore')
      } catch {}
    }
    return this._instance
  }

  static get isValidInstance() {
    return !!this._instance
  }

  static clear() {
    if (this._instance) {
      this._instance = undefined
    }
  }
}

export default Datastore
