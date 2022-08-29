import { useInterval, useResetPassword } from 'hooks'
import { convertMStoMMSS } from 'utils'

const VerifyCode = () => {
  const { handleNextClick, setToken, token } = useResetPassword()
  useInterval(() => setToken(p => ({ ...p, remainMillisecond: p.remainMillisecond - 1000 })))

  return (
    <div className="login-content">
      <div className="login-block">
        <input placeholder="인증코드" />
        <span>{convertMStoMMSS(token.remainMillisecond)}</span>
      </div>
      <div className="login-block">
        <button type="button">이전</button>
        <button type="button" onClick={handleNextClick}>
          다음
        </button>
      </div>
    </div>
  )
}

export default VerifyCode
