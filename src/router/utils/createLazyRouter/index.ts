import { createBrowserRouter } from 'react-router-dom'
import convertLazyRouteObject from 'router/utils/convertLazyRouteObject'
import { LazyRouteObject } from 'router/utils/types'

function createLazyRouter(routes: LazyRouteObject[]) {
  const configuredRoutes = routes.map(convertLazyRouteObject)

  return createBrowserRouter(configuredRoutes)
}

export default createLazyRouter
