/* eslint-disable @typescript-eslint/no-explicit-any */
import { waitFor } from '@testing-library/react'
import Datastore from 'storage/controller/Datastore'
import { AsyncStore } from 'storage/controller/Datastore/types'
import storage from 'storage/controller/Storage'

describe('Storage', () => {
  // Spy datastore
  const instanceSpy = vi
    .spyOn(Datastore, 'instance', 'get')
    .mockReturnValue({} as AsyncStore)

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('when cannot init datastore', () => {
    beforeEach(() => {
      instanceSpy.mockImplementation(() => {
        throw new Error('test-error')
      })
    })

    describe('getItem', () => {
      it('should return fallback value if it is provided', async () => {
        expect(
          await storage.getItem('mock-key' as any, { name: 'test-fallback' })
        ).toEqual({ name: 'test-fallback' })
      })
      it('should return null if fallback value is not provided', async () => {
        expect(await storage.getItem('mock-key' as any)).toEqual(null)
      })
    })

    describe('setItem', () => {
      it('should return null', async () => {
        expect(await storage.setItem('mock-key' as any, 'test-value')).toBeUndefined()
      })
    })

    describe('removeItem', () => {
      it('should return null', async () => {
        expect(await storage.removeItem('mock-key' as any)).toBeUndefined()
      })
    })

    describe('clear', () => {
      it('should return null', async () => {
        expect(await storage.clear()).toBeUndefined()
      })
    })
  })

  describe('when can init datastore', () => {
    const mockGetItem = vi.fn().mockResolvedValue(null)
    const mockSetItem = vi.fn().mockResolvedValue(null)
    const mockRemoveItem = vi.fn().mockResolvedValue(null)
    const mockClear = vi.fn().mockResolvedValue(null)

    beforeEach(() => {
      instanceSpy.mockReturnValue({
        key: () => Promise.resolve(null),
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: mockRemoveItem,
        clear: mockClear
      } as AsyncStore)
    })

    afterEach(() => {
      storage.clear()
    })

    describe('getItem', () => {
      it('should return correct value', async () => {
        expect(await storage.getItem('mock-key-1' as any)).toEqual(null)
        await storage.setItem('mock-key-1' as any, 'test-value-1')
        await storage.setItem('mock-key-2' as any, 'test-value-2')
        expect(await storage.getItem('mock-key-1' as any)).toEqual('test-value-1')
      })
      it('should call getItem with correct data', async () => {
        await storage.getItem('mock-key' as any)
        await waitFor(() => {
          expect(mockGetItem).toBeCalledTimes(1)
          expect(mockGetItem).toBeCalledWith('mock-key')
        })
      })
    })

    describe('setItem', () => {
      it('should set value in memory', async () => {
        expect(await storage.getItem('mock-key' as any)).toEqual(null)
        await storage.setItem('mock-key' as any, 'test-value-3')
        expect(await storage.getItem('mock-key' as any)).toEqual('test-value-3')
      })
      it('should call setItem with correct data', async () => {
        expect(mockSetItem).not.toBeCalled()
        await storage.setItem('mock-key' as any, 'test-value-4')
        await waitFor(() => {
          expect(mockSetItem).toBeCalledTimes(1)
          expect(mockSetItem).toBeCalledWith('mock-key' as any, 'test-value-4')
        })
      })
    })

    describe('removeItem', () => {
      it('should remove value in memory', async () => {
        expect(await storage.getItem('mock-key-1' as any)).toEqual(null)
        await storage.setItem('mock-key-1' as any, 'test-value-5')
        expect(await storage.getItem('mock-key-1' as any)).toEqual('test-value-5')
        await storage.removeItem('mock-key-1' as any)
        expect(await storage.getItem('mock-key-1' as any)).toEqual(null)
      })
      it('should call removeItem with correct data', async () => {
        await storage.removeItem('mock-key' as any)
        await waitFor(() => {
          expect(mockRemoveItem).toBeCalledWith('mock-key')
        })
      })
    })

    describe('clear', () => {
      it('should clear all values in memory', async () => {
        expect(await storage.getItem('mock-key-1' as any)).toEqual(null)
        expect(await storage.getItem('mock-key-2' as any)).toEqual(null)
        await storage.setItem('mock-key-1' as any, 'test-value-6')
        await storage.setItem('mock-key-2' as any, 'test-value-7')
        expect(await storage.getItem('mock-key-1' as any)).toEqual('test-value-6')
        expect(await storage.getItem('mock-key-2' as any)).toEqual('test-value-7')
        await storage.clear()
        expect(await storage.getItem('mock-key-1' as any)).toEqual(null)
        expect(await storage.getItem('mock-key-2' as any)).toEqual(null)
      })
      it('should call clear', async () => {
        await storage.clear()
        await waitFor(() => {
          expect(mockClear).toBeCalled()
        })
      })
    })
  })
})
