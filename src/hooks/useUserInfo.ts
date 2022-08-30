import { useQuery } from '@tanstack/react-query'
import { UserInfoApi } from 'api'
import { routePaths } from 'constant'
import { useCallback, useRef } from 'react'
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
  const submitFlag = useRef(false)

  /**
   * Define Memoization
   */
  const handleLogoutClick = useCallback(async () => {
    if (submitFlag.current) return
    submitFlag.current = true
    const res = await doLogout()
    if (!res.isSuccess) {
      window.alert(res.message)
      return
    }
    window.sessionStorage.removeItem('token')
    nav(routePaths.login)
    submitFlag.current = false
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
