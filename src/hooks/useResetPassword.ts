import { ResetPasswordApi } from 'api'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { emailSelector, stepSelector } from 'recoils'
import { codeSelector, issueTokenSelector } from 'recoils/resetPassword'

const useResetPassword = () => {
  /**
   * Define State
   */
  const [step, setStep] = useRecoilState(stepSelector)
  const [email, setEmail] = useRecoilState(emailSelector)
  const [code, setCode] = useRecoilState(codeSelector)
  const [token, setToken] = useRecoilState(issueTokenSelector)
  const { requestIssueToken, requestVerification } = ResetPasswordApi()

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
    const { issueToken } = token
    const res = await requestVerification({ email, authCode, issueToken })
    if (!res.isSuccess) {
      window.alert(res.message)
      //   return
    }
  }, [code, email, requestVerification, token])
  const handleNextClick = useCallback(() => {
    switch (step) {
      case 0:
        handleRequestIssueToken()
        break
      case 1:
        handleRequestVerification()
        break
      default:
    }
  }, [handleRequestIssueToken, handleRequestVerification, step])
  const handlePrevClick = useCallback(() => setStep(p => p - 1), [setStep])

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
  }
}

export default useResetPassword
