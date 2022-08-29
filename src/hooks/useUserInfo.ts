import { useQuery } from '@tanstack/react-query'
import UserInfoApi from 'api/UserInfoApi'
import { routePaths } from 'constant'
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
  const { fetchUserInfo } = UserInfoApi()
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
  /**
   * Define Effect
   */

  return {
    data,
  }
}

export default useUserInfo
