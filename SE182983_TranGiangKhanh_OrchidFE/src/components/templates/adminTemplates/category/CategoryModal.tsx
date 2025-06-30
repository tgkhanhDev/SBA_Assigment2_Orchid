import React, { useContext, useEffect, useState } from 'react'
import { AdminCategoryContext } from './CategoryContent';
import Select from 'react-select'
import Swal from 'sweetalert2';
import categoryService from '../../../../services/categoryService';

export const CategoryModal = () => {
    const { categoryList, categoryUpdateInfo, setCategoryUpdateInfo, fetchCategoryList, fetchCategoryStats, checkFieldError, categoryErrorInfo } = useContext<any>(AdminCategoryContext);

    const [parentOptions, setParentOptions] = useState([]);

    useEffect(() => {
        const newOptions: any[]= []
        categoryList.map(item => {
            newOptions.push({
                value: item?.categoryID,
                label: item?.categoryName
            })
        })
    }, [categoryList])


    const statusOption = [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' },
    ]

    const handleCreateCategory = async () => {
        // const createResData = await categoryService.createCategory(categoryUpdateInfo);
        const createResData = {message: 'This function is not supported'}
        await fetchCategoryList();
        await fetchCategoryStats();
        Swal.fire({
            title: createResData.message,
            icon: "success"
        });
    }

    const handleUpdateCategory = async () => {
        // const updateResData = await categoryService.updateCategory(categoryUpdateInfo);
        const updateResData = {message: 'This function is not supported'}
        await fetchCategoryList();
        await fetchCategoryStats();
        Swal.fire({
            title: updateResData.message,
            icon: "success"
        });
    }

    const handleDeleteCategory = async () => {
        // const deleteResData = await categoryService.deleteCategory(categoryUpdateInfo.categoryID);
        const deleteResData = { message: 'This function is not supported' }
        await fetchCategoryList();
        await fetchCategoryStats();
        Swal.fire({
            title: deleteResData.message,
            icon: "success"
        });
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
        <div className="modal fade" id="categoryModal" tabIndex={-1} aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="categoryModalLabel">Chi tiết</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="form-group mb-2">
                            <label htmlFor="categoryName">Tên giống hoa</label>
                            <input type="text" className="form-control" id="categoryName" aria-describedby="emailHelp" placeholder="Nhập tên giống hoa"
                                value={categoryUpdateInfo?.categoryName}
                                onChange={(e) => {
                                    setCategoryUpdateInfo({
                                        ...categoryUpdateInfo,
                                        categoryName: e.target.value
                                    })
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{categoryErrorInfo?.categoryName}</small>

                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="categoryDescription">Mô tả</label>
                            <input type="text" className="form-control" id="categoryDescription" aria-describedby="emailHelp" placeholder="Nhập mô tả"
                                value={categoryUpdateInfo?.categoryDescription}
                                onChange={(e) => {
                                    setCategoryUpdateInfo({
                                        ...categoryUpdateInfo,
                                        categoryDescription: e.target.value
                                    })
                                }}
                            />
                            <small id="emailHelp" className="form-text text-danger">{categoryErrorInfo?.categoryDescription}</small>

                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <div>
                            {categoryUpdateInfo?.categoryID != 0
                                && <button
                                    type="button"
                                    onClick={() => { confirmDeleteCategory() }}
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                >Xóa</button>}
                        </div>

                        <div className='d-flex' style={{ gap: '10px' }}>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tắt</button>
                            {categoryUpdateInfo?.categoryID == 0
                                ? <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        const isValid = checkFieldError();
                                        if (!isValid) return;
                                        handleCreateCategory()
                                    }}
                                >Tạo</button>
                                : <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        const isValid = checkFieldError();
                                        if (!isValid) return;
                                        handleUpdateCategory()
                                    }}
                                >Lưu</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal