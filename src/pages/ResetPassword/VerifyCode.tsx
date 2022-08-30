import { ErrorMessage } from 'components'
import { useInterval, useResetPassword } from 'hooks'
import { convertMStoMMSS } from 'utils'

const VerifyCode = () => {
  const {
    handleNextClick,
    setToken,
    token,
    handleCodeChange,
    handlePrevClick,
    errorMsg,
    handleKeyPress,
  } = useResetPassword()
  useInterval(() =>
    setToken(p => ({
      ...p,
      remainMillisecond: p.remainMillisecond === 0 ? 0 : p.remainMillisecond - 1000,
    }))
  )

  return (
    <div className="login-content">
      <div className="login-block">
        <input placeholder="인증코드" onChange={handleCodeChange} onKeyDown={handleKeyPress} />
      </div>
      <div className="login-block timer-block">
        <span className="timer-span">남은 시간 : {convertMStoMMSS(token.remainMillisecond)}</span>
      </div>
      <ErrorMessage hide message={errorMsg} />
      <div className="login-block">
        <button className="m-r-5" type="button" onClick={handlePrevClick}>
          처음으로
        </button>
        <button className="m-l-5" type="button" onClick={handleNextClick}>
          다음
        </button>
      </div>
    </div>
  )
}

export default VerifyCode
