import { LoginApi } from 'api'
import { messages, routePaths } from 'constant'
import { useCallback, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { resetPasswordState } from 'recoils'
import { FormInputValue } from 'types'
import { doRegExp } from 'utils'

const useLogin = () => {
  /**
   * Define State
   */
  const { doLogin } = LoginApi()
  const { register, handleSubmit, control } = useForm<FormInputValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const nav = useNavigate()
  const resetState = useResetRecoilState(resetPasswordState)
  const [errorMsg, setErrorMsg] = useState('')
  const submitFlag = useRef(false)

  /**
   * Define Memoization
   */
  const validateInput = useCallback(({ email = '', password = '' }): boolean => {
    if (!email) {
      setErrorMsg(messages.emptyEmail)
      return false
    }
    if (!doRegExp(email, 'email')) {
      setErrorMsg(messages.invalidEmail)
      return false
    }
    if (!password) {
      setErrorMsg(messages.emptyPassword)
      return false
    }
    return true
  }, [])
  const onLoginSubmit = useCallback<SubmitHandler<FormInputValue>>(
    async ({ email, password }) => {
      if (!validateInput({ email, password })) return

      const res = await doLogin({ email, password })
      if (!res.isSuccess) {
        setErrorMsg(res.message)
        return
      }
      const { accessToken } = res.data
      window.sessionStorage.setItem('token', accessToken)
      nav(routePaths.userInfo)
    },
    [doLogin, nav, validateInput]
  )
  const handleLoginClick = useCallback(() => {
    if (submitFlag.current) return
    submitFlag.current = true
    handleSubmit(onLoginSubmit)()
    submitFlag.current = false
  }, [handleSubmit, onLoginSubmit])

  const handleResetPasswordClick = useCallback(() => {
    resetState()
    nav(routePaths.resetPassword)
  }, [nav, resetState])

  const handleKeyPress = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    e => {
      if (e.key === 'Enter') handleLoginClick()
    },
    [handleLoginClick]
  )

  /**
   * Define Effect
   */

  return {
    errorMsg,
    register,
    handleLoginClick,
    handleResetPasswordClick,
    handleKeyPress,
    control,
  }
}

export default useLogin
