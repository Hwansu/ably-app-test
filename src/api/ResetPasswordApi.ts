import { API_ENDPOINT, messages } from 'constant'
import { ApiResponseStatus, CommonApiFailure, IssueTokenSuccess } from 'types'
import { api } from './api'

interface VerificationSuccess {
  confirmToken: string // 인증 코드 검증 토큰
}

interface fnRequestIssueToken {
  (email: string): Promise<ApiResponseStatus<IssueTokenSuccess>>
}
interface fnRequestVerification {
  (p: { email: string; authCode: string; issueToken: string }): Promise<
    ApiResponseStatus<VerificationSuccess>
  >
}

const ResetPasswordApi = () => {
  const { get, isAxiosError, post } = api

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

  const requestVerification: fnRequestVerification = async params => {
    try {
      const { data, status } = await post<VerificationSuccess>(API_ENDPOINT.resetPassword, params)
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
    requestVerification,
  }
}

export default ResetPasswordApi
