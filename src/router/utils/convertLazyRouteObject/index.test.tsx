import convertLazyRouteObject from 'router/utils/convertLazyRouteObject'

describe('convertLazyRouteObject', () => {
  it('should convert LazyRouteObject to RouteObject', async () => {
    const mockComponent = vi.fn().mockResolvedValue({ default: () => 'MockComponent' })
    const mockPreload1 = vi.fn()
    const mockPreload2 = vi.fn()

    const lazyRouteObject = {
      path: '/mock-path',
      Component: mockComponent,
      preloads: [mockPreload1, mockPreload2],
      children: [
        {
          path: '/child-path',
          Component: mockComponent
        }
      ]
    }

    const routeObject = convertLazyRouteObject(lazyRouteObject)
    expect(routeObject.path).toBe('/mock-path')
    expect(routeObject.lazy).toBeDefined()
    expect(routeObject.children).toHaveLength(1)

    const lazyResult = await routeObject.lazy!()
    expect(lazyResult.Component).toBeDefined()
    expect(mockComponent).toHaveBeenCalledTimes(1)
    expect(mockPreload1).toHaveBeenCalledTimes(1)
    expect(mockPreload2).toHaveBeenCalledTimes(1)

    // Test child route conversion
    const childRouteObject = routeObject.children![0]
    expect(childRouteObject.path).toBe('/child-path')
    expect(childRouteObject.lazy).toBeDefined()

    const childLazyResult = await childRouteObject.lazy!()
    expect(childLazyResult.Component).toBeDefined()
  })
})
