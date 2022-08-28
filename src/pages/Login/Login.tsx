import useLogin from 'hooks/useLogin'

const Login = () => {
  const { register, handleLoginClick } = useLogin()

  return (
    <div className="login-content">
      <form onSubmit={e => e.preventDefault()}>
        <div className="login-block">
          <input placeholder="E-mail" {...register('email')} />
        </div>
        <div className="login-block">
          <input type="password" placeholder="Password" {...register('password')} />
        </div>
        <div className="login-block">
          <button type="button" onClick={handleLoginClick}>
            Login
          </button>
          <button type="button">Password Reset</button>
        </div>
      </form>
    </div>
  )
}

export default Login
