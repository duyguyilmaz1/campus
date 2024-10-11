
import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import NewTeacherForm from "../../components/dasboard/teacher/new-teacher-form";
import EditTeacherForm from "../../components/dasboard/teacher/edit-teacher-form";
import TeacherList from "../../components/dasboard/teacher/teacher-list";

const TeacherPage = () => {

  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
      <PageHeader title="Teacher" />
      <Spacer />

      {currentOperation === "new" && (
        <>
          <NewTeacherForm/>
          <Spacer />
        </>
      )}

      {currentOperation === "edit" && (
        <>
          <EditTeacherForm/>
          <Spacer />
        </>
      )}

      <TeacherList/>
      <Spacer />
    </>
  );
};

export default TeacherPage;