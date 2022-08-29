import React from 'react'
import { useRoutes } from 'react-router-dom'
import { AuthLayout, MainLayout } from 'layouts'
import { routePaths } from 'constant'

const Login = React.lazy(() => import('pages/Login/Login'))
const UserInfo = React.lazy(() => import('pages/UserInfo/UserInfo'))

const Router = () =>
  useRoutes([
    {
      element: <AuthLayout />,
      children: [
        { path: routePaths.login, element: <Login /> },
        // { path: 'signup', element: <></> },
      ],
    },
    {
      element: <MainLayout />,
      children: [{ path: routePaths.userInfo, element: <UserInfo /> }],
    },
  ])

export default Router
