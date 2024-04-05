import { AppPath } from 'app/paths'
import exampleRoutes from 'example-page/routes'
import { LazyRouteObject } from 'router/utils/types'

const appRoutes: LazyRouteObject[] = [
  {
    path: AppPath.BasePath,
    Component: () => import('app/routes/~'),
    children: [...exampleRoutes]
  }
]

export default appRoutes
