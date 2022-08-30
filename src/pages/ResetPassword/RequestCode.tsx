import { ErrorMessage } from 'components'
import { useResetPassword } from 'hooks'

const RequestCode = () => {
  const { handleEmailChange, handleNextClick, errorMsg, handleKeyPress } = useResetPassword()

  return (
    <div className="login-content">
      <div className="login-block">
        <input placeholder="이메일" onChange={handleEmailChange} onKeyDown={handleKeyPress} />
      </div>
      <ErrorMessage message={errorMsg} hide />
      <div className="login-block">
        <button type="button" onClick={handleNextClick}>
          다음
        </button>
      </div>
    </div>
  )
}

export default RequestCode
