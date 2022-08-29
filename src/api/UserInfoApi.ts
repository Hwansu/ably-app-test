import { AxiosError } from 'axios'
import { API_ENDPOINT, messages } from 'constant'
import { CommonApiFailure, UserInfoSuccess } from 'types'
import { api } from './api'

interface fnFetchUserInfo {
  (): Promise<UserInfoSuccess>
}

const UserInfoApi = () => {
  const { get, isAxiosError } = api

  const fetchUserInfo: fnFetchUserInfo = async () => {
    try {
      const { data, status } = await get<UserInfoSuccess>(API_ENDPOINT.userInfo)
      return data
      //   if (status === 200) return { isSuccess: true, data }
      //   throw new Error(messages.apiError)
    } catch (error: unknown | AxiosError<CommonApiFailure>) {
      if (isAxiosError<CommonApiFailure>(error) && error.response) {
        throw new Error(error.response.data.error.message)
        // return { isSuccess: false, message: '' }
      }
      //   return { isSuccess: false, message: '' }
      throw new Error(messages.apiError)
    }
  }

  return { fetchUserInfo }
}

export default UserInfoApi
