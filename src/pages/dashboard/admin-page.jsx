import React from 'react'
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import AdminList from "../../components/dashboard/admin/admin-list";

const AdminPage = () => {
  return (
    <>
      <PageHeader title="Admin"/>
      <Spacer/>
      <AdminList/>  

    </>
  )
}

export default AdminPage
