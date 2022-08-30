import { Button } from 'components'
import { useUserInfo } from 'hooks'

const UserInfo = () => {
  const {
    data: { email, name, profileImage },
    handleLogoutClick,
  } = useUserInfo()
  return (
    <div className="userinfo-content">
      <img src={profileImage} alt="profile" />
      <div className="userinfo-data-content">
        <p>
          <span>이름</span>
          <span>{name}</span>
        </p>
        <p>
          <span>이메일</span>
          <span>{email}</span>
        </p>
      </div>
      <Button text="로그아웃" onClick={handleLogoutClick} sx={{ width: '200px' }} />
    </div>
  )
}

export default UserInfo
