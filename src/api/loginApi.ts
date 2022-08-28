import { API_ENDPOINT } from 'constant'
import { api } from './api'

type fnDoLogin = (p: { email: string; password: string }) => Promise<boolean>
interface LoginSuccess {
  accessToken: string
}
interface LoginFailure {
  error: {
    message: string
  }
}

const LoginApi = () => {
  const { post, axiosInstance } = api

  const doLogin: fnDoLogin = async ({ email, password }) => {
    try {
      const {
        data: { accessToken },
      } = await post<LoginSuccess>(API_ENDPOINT.login, {
        email,
        password,
      })
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return Promise.resolve(true)
    } catch (error) {
      // console.log(error)
      return Promise.resolve(false)
    }
  }

  return {
    doLogin,
  }
}

export default LoginApi
