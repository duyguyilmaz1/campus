
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import ButtonSpinner from "../../common/button-spinner";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { refreshToken, setOperation } from "../../../store/slices/misc-slice";
import { swalAlert } from "../../../helpers/swal";
import InputMask from "react-input-mask-next";
import * as Yup from "yup";
import { createTeacher } from "../../../api/teacher-service";
import { MultiSelect } from "primereact/multiselect";
import { getAllLessonPrograms } from "../../../api/lesson-program-service";

const NewTeacherForm = () => {

  const [loading, setLoading] = useState(false);
  const [lessonPrograms, setLessonPrograms] = useState([]); //butun lessonProgramlari getiridk 
  const dispatch = useDispatch();

  const initialValues = {
    birthDay: "",
    birthPlace: "",
    gender: "",
    name: "",
    password: "",
    ssn: "",
    surname: "",
    username: "",
    phoneNumber: "",
    confirmPassword: "",
    email: "",
    isAdvisorTeacher: false,
    lessonsIdList: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    gender: Yup.string()
      .required("Required")
      .oneOf(["MALE", "FEMALE"], "Invalid gender"),
    birthDay: Yup.date().required("Required"),
    birthPlace: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/\d{3}-\d{3}-\d{4}/, "Invalid phone"),
    ssn: Yup.string()
      .required("Required")
      .matches(/\d{3}-\d{2}-\d{4}/g, "Invalid ssn"),
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().required("Required"),
    lessonsIdList: Yup.array().min(1, "Required"), //en az bir elemanli olcak 
    password: Yup.string()
      .required("Required")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/g, "One lowercase char")
      .matches(/[A-Z]+/g, "One uppercase char")
      .matches(/\d+/g, "One number"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords dosen't match"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createTeacher(values);
      formik.resetForm();
      dispatch(refreshToken()); // Listeyi güncellemek için
      dispatch(setOperation(null)); // New formunu kapatmak için
      swalAlert("Teacher was created", "success");
    } catch (err) {
      const msg = Object.values(err.response.data.validations)[0];
      swalAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setOperation(null));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loadLessonPrograms = async () => { //öğretmenin lesson programlarını yüklemek için bunu yazdık
    try {
      const data = await getAllLessonPrograms();

      const arr = data.map((item) => ({
        id: item.lessonProgramId,
        label: item.lessonName.map((item) => item.lessonName).join("-"), //ders programindaki tum dersleri(sadece lessonName leri gosteren bir dizi) gosterdik arada - ile 
      }));
      setLessonPrograms(arr);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    loadLessonPrograms()
  }, [])
  

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              <Col>
                <FloatingLabel
                  controlId="firstName"
                  label="First name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("name")}
                    isInvalid={formik.touched.name && formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lastName"
                  label="Last name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("surname")}
                    isInvalid={formik.touched.surname && formik.errors.surname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="gender"
                  label="Gender"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Select gender"
                    {...formik.getFieldProps("gender")}
                    isInvalid={formik.touched.gender && formik.errors.gender}
                  >
                    <option>Select gender</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="birthDay"
                  label="Birthday"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("birthDay")}
                    isInvalid={
                      formik.touched.birthDay && formik.errors.birthDay
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthDay}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="birthPlace"
                  label="Place of birth"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("birthPlace")}
                    isInvalid={
                      formik.touched.birthPlace && formik.errors.birthPlace
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthPlace}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="phoneNumber"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    as={InputMask}
                    mask="999-999-9999"
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("phoneNumber")}
                    isInvalid={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phoneNumber}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="ssn" label="SSN" className="mb-3">
                  <Form.Control
                    as={InputMask}
                    mask="999-99-9999"
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("ssn")}
                    isInvalid={formik.touched.ssn && formik.errors.ssn}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.ssn}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("email")}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid"> 
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <Form.Check
                  id="isAdvisor"
                  type="checkbox"
                  label="Is Advisor Teacher"
                  {...formik.getFieldProps("isAdvisorTeacher")}
                />
              </Col>

              <Col>
                <MultiSelect
                  value={formik.values.lessonsIdList}
                  onChange={(e) =>
                    formik.setFieldValue("lessonsIdList", e.value) //manuel olarak olusturudk // {...formik.getFieldProps("isAdvisorTeacher")} burda ise formik otomatik olusturuyor
                  }
                  options={lessonPrograms}
                  optionValue="id"
                  optionLabel="label"
                />
              </Col>

              <Col>
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("username")}
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Confirm Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("confirmPassword")}
                    isInvalid={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button
                  variant="outline-secondary"
                  className="me-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonSpinner />} Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewTeacherForm;