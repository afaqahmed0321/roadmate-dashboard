import React, { useState, useEffect } from "react";
import { CgBlock, CgUnblock } from "react-icons/cg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { TbUserPlus, TbUserOff, TbUsers, TbTiltShift } from "react-icons/tb";
import ChartistGraph from "react-chartist";

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

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TransactionList = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateOwnFormat, setStartDateOwnFormat] = useState();
  const [endDateOwnFormat, setEndDateOwnFormat] = useState();
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [key, setKey] = useState("home");
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

  const Token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmhvb3RobmF0aCIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMDAwMDEyMzQiLCJfaWQiOiI2NDEyZjAwOGY0MzJhZTJmODIwZDRmNmMiLCJhdmF0YXIiOiJcdGh0dHBzOi8vc3RhdGljLnZlY3RlZXp5LmNvbS9zeXN0ZW0vcmVzb3VyY2VzL3ByZXZp4oCmLzQ4Ny85MTcvb3JpZ2luYWwvbWFuLWF2YXRhci1pY29uLWZyZWUtdmVjdG9yLmpwZyIsInNvY2tldElkIjoiIiwicm9sZSI6WyJzdXBlcl9hZG1pbiJdLCJpYXQiOjE2ODM3MTIxNDIsImV4cCI6MTY4Mzc5ODU0Mn0.8tBVCg23aINzOOhVrWuTWyFxQKyUCwZ1wb1FSntNbBM";
  const getTransaction = async () => {
    const headers = {
      authorization: localStorage.getItem("authorization"),
    };

    var response;
    if (startDateOwnFormat && endDateOwnFormat) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/payment/platform-user-transactions?startDate=${startDateOwnFormat}&endDate=${endDateOwnFormat}`,
        {
          headers,
        }
      );
    } else {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/payment/platform-user-transactions`,
        {
          headers,
        }
      );
    }

    setUserData(response.data);

    console.log("Transaction Response", response.data);
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
        {role:["user"]},
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
  //   // getAllUser();
  //   getTransaction();
  // }, [pagination.page]);
  // useEffect(() => {

  //   getTransaction();
  // }, []);

  useEffect(() => {
    getTransaction();
    console.log("Date Formats", startDateOwnFormat, endDateOwnFormat);
  }, [startDateOwnFormat, endDateOwnFormat]);

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
          is_block: blockUser?.is_block ? "" : "true",
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

  const dateToSpecificFormat = (date) => {
    let day = date.getDate();

    let month = date.getMonth() + 1;

    let year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

    console.log(`${year}-${month}-${day}`, "Dates");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  const [userData2, setUserData2] = useState([
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
  ]);
  const [searchuserData2, setSearchUserData2] = useState([
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
    {
      first_name: "abbas",
      last_name: "fsfs",
      email: "zaidi#gmail.com",
      driver: "Noshad",
      phone: "032374555",
      payment: "125",
      country: "pakistan",
      city: "lahore",
    },
  ]);
  const columns = [
    {
      name: "Sender",
      // selector: (row) => row.first_name + " " + row.last_name,
      selector: (row) => row?.receiverDetails?.first_name || "undefine",
      sortable: true,
    },
    {
      name: "Reciver",
      selector: (row) => row?.senderDetails?.first_name || "undefine",
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount + " " + "(Cad)",
      sortable: true,
    },
    // {
    //   name: "Satus",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
    {
      name: "Date",
      selector: (row) => {
        const date = new Date(row.created)
        return dateToSpecificFormat(date);
      },
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description
    //   ,
    //   sortable: true,
    // },
  ];

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
      let filterObj = searchuserData2.filter(
        (el) =>
          el?.senderDetails?.first_name?.toLowerCase().includes(value) ||
          el?.receiverDetails?.first_name?.toLowerCase().includes(value) ||
          el.amount?.toLowerCase().includes(value) ||
          el.created?.toLowerCase().includes(value)
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
                    <Card.Title as="h4">Transactions List</Card.Title>
                    {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0 tableStyle">
                    <div
                      className="searchbox"
                      style={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "flex-end",
                        gap: "30px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          textAlign: "center",
                          gap: "20px",
                        }}
                      >
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);

                            setStartDateOwnFormat(dateToSpecificFormat(date));
                          }}
                          dateFormat="MM/dd/yyyy"
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                        />
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => {
                            setEndDate(date);
                            setEndDateOwnFormat(dateToSpecificFormat(date));
                          }}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          onChange={handleChange}
                          placeholder="search..."
                        />
                      </div>
                    </div>
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

export default TransactionList;
