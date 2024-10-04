import React from 'react'
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import AdminList from "../../components/dashboard/admin/admin-list";
import NewAdminForm from '../../components/dashboard/admin/new-admin-form';
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const  { currentOperation }= useSelector(state=> state.misc)
  return (
    <>
      <PageHeader title="Admin"/>
      <Spacer/>

      {currentOperation === "new" &&(
        <>
          <NewAdminForm/>
          <Spacer/>
        </>
      )}
     
      <AdminList/>  

    </>
  )
}

export default AdminPage
