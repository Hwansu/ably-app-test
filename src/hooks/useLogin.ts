import { LoginApi } from 'api'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const useLogin = () => {
  /**
   * Define State
   */
  const { doLogin } = LoginApi()
  const { register } = useForm()

  /**
   * Define Memoization
   */
  const handleLoginClick = useCallback(async () => {
    // await doLogin({})
  }, [doLogin])

  /**
   * Define Effect
   */

  return {
    handleLoginClick,
    register,
  }
}

export default useLogin
