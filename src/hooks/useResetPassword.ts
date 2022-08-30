import { ResetPasswordApi } from 'api'
import { messages, routePaths } from 'constant'
import { useCallback, useState } from 'react'
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
import { doRegExp } from 'utils'

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
  const [errorMsg, setErrorMsg] = useState('')

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

  // const validateInput = useCallback(({ email = '', password = '' }): boolean => {
  //   if (!email) {
  //     setErrorMsg(messages.emptyEmail)
  //     return false
  //   }
  //   if (!doRegExp(email, 'email')) {
  //     setErrorMsg(messages.invalidEmail)
  //     return false
  //   }
  //   if (!password) {
  //     setErrorMsg(messages.emptyPassword)
  //     return false
  //   }
  //   return true
  // }, [])

  const handleRequestIssueToken = useCallback(async () => {
    if (!email) {
      setErrorMsg(messages.emptyEmail)
      return
    }
    if (!doRegExp(email, 'email')) {
      setErrorMsg(messages.invalidEmail)
      return
    }
    const res = await requestIssueToken(email)
    if (!res.isSuccess) {
      setErrorMsg(res.message)
      return
    }
    const { issueToken, remainMillisecond } = res.data
    setToken({ issueToken, remainMillisecond })
    setStep(p => p + 1)
  }, [email, requestIssueToken, setStep, setToken])
  const handleRequestVerification = useCallback(async () => {
    const authCode = code
    if (!authCode) {
      setErrorMsg(messages.emptyAuthCode)
      return
    }
    const { issueToken, remainMillisecond } = token
    if (remainMillisecond === 0) {
      setErrorMsg(messages.expireTime)
      return
    }
    const res = await requestVerification({ email, authCode, issueToken })
    if (!res.isSuccess) {
      setErrorMsg(res.message)
      return
    }
    const { confirmToken: cToken } = res.data
    setCToken(cToken)
    setStep(p => p + 1)
  }, [code, email, requestVerification, setCToken, setStep, token])
  const handleRequestResetPwd = useCallback(async () => {
    const { newPassword, newPasswordConfirm } = newPwd
    if (!newPassword || !newPasswordConfirm || newPassword !== newPasswordConfirm) {
      setErrorMsg(messages.invalidPassword)
      return
    }
    const res = await requestResetPwd({ email, confirmToken, newPassword, newPasswordConfirm })
    if (!res.isSuccess) {
      setErrorMsg(res.message)
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
  const handleKeyPress = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    e => {
      if (e.key === 'Enter') handleNextClick()
    },
    [handleNextClick]
  )

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
    errorMsg,
    handleKeyPress,
  }
}

export default useResetPassword
