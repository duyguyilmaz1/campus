import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import ButtonSpinner from "../../common/button-spinner";
import { createAdmin } from "../../../api/admin-service";
import { swalAlert } from "../../../helpers/swal";
import InputMask from "react-input-mask-next";
import { useDispatch } from "react-redux";
import { refreshToken, setOperation } from "../../../store/slices/misc-slice";

const NewAdminForm = () => {

    const [loading, setLoading] = useState(false)
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
        username: Yup.string().required("Required"),
        password: Yup.string()
          .required("Required")
          .min(8, "Must be at least 8 characters")
          .matches(/[a-z]+/g, "One lowercase char")
          .matches(/[A-Z]+/g, "One uppercase char")
          .matches(/\d+/g, "One number"),
        confirmPassword: Yup.string()
          .required("Required")
          .oneOf([Yup.ref("password")], "Passwords dosen't match"),
          //Yup.ref("password") --> passworddeki kismi referans al demek, referans gösteriyoruz yani.
      });

      //values : submit e bastığımızda formdaki bilgileri topluyor ve evalidationdan geçiyorsa bize getiriyor
      //admin-service de methodumuzu yazdik ve bu kisimla backende validasyonu gecen datalri gonderiyoruz 
      const onSubmit = async (values) => {
        setLoading(true);

        try {
          await createAdmin(values);
          dispatch(refreshToken()); // Listeyi güncellemek için //olustueudumuz merkezi state i guncelliyouz islem basarili olursa 
          dispatch(setOperation(null)); // New formunu kapatmak için
          formik.resetForm(); //formu bosalt kayit yaptiktan sonra 
          swalAlert("Admin was created", "success");
        } catch (err) {
          console.log(err);//
          const msg = Object.values(err.response.data.validations)[0];  ///error mesajlarindan bir dizi olusuyor biz de burdan elde etmek istedgimiz hata mesajini alyioruz
          swalAlert(msg, "error");
        } finally {
          setLoading(false);
        }
      };
      
      const formik= useFormik({
        initialValues,
        validationSchema,
        onSubmit
      })
      

  return (
    <Container>
      <Card>
        <Card.Body>
            <Card.Title>
                New
            </Card.Title>
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                <Col>
                 <FloatingLabel
                    controlId="firstName"
                    label="First Name"
                    className="mb-3"
      >
                    <Form.Control type="text" placeholder=""
                     {...formik.getFieldProps("name")}
                     isInvalid={formik.touched && formik.errors.name} 
                    />
                    <Form.Control.Feedback>
                        {formik.errors.name}
                    </Form.Control.Feedback>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel
                  controlId="lastName"
                  label="Last name" //burayı kullanıcı görür
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
                  <Form.Select //burası aşağı açılan select olduğu için Form.Select yaptık, option tagi ile seçimleri tanımladık
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
                    as={InputMask} //FormControle diyoruz ki InputMask gibi davran, mask ile alan maskelenir açıkça görünmez
                    mask="999-999-9999"   // mask kütüphanesiyle maskeleme yaptik yani sadece rakam girilebilir- maxLenght e ihtiyac duyamiyz artik. burada phone formatını yazarız 3rakam-3rakam-4rakam gibi.
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
                    mask="999-99-9999" // burada ssn formatını yazarız 3rakam-2rakam-4rakam gibi.
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
                  className="me-3" //margin verdik 
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
  )
}

export default NewAdminForm
