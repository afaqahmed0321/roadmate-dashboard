import React, { useState, useEffect } from "react";
import { CgBlock, CgUnblock } from "react-icons/cg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import { TbUserPlus, TbUserOff, TbUsers, TbTiltShift } from "react-icons/tb";
import { CgEyeAlt } from "react-icons/cg";
import ChartistGraph from "react-chartist";
// import { BiBlock } from "react-icons/bi";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Button,
} from "react-bootstrap";
import { BiBlock } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";
import PaginationCom from "components/Pagination/Pagination";
import Loader from "components/Loader/Loader";

import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { formatProfessionalDate } from "utils";

const TripList = (props) => {
  const location = useLocation();
  const [status, setStatus] = useState(location?.state?.status);
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [key, setKey] = useState("home");
  const [blockUser, setBlockUser] = useState({
    user_id: "",
    is_block: "",
  });
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      name: "Driver Name",
      selector: (row) => row?.rider_id?.first_name,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row?.customer_id?.first_name,
      sortable: true,
    },
    // {
    //   name: "Origin",
    //   selector: (row) => row.from_location
    //   ,
    //   sortable: true,
    // },
    // {
    //   name: "Destination",
    //   selector: (row) => row.to_location
    //   ,
    //   sortable: true,
    // },
    {
      name: "Fare",
      selector: (row) => row.fare,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => formatProfessionalDate(row.time),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "",
      cell: (row, index) => (
    
        <Link
          to={`/admin/TripDetail/${row?._id}`}
          className={`btn btn-fill btn-sm custom-btn btn-primary ml-3`}
        >
          <CgEyeAlt fontSize={20} />
        </Link>
      ),
    },
  ];
  const [userData2, setUserData2] = useState([
    {
      name: "farhan",
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
  ]);
  const [searchuserData2, setSearchUserData2] = useState([
    {
      name: "farhan",
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abbas",
      last_name: "fsf",
      email: "zaidi#gmail.com",
      phone: "4234",
      country: "sfsf",
      city: "lahore",
    },
    {
      name: "faraz",
      first_name: "abrbas",
      last_name: "sdfs",
      email: "zaidi#gmail.com",
      phone: "454",
      country: "pakistan",
      city: "lahore",
    },
  ]);
  //   const userData2 = [
  //     {
  //       name: "farhan",
  //       first_name: "abbas",
  //       last_name: "fsfs",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abbas",
  //       last_name: "fsf",
  //       email: "zaidi#gmail.com",
  //       phone: "4234",
  //       country: "sfsf",
  //       city: "lahore",
  //     },
  //     {
  //       name: "faraz",
  //       first_name: "abrbas",
  //       last_name: "sdfs",
  //       email: "zaidi#gmail.com",
  //       phone: "454",
  //       country: "pakistan",
  //       city: "lahore",
  //     },
  //   ];
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

  const getTrip = async () => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      var response;

      if (status) {
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/parcel?page=1&limit=2345&populate=customer_id%20rider_id&status=${status}`,
          {
            headers,
          }
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/parcel?page=1&limit=500`,
          {
            headers,
          }
        );
      }

      console.log("Datazzzz", response?.data?.docs);
      setUserData(response?.data?.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUser = async () => {
    try {
      setLoading(false);
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      console.log("first", localStorage.getItem("authorization"));
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/all?page=${pagination.page}&skip=1&limit=5`,
        {role: ["user"]},
        {
          headers,
        }
      );
      setLoading(false);
      setUserData(response?.data.docs);
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
  // useEffect(() => {
  //   getAllUser();
  // }, [pagination.page]);

  console.log("Status", status);
  useEffect(() => {
    getTrip();
  }, [status]);

  const handleBlockModal = (_id, is_block) => {
    // console.log(is_block, _id, "gsfsgdfsgdfdg");
    setBlockUser({ user_id: _id, is_block: is_block });

    setShowModal(true);
    // console.log(blockUser, "hsdgshds");
  };
  const blockConfirm = async () => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/block`,
        {
          user_id: blockUser?.user_id,
          is_block: blockUser?.is_block ? "false" : "true",
        },
        { headers }
      );
      console.log("dddd", response);
      // setShowModal(false);

      if (response.status == 200) {
        setShowModal(false);
        getAllUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  const handleChange = (e) => {
    if (e.target.value.length) {
      let value = e.target.value.toLowerCase();
      let filterObj = searchuserData2.filter(
        (el) =>
          el.name?.toLowerCase().includes(value) ||
          el.phone?.toLowerCase().includes(value) ||
          el.country?.toLowerCase().includes(value)
      );
      setUserData2(filterObj);
    } else {
      setUserData2(searchuserData2);
    }
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Row>
              <Col md="12">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title
                      // as="h4"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ marginBottom: "16px" }}>
                        <h4>Trips List </h4>
                      </div>
                      <div
                        style={{
                          width: "60%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <select
                          id="colours"
                          onChange={(e) => {
                            console.log("Value of dropdown ", e.target.value);
                            setStatus(e.target.value);
                          }}
                          style={{
                            width: "40%",
                            height: "40px",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            borderWidth: "1px",
                          }}
                        >
                          <option value="red">Status</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="in_progress">Inprogress</option>
                        </select>
                        <div className="searchbox" style={{ width: "60%" }}>
                          <input
                            type="text"
                            onChange={handleChange}
                            placeholder="search..."
                          />
                        </div>
                      </div>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0 tableStyle">
                    <DataTable
                      columns={columns}
                      data={userData}
                      pagination={true}
                      customStyles={customStyles}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TripList;
