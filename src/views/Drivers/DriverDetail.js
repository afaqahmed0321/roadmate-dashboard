import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import IdCardImage from "../../assets/img/idcard.png";

const DriverDetail = () => {
  const [data, setData] = useState({});
  const params = useParams();
  console.log("ParamsId", params.id);

  const gettingInfo = async (item) => {
    const headers = {
      authorization: localStorage.getItem("authorization"),
    };
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/v1/users/user-by-id/${params.id}`,
      { headers }
    );
    console.log(response.data, "GetInfo");
    setData(response.data.data);
  };

  useEffect(() => {
    gettingInfo();
  }, []);

  console.log("hello",  data);

  return (
    <>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-12">
              <div className="card shadow-lg">
                <div
                  className="rounded-top text-white d-flex flex-row py-4 "
                  style={{
                    background:
                      "linear-gradient(to left bottom, #525051, #564953, #564358, #503f60, #443c6a, #3e3c76, #323d82, #1a3f8f, #1f41a0, #2943b0, #3743c0, #4842cf)",
                    height: "15rem",
                  }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column px-4"
                    style={{ width: "150px;" }}
                  >
                    <img
                      src={
                        data?.avatar
                          ? data?.avatar
                          : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                      }
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-5 mb-2"
                      style={{ width: "150px", zIndex: 1, minHeight: "10rem" }}
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: "9rem" }}>
                    <h5 className="text-capitalize">
                      {data?.first_name
                        ? data?.first_name + " " + data?.last_name
                        : "no name"}
                    </h5>
                    <p>
                      <div className="d-flex ">
                        {
                          data.rating >= 0 && <Rating
                          name="size-large"
                          // defaultValue={data.rating}
                          value={data?.rating} // Set the value based on your data
                          precision={0.5}
                          size="large"
                          readOnly
                          // icon={
                          //   <StarIcon
                          //     style={{ opacity: 0.55, color: "#ffcc12" }}
                          //   />
                          // }
                          // emptyIcon={
                          //   <StarIcon
                          //     style={{ opacity: 0.55, color: "#fff" }}
                          //   />
                          // }
                        />
                        }
                        
                       
                      </div>
                    </p>
                  </div>
                </div>
                <div
                  className="px-4 py-2 text-black"
                  style={{ backgroundColor: " #f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0 fw-bold ">
                        <b>Total Ride </b>
                      </p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">
                        {data?.total_earning ? data?.total_earning : 0}
                      </p>
                      <p className="small text-muted mb-0 fw-bold ">
                        <b>Total Earning</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <h4 className="lead fw-bold my-0">About</h4>
                    <div
                      className="px-4 pt-4"
                      style={{ backgroundColor: "#f8f9fa;" }}
                    >
                      <div
                        className=""
                        style={{ width: "100%", listStyle: "none" }}
                      >
                        <ul
                          className="p-0 d-flex justify-content-start"
                          style={{ listStyle: "none", gap: "6rem" }}
                        >
                          <div>
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className=" fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong> Name :</strong>
                              </span>
                              <span>
                                {" "}
                                {data?.first_name + " " + data?.last_name}
                              </span>
                            </li>
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className="fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong> Phone :</strong>
                              </span>{" "}
                              <span>{data?.phone}</span>
                            </li>
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className="fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong> Role :</strong>
                              </span>{" "}
                              <span> {data?.role}</span>
                            </li>

                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className=" fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong>date of birth :</strong>
                              </span>{" "}
                              <span> {data?.age}</span>
                            </li>
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className=" fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong> Gender :</strong>
                              </span>{" "}
                              <span> {data?.gender}</span>
                            </li>
                          </div>
                          <div>
                            {" "}
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className="fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong>Status:</strong>
                              </span>{" "}
                              <span
                                className={
                                  data?.status == "active"
                                    ? "fw-bold text-success fs-3"
                                    : " fw-bold text-danger fs-3"
                                }
                              >
                                {data?.status}
                              </span>
                            </li>
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className="fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong> vehicle No:</strong>
                              </span>{" "}
                              <span> {data?.vehicle_no}</span>
                            </li>
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className="fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong>license expiry:</strong>
                              </span>{" "}
                              <span> {data?.driving_license_expiry}</span>
                            </li>
                            <li className="text-muted text-capitalize d-flex justify-content-start py-2">
                              <span
                                className="fw-bold  text-dark fs-3"
                                style={{ width: "8rem" }}
                              >
                                <strong> Address :</strong>
                              </span>
                              <span>
                                {data?.city} , {data?.country}
                              </span>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Driving License Image</p>
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <div className="py-1 text-muted h5">
                        {" "}
                        Driving License Front Side Image
                      </div>
                      <img
                        src={
                          data?.driving_license && data.driving_license.length > 0
                            ? data?.driving_license[0]
                            : IdCardImage
                        }
                        alt="image 1"
                        style={{ height: "11rem", maxWidth: "18rem" }}
                        className="w-100 rounded-lg object-fit-cover bg-muted p-2 shadow-sm"
                      />
                    </div>
                    <div className="col mb-2">
                      <div className="py-1 text-muted h5">
                        {" "}
                        Driving License back Side Image
                      </div>
                      <img
                        src={
                          data?.driving_license && data.driving_license.length > 0  && data?.driving_license[1] 
                            ? data?.driving_license[1]
                            : IdCardImage
                        }
                        alt="image 1"
                        style={{ height: "11rem", maxWidth: "18rem" }}
                        className="w-100 rounded-lg object-fit-cover bg-muted p-2 shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-4">
                    <p className="lead fw-normal mb-0">National ID Image</p>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <div className="py-1 text-muted h5">
                        {" "}
                        National ID Card Front Side Image
                      </div>
                      <img
                        src={
                          data?.ID_file && data?.ID_file.length > 0
                            ? data?.ID_file[0]
                            : IdCardImage
                        }
                        alt="Front Side Image"
                        style={{ height: "11rem", maxWidth: "18rem" }}
                        className="w-100 rounded-lg object-fit-cover bg-muted p-2 shadow-sm"
                      />
                    </div>
                    <div className="col">
                      <div className="py-1 text-muted h5">
                        {" "}
                        National ID Card back Side Image
                      </div>
                      <img
                        src={
                          data?.ID_file && data?.ID_file.length > 0 && data?.ID_file[1] 
                            ? data?.ID_file[1]
                            : IdCardImage
                        }
                        alt="image 1"
                        style={{ height: "11rem", maxWidth: "18rem" }}
                        className="w-100 rounded-lg object-fit-cover bg-muted p-2 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DriverDetail;
