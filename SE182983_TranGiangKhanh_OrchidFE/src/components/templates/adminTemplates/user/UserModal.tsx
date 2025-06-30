import React, { useContext } from 'react'
import { AdminUserContext } from './UserContent';
import Select from 'react-select';
import Swal from 'sweetalert2';
import authService from '../../../../services/authService';

export const UserModal = () => {

    const { userList, userUpdateInfo, setUserUpdateInfo, fetchUserList, fetchUserStats, userErrorInfo, checkFieldError } = useContext<any>(AdminUserContext);

    const roleOption = [
        { value: '1', label: 'Admin' },
        { value: '2', label: 'Guest' },
    ]

    const handleCreateUser = async () => {
        const isErrorFree = checkFieldError();
        if (!isErrorFree) {
            console.log("userErrorInfo: ", userErrorInfo);
            return
        }
        const isExistResponse: any = await authService.checkIsEmailExist(userUpdateInfo.accountEmail)

        if (isExistResponse.data) {
            Swal.fire({
                title: isExistResponse.message,
                icon: 'info'
            })
            return;
        }

        // const createResponse = await authService.createAccount(userUpdateInfo);
        const createResponse = {message: 'This function is not supported'}

        await fetchUserList();
        await fetchUserStats();
        Swal.fire({
            title: createResponse.message,
            icon: "success"
        })
        return true;
    }

    const handleUpdateUser = async () => {
        // checkError
        const isErrorFree = checkFieldError();
        if (!isErrorFree) return

        // const updateResponse = await userService.updateAccount(userUpdateInfo);
        const updateResponse = {message: 'This function is not supported'}

        await fetchUserList();
        await fetchUserStats();
        Swal.fire({
            title: updateResponse.message,
            icon: "success"
        })
    }

    const handleDeleteUser = async () => {
        // const deleteResponse = await userService.deleteAccount(userUpdateInfo.accountID);
        const deleteResponse = {message: 'This function is not supported'}
        
        await fetchUserList();
        await fetchUserStats();
        Swal.fire({
            title: deleteResponse.message,
            icon: "success"
        })
    }

    //SwAl
    const confirmDeleteUser = async () => {
        Swal.fire({
            title: "Do you want to delete this user?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes, delete it!",
            denyButtonText: `No, wait!`
        }).then( async (result) => {
            if (result.isConfirmed) {
                await handleDeleteUser();
                // Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes aborted", "", "info");
            }
        });
    }

    return (
        <div className="modal fade" id="userModal" tabIndex={-1} aria-labelledby="userModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="userModalLabel">Chi tiết</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="form-group mb-2">
                            <label htmlFor="userName">Tên</label>
                            <input disabled={userUpdateInfo?.accountRole == 1} type="text" className="form-control" id="userName" placeholder="Nhập tên"
                                value={userUpdateInfo?.accountName}
                                onChange={(e) => {
                                    setUserUpdateInfo({
                                        ...userUpdateInfo,
                                        accountName: e.target.value
                                    })
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{userErrorInfo?.accountName}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="accountEmail">Email:</label>
                            <input disabled={userUpdateInfo?.accountID != 0} type="text" className="form-control" id="accountEmail" placeholder="Nhập Email"
                                value={userUpdateInfo?.accountEmail}
                                onChange={(e) => {
                                    if (userUpdateInfo?.accountID == 0) {
                                        setUserUpdateInfo({
                                            ...userUpdateInfo,
                                            accountEmail: e.target.value
                                        })
                                    }
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{userErrorInfo?.accountEmail}</small>
                        </div>
                        {userUpdateInfo?.accountID == 0 &&
                            <div className="form-group mb-2">
                                <label htmlFor="accountEmail">Mật khẩu:</label>
                                <input type="password" className="form-control" id="accountPassword" placeholder="Nhập mật khẩu"
                                    value={userUpdateInfo?.accountPassword}
                                    onChange={(e) => {
                                        setUserUpdateInfo({
                                            ...userUpdateInfo,
                                            accountPassword: e.target.value
                                        })
                                    }}
                                />
                                <small id="emailHelp" className="form-text text-danger">{userErrorInfo?.accountPassword}</small>
                            </div>
                        }
                        {userUpdateInfo?.accountRole != 1
                            ? <div className="form-group mb-2">
                                <label htmlFor="accountRole">Role:</label>
                                <Select
                                    options={roleOption.filter(option => option.value != '1')}
                                    placeholder="Chọn Role tài khoản"
                                    value={roleOption?.find(option => option.value == userUpdateInfo?.accountRole) || 0}
                                    onChange={e => {
                                        // console.log("value: ", e.value);
                                        setUserUpdateInfo({
                                            ...userUpdateInfo, accountRole: e.value
                                        })
                                    }
                                    }
                                />
                                <small id="emailHelp" className="form-text text-danger">{userErrorInfo?.accountRole}</small>
                            </div>
                            : <div className="form-group mb-2">
                                <label htmlFor="accountRole">Role:</label>
                                <input disabled={true} type="text" className="form-control" id="accountEmail" placeholder="Enter Email"
                                    value={userUpdateInfo?.accountRole == 1 ? 'Admin' : userUpdateInfo?.accountRole == 2 ? 'Staff' : 'Guest'}
                                />
                            </div>
                        }
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <div>
                            {userUpdateInfo?.accountID != 0 && userUpdateInfo?.accountRole != 1
                                && <button
                                    type="button"
                                    onClick={() => { confirmDeleteUser() }}
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                >Xóa</button>}
                        </div>

                        <div className='d-flex' style={{ gap: '10px' }}>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {userUpdateInfo?.accountID == 0
                                ? <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        const isValid = handleCreateUser();
                                        if (!isValid) return
                                    }}
                                >Create</button>
                                : userUpdateInfo?.accountRole != 1
                                    ? <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => { handleUpdateUser() }}
                                    >Save</button>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal