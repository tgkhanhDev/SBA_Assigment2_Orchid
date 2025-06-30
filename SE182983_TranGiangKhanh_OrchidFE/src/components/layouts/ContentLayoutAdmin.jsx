import React from 'react'
import { Outlet } from 'react-router-dom'

export const ContentLayoutAdmin = () => {
    return (
        <div className='w-100' style={{ background: '#1C1D27', color: '#727276', minHeight: '93vh', padding: '20px' }}>
            <Outlet />
        </div>
    )
}

export default ContentLayoutAdmin