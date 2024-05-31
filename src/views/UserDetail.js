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

const UserDetail = () => {
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
    console.log(response.data, "GetInfoUser");
    setData(response.data.data);
  };
  console.log(data, "userData ==>");
  useEffect(() => {
    gettingInfo();
  }, []);
  return (
    <>
      {/* <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Row>
                <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                      <Card.Title as="h4">User Detail</Card.Title>
                      {/* <p className="card-category">
                 Here is a subtitle for this table
               </p> */}
      {/* </Card.Header> */}
      {/* <Card.Body className="p-4 tableStyle"> */}
      {/* <div className="userDetail">
                        <div
                          className="carddetail"
                          style={{ width: "100%", gap: "80px" }}
                        >
                          <img src={data?.cover_image} alt="Card Image" />
                          <div className="userCard" style={{ width: "100%" }}>
                            <ul>
                              <li>
                                <span>Name:</span>
                                {data?.first_name}
                              </li>

                              <li>
                                <span>Phone:</span> {data?.phone}
                              </li>
                              <li>
                                <span>Address:</span> {data?.city},
                                {data?.country}
                              </li>
                              <li>
                                <span>Age:</span> {data?.age}
                              </li>
                              <li>
                                <span>Gender:</span> {data?.gender}
                              </li>
                              <li>
                                <span>Status:</span> {data?.status}
                              </li>
                            </ul>
                            <div className="rating">
                              <h3>Review Rating</h3>
                              <div className="ratingStart">
                                <BsFillStarFill className="colorStar" />
                                <BsFillStarFill className="colorStar" />
                                <BsFillStarFill className="colorStar" />
                                <BsFillStarFill className="colorStar" />
                                <BsFillStarFill />
                              </div>
                              <h4>4.8</h4>
                            </div>
                          </div>
                        </div>
                        {/* <div className="userPayment"> */}
      {/* <Link to="/admin/transactionList">
                         <h3>Spent Money</h3>
                         <h2>$ {data?.total_earning}</h2>
                       </Link>
                     </div> */}
      {/* </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container> */}
      {/* </> */}
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12 col-xl-12">
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
                        data?.cover_image
                          ? data?.cover_image
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
                      <Rating
                          name="size-large"
                          defaultValue={data.rating}
                          // value={2} // Set the value based on your data
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
                  <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                    <h4 className="lead fw-bold my-0 ">About</h4>
                      </div>
                   
                   
                  </div>
                  <div
                      className="px-4 pt-1"
                      style={{ backgroundColor: "#f8f9fa;" }}
                    >
                     
                      <div
                        className=""
                        style={{ width: "100%", listStyle: "none" }}
                      >
                        <ul className="p-0 " style={{ listStyle: "none" }}>
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
                          </li>{" "}
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
                              <strong> Address :</strong>
                            </span>
                            <span>
                              {data?.city} , {data?.country}
                            </span>
                          </li>
                        </ul>
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

export default UserDetail;
