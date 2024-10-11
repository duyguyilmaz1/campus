
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { getUnAssignedPrograms } from "../../../api/lesson-program-service";
import { Column } from "primereact/column";
import {
  assignTeacherToProgram,
  getAllTeachers,
} from "../../../api/teacher-service";
import { swalAlert } from "../../../helpers/swal";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../../store/slices/misc-slice";

const LessonAssignment = () => {

  const [loading, setLoading] = useState(true);
  const [loadingAssign, setLoadingAssign] = useState(false); //butona başınca loading başlayacak, aşağıdaki button ile ilişkilendirdik.
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null); //backenden aldigimiz ogretmenlerle dolduracagiz 
  const [teachers, setTeachers] = useState([]);
  const [list, setList] = useState([]); //BEden aldığımız data
  const dispatch = useDispatch();
  const { listRefreshToken } = useSelector((state) => state.misc);

  const loadPrograms = async () => { //assign edilememis dersleri getircek 
    try {
      const data = await getUnAssignedPrograms();
      setList(data); //backenden gelen datayi list icine koyduk 
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTeachers = async () => { //backenden teacherlari aldik 
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = async () => {
    setLoadingAssign(true);
    try {
      if (selectedPrograms.length <= 0)
        throw new Error("Select at least a program");
      if (!selectedTeacher) throw new Error("Select a teacher");

      const payload = { //lessonProgramId ve teacherId ile backende gonderememiz gerekiyor bu yuzden ikisini iceren bir payload olusturudk 
        lessonProgramId: selectedPrograms.map((item) => item.lessonProgramId), //sectiigmiz dersler selectedPrograms state icine atildi bunu da ordan aliyoruz 
        teacherId: selectedTeacher, //asagida option da teacher id yi state icine atmistik ordan alidk direk
      };

      await assignTeacherToProgram(payload);
      swalAlert("Assignment was completed", "success");
      setSelectedPrograms([]);
      dispatch(refreshToken()); //listeyi güncelledik
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message || err.message; //backenden gelen bir hata ile fronend den gelen hata yapisi farkli oldu icin // ayrica hatalri gormezden gelmsini v enull donemisni istedgimiz icin ? ekledik. 
      swalAlert(msg, "error");
    } finally {
      setLoadingAssign(false);
    }
  };

  const getLessonNames = (row) => {
    return row.lessonName.map((item) => item.lessonName).join("-");
  };

  useEffect(() => { //token degistiginde yeniden refresh olsun yani bir ders unassign dan assign a döndüdügünde listeden ciksin 
    loadPrograms();
  }, [listRefreshToken]); //listeyi refresh eder

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Unassigned Programs</Card.Title>

          <DataTable
            dataKey="lessonProgramId"
            value={list} //BEye bağlanıp çektiğimiz datayı veriyoruz
            loading={loading} //spinner in donmesini saglar 
            selection={selectedPrograms} //burda da alt satirda state icine attigimiz dersleri aliyoruz 
            onSelectionChange={(e) => setSelectedPrograms(e.value)} //herahngi bir sey secildigi zamanm sen git yukarda olustrudugmuz state e.value yu koy yani tum sectigim desleri state e koy
          >
        
            <Column selectionMode="multiple" /> 
            <Column body={getLessonNames} header="Lessons" /> {/*getLessonName ile dizi halinde aliyoruz derslerin isimlerini cunku obje halinde icinden sadece ders isimlerini map ile cektik yukarda */}
            <Column field="day" header="Day" />
            <Column field="startTime" header="Start" />
            <Column field="stopTime" header="End" />
          </DataTable>

          <InputGroup className="mt-5 mb-3">
            <FloatingLabel controlId="floatingSelect" label="Teacher">
              <Form.Select
                aria-label="Floating label select example"
                onChange={(e) => setSelectedTeacher(e.target.value)} //burda etarget.value olma sebebi --> standart bir html old icin yukardaki ozel tasarlanmis oldg icin e.value
              >
                <option value="">Select Teacher</option>
                {teachers.map((item) => (
                  <option value={item.userId} key={item.userId}>
                    {item.name} {item.surname}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <Button onClick={handleAssign} disabled={loadingAssign}>Assign</Button>
          </InputGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonAssignment;