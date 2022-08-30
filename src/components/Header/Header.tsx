import { useLocation } from 'react-router-dom'
import { routeMeta } from 'constant'
import { useMemo } from 'react'

const Header = ({ isAuthLayout }: { isAuthLayout: boolean }) => {
  const { pathname } = useLocation()
  const title = useMemo(() => routeMeta[pathname]?.title, [pathname])

  return (
    <>
      {isAuthLayout ? (
        <header>
          <div className="headlogo-content">
            <img src="https://ably.team/images/Logo.svg" alt="ably-team" />
          </div>
          <h3>{title}</h3>
        </header>
      ) : (
        <header className="main-header">
          <img src="https://ably.team/images/Logo.svg" alt="ably-team" />
          {/* <span>asd</span> */}
          <h3>{title}</h3>
        </header>
      )}
    </>
  )
}

export default Header
