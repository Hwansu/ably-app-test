/**
 * Define Constants about Route Data
 */
export const routePaths = {
  login: '/',
  userInfo: '/userinfo',
} as const
export const routeMeta: {
  [k in string]: {
    path: string
    title: string
  }
} = {
  [routePaths.login]: {
    path: routePaths.login,
    title: 'Login',
  },
  [routePaths.userInfo]: {
    path: routePaths.userInfo,
    title: 'User Info',
  },
}

/**
 * Define Constants about API EndPoint
 */
const API_PREFIX = '/api'
export const API_ENDPOINT = {
  login: `${API_PREFIX}/login`,
  userInfo: `${API_PREFIX}/user`,
} as const
export const authApis: readonly string[] = [API_ENDPOINT.userInfo]

/**
 * Define Messages
 */
export const messages = {
  apiError: '서버 오류가 발생했습니다.',
}
