import React, { useEffect, useState } from 'react'
import authService from '../../../services/authService';

export const HeaderProfile = () => {

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('name'));
        setUserName(user || '');
    }, [])

    //Clear All LocalStorage
    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div className='d-flex align-items-center'>
            <div className="dropdown mx-3">
                <span className="ms-2">Chào mừng trở lại, {userName}</span>
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" style={{ width: '35px', marginLeft: '10px' }}
                    alt="Avatar" />
                <button
                    type="button"
                    className='btn btn-bg-danger-subtle'
                    style={{ color: '#fdb24a' }}
                    data-toggle="tooltip"
                    data-placement="bottom" title="Logout"
                    onClick={async () => {
                        await authService.logOut();
                        clearLocalStorage()
                    }}><i className="fa fa-power-off"></i></button>
            </div>
        </div>
    )
}

export default HeaderProfile