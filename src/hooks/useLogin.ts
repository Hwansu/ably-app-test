import { LoginApi } from 'api'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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

  /**
   * Define Memoization
   */
  const onLoginSubmit = useCallback<SubmitHandler<FormInput>>(
    async ({ email, password }) => {
      const res = await doLogin({ email, password })
      if (!res.isSuccess) {
        window.alert(res.message ? res.message : '로그인 중 오류가 발생했습니다.')
      }
    },
    [doLogin]
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
