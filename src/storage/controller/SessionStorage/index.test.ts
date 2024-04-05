/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionStorage } from 'storage/controller/SessionStorage'

describe('SessionStorage', () => {
  let customSessionStorage: SessionStorage
  // Mock session storage
  const originalSessionStorage = window.sessionStorage
  const getItem = vi.fn()
  const setItem = vi.fn()
  const removeItem = vi.fn()
  const clear = vi.fn()
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem,
      setItem,
      removeItem,
      clear
    },
    writable: true
  })

  beforeEach(() => {
    customSessionStorage = new SessionStorage()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  afterAll(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true
    })
  })

  describe('sessionStorage is accessible', () => {
    describe('getItem', () => {
      it('should return null if key is not found & fallback value is invalid', () => {
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBeNull()
      })
      it('should return fallback value if key is not found', () => {
        expect(
          customSessionStorage.getItem<string>('mock-key' as any, 'fallback-value')
        ).toBe('fallback-value')
      })
      it('should return value in its state first', () => {
        customSessionStorage.setItem('mock-key' as any, 'mock-value')
        getItem.mockReturnValueOnce(JSON.stringify('session-value-1'))
        expect(getItem).not.toBeCalled()
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBe('mock-value')
      })
      it('should return value from session storage if not found in its state', () => {
        getItem.mockReturnValueOnce(JSON.stringify('session-value-2'))
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBe(
          'session-value-2'
        )
        expect(getItem).toBeCalledTimes(1)
        expect(getItem).toBeCalledWith('mock-key')
      })
    })

    describe('setItem', () => {
      it('should set value to its state & session storage', () => {
        customSessionStorage.setItem('mock-key' as any, 'mock-value')
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBe('mock-value')
        expect(setItem).toBeCalledTimes(1)
        expect(setItem).toBeCalledWith('mock-key', JSON.stringify('mock-value'))
      })
    })

    describe('removeItem', () => {
      it('should remove value from its state & session storage', () => {
        customSessionStorage.setItem('mock-key' as any, 'mock-value')
        customSessionStorage.removeItem('mock-key' as any)
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBeNull()
        expect(removeItem).toBeCalledTimes(1)
        expect(removeItem).toBeCalledWith('mock-key')
      })
    })

    describe('clear', () => {
      it('should clear all data from its state & session storage', () => {
        customSessionStorage.setItem('mock-key-1' as any, 'mock-value-1')
        customSessionStorage.setItem('mock-key-2' as any, 'mock-value-2')
        customSessionStorage.clear()
        expect(customSessionStorage.getItem<string>('mock-key-1' as any)).toBeNull()
        expect(customSessionStorage.getItem<string>('mock-key-2' as any)).toBeNull()
        expect(clear).toBeCalledTimes(1)
      })
    })
  })

  describe('sessionStorage is not accessible', () => {
    beforeAll(() => {
      Object.defineProperty(window, 'sessionStorage', {
        value: null,
        writable: true
      })
    })

    describe('getItem', () => {
      it('should return null if key is not found & fallback value is invalid', () => {
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBeNull()
      })
      it('should return fallback value if key is not found', () => {
        expect(
          customSessionStorage.getItem<string>('mock-key' as any, 'fallback-value')
        ).toBe('fallback-value')
      })
      it('should return value in its state', () => {
        customSessionStorage.setItem('mock-key' as any, 'mock-value')
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBe('mock-value')
        expect(getItem).not.toBeCalled()
      })
    })

    describe('setItem', () => {
      it('should set value only to its state', () => {
        customSessionStorage.setItem('mock-key' as any, 'mock-value')
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBe('mock-value')
        expect(setItem).not.toBeCalled()
      })
    })

    describe('removeItem', () => {
      it('should remove value only from its state', () => {
        customSessionStorage.setItem('mock-key' as any, 'mock-value')
        customSessionStorage.removeItem('mock-key' as any)
        expect(customSessionStorage.getItem<string>('mock-key' as any)).toBeNull()
        expect(removeItem).not.toBeCalled()
      })
    })

    describe('clear', () => {
      it('should clear all data only from its state', () => {
        customSessionStorage.setItem('mock-key-1' as any, 'mock-value-1')
        customSessionStorage.setItem('mock-key-2' as any, 'mock-value-2')
        customSessionStorage.clear()
        expect(customSessionStorage.getItem<string>('mock-key-1' as any)).toBeNull()
        expect(customSessionStorage.getItem<string>('mock-key-2' as any)).toBeNull()
        expect(clear).not.toBeCalled()
      })
    })
  })
})
