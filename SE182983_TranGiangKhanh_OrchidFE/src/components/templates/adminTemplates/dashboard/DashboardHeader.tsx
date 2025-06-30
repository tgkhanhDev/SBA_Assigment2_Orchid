import React, { useContext, useEffect, useRef, useState } from 'react'
import { AdminDashboardContext } from './DashboardContent';

export const DashboardHeader = () => {
    const { orchidStats, setSearchText } = useContext<any>(AdminDashboardContext);

    const searchRef = useRef("");

    const handleSearch = () => {
        setSearchText(searchRef.current);
    };

    return (
        <div id='dashboardHeader' className=''>
            {/* Window 1  */}
            <div id="dashboardFilter" className=''>
                <div className='filter-title'>
                    <div className='fs-5 fw-bold text-white'>Tìm kiếm hoa: </div>
                    <div className='' style={{ marginBottom: '20px' }}></div>
                </div>
                <div className="filter-detail search-wrapper">
                    <div className="search-box">
                        <input type="text" onChange={(e) => (searchRef.current = e.target.value)} className="form-control search-input" placeholder="Nhập tên hoa..." />
                        <button className="" onClick={handleSearch}>
                            Tìm
                        </button>
                    </div>
                </div>
            </div>

            {/* Window 2  */}
            <div id="dashboardStats" className=''>
                <div className='stats-title'>
                    <div className='fs-5 fw-bold text-white'>Dashboards</div>
                    <div className='' style={{ marginBottom: '20px' }}>Tổng quan</div>
                </div>
                <div className='stats-detail'>
                    <div className='w-25 text-center fw-bold'>
                        <div className='text-white'>Tổng:</div>
                        <div style={{
                            padding: '10px',
                            background: '#1C1D27',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>{orchidStats?.total}</div>
                    </div>
                    <div className='w-25 text-center fw-bold'>
                        <div className='text-white'>Tự nhiên:</div>
                        <div style={{
                            padding: '10px',
                            background: '#1C1D27',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>{orchidStats?.natural}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader