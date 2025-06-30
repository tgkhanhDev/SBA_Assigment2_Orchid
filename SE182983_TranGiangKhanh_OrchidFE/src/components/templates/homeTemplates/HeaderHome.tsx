import React, { useEffect, useState } from 'react'
import './scss/headerHome.scss'
import HeaderProfile from '../adminTemplates/HeaderProfile'

export const HeaderHome = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const roleJs =localStorage.getItem('role')
        if(!roleJs) window.location.href = "/login";

        const role = JSON.parse(roleJs || '');

        if (role == 'ADMIN') {
            setIsAdmin(true);
            return;
        }
    }, [])

    return (
        <div className="homepage-header" >
            <a href="/" className="homepage-header-logo">OrchidBloom</a>
            <nav className="homepage-nav">
                <ul>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/cart">Giỏ hàng</a></li>
                    <li><a href="/order">Đơn hàng</a></li>
                    {isAdmin && <li className=''><a href="/admin">Trang Quản lý</a></li>}
                </ul>
            </nav>
            <HeaderProfile />
        </div>
    )
}

export default HeaderHome