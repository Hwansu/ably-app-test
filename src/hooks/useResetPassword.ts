import { ResetPasswordApi } from 'api'
import { messages, routePaths } from 'constant'
import { useCallback, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { emailSelector, stepSelector } from 'recoils'
import {
  codeSelector,
  confirmTokenSelector,
  issueTokenSelector,
  newPasswordSelector,
  resetPasswordState,
} from 'recoils/resetPassword'

const useResetPassword = () => {
  /**
   * Define State
   */
  const [step, setStep] = useRecoilState(stepSelector)
  const [email, setEmail] = useRecoilState(emailSelector)
  const [code, setCode] = useRecoilState(codeSelector)
  const [token, setToken] = useRecoilState(issueTokenSelector)
  const [confirmToken, setCToken] = useRecoilState(confirmTokenSelector)
  const [newPwd, setNewPwd] = useRecoilState(newPasswordSelector)
  const resetState = useResetRecoilState(resetPasswordState)
  const { requestIssueToken, requestVerification, requestResetPwd } = ResetPasswordApi()
  const nav = useNavigate()

  /**
   * Define Memoization
   */
  const handleEmailChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      const { value } = e.currentTarget
      setEmail(value)
    },
    [setEmail]
  )
  const handleCodeChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      const { value } = e.currentTarget
      setCode(value)
    },
    [setCode]
  )
  const handlePasswordChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      const { value: newPassword } = e.currentTarget
      setNewPwd(p => ({ ...p, newPassword }))
    },
    [setNewPwd]
  )
  const handlePasswordConfirmChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      const { value: newPasswordConfirm } = e.currentTarget
      setNewPwd(p => ({ ...p, newPasswordConfirm }))
    },
    [setNewPwd]
  )

  const handleRequestIssueToken = useCallback(async () => {
    const res = await requestIssueToken(email)
    if (!res.isSuccess) {
      window.alert(res.message)
      return
    }
    const { issueToken, remainMillisecond } = res.data
    setToken({ issueToken, remainMillisecond })
    setStep(p => p + 1)
  }, [email, requestIssueToken, setStep, setToken])
  const handleRequestVerification = useCallback(async () => {
    const authCode = code
    const { issueToken, remainMillisecond } = token
    if (remainMillisecond === 0) {
      window.alert(messages.expireTime)
      return
    }
    const res = await requestVerification({ email, authCode, issueToken })
    if (!res.isSuccess) {
      window.alert(res.message)
      return
    }
    const { confirmToken: cToken } = res.data
    setCToken(cToken)
    setStep(p => p + 1)
  }, [code, email, requestVerification, setCToken, setStep, token])
  const handleRequestResetPwd = useCallback(async () => {
    const { newPassword, newPasswordConfirm } = newPwd
    const res = await requestResetPwd({ email, confirmToken, newPassword, newPasswordConfirm })
    if (!res.isSuccess) {
      window.alert(res.message)
      return
    }
    window.alert(messages.successReset)
    nav(routePaths.login)
    resetState()
    setStep(0)
  }, [confirmToken, email, nav, newPwd, requestResetPwd, resetState, setStep])

  const handleNextClick = useCallback(() => {
    switch (step) {
      case 0:
        handleRequestIssueToken()
        break
      case 1:
        handleRequestVerification()
        break
      case 2:
        handleRequestResetPwd()
        break
      default:
    }
  }, [handleRequestIssueToken, handleRequestResetPwd, handleRequestVerification, step])
  const handlePrevClick = useCallback(() => {
    resetState()
    setStep(0)
  }, [resetState, setStep])

  /**
   * Define Effect
   */

  return {
    step,
    setStep,
    handleEmailChange,
    handleNextClick,
    handlePrevClick,
    setToken,
    token,
    handleCodeChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
  }
}

export default useResetPassword
