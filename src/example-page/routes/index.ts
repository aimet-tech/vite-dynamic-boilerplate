import { ExamplePath } from 'example-page/paths'
import { LazyRouteObject } from 'router/utils/types'

const exampleRoutes: LazyRouteObject[] = [
  {
    path: ExamplePath.ExamplePath,
    Component: () => import('example-page/routes/example')
  }
]

export default exampleRoutes
