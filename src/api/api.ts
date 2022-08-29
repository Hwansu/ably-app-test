import axios, { AxiosError, AxiosInstance } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://ably-frontend-assignment-server.vercel.app/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
})

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error)
  }
)

export const api: {
  axiosInstance: AxiosInstance
  get: typeof axiosInstance.get
  post: typeof axiosInstance.post
  isAxiosError<T>(error: unknown): error is AxiosError<T, any>
  //   put: typeof axiosInstance.put
  //   delete: typeof axiosInstance.delete
} = {
  axiosInstance,
  get(url, config) {
    return axiosInstance.get(url, config)
  },
  post(url, data) {
    return axiosInstance.post(url, data)
  },
  isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
  },
}
