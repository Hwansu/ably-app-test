import { atom, DefaultValue, selector } from 'recoil'
import { IssueTokenSuccess } from 'types'

interface ResetPasswordState extends IssueTokenSuccess {
  step: number
  email: string
  code: string
  newPassword: string
}

const initState: ResetPasswordState = {
  step: 0,
  email: '',
  code: '',
  newPassword: '',
  issueToken: '',
  remainMillisecond: 0,
}

export const resetPasswordState = atom<ResetPasswordState>({
  key: 'resetPasswordState',
  default: {
    ...initState,
  },
})

export const stepSelector = selector({
  key: 'stepSelector',
  get: ({ get }) => {
    const { step } = get(resetPasswordState)
    return step
  },
  set: ({ get, set }, newValue) => {
    const { step, ...rest } = get(resetPasswordState)
    set(resetPasswordState, {
      ...rest,
      step: newValue instanceof DefaultValue ? step : newValue,
    })
  },
})
export const emailSelector = selector({
  key: 'emailSelector',
  get: ({ get }) => {
    const { email } = get(resetPasswordState)
    return email
  },
  set: ({ get, set }, newValue) => {
    const { email, ...rest } = get(resetPasswordState)
    set(resetPasswordState, {
      ...rest,
      email: newValue instanceof DefaultValue ? email : newValue,
    })
  },
})
export const codeSelector = selector({
  key: 'codeSelector',
  get: ({ get }) => {
    const { code } = get(resetPasswordState)
    return code
  },
  set: ({ get, set }, newValue) => {
    const { code, ...rest } = get(resetPasswordState)
    set(resetPasswordState, {
      ...rest,
      code: newValue instanceof DefaultValue ? code : newValue,
    })
  },
})
export const newPasswordSelector = selector({
  key: 'newPasswordSelector',
  get: ({ get }) => {
    const { newPassword } = get(resetPasswordState)
    return newPassword
  },
  set: ({ get, set }, newValue) => {
    const { newPassword, ...rest } = get(resetPasswordState)
    set(resetPasswordState, {
      ...rest,
      newPassword: newValue instanceof DefaultValue ? newPassword : newValue,
    })
  },
})
export const issueTokenSelector = selector({
  key: 'issueTokenSelector',
  get: ({ get }) => {
    const { issueToken, remainMillisecond } = get(resetPasswordState)
    return { issueToken, remainMillisecond }
  },
  set: ({ get, set }, newValue) => {
    const { issueToken, remainMillisecond, ...rest } = get(resetPasswordState)
    set(resetPasswordState, {
      ...rest,
      issueToken: newValue instanceof DefaultValue ? issueToken : newValue.issueToken,
      remainMillisecond:
        newValue instanceof DefaultValue ? remainMillisecond : newValue.remainMillisecond,
    })
  },
})
