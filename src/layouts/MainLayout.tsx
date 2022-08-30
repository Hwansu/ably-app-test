import { Header } from 'components'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Header isAuthLayout={false} />
      <div className="pad-header-page" />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
