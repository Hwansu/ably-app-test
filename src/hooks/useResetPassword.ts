import { ResetPasswordApi } from 'api'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { emailSelector, stepSelector } from 'recoils'
import { issueTokenSelector } from 'recoils/resetPassword'

const useResetPassword = () => {
  /**
   * Define State
   */
  const [step, setStep] = useRecoilState(stepSelector)
  const [email, setEmail] = useRecoilState(emailSelector)
  const [token, setToken] = useRecoilState(issueTokenSelector)
  const { requestIssueToken } = ResetPasswordApi()

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
  const handleNextClick = useCallback(() => {
    switch (step) {
      case 0:
        handleRequestIssueToken()
        break
      default:
    }
  }, [handleRequestIssueToken, step])

  /**
   * Define Effect
   */

  return {
    step,
    setStep,
    handleEmailChange,
    handleNextClick,
    setToken,
    token,
  }
}

export default useResetPassword
