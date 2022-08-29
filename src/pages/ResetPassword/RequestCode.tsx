import { useResetPassword } from 'hooks'

const RequestCode = () => {
  const { handleEmailChange, handleNextClick } = useResetPassword()

  return (
    <div className="login-content">
      <div className="login-block">
        <input placeholder="E-mail" onChange={handleEmailChange} />
      </div>
      <div className="login-block">
        <button type="button" onClick={handleNextClick}>
          다음
        </button>
      </div>
    </div>
  )
}

export default RequestCode
