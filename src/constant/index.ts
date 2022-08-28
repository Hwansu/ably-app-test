export const routePaths = {
  login: '/',
} as const
export const routeMeta: {
  [k in string]: {
    path: string
    title: string
  }
} = {
  [routePaths.login]: {
    path: '/',
    title: 'Login',
  },
}

const API_PREFIX = '/api'
export const API_URL = {
  login: `${API_PREFIX}/login`,
} as const
