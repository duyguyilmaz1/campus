
import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import NewAssistantManagerForm from "../../components/dasboard/assistant-manager/new-assistant-manager-form";
import EditAssistantManagerForm from "../../components/dasboard/assistant-manager/edit-assistant-magager-form";
import AssistantManagerList from "../../components/dasboard/assistant-manager/assistant-manager-list";

const AssistantManagerPage = () => {
  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
      <PageHeader title="Assistant Manager" />
      <Spacer />

       {currentOperation === "new" && (
        <>
          <NewAssistantManagerForm/>
          <Spacer />
        </>
      )}

      {currentOperation === "edit" && (
        <>
          <EditAssistantManagerForm/>
          <Spacer />
        </>
      )} 

      <AssistantManagerList/>
      <Spacer />
    </>
  );
};

export default AssistantManagerPage;