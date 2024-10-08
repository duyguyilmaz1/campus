import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteAdmin, getAdminsByPage } from "../../../api/admin-service";
import { FaTrash } from "react-icons/fa";
import { swalAlert, swalConfirm } from "../../../helpers/swal";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setOperation } from "../../../store/slices/misc-slice";

const AdminList = () => {
  const { listRefreshToken } = useSelector((state) => state.misc);
  const [list, setList] = useState([]);  //yeni bir admin olusturulunca bu state de tutulur --> backende new-admin-form da eklyioruz ama listeye de eklemeliyiz --> bunu merkezi state e ulasaarak admin-list componentini refresh yaparak bunu sagliyorz --> misc-slice de olusturdugumuz refreshToken i buraya cagiriyouz --> listRefreshtoken degisince bu sayfa refresh olcak 
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lazyState, setlazyState] = useState({ // her sayfa degistignde burasi guncelelniyor
    first: 0,
    rows: 20,
    page: 0, //ilk sayfa 0 inci olarak kabul edilir
  });
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const resp = await getAdminsByPage(lazyState.page, lazyState.rows);
      setList(resp.content);
      setTotalRecords(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => { //adminService de olustuedugumuz fonsiyon ile admin sildik (deleteAdmin)
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return; 
    setLoading(true);
    try {
      await deleteAdmin(id);
      dispatch(refreshToken())
      swalAlert("Admin was deleted", "success");
    } catch (err) {
      const msg = err.response.data.message;
      console.log(err);
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => { //her sayfa degistignde lazyState degisiyor -- sadece statei guncelliyor. 
    setlazyState(event);
  };

  const getFullName = (row) => { //normalde tek bir kelime yazilabilirken bu fonksiyon sayesinde 2 keliem yazabildik 
    return `${row.name} ${row.surname}`;
  };

  const getOperations = (row) => { //her satir icin bu fonskyon caliscak --> silme islemi icin 
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

  const handleNew = () => {
    dispatch(setOperation("new"));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]); //her lazyState degiisminde loadData cagrilcak !! UseEffect component rerender oldugunda calsiamz--> ilk seferde ve 2 tane state guncellendiginde caliscak!!!

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
            <Column body={getFullName} header="Name" /> {/*header dedigimiz kisim kullanicinin gordugu kisim */}
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

export default AdminList;

/*
students/getAll                 => client side (backenden butun veriyi tek seferde getirir)
students/getAllStudentsByPage.  => serverside (backendden her sayfadaki veri kadar getirir) 
 

value'ya backednden gelen datayi yerlestircegiz --> loadData ile backenden data cekecegiz
sonra gelen datayi bir state de saklamaiz gerektigi icin useState kullaniyoruz 
henuz bir elemenanimiz olmaidig icin basta bos birakiyoruz 
Admin listesi --> resp.content icinde oldugu icin ordan aliyoruz 
resp in icnde de totalElement olarak da toplam admin sayisina ulasiyoruz 
loading de ekliyoruz ki kullanici backenden veri gelene kadar oyalansin  */