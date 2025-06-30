import React, { useContext, useEffect, useState } from 'react'
import { AdminDashboardContext } from './DashboardContent';
import Select from 'react-select';
import orchidService from '../../../../services/orchidService';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

export const DashboardModal = () => {

    const { orchidUpdateInfo, setOrchidUpdateInfo, fetchOrchidList, fetchOrchidStats, fetchCategories, orchidErrorInfo, checkFieldError } = useContext<any>(AdminDashboardContext);

    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            let categoryOpt = await fetchCategories();
            setCategoryOptions([...categoryOpt]);
        }
        fetchOptions()
    }, [])

    const statusOption = [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' },
    ]

    const handleCreateOrchid = async () => {
        console.log("Craete Info: ", orchidUpdateInfo);
        const createResponse = orchidService.createOrchid(orchidUpdateInfo);
        await fetchOrchidList();
        await fetchOrchidStats();
        Swal.fire({
            title: createResponse?.message || "created successfully",
            icon: "success"
        })
    }

    const handleUpdateOrchid = async () => {
        const updateResponse = await orchidService.updateOrchid(orchidUpdateInfo);
        await fetchOrchidList();
        await fetchOrchidStats();
        console.log("updateRes: ", updateResponse);

        Swal.fire({
            title: updateResponse?.message || "Updated Successfully",
            icon: "success"
        })

    }

    const handleDeleteCategory = async () => {
        const deleteResponse = await orchidService.deleteOrchid(orchidUpdateInfo.newsArticleID);
        await fetchOrchidList();
        await fetchOrchidStats();
        Swal.fire({
            title: deleteResponse?.message || "Deleted Successfully",
            icon: "success"
        })
    }

    //SwAl
    const confirmDeleteCategory = () => {
        Swal.fire({
            title: "Do you want to delete this category?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes, delete it!",
            denyButtonText: `No, wait!`
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteCategory();
                Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes aborted", "", "info");
            }
        });
    }


    return (
        <div className="modal fade" id="dashboardModal" tabIndex={-1} aria-labelledby="dashboardModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="dashboardModalLabel">Orchid Detail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="form-group mb-2">
                            <label htmlFor="dashboardName">Orchid Name</label>
                            <input type="text" className="form-control" id="orchidName" aria-describedby="orchidName" placeholder="Enter Orchid Name..."
                                value={orchidUpdateInfo?.orchidName}
                                onChange={(e) => {
                                    setOrchidUpdateInfo({
                                        ...orchidUpdateInfo,
                                        orchidName: e.target.value
                                    })
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{orchidErrorInfo?.orchidName}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="orchidUrl">Orchid Url</label>
                            <input type="text" className="form-control" id="orchidUrl" aria-describedby="orchidUrl" placeholder="Enter Urls..."
                                value={orchidUpdateInfo?.orchidUrl}
                                onChange={(e) => {
                                    setOrchidUpdateInfo({
                                        ...orchidUpdateInfo,
                                        orchidUrl: e.target.value
                                    })
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{orchidErrorInfo?.orchidUrl}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="orchidDescription">Orchid Description</label>
                            <textarea className="form-control" id="orchidDescription" aria-describedby="orchidDescription" placeholder="Enter Description..."
                                value={orchidUpdateInfo?.orchidDescription}
                                onChange={(e) => {
                                    setOrchidUpdateInfo({
                                        ...orchidUpdateInfo,
                                        orchidDescription: e.target.value
                                    })
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{orchidErrorInfo?.orchidDescription}</small>
                        </div>

                        <div className="form-group mb-2">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" id="price" aria-describedby="price" placeholder="Enter Source..."
                                value={orchidUpdateInfo?.price}
                                onChange={(e) => {
                                    setOrchidUpdateInfo({
                                        ...orchidUpdateInfo,
                                        price: e.target.value
                                    })
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{orchidErrorInfo?.price}</small>
                        </div>

                        <div className="form-group mb-2">
                            <label htmlFor="isNatural">Is this Natural?</label>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isNatural"
                                    checked={orchidUpdateInfo.isNatural}
                                    onChange={(e) => {
                                        setOrchidUpdateInfo({
                                            ...orchidUpdateInfo,
                                            isNatural: e.target.checked
                                        });
                                    }}
                                />
                                <label className="form-check-label" htmlFor="isNatural">
                                    {orchidUpdateInfo.isNatural ? 'Yes, It\'s Natural' : 'No, It\'s Industry'}
                                </label>
                            </div>
                            {orchidErrorInfo?.isNatural && (
                                <small className="form-text text-danger">{orchidErrorInfo.isNatural}</small>
                            )}
                        </div>

                        <div className="form-group mb-2">
                            <label htmlFor="selectCategory">Select Category:</label>
                            <Select
                                options={categoryOptions}
                                placeholder="Select Category"
                                value={categoryOptions?.find(option => option.value == orchidUpdateInfo?.categoryID) || 0}
                                onChange={e => setOrchidUpdateInfo({ ...orchidUpdateInfo, categoryID: e.value })}
                            />
                            <small id="emailHelp" className="form-text text-danger">{orchidErrorInfo?.categoryID}</small>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <div>
                            {orchidUpdateInfo?.newsArticleID != 0
                                && <button
                                    type="button"
                                    onClick={() => { confirmDeleteCategory() }}
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                >DELETE</button>}
                        </div>

                        <div className='d-flex' style={{ gap: '10px' }}>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {orchidUpdateInfo?.orchidID == 0
                                ? <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        const isValid = checkFieldError();
                                        if (!isValid) return;
                                        handleCreateOrchid()
                                    }}
                                >Create</button>
                                : <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        const isValid = checkFieldError();
                                        if (!isValid) return;
                                        handleUpdateOrchid()
                                    }}
                                >Save</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardModal