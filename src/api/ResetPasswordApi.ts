import { API_ENDPOINT, messages } from 'constant'
import { ApiResponseStatus, CommonApiFailure, IssueTokenSuccess } from 'types'
import { api } from './api'

interface fnRequestIssueToken {
  (email: string): Promise<ApiResponseStatus<IssueTokenSuccess>>
}

const ResetPasswordApi = () => {
  const { get, isAxiosError } = api

  const requestIssueToken: fnRequestIssueToken = async email => {
    try {
      const { data, status } = await get<IssueTokenSuccess>(API_ENDPOINT.resetPassword, {
        params: { email },
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
    requestIssueToken,
  }
}

export default ResetPasswordApi
