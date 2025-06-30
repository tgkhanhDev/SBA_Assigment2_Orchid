import React, { useContext, useEffect, useRef } from 'react'
import { AdminCategoryContext } from './CategoryContent';

export const CategoryHeader = () => {
    const { categoryStats, setSearchText } = useContext<any>(AdminCategoryContext);
    
    const searchRef = useRef("");

    const handleSearch = () => {
        setSearchText(searchRef.current);
    };
    
    return (
        <div id="categoryHeader">
            <div id="categoryFilter" className=''>
                <div className='filter-title'>
                    <div className='fs-5 fw-bold text-white'>Tìm kiếm giống hoa:</div>
                    <div className='' style={{ marginBottom: '20px' }}></div>
                </div>
                <div className="filter-detail search-wrapper">
                    <div className="search-box">
                        <input type="text" onChange={(e) => (searchRef.current = e.target.value)} className="form-control search-input" placeholder="Nhập giống hoa.." />
                        <button className="" onClick={handleSearch}>
                            Tìm
                        </button>
                    </div>
                </div>
            </div>

            <div id="categoryStats" className=''>
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
                        }}>{categoryStats?.total}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryHeader