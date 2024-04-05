import appRoutes from 'app/routes'
import { RouterProvider } from 'react-router-dom'
import createLazyRouter from 'router/utils/createLazyRouter'

const router = createLazyRouter(appRoutes)
console.log('asdasd')
function App() {
  return <RouterProvider router={router} />
}

export default App
