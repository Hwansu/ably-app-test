import { API_ENDPOINT, messages } from 'constant'
import { ApiResponseStatus, CommonApiFailure, UserInfoSuccess } from 'types'
import { api } from './api'

interface LogoutSuccess {
  lastConnectedAt: Date // 마지막 접속 일자
}
interface fnFetchUserInfo {
  (): Promise<UserInfoSuccess>
}
interface fnDoLogout {
  (): Promise<ApiResponseStatus<LogoutSuccess>>
}

const UserInfoApi = () => {
  const { get, isAxiosError, post } = api

  const fetchUserInfo: fnFetchUserInfo = async () => {
    try {
      const { data, status } = await get<UserInfoSuccess>(API_ENDPOINT.userInfo)
      if (status !== 200) throw new Error(messages.apiError)
      return data
    } catch (error) {
      if (isAxiosError<CommonApiFailure>(error) && error.response) {
        throw new Error(error.response.data.error.message)
      }
      throw new Error(messages.apiError)
    }
  }

  const doLogout: fnDoLogout = async () => {
    try {
      const { data, status } = await post<LogoutSuccess>(API_ENDPOINT.logout)
      if (status !== 200) return { isSuccess: false, message: messages.apiError }
      return { isSuccess: true, data }
    } catch (error) {
      if (isAxiosError<CommonApiFailure>(error) && error.response) {
        return { isSuccess: false, message: error.response.data.error.message }
      }
      return { isSuccess: false, message: messages.apiError }
    }
  }

  return { fetchUserInfo, doLogout }
}

export default UserInfoApi
