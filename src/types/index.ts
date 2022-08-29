export interface ApiSuccessStatus<T> {
  isSuccess: true
  data?: T
}

export interface ApiFailureStatus {
  isSuccess: false
  message: string
}

export type ApiResponseStatus<T> = ApiSuccessStatus<T> | ApiFailureStatus
