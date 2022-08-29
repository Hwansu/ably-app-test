import { useResetPassword } from 'hooks'

const RequestCode = () => {
  const { handleEmailChange, handleNextClick } = useResetPassword()

  return (
    <div className="login-content">
      <form onSubmit={e => e.preventDefault()}>
        <div className="login-block">
          <input placeholder="E-mail" onChange={handleEmailChange} />
        </div>
        <div className="login-block">
          <button type="button" onClick={handleNextClick}>
            다음(Next)
          </button>
        </div>
      </form>
    </div>
  )
}

export default RequestCode
