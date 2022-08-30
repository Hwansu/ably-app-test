/**
 * Define Constants about Route Data
 */
export const routePaths = {
  login: '/',
  userInfo: '/userinfo',
  resetPassword: '/reset-password',
} as const
export const routeMeta: {
  [k in string]: {
    path: string
    title: string
  }
} = {
  [routePaths.login]: {
    path: routePaths.login,
    title: '로그인',
  },
  [routePaths.userInfo]: {
    path: routePaths.userInfo,
    title: '회원 정보',
  },
  [routePaths.resetPassword]: {
    path: routePaths.resetPassword,
    title: '비밀번호 변경',
  },
}

/**
 * Define Constants about API EndPoint
 */
const API_PREFIX = '/api'
export const API_ENDPOINT = {
  login: `${API_PREFIX}/login`,
  userInfo: `${API_PREFIX}/user`,
  logout: `${API_PREFIX}/logout`,
  resetPassword: `${API_PREFIX}/reset-password`,
} as const
export const authApis: readonly string[] = [API_ENDPOINT.userInfo, API_ENDPOINT.logout]

/**
 * Define Messages
 */
export const messages = {
  apiError: '서버 오류가 발생했습니다',
  expireTime: '인증 시간이 만료되었습니다',
  successReset: '비밀번호 변경이 완료되었습니다',
  emptyEmail: '이메일을 입력해주세요',
  emptyPassword: '비밀번호를 입력해주세요',
  invalidEmail: '이메일 형식에 맞게 입력해주세요',
  invalidPassword: '비밀번호를 맞게 입력해주세요',
}
