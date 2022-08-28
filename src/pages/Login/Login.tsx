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
        <button type="button" onClick={handleLoginClick}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
