import { useResetPassword } from 'hooks'

const ChangePassword = () => {
  const { handlePasswordChange, handlePasswordConfirmChange, handleNextClick, handlePrevClick } =
    useResetPassword()
  return (
    <div className="login-content">
      <div className="login-block">
        <input type="password" placeholder="새로운 비밀번호" onChange={handlePasswordChange} />
      </div>
      <div className="login-block">
        <input
          type="password"
          placeholder="새로운 비밀번호 확인"
          onChange={handlePasswordConfirmChange}
        />
      </div>
      <div className="login-block">
        <button type="button" onClick={handlePrevClick}>
          처음으로
        </button>
        <button type="button" onClick={handleNextClick}>
          비밀번호
          <br />
          변경하기
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
