import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Modal,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const ProofUploader = ({ show, setShow, user_id }) => {
  console.log("hjkl", user_id);
  const INITIAL_VALUES = {
    file: null,
    description: "",
  };
  const handleProofs = async (values) => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };

      const formData = new FormData();

      formData.append("block_proof_image", values.file);
      formData.append("block_proof_description", values.description);
      formData.append("user_id", user_id);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/block`,
        formData,
        { headers }
      );
      console.log(response.data, "hsgdywgdy");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={(values, { resetForm }) => {
        handleProofs(values);
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <div>
          {/* upload modal */}
          <Modal
            className="modal-large modal-primary"
            show={show}
            onHide={() => setShow(false)}
          >
            <Form>
              <Modal.Header className="justify-content-center">
                <div className="modal-title  ">
                  {/* <RiUserUnfollowLine fontSize={29} /> */}
                  Upload Proofs
                </div>
              </Modal.Header>

              <Modal.Body className="text-center">
                <div className="proof">
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      console.log("hsjhjhj", file);
                      setFieldValue("file", file);
                    }}
                  />
                </div>

                <div className="form-outline">
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control"
                    id="textAreaExample1"
                    rows="4"
                    placeholder="Message"
                  ></Field>
                </div>
              </Modal.Body>
              <div className="modal-footer">
                <Button
                  className="btn-fill btn-info "
                  type="submit"
                  variant="link"
                  onClick={() => setShow(false)}
                >
                  Save
                </Button>
                <Button
                  className="btn-dark btn-fill"
                  type="button"
                  variant="link"
                  onClick={() => setShow(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </Modal>

          {/* upload modal end */}
        </div>
      )}
    </Formik>
  );
};

export default ProofUploader;
