import React, { useContext } from 'react'
import { AdminDashboardContext } from './DashboardContent';
import CardItem from '../../../ui/CardItem';
import DashboardModal from './DashboardModal';
import userService from '../../../../services/userService';

const DashboardBody = () => {
    const { orchid, handleUpdateModal, resetModal } = useContext<any>(AdminDashboardContext);
    return (
        <>
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => resetModal()}
                    data-bs-toggle="modal"
                    data-bs-target="#dashboardModal">
                    Add Orchid
                </button>
            </div>
            <div className='row'>
                {
                    orchid?.map((item, index) => {
                        return (
                            <div key={item?.orchidID || index} className='col-6 d-flex justify-content-center flex-column' style={{ marginTop: '20px' }}>
                                <CardItem orchidItem={item} />
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#dashboardModal"
                                    className='btn'
                                    style={{ color: '#f6f6f6', background: '#737373', marginTop: '10px' }}
                                    onClick={() => handleUpdateModal(item)}
                                >Update</button>
                            </div>
                        )
                    })
                }
            </div>
            <DashboardModal />
        </>
    )
}

export default DashboardBody