import { Button, ErrorMessage, Input } from 'components'
import { useResetPassword } from 'hooks'

const ChangePassword = () => {
  const {
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleNextClick,
    handlePrevClick,
    errorMsg,
    handleKeyPress,
  } = useResetPassword()
  return (
    <div className="login-content">
      <div className="login-block">
        <Input type="password" placeholder="새로운 비밀번호" onChange={handlePasswordChange} />
      </div>
      <div className="login-block">
        <Input
          type="password"
          placeholder="새로운 비밀번호 확인"
          onChange={handlePasswordConfirmChange}
          onKeyDown={handleKeyPress}
        />
      </div>
      <ErrorMessage hide message={errorMsg} />
      <div className="login-block">
        <Button className="m-r-5" text="처음으로" onClick={handlePrevClick} />
        <Button className="m-l-5" text="비밀번호 변경하기" onClick={handleNextClick} />
      </div>
    </div>
  )
}

export default ChangePassword
