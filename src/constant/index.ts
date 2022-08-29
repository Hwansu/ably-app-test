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
} as const
