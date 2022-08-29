import { API_ENDPOINT } from 'constant'
import { ApiResponseStatus } from 'types'
import { api } from './api'

interface IssueTokenSuccess {
  issueToken: string // 인증 코드 발급 요청 토큰
  remainMillisecond: number // 인증 코드 확인 남은 시간
}

interface fnRequestIssueToken {
  (email: string): Promise<ApiResponseStatus<string>>
}

const ResetPasswordApi = () => {
  const { get, isAxiosError, post } = api

  const requestIssueToken: fnRequestIssueToken = async email => {
    const res = await get<IssueTokenSuccess>(API_ENDPOINT.resetPassword, { params: { email } })
    console.log(res)
    return { isSuccess: true, data: '' }
  }

  return {
    requestIssueToken,
  }
}

export default ResetPasswordApi
