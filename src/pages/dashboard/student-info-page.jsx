import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import NewStudentInfoForm from "../../components/dasboard/student-info/new-student-info-form";
import EditStudentInfoForm from "../../components/dasboard/student-info/edit-student-info-form";
import StudentInfoList from "../../components/dasboard/student-info/student-info-list";
const StudentInfoPage = () => {
  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
      <PageHeader title="Student Info" />
      <Spacer />

      {currentOperation === "new" && (
        <>
          <NewStudentInfoForm/>
          <Spacer />
        </>
      )}
      
      {currentOperation === "edit" && (
        <>
          <EditStudentInfoForm/>
          <Spacer />
        </>
      )}

      <StudentInfoList/>
      <Spacer />
    </>
  );
};

export default StudentInfoPage;