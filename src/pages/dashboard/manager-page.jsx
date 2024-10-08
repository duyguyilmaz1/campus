import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import ManagerList from "../../components/dasboard/manager/manager-list";
import NewManagerForm from "../../components/dasboard/manager/new-manager-form";
import EditManagerForm from "../../components/dasboard/manager/edit-manager-form";

const ManagerPage = () => {
  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
      <PageHeader title="Manager" />
      <Spacer />

      {currentOperation === "new" && (
        <>
          <NewManagerForm/>
          <Spacer />
        </>
      )} 

      {currentOperation === "edit" && (
        <>
          <EditManagerForm/>
          <Spacer />
        </>
      )} 

      <ManagerList/>
      <Spacer />
    </>
  );
};

export default ManagerPage;