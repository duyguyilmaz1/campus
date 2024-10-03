import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteAdmin, getAdminsByPage } from '../../../api/admin-service';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { swalAlert, swalConfirm } from "../../../helpers/swal";

//pageable yapıda kayıt çok fazla ise server side paging yapılır. 
//serverside sayfalara tıkladıkca kayıtları getirir parça parça. bu sebeple hızlıdır. 
// data artmayacaksa ve azsa client side paging yapılabilir.
//aşağıdaki datatable formatını PrimeReact kütüphanesinden aldık. 
const AdminList = () => {

    const [list, setList] = useState([])
    const [totalRecords, setTotalRecords]= useState(0)
    const [loading, setLoading] = useState(true)
    const [lazyState, setlazyState] = useState({ // her sayfa degistignde burasi guncelelniyor
        first: 0,
        rows: 20,
        page: 0, //ilk sayfa 0 inci olarak kabul edilir
      });

      const dispatch = useDispatch();
    const loadData = async() => {
        try {
            const resp= await getAdminsByPage(lazyState.page , lazyState.rows)
            setList(resp.content)
            setTotalRecords(resp.totalElements)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }       
    }    

    const handleDelete = async (id) => {
      const resp= await swalConfirm("Are your sure to delete?")
      if(!resp.isConfirmed) return;
        setLoading(true)
      try {
        await deleteAdmin(id);
        swalAlert("Admin is deleted!", "success")
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    

    //her sayfa degistignde lazyState degisiyor -- sadece statei guncelliyor. 
    const onPage = (event) => { 
        setlazyState(event);
      };

      const getFullName = (row) => {
        return `${row.name} ${row.surname}`
      }

      const getOperations = (row) => {
        return(
        <div>
            <Button variant="danger" size='sm' disabled={row.built_in} onClick={()=> handleDelete(row.id)}>
                <FaTrash />
            </Button>
        </div>
        )
      } 

    useEffect(() => {
        loadData()
    }, [lazyState])
      
  return (
    <Container>
        <Card>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-center'>
                    <span>List</span>
                    <Button>New</Button>
                </Card.Title>

                <DataTable
                    value={list}
                    stripedRows
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
      
  )
}

export default AdminList
