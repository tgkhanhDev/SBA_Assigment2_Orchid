import React, { createContext, useEffect, useState } from 'react'
import CategoryHeader from './CategoryHeader'
import CategoryTable from './CategoryTable'
import './index.scss'
import categoryService from '../../../../services/categoryService';

export const AdminCategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState({
    total: 0
  });

  const [categoryUpdateInfo, setCategoryUpdateInfo] = useState({
    categoryID: 0,
    categoryName: ''
  })

  const [categoryErrorInfo, setCategoryErrorInfo] = useState({
    categoryName: ''
  })

  const handleUpdateModal = (item) => {
    console.log("item:: ", item);
    
    setCategoryUpdateInfo({
      categoryID: item?.categoryID,
      categoryName: item?.categoryName
    })
  }
  const resetModal = () => {
    setCategoryUpdateInfo({
      categoryID: 0,
      categoryName: ''
    })
  }

  const fetchCategoryList = async () => {
    const categories = await categoryService.getCategoryWithFilter({ categoryName: searchText });
    setCategoryList(categories?.data || []);
  }

  const fetchCategoryStats =  async () => {
    const stats = await categoryService.countCategory();
    setCategoryStats({
      total: stats.data
    });
  }

  //Count for stats
  useEffect(() => {
    fetchCategoryStats();
  },[])

  useEffect(() => {
    fetchCategoryList();
  }, [searchText])

  const checkFieldError = () => {
    let isErrorFree = true;

    let errors: any = {};

    if (categoryUpdateInfo.categoryName === '') {
      isErrorFree = false;
      errors.categoryName = "Name cannot be empty";
    } else {
      errors.categoryName = "";
    }

    setCategoryErrorInfo(errors)
    return isErrorFree

  }

  return (
    <AdminCategoryContext.Provider value={{
      categoryList,
      categoryStats,
      searchText, setSearchText,
      categoryUpdateInfo, setCategoryUpdateInfo,
      handleUpdateModal, resetModal,
      fetchCategoryList, fetchCategoryStats, checkFieldError, categoryErrorInfo
    }}>
      {children}
    </AdminCategoryContext.Provider>
  );
}




export const CategoryContent = () => {
  return (
    <CategoryProvider>
      <div id="categoryContent">
        <CategoryHeader />
        <CategoryTable />
      </div>
    </CategoryProvider>
  )
}

export default CategoryContent