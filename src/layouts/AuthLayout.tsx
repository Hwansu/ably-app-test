import { Header } from 'components'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <Header isAuthLayout />
      <main className="page-content">
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout
