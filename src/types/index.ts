export interface ApiSuccessStatus<T> {
  isSuccess: true
  data: T
}

export interface ApiFailureStatus {
  isSuccess: false
  message: string
}

export type ApiResponseStatus<T> = ApiSuccessStatus<T> | ApiFailureStatus

export interface CommonApiFailure {
  error: {
    message: string
  }
}

export interface UserInfoSuccess {
  name: string // 이름
  email: string // 이메일
  profileImage: string // 프로필 사진 URL
  lastConnectedAt: Date // 마지막 접속 일자
}

export interface IssueTokenSuccess {
  issueToken: string // 인증 코드 발급 요청 토큰
  remainMillisecond: number // 인증 코드 확인 남은 시간
}
export interface VerificationSuccess {
  confirmToken: string // 인증 코드 검증 토큰
}
