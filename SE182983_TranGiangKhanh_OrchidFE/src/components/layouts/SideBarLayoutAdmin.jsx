import React from 'react'
import SideBarNavigator from '../templates/adminTemplates/SideBarNavigator'

export const SideBarLayoutAdmin = () => {
  return (
    <div className='d-flex flex-column justify-content-between' style={{ color: "#727276", position: 'relative'}}>
      <SideBarNavigator />
    </div>
  )
}

export default SideBarLayoutAdmin