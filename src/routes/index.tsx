import { RouteObject, useRoutes } from 'react-router-dom'
import { Login } from '../pages'

const routes: RouteObject[] = [
  {
    element: <></>,
    children: [
      { path: '/', element: <Login /> },
      { path: 'signup', element: <></> },
    ],
  },
]
const Router = () => useRoutes(routes)

export default Router
