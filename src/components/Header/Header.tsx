import { useLocation } from 'react-router-dom'
import { routeMeta } from 'constant'
import { useMemo } from 'react'

const Header = () => {
  const { pathname } = useLocation()
  const title = useMemo(() => routeMeta[pathname].title, [pathname])

  return (
    <header>
      <h3>{title}</h3>
    </header>
  )
}

export default Header
