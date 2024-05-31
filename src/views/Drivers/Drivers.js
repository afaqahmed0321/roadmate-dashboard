import React, { useState, useEffect } from "react";
import { CgUnblock, CgEyeAlt } from "react-icons/cg";

import { BiBlock } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdVerified, MdOutlineVerified } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
import { TbUserPlus, TbUserOff, TbUsers, TbTiltShift } from "react-icons/tb";
import Tabs from "react-bootstrap/Tabs";
import ChartistGraph from "react-chartist";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
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
import axios from "axios";
import ProofUploader from "./ProofUploader";
import PaginationCom from "components/Pagination/Pagination";
import Loader from "components/Loader/Loader";
const Drivers = () => {
  const [userCount, setUserCount] = useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [driverData, setDriverData] = useState([]);
  const [searchdriverData, setSearchdriverData] = useState([]);
  const [user_id, setUser_id] = useState();
  const [key, setKey] = useState("home");
  const [driver, setDriver] = useState([]);
  const [blockUserId, setBlockUser_id] = useState({
    user_id: "",
    is_block: "",
  });
  const [btnDisable, setbtnDisable] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: null,
    pagingCounter: null,
    totalDocs: null,
    totalPages: null,
  });
  const [loading, setLoading] = useState(false);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  };
  const handleClose = () => setShow(false);

  const handleBlockModal = (_id, isBlock) => {
    setShowModal(true);
    setBlockUser_id({ user_id: _id, is_block: isBlock });
    console.log(user_id, "hdhsfsjfsffjhfjshfhjf");
  };
  const handleVerified = async (values) => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };

      const formData = {
        user: values,
        isVerified: true,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/driver-verify`,
        formData,
        { headers }
      );
      if(response.data){
        getDriversData()
      }
    
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("htrgfds", blockUserId);
  const handleShow = (user_id) => {
    setShow(true);
    setUser_id(user_id);
  };
  const getUserCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/users/counts?role=rider`
      );
      console.log(response.data, "GetUserCount");
      setUserCount(response.data);
      // setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopDriver = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/parcel/top-ten?queryFor=rider`
      );
      console.log("Top Driver ", response.data);

      setDriver(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDriversData = async () => {
    setLoading(true);
    const headers = {
      authorization: localStorage.getItem("authorization"),
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/v1/users/all?page=${pagination.page}&skip=1&limit=200`,
      {role: ["rider"]},
      { headers }
    );
    setLoading(false);
    setDriverData(response?.data.docs);
    setSearchdriverData(response?.data.docs);
    setPagination({
      page: response.data.page,
      limit: response.data.limit,
      totalDocs: response.data.totalDocs,
      totalPages: response.data.totalPages,
    });
    // console.log(response.data, "5656767");
  };

  useEffect(() => {
    getTopDriver();
    getUserCount();
  }, []);
  useEffect(() => {
    getDriversData();
  }, [pagination.page]);
  console.log("sdgsfdsdf", pagination);
  const blockConfirm = async () => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };

      // const values = {
      //   user_id: blockUserId?.user_id,
      //   is_block: isUserBlock?.is_block,
      // };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/block`,
        {
          user_id: blockUserId?.user_id,
          is_block: blockUserId?.is_block ? "" : "true",
        },
        { headers }
      );
      if (response.status === 200) {
        setShowModal(false);
        getDriversData();
      }

      // setbtnDisable(values.is_block);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  const [userData2, setUserData2] = useState([
    {
      _id: "123",
      name: "farhan",
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "pakistan",
      city: "lahore",
    },
    {
      _id: "456",
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
  ]);

  const customStyles = {
    rows: {
      style: {
        // minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#6f42c1",
      },
    },
    cells: {
      style: {},
    },
  };
  const handleChange = (e) => {
    if (e.target.value.length) {
      let value = e.target.value.toLowerCase();
      let filterObj = searchdriverData.filter(
        (el) =>
          el.first_name?.toLowerCase().includes(value) ||
          el.last_name?.toLowerCase().includes(value) ||
          el.phone?.toLowerCase().includes(value) ||
          el.city?.toLowerCase().includes(value)
      );
      setDriverData(filterObj);
    } else {
      setDriverData(searchdriverData);
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "city",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "",
      cell: (row, index) => (
        <div size="middle">
          <button
            title={`${row.isVerified == true ? "This user is verified" : "press to verify this user"}`}
            className={`btn btn-fill btn-sm custom-btn mr-2 ${
              row.isVerified == true ? "btn-success" : " btn-danger "
            }`}
            onClick={() => handleVerified(row?._id)}
          >
            {row.isVerified == true ? (
              <MdVerified fontSize={18} />
            ) : (
              <MdOutlineVerified fontSize={18} />
            )}
          </button>
          <button
            title={`${row.is_block == true ? "press to un-block this user" : "press to block this user"}`}
            className={`btn btn-fill btn-sm custom-btn ${
              row.is_block == true ? "btn-danger" : "btn-success "
            }`}
            onClick={() => handleBlockModal(row?._id, row?.is_block)}
          >
            {row.is_block == true ? (
              <CgUnblock fontSize={20} />
            ) : (
              <BiBlock fontSize={18} />
            )}
          </button>

          <Link
            to={`/admin/driverDetail/${row?._id}`}
            className={`btn btn-fill btn-sm custom-btn btn-primary ml-2`}
          >
            <CgEyeAlt fontSize={20} />
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="home" title="Driver Listing">
                <Row>
                  <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                      <Card.Header>
                        <Card.Title as="h4">Drivers List</Card.Title>
                      </Card.Header>
                      <Card.Body className="table-full-width table-responsive px-0 tableStyle">
                        <div className="searchbox">
                          <input
                            type="text"
                            onChange={handleChange}
                            placeholder="search..."
                          />
                        </div>
                        <DataTable
                          columns={columns}
                          data={driverData}
                          pagination={true}
                          customStyles={customStyles}
                        />

                        {/* Mini Modal */}
                        <Modal
                          className="modal-mini modal-primary"
                          show={showModal}
                          onHide={() => setShowModal(false)}
                        >
                          <Modal.Header className="justify-content-center">
                            <div className="modal-profile">
                              {/* <i className="nc-icon nc-bulb-63"></i> */}
                              <RiUserUnfollowLine fontSize={29} />
                            </div>
                          </Modal.Header>
                          <Modal.Body className="text-center">
                            {blockUserId?.is_block ? (
                              <p>
                                Are you sure you want to unblock this Driver
                              </p>
                            ) : (
                              <p>Are you sure you want to block this Driver</p>
                            )}
                          </Modal.Body>
                          <div className="modal-footer">
                            <Button
                              className="btn-simple"
                              type="button"
                              variant="link"
                              onClick={blockConfirm}
                            >
                              {blockUserId?.is_block ? "Unblock" : " Block"}
                            </Button>
                            <Button
                              className="btn-simple"
                              type="button"
                              variant="link"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>
                        {/* End Modal */}
                        <ProofUploader
                          show={show}
                          setShow={setShow}
                          user_id={user_id}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
               
              </Tab>
              <Tab eventKey="profile" title="Driver Statistics">
                <Row>
                  <Col lg="4" sm="6">
                    <Card
                      className="card-stats shadow p-3 mb-5 bg-white rounded"
                      style={{
                        background:
                          "linear-gradient(to right, #6f42c1, #a342c1)",
                      }}
                    >
                      <Card.Body>
                        <Row>
                          <Col xs="5">
                            <div className="icon-big text-center icon-warning">
                              {/* <i className="nc-icon nc-chart text-warning"></i> */}
                              {/* <TbUsers className="text-primary" /> */}
                              <TbUsers className="text-white" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category text-white">
                                All Drivers
                              </p>
                              <Card.Title as="h4">
                                {userCount.total}
                              </Card.Title>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="4" sm="6">
                    <Card
                      className="card-stats shadow p-3 mb-5 bg-white rounded"
                      style={{
                        background:
                          "linear-gradient(to right, #FF292D, #fe909d)",
                      }}
                    >
                      <Card.Body>
                        <Row>
                          <Col xs="5">
                            <div className="icon-big text-center icon-warning">
                              {/* <i className="nc-icon nc-chart text-warning"></i> */}
                              {/* <TbUserOff className="text-danger" /> */}
                              <TbUserOff className="text-white" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category text-white">
                                Block Drivers
                              </p>
                              <Card.Title as="h4">
                                {userCount?.blocked}
                              </Card.Title>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="4" sm="6">
                    <Card
                      className="card-stats shadow p-3 mb-5 bg-white rounded"
                      style={{
                        background:
                          "linear-gradient(to right, #007bff, #01dbdf)",
                      }}
                    >
                      <Card.Body>
                        <Row>
                          <Col xs="5">
                            <div className="icon-big text-center icon-warning">
                              {/* <i className="nc-icon nc-chart text-warning"></i> */}
                              {/* <TbUserPlus className="text-success" /> */}
                              <TbUserPlus className="text-white" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category text-white">
                                Active Drivers
                              </p>
                              <Card.Title as="h4">
                                {userCount?.active}
                              </Card.Title>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                      <Card.Header>
                        <Card.Title as="h4">Top 10 Drivers</Card.Title>
                      </Card.Header>
                      <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                          <thead className="position-relative">
                            <tr>
                              <th className="border-0">ID</th>
                              <th className="border-0">Image</th>
                              <th className="border-0">Name</th>
                              <th className="border-0">Earn Money</th>
                              <th className="border-0">Country</th>
                              <th className="border-0">city</th>
                              <th className="border-0">View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {driver.map((val, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    <TbUsers className="text-primary" />
                                  </td>
                                  <td>{val?.rider[0]?.first_name}</td>
                                  <td>{val?.totalPayAmount}</td>
                                  <td>{val?.rider[0]?.country}</td>
                                  <td>{val?.rider[0]?.city}</td>
                                  <td>
                                    <Link
                                      to={`/admin/driverDetail/${val?.rider[0]?._id}`}
                                      className={`btn btn-fill btn-sm custom-btn btn-secondary`}
                                      style={{
                                        backgroundColor: "#6f42c1",
                                        borderColor: "#6f42c1",
                                      }}
                                    >
                                      <CgEyeAlt fontSize={20} />
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                  {/* <Col md="6">
                    <Card>
                      <Card.Header>
                        <Card.Title as="h4">2022 Driver list</Card.Title>
                        <p className="card-category">
                          All block and active Drivers
                        </p>
                      </Card.Header>
                      <Card.Body>
                        <div className="ct-chart" id="chartActivity">
                          <ChartistGraph
                            data={{
                              labels: [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "Mai",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                              ],
                              series: [
                                [
                                  542, 443, 320, 780, 553, 453, 326, 434, 568,
                                  610, 756, 895,
                                ],
                                [
                                  412, 243, 280, 580, 453, 353, 300, 364, 368,
                                  410, 636, 695,
                                ],
                              ],
                            }}
                            type="Bar"
                            options={{
                              seriesBarDistance: 10,
                              axisX: {
                                showGrid: false,
                              },
                              height: "245px",
                            }}
                            responsiveOptions={[
                              [
                                "screen and (max-width: 640px)",
                                {
                                  seriesBarDistance: 5,
                                  axisX: {
                                    labelInterpolationFnc: function (value) {
                                      return value[0];
                                    },
                                  },
                                },
                              ],
                            ]}
                          />
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <div className="legend">
                          <i className="fas fa-circle text-info"></i>
                          Active Drivers{" "}
                          <i className="fas fa-circle text-danger"></i>
                          Block Drivers
                        </div>
                        <hr></hr>
                        <div className="stats">
                          <i className="fas fa-check"></i>
                          Data information certified
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card>
                      <Card.Header>
                        <Card.Title as="h4">Users Behavior</Card.Title>
                        <p className="card-category">24 Hours performance</p>
                      </Card.Header>
                      <Card.Body>
                        <div className="ct-chart" id="chartHours">
                          <ChartistGraph
                            data={{
                              labels: [
                                "9:00AM",
                                "12:00AM",
                                "3:00PM",
                                "6:00PM",
                                "9:00PM",
                                "12:00PM",
                                "3:00AM",
                                "6:00AM",
                              ],
                              series: [
                                [287, 385, 490, 492, 554, 586, 698, 695],
                                [67, 152, 143, 240, 287, 335, 435, 437],
                                [23, 113, 67, 108, 190, 239, 307, 308],
                              ],
                            }}
                            type="Line"
                            options={{
                              low: 0,
                              high: 800,
                              showArea: false,
                              height: "245px",
                              axisX: {
                                showGrid: false,
                              },
                              lineSmooth: true,
                              showLine: true,
                              showPoint: true,
                              fullWidth: true,
                              chartPadding: {
                                right: 50,
                              },
                            }}
                            responsiveOptions={[
                              [
                                "screen and (max-width: 640px)",
                                {
                                  axisX: {
                                    labelInterpolationFnc: function (value) {
                                      return value[0];
                                    },
                                  },
                                },
                              ],
                            ]}
                          />
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <div className="legend">
                          <i className="fas fa-circle text-info"></i>
                          Open <i className="fas fa-circle text-danger"></i>
                          Click <i className="fas fa-circle text-warning"></i>
                          Click Second Time
                        </div>
                        <hr></hr>
                        <div className="stats">
                          <i className="fas fa-history"></i>
                          Updated 3 minutes ago
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col> */}
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Drivers;
