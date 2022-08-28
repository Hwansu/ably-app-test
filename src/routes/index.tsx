import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { AuthLayout } from 'layouts'

const Login = React.lazy(() => import('pages/Login/Login'))

const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: <Login /> },
      // { path: 'signup', element: <></> },
    ],
  },
]
const Router = () => useRoutes(routes)

export default Router
