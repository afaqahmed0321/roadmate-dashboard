import axios from "axios";
import React, { useState, useEffect } from "react";
import { CgBlock, CgUnblock, CgEyeAlt } from "react-icons/cg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { TbUserPlus, TbUserOff, TbUsers, TbTiltShift } from "react-icons/tb";
import { BiSolidDownload } from "react-icons/bi";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IoMdNotifications } from "react-icons/io";
import ChartistGraph from "react-chartist";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Tooltip } from "reactstrap";
import { apiHeader } from "utils";
// import { BiBlock } from "react-icons/bi";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { BiBlock } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";
import { useFormik } from "formik";
import PaginationCom from "components/Pagination/Pagination";
import Loader from "components/Loader/Loader";
import { ModalComponent } from "components";
import { blobCsv } from "utils";
import { toast } from "react-toastify";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userCount, setUserCount] = useState({});
  const [searchuserData, setSearchUserData] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [key, setKey] = useState("home");
  const [customer, setCustomer] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState({
    tooltip1: false,
    tooltip2: false,
  });
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [blockUser, setBlockUser] = useState({
    user_id: "",
    is_block: "",
  });
  const [loading, setLoading] = useState(false);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  };
  const [pagination, setPagination] = useState({
    page: 1,
    limit: null,
    pagingCounter: null,
    totalDocs: null,
    totalPages: null,
  });

  const [NotificationModalShow, setNotificationModalShow] = useState(false);

  const getAllUser = async () => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/all?page=${pagination.page}&skip=1&limit=500&role=user`,
        {role: ["user"]},
        { headers }
      );
      setLoading(false);
      setUserData(response?.data.docs);
      setSearchUserData(response?.data.docs);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
      });
      console.log(response.data.docs, "sdgshdgshd");
    } catch (error) {
      console.log(error);
    }
  };

  const getTopUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/parcel/top-ten?queryFor=customer`
      );
      console.log(response.data, "GetTopUser");
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getUserCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/users/counts?role=user`
      );
      console.log(response.data, "GetUserCount");
      setUserCount(response.data);
      // setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTopUser();
    getUserCount();
  }, []);
  useEffect(() => {
    getAllUser();
  }, []);

  const handleBlockModal = (_id, is_block) => {
    // console.log(is_block, _id, "gsfsgdfsgdfdg");
    setBlockUser({ user_id: _id, is_block: is_block });

    setShowModal(true);
    // console.log(blockUser, "hsdgshds");
  };

  const blockConfirm = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/block`,
        {
          user_id: blockUser?.user_id,
          is_block: blockUser?.is_block ? "" : "true",
        },
        { headers: apiHeader }
      );

      console.log("response", response)
      // setShowModal(false);

      if (response.status == 200) {
        setShowModal(false);
        getAllUser();
      }
    } catch (error) {
      console.log(error);
    }
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
  const handleChange = (e) => {
    if (e.target.value.length) {
      let value = e.target.value.toLowerCase();
      setSearchQuery(value);

      let filterObj = searchuserData.filter(
        (el) =>
          el.first_name?.toLowerCase().includes(value) ||
          el.last_name?.toLowerCase().includes(value) ||
          el.phone?.toLowerCase().includes(value) ||
          el.city?.toLowerCase().includes(value)
      );
      setUserData(filterObj);
    } else {
      setUserData(searchuserData);
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
            title={`${row.is_block == true ? "press to un-block this user" : "press to block this user"}`}
            className={`btn btn-fill btn-sm custom-btn ${
              row.is_block == true ? "btn-danger" : "btn-success"
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
            to={`/admin/userDetail/${row?._id}`}
            className={`btn btn-fill btn-sm custom-btn btn-primary ml-3`}
          >
            <CgEyeAlt fontSize={20} />
          </Link>
        </div>
      ),
    },
  ];

  const handleCsvDownload = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/users/usersReport?search=${searchQuery}`,
        { headers: apiHeader }
      );
      blobCsv({ file: response.data, title: "userReport.csv" });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTooltip = (tooltipId) => {
    setTooltipOpen((prevState) => ({
      ...prevState,
      [tooltipId]: !prevState[tooltipId],
    }));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/v1/notifications/AdminNotifications`,
          {
            title: values.title,
            body: values.text,
            type: "notification",
            user: selectedRows,
          },
          { headers: apiHeader }
        );
        if (response.data.successCount > 0) {
          toast.success("Notification Successfully Sent");
          setSelectedRows([]);
          setNotificationModalShow(false);
        }
      } catch (error) {
        toast.error("Server Error try again later");
        setSelectedRows([]);
      }
    },
  });

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
              <Tab eventKey="home" title="User Listing">
                <Row>
                  <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                      <Card.Header>
                        <Card.Title as="h4">Users List</Card.Title>
                      </Card.Header>
                      <Card.Body className="table-full-width table-responsive px-0 tableStyle">
                        <div className="searchbox">
                          <input
                            type="text"
                            className="mx-3"
                            onChange={handleChange}
                            placeholder="search..."
                          />

                          <Button
                            className="btn btn-fill btn-sm custom-btn mx-3"
                            id="pdf"
                            style={{ width: "50px", height: "40px" }}
                            onClick={handleCsvDownload}
                          >
                            <FileDownloadIcon
                              style={{ width: "70%", height: "70%" }}
                            />
                          </Button>
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen.tooltip1}
                            target="pdf"
                            toggle={() => toggleTooltip("tooltip1")}
                          >
                            Export CSV
                          </Tooltip>

                          <Button
                            className="btn btn-fill btn-sm custom-btn"
                            id="notification"
                            style={{ width: "50px", height: "40px" }}
                            onClick={() => setNotificationModalShow(true)}
                            disabled={selectedRows.length == 0}
                          >
                            <IoMdNotifications
                              style={{ width: "70%", height: "70%" }}
                            />
                          </Button>
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen.tooltip2}
                            target="notification"
                            toggle={() => toggleTooltip("tooltip2")}
                          >
                            Send Notifications
                          </Tooltip>
                        </div>
                        <DataTable
                          columns={columns}
                          data={userData}
                          pagination={true}
                          customStyles={customStyles}
                          onSelectedRowsChange={(state) => {
                            setSelectedRows(
                              state.selectedRows.map(({ _id }) => _id)
                            );
                          }}
                          selectableRows
                          selectableRowsHighlight
                          selectableRowsVisibleOnly
                        />
                        {/* 
                        <Table className="table-hover table-striped">
                          <thead className="position-relative">
                            <tr>
                              <th className="border-0">ID</th>
                              <th className="border-0">Name</th>
                              <th className="border-0">Email</th>
                              <th className="border-0">Contact No</th>
                              <th className="border-0">Country</th>
                              <th className="border-0">city</th>
                              <th className="border-0">Action</th>
                            </tr>
                          </thead>
                          {loading ? (
                            <div style={style}>
                              <Loader height="45" width="45" color="#1DC7EA" />
                            </div>
                          ) : (
                            <tbody>
                              {userData.map((item, index) => {
                                return (
                                  <tr>
                                    {console.log("iten", blockUser)}
                                    <td>{index + 1}</td>
                                    <td>
                                      {item.name
                                        ? item.name
                                        : item.first_name +
                                          " " +
                                          item.last_name}
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.country}</td>
                                    <td>{item.city}</td>
                                    <td>
                                      <button
                                        title={`${
                                          item.is_block == true
                                            ? "Unblock"
                                            : "Block"
                                        }`}
                                        className={`btn btn-fill btn-sm custom-btn ${
                                          item.is_block == true
                                            ? "btn-secondary"
                                            : "btn-danger "
                                        }`}
                                        onClick={() =>
                                          handleBlockModal(
                                            item?._id,
                                            item?.is_block
                                          )
                                        }
                                      >
                                        {item.is_block == true ? (
                                          <CgUnblock fontSize={20} />
                                        ) : (
                                          <BiBlock fontSize={18} />
                                        )}
                                      </button>

                                      <button
                                        className={`btn btn-fill btn-sm custom-btn btn-primary ml-3`}
                                      >
                                        <CgUnblock fontSize={20} />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          )}
                        </Table> */}
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
                            {blockUser?.is_block == true ? (
                              <p>Are you sure you want to unblock this User</p>
                            ) : (
                              <p>Are you sure you want to block this User</p>
                            )}
                          </Modal.Body>
                          <div className="modal-footer">
                            <Button
                              className="btn-simple"
                              type="button"
                              variant="link"
                              onClick={blockConfirm}
                            >
                              {blockUser?.is_block == true
                                ? "Unblock"
                                : "Block"}
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
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="profile" title="User Statistics">
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
                              <TbUsers className="text-white" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category text-white">
                                All Users
                              </p>
                              <Card.Title as="h4">
                                {userCount?.total}
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
                                Block Users
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
                                Active Users
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
                        <Card.Title as="h4">Top 10 User</Card.Title>
                      </Card.Header>
                      <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                          <thead className="position-relative">
                            <tr>
                              <th className="border-0">ID</th>
                              <th className="border-0">Image</th>
                              <th className="border-0">Name</th>
                              <th className="border-0">Spent Money</th>
                              <th className="border-0">Country</th>
                              <th className="border-0">city</th>
                              <th className="border-0">View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customer.map((val, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    <TbUsers className="text-primary" />
                                  </td>
                                  <td>{val?.customer[0]?.first_name}</td>
                                  <td>{val?.totalFare}</td>
                                  <td>{val?.customer[0]?.country}</td>
                                  <td>{val?.customer[0]?.city}</td>
                                  <td>
                                    <Link
                                      to={`/admin/userDetail/${val?.customer[0]?._id}`}
                                      className={`btn btn-fill btn-sm custom-btn btn-secondary`}
                                      style={{
                                        backgroundColor: "#6f42c1",
                                        borderColor: "#6f42c1",
                                      }}
                                    >
                                      <CgEyeAlt fontSize={20} />
                                      {/* <TbTiltShift fontSize={18} /> */}
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
                        <Card.Title as="h4">2022 User list</Card.Title>
                        <p className="card-category">
                          All block and active users
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
                          Active Users{" "}
                          <i className="fas fa-circle text-danger"></i>
                          Block User
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
      <ModalComponent
        show={NotificationModalShow}
        handleClose={() => setNotificationModalShow(false)}
        modalTitle={"Notification"}
      >
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Please Enter Your Title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="text">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              name="text"
              placeholder="Please Enter Your Text"
              value={formik.values.text}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <div className="modal-footer align-items-baseline">
            <Button
              disabled={!formik.values.text || !formik.values.title}
              className="btn-fill  my-2"
              variant="primary"
              type="submit"
            >
              Send
            </Button>
            <Button
              className="btn-fill my-2"
              variant="danger"
              onClick={() => setNotificationModalShow(false)}
            >
              Close
            </Button>
          </div>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default Users;
