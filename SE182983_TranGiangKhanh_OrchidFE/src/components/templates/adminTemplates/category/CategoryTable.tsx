import React, { useContext, useEffect, useState } from 'react'
import { AdminCategoryContext } from './CategoryContent';
import CategoryModal from './CategoryModal';

export const CategoryTable = () => {

    const { categoryList, setCategoryUpdateInfo, handleUpdateModal, resetModal } = useContext<any>(AdminCategoryContext);

    useEffect(()=>{
        console.log("categoryList: ", categoryList);
    }, [categoryList])

    return (
        <div>
            <table id="categoryTable" className="table table-dark" style={{ "--bs-table-bg": "#21222D" }}>
                <thead>
                    <tr>
                        <th scope="col">Thứ tự</th>
                        <th scope="col">Tên giống hoa</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList?.map((item, index) => {
                        return (
                            <tr id="categoryRow" key={item?.categoryID || index}
                            onClick={() => handleUpdateModal(item)} 
                            data-bs-toggle="modal" 
                            data-bs-target="#categoryModal"
                            >
                                <th scope="row">{item?.categoryID}</th>
                                <td>{item?.categoryName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div>
                <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => resetModal()}
                data-bs-toggle="modal" 
                data-bs-target="#categoryModal">
                    Thêm giống hoa
                </button>
            </div>
            <CategoryModal />
        </div>
    )
}

export default CategoryTable