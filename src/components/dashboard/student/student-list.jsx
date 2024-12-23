import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshToken,
  setOperation,
  setRecord,
} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/swal";
import { FaTrash, FaEdit } from "react-icons/fa";
import { deleteStudent, getStudentsByPage } from "../../../api/student-service";

const StudentList = () => {
  const { listRefreshToken } = useSelector((state) => state.misc); // liste değiştiğinde (örn. öğrenci silindiğinde) listeyi refresh eder
  const [list, setList] = useState([]); // BE'den çektiğimiz öğrenci listesini tutar
  const [totalRecords, setTotalRecords] = useState(0); // paging yapı oldğu için total recorda ihtiyacımız var, onu aldık
  const [loading, setLoading] = useState(true); // student listi doldurur
  const [lazyState, setlazyState] = useState({ // paging için yapı
    first: 0,
    rows: 20,
    page: 0,
  });
  const dispatch = useDispatch(); // merkezi state i değiştirmek için 

  const loadData = async () => {
    try {
      const resp = await getStudentsByPage(lazyState.page, lazyState.rows);
      setList(resp.content);
      setTotalRecords(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteStudent(id);
      dispatch(refreshToken());
      swalAlert("Student was deleted", "success");
    } catch (err) {
      const msg = err.response.data.message;
      console.log(err);
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => { // herhangi bir öğrencinin edit tuşuna basında onu state e getirir ve edit formunu açar
    dispatch(setRecord(row));
    dispatch(setOperation("edit"));
  };

  const onPage = (event) => { 
    setlazyState(event);
  };

  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  };

  const getOperations = (row) => { 
    return (
      <div>
        <Button
          variant="warning"
          size="sm"
          disabled={row.built_in}
          className="me-2"
          onClick={() => handleEdit(row)} //merkezi state deki currentOperation i edite cekiyor bu sayede edit-student componenti calisiyor 
        >
          <FaEdit />
        </Button>

        <Button
          variant="danger"
          size="sm"
          disabled={row.built_in}
          onClick={() => handleDelete(row.id)}
        >
          <FaTrash />
        </Button>
      </div>
    );
  };

  const handleNew = () => {
    dispatch(setOperation("new"));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>List</span>
            <Button onClick={handleNew}>New</Button>
          </Card.Title>

          <DataTable
            value={list}
            lazy
            dataKey="id" //her satiri ifade eden id, arka planda map gibi bir yapi var 
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column body={getFullName} header="Name" />
            <Column field="gender" header="Gender" />
            <Column field="phoneNumber" header="Phone Number" />
            <Column field="ssn" header="SSN" />
            <Column field="username" header="Username" />
            <Column body={getOperations} header="" />
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentList;