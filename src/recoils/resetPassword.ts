import { atom, DefaultValue, selector } from 'recoil'
import { IssueTokenSuccess, VerificationSuccess } from 'types'

interface ResetPasswordState extends IssueTokenSuccess, VerificationSuccess {
  step: number
  email: string
  code: string
  newPassword: string
  newPasswordConfirm: string
}

const initState: ResetPasswordState = {
  step: 0,
  email: '',
  code: '',
  issueToken: '',
  remainMillisecond: 0,
  confirmToken: '',
  newPassword: '',
  newPasswordConfirm: '',
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
export const newPasswordSelector = selector({
  key: 'newPasswordSelector',
  get: ({ get }) => {
    const { newPassword, newPasswordConfirm } = get(resetPasswordState)
    return { newPassword, newPasswordConfirm }
  },
  set: ({ get, set }, newValue) => {
    const { newPassword, newPasswordConfirm, ...rest } = get(resetPasswordState)
    set(resetPasswordState, {
      ...rest,
      newPassword: newValue instanceof DefaultValue ? newPassword : newValue.newPassword,
      newPasswordConfirm:
        newValue instanceof DefaultValue ? newPasswordConfirm : newValue.newPasswordConfirm,
    })
  },
})
export const confirmTokenSelector = selector<ResetPasswordState['confirmToken']>({
  key: 'confirmTokenSelector',
  get: ({ get }) => {
    const { confirmToken } = get(resetPasswordState)
    return confirmToken
  },
  set: ({ get, set }, newValue) => {
    const { confirmToken, ...rest } = get(resetPasswordState)
    set(resetPasswordState, {
      ...rest,
      confirmToken: newValue instanceof DefaultValue ? confirmToken : newValue,
    })
  },
})
