
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setOperation, setRecord } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/swal";
import { FaTrash } from "react-icons/fa";
import { deleteEducationTerm, getEducationTermsByPage } from "../../../api/education-term-service";
import { config } from "../../../helpers/config";

const EducationTermList = () => {

  const { listRefreshToken } = useSelector((state) => state.misc); // listeyi güncellemek için kullanıyoruz
  const [list, setList] = useState([]); //BE den gelecek olan educatioTerm listesini tutuyor.
  const [totalRecords, setTotalRecords] = useState(0);// toplam kayıtları tutar
  const [loading, setLoading] = useState(true); //loading olurken spinner çıksın diye yazıyoruz.
  const [lazyState, setlazyState] = useState({ //pageing mekanizmasi icin gerkeli olan bilgileri sakliyor 
    first: 0,
    rows: 20,
    page: 0,
  });

  const dispatch = useDispatch();


  const loadData = async () => {

    try {
      const resp = await getEducationTermsByPage(lazyState.page, lazyState.rows);
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
      await deleteEducationTerm(id);
      dispatch(refreshToken());
      swalAlert("Education term was deleted", "success");
    } catch (err) {
      const msg = err.response.data.message;
      console.log(err);
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  
  const onPage = (event) => { //her sayfa degistiginde lazy state guncellernir 
    setlazyState(event);
  };



  const getOperations = (row) => {
    return (
      <div>
        
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

  const getTerm = (row) => {  
    const term = config.educationTerms.find(item=> item.key === row.term) 
    return term.label;
  }
  //satir bilgisinden term gelcek ve biz configdeki term i bulup onun label deki karsiligini getirdik --> yani Fall_Semester yerine Fall yazcak 
  //find() filter gibi --> dizi icinde tek bir kayit donulcekse find, daha fazla kayit donulcekse filter

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
            dataKey="id"
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column body={getTerm} header="Term" /> 
            <Column field="startDate" header="Start" />
            <Column field="endDate" header="End" />
            <Column field="lastRegistrationDate" header="Last Registration" />
            <Column body={getOperations} header="" />
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EducationTermList;