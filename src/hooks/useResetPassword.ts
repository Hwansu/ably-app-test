import { ResetPasswordApi } from 'api'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { emailSelector, stepSelector } from 'recoils'

const useResetPassword = () => {
  /**
   * Define State
   */
  const [step, setStep] = useRecoilState(stepSelector)
  const setEmail = useSetRecoilState(emailSelector)
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
  const handleNextClick = useCallback(() => setStep(p => p + 1), [setStep])

  /**
   * Define Effect
   */
  //   useEffect(() => {
  //     if (step === )
  //   }, [step])

  return {
    step,
    setStep,
    handleEmailChange,
    handleNextClick,
  }
}

export default useResetPassword
