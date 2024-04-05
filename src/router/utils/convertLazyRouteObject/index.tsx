import { RouteObject } from 'react-router-dom'
import { LazyRouteObject } from 'router/utils/types'

function convertLazyRouteObject(lazyRouteObject: LazyRouteObject): RouteObject {
  const { Component, children, preloads, ...routeObject } = lazyRouteObject
  return {
    ...routeObject,
    lazy: async () => {
      try {
        const { default: RouteComponent } = await Component()

        if (preloads) {
          preloads.forEach((preload) => preload())
        }

        return {
          Component: RouteComponent
        } as RouteObject
      } catch (err) {
        window.location.reload()
      }
    },
    children: children?.map(convertLazyRouteObject)
  } as RouteObject
}

export default convertLazyRouteObject
