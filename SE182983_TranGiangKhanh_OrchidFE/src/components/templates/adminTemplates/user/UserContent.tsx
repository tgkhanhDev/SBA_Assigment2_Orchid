import React, { createContext, useEffect, useState } from 'react'
import userService from '../../../../services/userService';
import UserHeader from './UserHeader';
import UserTable from './UserTable';
import './index.scss';

export const AdminUserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [userList, setUserList] = useState<any[]>([]);
    const [userStats, setUserStats] = useState({
        total: 0,
        admin: 0,
        guest: 0
    });

    const [userUpdateInfo, setUserUpdateInfo] = useState({
        accountID: 0,
        accountName: "",
        accountEmail: "",
        accountRole: 0,
        accountPassword: "",
    });

    const [userErrorInfo, setUserErrorInfo] = useState({
        accountName: "",
        accountEmail: "",
        accountRole: "",
        accountPassword: "",
    });

    const handleUpdateModal = (item) => {
        setUserUpdateInfo({
            accountID: item?.accountID,
            accountName: item?.accountName,
            accountEmail: item?.accountEmail,
            accountRole: item?.accountRole,
            accountPassword: item?.accountPassword
        })
    }
    const resetModal = () => {
        setUserUpdateInfo({
            accountID: 0,
            accountName: "",
            accountEmail: "",
            accountRole: 0,
            accountPassword: "",
        })
    }

    const fetchUserList = async () => {
        const users = await userService.getUserWithFilter({ accountEmail: searchText });
        setUserList(users?.data || []);
    }
    const fetchUserStats = async () => {
        const userStats: any = await userService.countRole();
        setUserStats(userStats.data);
    }

    //Count for stats
    useEffect(() => {
        fetchUserStats();
    }, [])

    useEffect(() => {
        fetchUserList();
    }, [searchText])

    //Handling error: this will check base on userUpdateInfo state
    const checkFieldError = () => {
        let isErrorFree = true;

        let errors: any = {};

        if (userUpdateInfo.accountName === '') {
            isErrorFree = false;
            errors.accountName = "Name cannot be empty";
        }else {
            errors.accountName = "";
        }
        if (userUpdateInfo.accountEmail === '') {
            isErrorFree = false;
            errors.accountEmail = "Email cannot be empty";
        }else{
            errors.accountEmail = "";
        }
        if (userUpdateInfo.accountPassword === '') {
            isErrorFree = false;
            errors.accountPassword = "Password cannot be empty";
        }else{
            errors.accountPassword = "";
        }
        if (userUpdateInfo.accountRole === 0) {
            isErrorFree = false;
            errors.accountRole = "Role cannot be empty";
        }else{
            errors.accountRole = "";
        }

        setUserErrorInfo(errors);

        return isErrorFree;
    };


    return (
        <AdminUserContext.Provider value={{
            userList,
            userStats,
            searchText, setSearchText,
            userUpdateInfo, setUserUpdateInfo,
            handleUpdateModal,
            resetModal,
            fetchUserList, fetchUserStats,
            userErrorInfo, setUserErrorInfo, checkFieldError //For Error fetching
        }}>
            {children}
        </AdminUserContext.Provider>
    );
}

const UserContent = () => {
    useEffect(() => {
        const role = localStorage.getItem("role")
        if (role != 1) {
            window.location.href = "/admin";
        }
    },[])
    return (
        <UserProvider>
            <div id="userContent">
                <UserHeader />
                <UserTable />
            </div>
        </UserProvider>
    )
}

export default UserContent