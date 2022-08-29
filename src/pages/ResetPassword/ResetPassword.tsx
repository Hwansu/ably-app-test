import { useResetPassword } from 'hooks'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { stepSelector } from 'recoils'
import ChangePassword from './ChangePassword'
import RequestCode from './RequestCode'
import VerifyCode from './VerifyCode'

const ResetPassword = () => {
  const { step } = useResetPassword()
  const stepComponent = useMemo(
    () => [<RequestCode />, <VerifyCode />, <ChangePassword />][step],
    [step]
  )
  return <>{stepComponent}</>
}

export default ResetPassword
