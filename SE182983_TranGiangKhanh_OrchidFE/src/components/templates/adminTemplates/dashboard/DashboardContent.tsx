import React, { createContext, useEffect, useState } from 'react'
import './index.scss'
import orchidService from '../../../../services/orchidService';
import DashboardHeader from './DashboardHeader';
import DashboardBody from './DashboardBody';
import categoryService from '../../../../services/categoryService';

export const AdminDashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const [orchid, setOrchid] = useState<any[]>([]);

  const [orchidStats, setOrchidStats] = useState({
    total: 0,
    natural: 0
  });
  const [searchText, setSearchText] = useState('');

  const [orchidUpdateInfo, setOrchidUpdateInfo] = useState({
    orchidID: 0,
    isNatural: false,
    orchidDescription: '',
    orchidName: '',
    orchidUrl: '',
    price: 0,
    categoryID: 0,
  })

  const [orchidErrorInfo, setOrchidErrorInfo] = useState({
    orchidName: '',
    orchidUrl: '',
    price: '',
    isNatural: '',
    categoryID: '',
  })

  //*handle modal
  const handleUpdateModal = (item) => {
    console.log("currentItem: ", item);
    setOrchidUpdateInfo({
      orchidID: item?.orchidID,
      isNatural: item?.isNatural,
      orchidDescription: item?.orchidDescription,
      orchidName: item?.orchidName,
      orchidUrl: item?.orchidUrl,
      price: item?.price,
      categoryID: item?.category.categoryID
    })
  }

  const resetModal = () => {
    setOrchidUpdateInfo({
      orchidID: 0,
      isNatural: false,
      orchidDescription: '',
      orchidName: '',
      orchidUrl: '',
      price: 0,
      categoryID: 0
    })
  }

  //*Category option fecth
  //? {
  //?   value: categoryID,
  //?   label: categoryName
  //? }
  const fetchCategories = async () => {
    const newOptions: any[] = []
    const categoryList: any = await categoryService.getCategoryWithFilter({ categoryName: '' });
    categoryList?.map(item => {
      newOptions.push({
        value: item?.categoryID,
        label: item?.categoryName
      })
    })
    return newOptions;
  }

  const fetchOrchidList = async () => {
    const orchid: any = await orchidService.getOrchidFilter({ orchidName: searchText });    
    setOrchid(orchid || []); 

  }

  const fetchOrchidStats = async () => {
    const stats = await orchidService.countOrchids();
    
    //Test
    setOrchidStats({
      total: stats?.data.total || 0,
      natural: stats?.data.natural || 0
    })
  }

  useEffect(() => {
    fetchOrchidStats();
  }, [])

  useEffect(() => {
    fetchOrchidList();
  }, [searchText])

  // handling error 
  const checkFieldError = () => {
    let isErrorFree = true;

    let errors: any = {};

    if (orchidUpdateInfo.orchidName === '') {
      isErrorFree = false;
      errors.orchidName = "Orchid name cannot be empty";
    } else {
      errors.orchidName = "";
    }
    if (orchidUpdateInfo.orchidUrl === '') {
      isErrorFree = false;
      errors.orchidUrl = "Orchid url cannot be empty";
    } else {
      errors.orchidUrl = "";
    }
    if (orchidUpdateInfo.price == 0) {
      isErrorFree = false;
      errors.price = "Orchid price cannot be empty";
    } else {
      errors.price = "";
    }
    if (!orchidUpdateInfo.categoryID || orchidUpdateInfo.categoryID == 0) {
      isErrorFree = false;
      errors.categoryID = "Category cannot be empty";
    } else {
      errors.categoryID = "";
    }
    if (orchidUpdateInfo.orchidDescription === '') {
      isErrorFree = false;
      errors.orchidDescription = "Orchid description cannot be empty";
    } else {
      errors.orchidDescription = "";
    }

    setOrchidErrorInfo(errors)
    return isErrorFree
  }

  return (
    <AdminDashboardContext.Provider value={{
      orchid,
      orchidStats,
      searchText, setSearchText,
      orchidUpdateInfo, setOrchidUpdateInfo,
      handleUpdateModal, resetModal,
      fetchOrchidList, fetchOrchidStats, fetchCategories,
      orchidErrorInfo, checkFieldError
    }}>
      {children}
    </AdminDashboardContext.Provider>
  );
};

export const DashboardContent = () => {
  return (
    <DashboardProvider>
      <div className='' id="dashboardContent">
        <DashboardHeader />
        <DashboardBody />
      </div>
    </DashboardProvider>
  )
}

export default DashboardContent