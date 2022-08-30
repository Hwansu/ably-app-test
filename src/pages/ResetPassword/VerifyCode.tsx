import { Button, ErrorMessage, Input } from 'components'
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
        <Input
          placeholder="인증코드"
          reg={/^[0-9]+$/}
          onChange={handleCodeChange}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="login-block timer-block">
        <span className="timer-span">남은 시간 : {convertMStoMMSS(token.remainMillisecond)}</span>
      </div>
      <ErrorMessage hide message={errorMsg} />
      <div className="login-block">
        <Button className="m-r-5" text="처음으로" onClick={handlePrevClick} />
        <Button className="m-l-5" text="다음" onClick={handleNextClick} />
      </div>
    </div>
  )
}

export default VerifyCode
