import { useQuery } from '@tanstack/react-query'
import UserInfoApi from 'api/UserInfoApi'
import { routePaths } from 'constant'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserInfoSuccess } from 'types'

const defaultUserInfo: UserInfoSuccess = {
  name: '',
  email: '',
  profileImage: '',
  lastConnectedAt: new Date(),
}

const useUserInfo = () => {
  /**
   * Define State
   */
  const { fetchUserInfo, doLogout } = UserInfoApi()
  const nav = useNavigate()
  const { data = { ...defaultUserInfo } } = useQuery(['userInfo'], fetchUserInfo, {
    onError() {
      nav(routePaths.login)
    },
    onSuccess(d) {
      if (!d) return nav(routePaths.login)
      return d
    },
  })
  /**
   * Define Memoization
   */
  const handleLogoutClick = useCallback(async () => {
    const res = await doLogout()
    if (!res.isSuccess) {
      window.alert(res.message)
      return
    }
    nav(routePaths.login)
  }, [doLogout, nav])
  /**
   * Define Effect
   */

  return {
    data,
    handleLogoutClick,
  }
}

export default useUserInfo
