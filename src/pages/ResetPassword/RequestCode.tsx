import { Button, ErrorMessage, Input } from 'components'
import { useResetPassword } from 'hooks'

const RequestCode = () => {
  const { handleEmailChange, handleNextClick, errorMsg, handleKeyPress } = useResetPassword()

  return (
    <div className="login-content">
      <div className="login-block">
        <Input placeholder="이메일" onChange={handleEmailChange} onKeyDown={handleKeyPress} />
      </div>
      <ErrorMessage message={errorMsg} hide />
      <div className="login-block">
        <Button text="다음" onClick={handleNextClick} />
      </div>
    </div>
  )
}

export default RequestCode
