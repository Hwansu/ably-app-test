import { API_ENDPOINT, messages } from 'constant'
import { ApiResponseStatus, CommonApiFailure } from 'types'
import { api } from './api'

interface LoginSuccess {
  accessToken: string
}

interface fnDoLogin {
  (p: { email: string; password: string }): Promise<ApiResponseStatus<LoginSuccess>>
}

const LoginApi = () => {
  const { post, isAxiosError } = api

  const doLogin: fnDoLogin = async ({ email, password }) => {
    try {
      const { data, status } = await post<LoginSuccess>(API_ENDPOINT.login, {
        email,
        password,
      })
      if (status !== 200) return { isSuccess: false, message: messages.apiError }
      return { isSuccess: true, data }
    } catch (error) {
      if (isAxiosError<CommonApiFailure>(error) && error.response) {
        return { isSuccess: false, message: error.response.data.error.message }
      }
      return { isSuccess: false, message: messages.apiError }
    }
  }

  return {
    doLogin,
  }
}

export default LoginApi
