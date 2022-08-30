import axios, { AxiosError, AxiosInstance } from 'axios'
import { authApis } from 'constant'

const axiosInstance = axios.create({
  baseURL: 'https://ably-frontend-assignment-server.vercel.app/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use(
  config => {
    const c = { ...config }
    if (c.headers && authApis.includes(c.url ? c.url : '')) {
      const accessToken = sessionStorage.getItem('token')
      c.headers.Authorization = `Bearer ${accessToken}`
    }
    return c
  },
  error => {
    return Promise.reject(error)
  }
)
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export const api: {
  axiosInstance: AxiosInstance
  isAxiosError<T>(error: unknown): error is AxiosError<T>
  get: typeof axiosInstance.get
  post: typeof axiosInstance.post
  patch: typeof axiosInstance.patch
} = {
  axiosInstance,
  isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
  },
  get(url, config) {
    return axiosInstance.get(url, config)
  },
  post(url, data) {
    return axiosInstance.post(url, data)
  },
  patch(url, data) {
    return axiosInstance.patch(url, data)
  },
}
