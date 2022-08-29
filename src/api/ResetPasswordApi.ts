import { API_ENDPOINT, messages } from 'constant'
import { ApiResponseStatus, CommonApiFailure, IssueTokenSuccess, VerificationSuccess } from 'types'
import { api } from './api'

interface fnRequestIssueToken {
  (email: string): Promise<ApiResponseStatus<IssueTokenSuccess>>
}
interface fnRequestVerification {
  (p: { email: string; authCode: string; issueToken: string }): Promise<
    ApiResponseStatus<VerificationSuccess>
  >
}
interface fnRequestResetPwd {
  (p: {
    email: string
    confirmToken: string
    newPassword: string
    newPasswordConfirm: string
  }): Promise<ApiResponseStatus<undefined>>
}

const ResetPasswordApi = () => {
  const { get, isAxiosError, post, patch } = api

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

  const requestResetPwd: fnRequestResetPwd = async params => {
    try {
      const { status } = await patch(API_ENDPOINT.resetPassword, params)
      if (status !== 200) return { isSuccess: false, message: messages.apiError }
      return { isSuccess: true, data: undefined }
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
    requestResetPwd,
  }
}

export default ResetPasswordApi
