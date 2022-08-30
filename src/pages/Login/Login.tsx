import { Button, ErrorMessage, FormInput } from 'components'
import { useLogin } from 'hooks'

const Login = () => {
  const { handleLoginClick, handleResetPasswordClick, errorMsg, handleKeyPress, control } =
    useLogin()

  return (
    <div className="login-content">
      <form onSubmit={e => e.preventDefault()}>
        <div className="login-block">
          <FormInput control={control} name="email" placeholder="이메일" />
        </div>
        <div className="login-block">
          <FormInput
            control={control}
            type="password"
            name="password"
            placeholder="비밀번호"
            onKeyDown={handleKeyPress}
          />
        </div>
        <ErrorMessage message={errorMsg} hide />
        <div className="login-block">
          <Button className="m-r-5" text="로그인" onClick={handleLoginClick} />
          <Button className="m-l-5" text="비밀번호 변경" onClick={handleResetPasswordClick} />
        </div>
      </form>
    </div>
  )
}

export default Login
