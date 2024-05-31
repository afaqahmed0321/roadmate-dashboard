import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema, forgotSchema } from "./loginSchema";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import logo from "../../assets/img/Login.png";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const history = useHistory();
  const [forgot, setForgot] = useState("");
  const INITIAL_VALUES = {
    identifier: "",
    password: "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleForgot = () => {
    setForgot(true);
  };

  const forgotAPI = async (values) => {
    console.log(values, "fgffhfhfhf");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/auth/forgotPassword/otp`,
        values
      );
      setIsLoading(false);

      console.log(response, "asdadada");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);

      console.log(error);
    }
  };

  const loginAPI = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/auth/login`,

        values
      );
      console.log("dddd", response);
      response.status == 201 &&
        localStorage.setItem(
          "authorization",
          `Bearer ${response.data.access_token}`
        );
      localStorage.setItem("roles", response.data.roles);
      history.push("/admin/dashboard");
      toast.success("Login Successfully");
      setIsLoading(false);
      console.log("hello world", response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     history.push("/admin/dashboard");
  //   },2000)
  // })

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={forgot ? forgotSchema : loginSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log(values, "fghkjslkdaldk");

        console.log("ghj", values);
        setIsLoading(true);
        if (forgot) {
          forgotAPI(values);
        } else {
          loginAPI(values);
        }

        resetForm();
      }}
    >
      <Form>
        <div
          className="vh-100 container"
          style={{
            background: "rgb(2,0,36)",
            maxWidth: "100%",
            background:
              "linear-gradient(313deg, rgba(2,0,36,1) 3%, rgba(9,9,121,0.891281512605042) 35%, rgba(53,74,78,0.9052871148459384)  100%)",
          }}
        >
          <div className="container py-5 h-100 ">
            <div className="row d-flex justify-content-center align-items-center h-100 ">
              <div className="col col-xl-10 ">
                <div className="card shadow" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="https://images.unsplash.com/photo-1543499459-d1460946bdc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                        alt="login form"
                        className="img-fluid h-100"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <div className="d-flex align-items-center  mb-3 x-2 pb-1">
                          {/* <i
                              class="fas fa-cubes fa-3x me-4"
                              style={{ color: " #ff6219" }}
                            /> */}
                       
                        
                            <img
                              src={require("assets/img/mainLogo.jpeg")}
                              alt="..."
                              style={{ maxHeight: "80px", maxWidth:"80px"}}
                            />
                      
                           
                          
                          <div className="h3 fw-bold m-0 ml-2">
                            ServeOnRoute
                          </div>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                          <Field
                            name="identifier"
                            type="text"
                            className="form-control form-control-lg"
                            id="username"
                            placeholder="Enter your Email"
                          />
                          <div className="error">
                            <ErrorMessage name="identifier" />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                          <Field
                            name="password"
                            type="password"
                            className="form-control form-control-lg"
                            id="password"
                            placeholder="Enter your password"
                          />
                          <div className="error">
                            <ErrorMessage name="password" />
                          </div>
                        </div>

                        <div className="pt-1 mb-4">
                          <Button
                            disabled={isLoading}
                            className="btn btn-primary btn-lg bg-primary text-white fw-lg btn-block"
                            type="submit"
                          >
                            {isLoading
                              ? "Loading..."
                              : forgot
                              ? "Submit"
                              : "Login"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
