import { Header } from 'components'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Header isAuthLayout={false} />
      <div className="pad-header-page" />
      <main className="page-content">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
