import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { AuthLayout } from 'layouts'
import { routeMeta, routePaths } from 'constant'

const Login = React.lazy(() => import('pages/Login/Login'))

const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: routePaths.login, element: <Login /> },
      // { path: 'signup', element: <></> },
    ],
  },
]
const Router = () => useRoutes(routes)

export default Router
