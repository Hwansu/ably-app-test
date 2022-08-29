import { LoginApi } from 'api'
import { routePaths } from 'constant'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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

  /**
   * Define Memoization
   */
  const onLoginSubmit = useCallback<SubmitHandler<FormInput>>(
    async ({ email, password }) => {
      const res = await doLogin({ email, password })
      if (!res.isSuccess) {
        window.alert(res.message ? res.message : '로그인 중 오류가 발생했습니다.')
        return
      }
      nav(routePaths.userInfo)
    },
    [doLogin, nav]
  )
  const handleLoginClick = useCallback(() => {
    handleSubmit(onLoginSubmit)()
  }, [handleSubmit, onLoginSubmit])

  /**
   * Define Effect
   */

  return {
    handleLoginClick,
    register,
  }
}

export default useLogin
