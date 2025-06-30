import React, { useContext } from 'react'
import UserModal from './UserModal'
import { AdminUserContext } from './UserContent';

export const UserTable = () => {

  const { userList, setUserUpdateInfo, handleUpdateModal, resetModal } = useContext<any>(AdminUserContext);


  return (
    <div>
      <table id="userTable" className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Mã người dùng</th>
            <th scope="col">Tên</th>
            <th scope="col">Email</th>
            <th scope="col">Mật khẩu</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((item, index) => {
            return (
              <tr id="userRow" key={item?.accountID || index}
                onClick={() => handleUpdateModal(item)}
                data-bs-toggle="modal"
                data-bs-target="#userModal"
              >
                <th scope="row">{item?.accountID}</th>
                <td>{item?.accountName}</td>
                <td>{item?.accountEmail}</td>
                <td>******</td>
                <td>{item?.accountRole == 1 ? 'Admin' : 'Khách'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => resetModal()}
          data-bs-toggle="modal"
          data-bs-target="#userModal">
          Thêm người dùng
        </button>
      </div>
      <UserModal />
    </div>
  )
}

export default UserTable