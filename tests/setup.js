// import '@testing-library/jest-dom/vitest'

import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, vi } from 'vitest'

// ==================== Globally Mock ====================
// Mock @rayriffy/datastore (Prevent CommonJS error)
const mockDatastore = vi.hoisted(() => ({
  createInstance: vi.fn().mockReturnValue({
    getItem: vi.fn().mockResolvedValue({}),
    setItem: vi.fn().mockImplementation(() => Promise.resolve()),
    removeItem: vi.fn().mockImplementation(() => Promise.resolve()),
    clear: vi.fn().mockImplementation(() => Promise.resolve())
  })
}))
vi.mock('@rayriffy/datastore', () => mockDatastore)

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
