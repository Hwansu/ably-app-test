import { API_URL } from 'constant'
import { api } from './api'

type fnDoLogin = (p: { email: string; password: string }) => Promise<string>

const LoginApi = () => {
  const { post } = api

  const doLogin: fnDoLogin = async ({ email, password }) => {
    const res = await post(API_URL.login, { email, password })
    console.log(res)
    return Promise.resolve('')
  }

  return {
    doLogin,
  }
}

export default LoginApi
