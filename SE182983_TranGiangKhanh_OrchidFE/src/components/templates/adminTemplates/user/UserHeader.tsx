import React, { useContext, useRef } from 'react'
import { AdminUserContext } from './UserContent';

export const UserHeader = () => {
    const { userStats, setSearchText } = useContext<any>(AdminUserContext);

    const searchRef = useRef("");
    const handleSearch = () => {
        setSearchText(searchRef.current);
    };
  return (
      <div id="userHeader">
          <div id="userFilter" className=''>
              <div className='filter-title'>
                  <div className='fs-5 fw-bold text-white'>Tìm kiếm theo email:</div>
                  <div className='' style={{ marginBottom: '20px' }}></div>
              </div>
              <div className="filter-detail search-wrapper">
                  <div className="search-box">
                      <input type="text" onChange={(e) => (searchRef.current = e.target.value)} className="form-control search-input" placeholder="Nhập email.." />
                      <button className="" onClick={handleSearch}>
                          Tìm
                      </button>
                  </div>
              </div>
          </div>

          <div id="userStats" className=''>
              <div className='stats-title'>
                  <div className='fs-5 fw-bold text-white'>Dashboard:</div>
                  <div className='' style={{ marginBottom: '20px' }}>Tổng hợp</div>
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
                      }}>{userStats?.total}</div>
                  </div>
                  <div className='w-25 text-center fw-bold'>
                      <div className='text-white'>Admin:</div>
                      <div style={{
                          padding: '10px',
                          background: '#1C1D27',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          textAlign: 'center',
                      }}>{userStats?.admin}</div>
                  </div>
                  <div className='w-25 text-center fw-bold'>
                      <div className='text-white'>Khách:</div>
                      <div style={{
                          padding: '10px',
                          background: '#1C1D27',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          textAlign: 'center',
                      }}>{userStats?.guest}</div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default UserHeader