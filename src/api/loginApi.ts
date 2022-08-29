import axios, { AxiosError } from 'axios'
import { API_ENDPOINT } from 'constant'
import { ApiResponseStatus } from 'types'
import { api } from './api'

interface LoginSuccess {
  accessToken: string
}
interface LoginFailure {
  error: {
    message: string
  }
}
type fnDoLogin = (p: {
  email: string
  password: string
}) => Promise<ApiResponseStatus<LoginSuccess>>

const LoginApi = () => {
  const { post, axiosInstance, isAxiosError } = api

  const doLogin: fnDoLogin = async ({ email, password }) => {
    try {
      const {
        data: { accessToken },
      } = await post<LoginSuccess>(API_ENDPOINT.login, {
        email,
        password,
      })
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return Promise.resolve({ isSuccess: true })
    } catch (error: unknown | AxiosError<LoginFailure>) {
      if (isAxiosError<LoginFailure>(error) && error.response) {
        return Promise.resolve({ isSuccess: false, message: error.response.data.error.message })
      }
      return Promise.resolve({ isSuccess: false, message: '' })
    }
  }

  return {
    doLogin,
  }
}

export default LoginApi
