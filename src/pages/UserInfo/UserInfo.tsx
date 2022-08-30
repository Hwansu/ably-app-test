import { Button } from 'components'
import { useUserInfo } from 'hooks'

const UserInfo = () => {
  const {
    data: { email, name },
    imgSrc,
    handleLogoutClick,
  } = useUserInfo()
  return (
    <div style={{ width: '400px' }}>
      <div className="userinfo-content">
        <img src={imgSrc} alt="profile" />
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
      </div>
      <Button className="userinfo-btn" text="로그아웃" onClick={handleLogoutClick} />
    </div>
  )
}

export default UserInfo
