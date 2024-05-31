import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import UserAdmin from "./UserAdmin";

const NewAdmin = ({ showModal, setShowModal, getAdminData }) => {
  console.log("grdf", showModal);
  const [formValues, setFormValues] = useState();
  const INITIAL_VALUES = {
    name: "",
    role: [],
    email: "",
    password: "",
    country: "",
  };

  // getFormData(formValues);
  const createAdmin = async (values) => {
    // setShowModal(false);
    try {
      console.log(values, "hsdgshfgsdhfg");
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/auth/signup-admin`,
        values,
        { headers }
      );

      console.log("ref43ew", response);

      if (response?.status === 201) {
        setShowModal(false);
        getAdminData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { resetForm }) => {
          // alert("ascsdcfsdv");
          console.log(values, "sdshdgjhsdgsfg");
          createAdmin(values);

          resetForm();
        }}
      >
        {({ errors, setFieldValue }) => (
          <Container fluid>
            <Row>
              <Col md="12">
                <Modal
                  center
                  className="modal-large modal-primary admin-modal"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Form>
                    <Modal.Header className="justify-content-center  admin-header ">
                      <div className="modal-title  ">
                        {/* <RiUserUnfollowLine fontSize={29} /> */}
                        Create New Admin
                      </div>
                    </Modal.Header>

                    <Modal.Body className="">
                      <div className="ml-3 mr-3">
                        <div className="form-group">
                          <label htmlFor="nameh" className="mb-0">
                            Name
                          </label>
                          <Field
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter admin name"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="roleid" className="mb-0">
                            Role
                          </label>
                        </div>
                        <Field
                          as="select"
                          name="role"
                          className="form-control"
                          onChange={(e) => {
                            setFieldValue("role", e.target.value);
                          }}
                        >
                          <option value="select role" defaultValue>
                            select role
                          </option>
                          <option value="Manager">Manager</option>
                        </Field>
                        <div className="form-group">
                          <label htmlFor="emailid" className="mb-0">
                            Email
                          </label>
                          <Field
                            name="email"
                            type="text"
                            className="form-control"
                            placeholder="Enter admin Email"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="passwordid" className="mb-0">
                            Password
                          </label>
                          <Field
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="Country-City" className="mb-0">
                            Country
                          </label>
                          <Field
                            name="country"
                            type="text"
                            className="form-control"
                            placeholder="Enter admin Country-City"
                          />
                        </div>
                      </div>
                    </Modal.Body>

                    <div className="modal-footer align-items-baseline">
                      <button
                        type="submit"
                        className=" btn  btn-info btn-fill btn-block mb-2"
                      >
                        Add
                      </button>
                      <Button
                        className="btn-dark btn-fill"
                        type="button"
                        variant="link"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </Form>
                </Modal>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default NewAdmin;
