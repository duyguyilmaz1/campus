import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import NewStudentForm from "../../components/dasboard/student/new-student-form";
import EditStudentForm from "../../components/dasboard/student/edit-student-form";
import StudentList from "../../components/dasboard/student/student-list";
const StudentPage = () => {
  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
      <PageHeader title="Student" />
      <Spacer />

      {currentOperation === "new" && (
        <>
          <NewStudentForm/>
          <Spacer />
        </>
      )}

      {currentOperation === "edit" && (
        <>
          <EditStudentForm/>
          <Spacer />
        </>
      )}

      <StudentList/>
      <Spacer />
    </>
  );
};

export default StudentPage;