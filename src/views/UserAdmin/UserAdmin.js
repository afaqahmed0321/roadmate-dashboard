import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiTrash } from "react-icons/hi";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import NewAdmin from "./NewAdmin";
import PaginationCom from "components/Pagination/Pagination";
import Loader from "components/Loader/Loader";
const UserAdmin = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchtableData, setSearchTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: null,
    pagingCounter: null,
    totalDocs: null,
    totalPages: null,
  });
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  };
  const handleNewAdmin = () => {
    // console.log("helllooooo");
    setShowModal(true);
  };
  const getAdminData = async () => {
    setLoading(true);
    const headers = {
      authorization: localStorage.getItem("authorization"),
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/v1/users/all?page=${pagination.page}&skip=0&limit=500`,
      { role: ["admin","super_admin"] },
      { headers }
    );
    setLoading(false);

    setTableData(response.data.docs);
    setSearchTableData(response.data.docs);
    setPagination({
      page: response.data.page,
      limit: response.data.limit,
      totalDocs: response.data.totalDocs,
      totalPages: response.data.totalPages,
    });
    console.log(response.data, "899887s67");
  };
  useEffect(() => {
    getAdminData();
  }, [pagination.page]);
  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };
  const handleDelete = async (id) => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/users/${id}`,
        { headers }
      );
      response.status == 200 && getAdminData();
    } catch (error) {}
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
  const handleChange = (e) => {
    if (e.target.value.length) {
      let value = e.target.value.toLowerCase();
      let filterObj = searchtableData.filter(
        (el) =>
          el.name?.toLowerCase().includes(value) ||
          el.email?.toLowerCase().includes(value) ||
          el.phone?.toLowerCase().includes(value) ||
          el.city?.toLowerCase().includes(value)
      );
      setTableData(filterObj);
    } else {
      setTableData(searchtableData);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "country",
      selector: (row) => row.country,
      sortable: true,
    },

    {
      name: "",
      cell: (row, index) => (
        <div size="middle">
          <button
            title="press this button to delete"
            className={`btn btn-fill btn-sm custom-btn btn-danger`}
            onClick={() => handleDelete(row._id)}
          >
            <HiTrash
              fontSize={20}
              // className="cursor"
            />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4" className="d-flex justify-content-between">
                  <span>Admin Users List </span>
                  <div className="d-flex justify-content-between">
                    <div className="searchbox">
                      <input
                        type="text"
                        onChange={handleChange}
                        placeholder="search..."
                      />
                    </div>
                    <Button
                      type="submit"
                      className="btn-sm btn-primary  btn-fill "
                      onClick={handleNewAdmin}
                      style={{ height: "39px" }}
                    >
                      Create New
                    </Button>
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0 tableStyle">
                <DataTable
                  columns={columns}
                  data={tableData}
                  pagination={true}
                  customStyles={customStyles}
                  // style={{head}}
                />
                {/* <Table className="table-hover table-striped">
                <thead className="position-relative">
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Role</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Country</th>
                    <th className="border-0">Action</th>
                  </tr>
                </thead>
                {loading ? (
                  <div style={style}>
                    <Loader height="45" width="45" color="#1DC7EA" />
                  </div>
                ) : (
                  <tbody>
                    {tableData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.role}</td>
                          <td>{item.email}</td>
                          <td>{item.country}</td>
                          <td>
                            <HiTrash
                              className="text-danger h5"
                              onClick={() => handleDelete(item._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* {loading ? (
        ""
      ) : (
        <div className="d-flex justify-content-center">
          <PaginationCom
            activePage={pagination.page}
            itemsCountPerPage={pagination.limit}
            totalItemsCount={pagination.totalDocs}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      )} */}

      <NewAdmin
        showModal={showModal}
        setShowModal={setShowModal}
        getAdminData={getAdminData}
        // getFormData={getFormData}
      />
    </div>
  );
};

export default UserAdmin;
