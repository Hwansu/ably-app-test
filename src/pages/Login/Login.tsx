import { useLogin } from 'hooks'

const Login = () => {
  const { register, handleLoginClick, handleResetPasswordClick } = useLogin()

  return (
    <div className="login-content">
      <form onSubmit={e => e.preventDefault()}>
        <div className="login-block">
          <input placeholder="이메일" {...register('email')} />
        </div>
        <div className="login-block">
          <input type="password" placeholder="비밀번호" {...register('password')} />
        </div>
        <div className="login-block">
          <button type="button" onClick={handleLoginClick}>
            로그인
          </button>
          <button type="button" onClick={handleResetPasswordClick}>
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
