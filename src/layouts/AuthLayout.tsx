import { Header } from 'components'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <Header isAuthLayout />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  )
}

export default AuthLayout
