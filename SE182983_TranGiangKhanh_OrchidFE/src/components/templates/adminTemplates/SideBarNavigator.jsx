import React from 'react'
import SideBarPill from '../../ui/SideBarPill'
import Logo from '../../ui/Logo'

export const SideBarNavigator = () => {
  return (
    <div className='w-100'>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "10vh" }}
      >
        <Logo />
      </div>
      <SideBarPill iconTag={<i className="fa fa-bars mx-2" />} name={'Quản lý Hoa'} urlNavigate={'admin'} />
      <SideBarPill iconTag={<i className="fa fa-th-large mx-2" />} name={'Quản lý loại hoa'} urlNavigate={'admin/category'} />
      {/* <SideBarPill iconTag={<i className="fa fa-user mx-2" />} name={'Quản lý người dùng'} urlNavigate={'admin/user'} /> */}
      <SideBarPill iconTag={<i className="fa fa-home mx-2" />} name={'Trang chủ'} urlNavigate={''} />
    </div>
  )
}

export default SideBarNavigator