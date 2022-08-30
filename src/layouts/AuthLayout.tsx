import { Header, HeadLogo } from 'components'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <HeadLogo />
      <Header />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  )
}

export default AuthLayout
