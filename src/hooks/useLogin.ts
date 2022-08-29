import { LoginApi } from 'api'
import { routePaths } from 'constant'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { resetPasswordState } from 'recoils'

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

  /**
   * Define Memoization
   */
  const onLoginSubmit = useCallback<SubmitHandler<FormInput>>(
    async ({ email, password }) => {
      const res = await doLogin({ email, password })
      if (!res.isSuccess) {
        window.alert(res.message)
        return
      }
      const { accessToken } = res.data
      window.sessionStorage.setItem('token', accessToken)
      nav(routePaths.userInfo)
    },
    [doLogin, nav]
  )
  const handleLoginClick = useCallback(() => {
    handleSubmit(onLoginSubmit)()
  }, [handleSubmit, onLoginSubmit])

  const handleResetPasswordClick = useCallback(() => {
    resetState()
    nav(routePaths.resetPassword)
  }, [nav, resetState])

  /**
   * Define Effect
   */

  return {
    register,
    handleLoginClick,
    handleResetPasswordClick,
  }
}

export default useLogin
