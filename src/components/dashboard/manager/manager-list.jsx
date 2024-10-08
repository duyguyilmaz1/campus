import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteManager, getManagersByPage } from "../../../api/manager-service";
import { refreshToken, setOperation, setRecord } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/swal";
import { FaTrash, FaEdit } from "react-icons/fa";

const ManagerList = () => {

  const { listRefreshToken } = useSelector((state) => state.misc); //refresh token yaptık. liste güncellemesi için. burayı bu sebeple yazdın .refresh token liste güncelliyor.
  const [list, setList] = useState([]); //BE den çekeceğimiz kullanıcı datasını burada saklanır
  const [totalRecords, setTotalRecords] = useState(0); // toplam kayıt sayısı
  const [loading, setLoading] = useState(true); // loading durumunu handle ederiz
  const [lazyState, setlazyState] = useState({ // datatable için gerekli 
    first: 0,
    rows: 20,
    page: 0,
  });  

  const dispatch = useDispatch(); //merkezi state i değiştirir.

  //loadData useEffect ile çağrılır. aşağıda var.
  const loadData = async () => { //BE ye bağlanıp datayı çektiğimiz yer: api/manager-service ten çekeriz. 
    try {
      const resp = await getManagersByPage(lazyState.page, lazyState.rows); // hangi sayfa ve kaç satır bilgisini veririz param olarak 
      setList(resp.content);
      setTotalRecords(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => { // api/manager-serviceteki deleteManager metodu için yazdık
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteManager(id);
      dispatch(refreshToken()); //silme işleminden sonra sayfa tekrar refresh olması için çağırırız refreshToken ı. token değişir ve silinen eleman tablodan silinir
      swalAlert("Manager was deleted", "success");
    } catch (err) {
      const msg = err.response.data.message;
      console.log(err);
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => { // edit butonuna bağlı, row ile userın bütün bilgisi BE'den geliyor burada. 
    dispatch(setRecord(row)); // row'un içinde userın tüm bilgisi var. biz de bunu merkezi stateteki currentRecord a göndeririz.
    dispatch(setOperation("edit")); // edite basılınca operasyon edite çekilir.
  };

  const onPage = (event) => { //sayfa değişikliği yaptığımız zaman çalışır ve o değişen sayfa ile alakalı bir obje verir. bizde setLazyState değişince loadData tekrar çalışır ve sayfa güncellenir.
    setlazyState(event);
  };

  const getFullName = (row) => { //kullanıcının adını ve soyadını birleştirip geri verir
    return `${row.name} ${row.surname}`;
  };

  const getOperations = (row) => { //her kaydın sağ tarafına bir silme ve edit butonu gelecek onu ayarlar.
    return (
      <div>
        <Button //edit butonu
          variant="warning"
          size="sm"
          disabled={row.built_in}
          className="me-2" //butonların arasını margin ile açtık
          onClick={() => handleEdit(row)}
        >
          <FaEdit />
        </Button>

        <Button // silme butonu
          variant="danger"
          size="sm"
          disabled={row.built_in}
          onClick={() => handleDelete(row.userId)} //o satirdaki kullancinin userId si gider
        >
          <FaTrash />
        </Button>
      </div>
    );
  };

  const handleNew = () => { //setOperation ı new'e çeker. new butonuna bastığımızda çalışır.
    dispatch(setOperation("new"));
  };


  useEffect(() => { //lazyState, listRefreshToken değerleri değiştiğinde useEffect çalışır 
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

          <DataTable //datayı BE den çekip alırız burada, bunun için api içine service oluştururuz: manager-service
            value={list} //list dediğimiz şeyi loadData ile doldururuz.
            lazy
            dataKey="userId"
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

export default ManagerList;