import Datastore from 'storage/controller/Datastore'

describe('Datastore', () => {
  // Mock @rayriffy/datastore
  const mockCreateInstance = vi.hoisted(() => vi.fn())
  const mockDatastore = vi.hoisted(() => ({
    createInstance: mockCreateInstance
  }))
  vi.mock('@rayriffy/datastore', () => mockDatastore)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call createInstance', () => {
    Datastore.instance
    expect(mockDatastore.createInstance).toBeCalled()
  })

  describe('when can init datastore', () => {
    beforeAll(() => {
      mockCreateInstance.mockReturnValue({
        getItem: vi.fn().mockResolvedValue({}),
        setItem: vi.fn().mockImplementation(() => Promise.resolve()),
        removeItem: vi.fn().mockImplementation(() => Promise.resolve()),
        clear: vi.fn().mockImplementation(() => Promise.resolve())
      })
      Datastore.instance
    })

    describe('getInstance', () => {
      it('should return valid datastore instance', () => {
        expect(Datastore.instance).not.toBeFalsy()
      })
    })

    describe('isValidInstance', () => {
      it('should return true', () => {
        expect(Datastore.isValidInstance).toBe(true)
      })
    })

    describe('clear', () => {
      it('should set instance to undefined', async () => {
        expect(Datastore.instance).not.toBeFalsy()
        Datastore.clear()
        // This is not undefined because getter will call createInstance again
        expect(Datastore.instance).not.toBeFalsy()
      })
    })
  })

  describe('when can not init Datastore', () => {
    beforeAll(() => {
      Datastore.clear()
      mockCreateInstance.mockImplementation(() => {
        throw new Error('test-error')
      })
      Datastore.instance
    })

    describe('getInstance', () => {
      it('should return undefined', () => {
        expect(Datastore.instance).toBeFalsy()
      })
    })

    describe('isValidInstance', () => {
      it('should return false', () => {
        expect(Datastore.isValidInstance).toBe(false)
      })
    })

    describe('clear', () => {
      it('should set instance to undefined', async () => {
        Datastore.clear()
        expect(Datastore.instance).toBeFalsy()
      })
    })
  })
})
