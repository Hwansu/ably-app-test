import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { AuthLayout, MainLayout } from 'layouts'
import { routeMeta, routePaths } from 'constant'

const Login = React.lazy(() => import('pages/Login/Login'))
const UserInfo = React.lazy(() => import('pages/UserInfo/UserInfo'))

const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: routePaths.login, element: <Login /> },
      // { path: 'signup', element: <></> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: routePaths.userInfo, element: <UserInfo /> },
      // { path: 'signup', element: <></> },
    ],
  },
]
const Router = () => useRoutes(routes)

export default Router
