import React from 'react'
import HeaderLayoutAdmin from '../components/layouts/HeaderLayoutAdmin'
import SideBarLayoutAdmin from '../components/layouts/SideBarLayoutAdmin'
import ContentLayoutAdmin from '../components/layouts/ContentLayoutAdmin'
import { Outlet } from 'react-router-dom'
function AdminPage() {
  return (
    <div className="d-flex overflow-hidden" style={{ height: "100vh" }}>
      <div
        className=""
        style={{
          width: "20vw",
          background: "#171821",
          position: "sticky",
          top: 0,
          left: 0
        }}
      >
        <SideBarLayoutAdmin />
      </div>
      <div
        className="d-flex flex-column"
        style={{ width: "80vw", overflowY: "auto" }}
      >
        <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
          <HeaderLayoutAdmin />
        </div>
        <div className="custom-scrollbar" style={{ flex: 1 }}>
          <ContentLayoutAdmin />
        </div>
      </div>
    </div>
  )
}

export default AdminPage