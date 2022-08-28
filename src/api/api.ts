import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://ably-frontend-assignment-server.vercel.app/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar', 'Content-Type': 'application/json' },
})

export const api: {
  get: typeof axiosInstance.get
  post: typeof axiosInstance.post
  //   put: typeof axiosInstance.put
  //   delete: typeof axiosInstance.delete
} = {
  get(url, config) {
    return axiosInstance.get(url, config)
  },
  post(url, data) {
    return axiosInstance.post(url, data)
  },
}
