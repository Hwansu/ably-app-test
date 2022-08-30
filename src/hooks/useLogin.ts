import { LoginApi } from 'api'
import { messages, routePaths } from 'constant'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { resetPasswordState } from 'recoils'
import { doRegExp } from 'utils'

interface FormInput {
  email: string
  password: string
}

const useLogin = () => {
  /**
   * Define State
   */
  const { doLogin } = LoginApi()
  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const nav = useNavigate()
  const resetState = useResetRecoilState(resetPasswordState)
  const [errorMsg, setErrorMsg] = useState('')

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
  const onLoginSubmit = useCallback<SubmitHandler<FormInput>>(
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
    handleSubmit(onLoginSubmit)()
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
  }
}

export default useLogin
