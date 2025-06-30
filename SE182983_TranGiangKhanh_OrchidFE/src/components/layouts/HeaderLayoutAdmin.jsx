import React from 'react'
import HeaderTitle from '../templates/adminTemplates/HeaderTitle'
import HeaderProfile from '../templates/adminTemplates/HeaderProfile'

const HeaderLayoutAdmin = () => {
  return (
    <div className='d-flex justify-content-between' style={{ height: '7vh', background: '#1C1D27', color:'#727276', position:'sticky'}}>
      <div></div>
      <HeaderProfile />
    </div>
  )
}

export default HeaderLayoutAdmin