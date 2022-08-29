const UserInfo = () => {
  return (
    <div className="userinfo-content">
      <img
        src="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"
        alt="profile"
      />
      {/* <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>이름</td>
          </tr>
        </tbody>
      </table> */}
      <div className="userinfo-data-content">
        <p>
          <span>이름</span>
          <span>서환수</span>
        </p>
        <p>
          <span>이메일</span>
          <span>ably@dummy.com</span>
        </p>
      </div>
    </div>
  )
}

export default UserInfo
