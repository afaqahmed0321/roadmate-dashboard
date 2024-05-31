import React, { useState, useEffect } from "react";
import { VscEye } from "react-icons/vsc";
import { Badge, Card, Table, Container, Row, Col, Form } from "react-bootstrap";
import ImgModal from "./ImgModal";
import axios from "axios";
import { CgBlock, CgUnblock, CgEyeAlt } from "react-icons/cg";
import { BiBlock } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ModalCom from "./ModalCom";
import Loader from "components/Loader/Loader";
import DataTable from "react-data-table-component";
import PaginationCom from "components/Pagination/Pagination";
import { MenuItem, Select } from "@mui/material";

function Backdrop({ show, onClick }) {
  return (
    show && (
      <div
        className="backdrop"
        onClick={onClick}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          zIndex: 999, // Ensure it's displayed above other content
        }}
      />
    )
  );
}

const Complains = () => {
  const [showModal, setShowModal] = useState("");
  const [comlaintsId, setComlaintsId] = useState("");
  const [comlaintsInfo, setComlaintsInfo] = useState({});
  const [driver, setDriver] = useState(true);
  const [complaintsData, setComplaintsData] = useState();
  const [searchcomplaintsData, setSearchComplaintsData] = useState();
  const [loading, setLoading] = useState(false);
  const [refundModel, setRefundModel] = useState(false);
  const [refundPrice, setRefundPrice] = useState("");
  const [refundDescription, setRefundDescription] = useState("");
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
  const handleViewModal = (data) => {
    setComlaintsId(data._id);
    setComlaintsInfo(data);
    setShowModal(true);
  };

  const handleStatus = async (item) => {
    if (item.status !== "pending") {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/v1/complaints/${item.id}`,

        { status: item.status },
        { headers }
      );
      if(response){
        getComplaintsData();
      }
      console.log(response.data, "636645sgssxv");
    }
  };

  const getComplaintsData = async () => {
    try {
      setLoading(true);
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/complaints?page=${pagination.page}&populate=parcel%20complainant&limit=2324`,
        { headers }
      );

      setLoading(false);
      setComplaintsData(response?.data.docs);
      setSearchComplaintsData(response?.data.docs);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
      });
      console.log("ddddd", response?.data?.docs);
    } catch (error) {
      console.log(error);
    }
  };
  // const handlePageChange = (pageNumber) => {
  //   setPagination({ ...pagination, page: pageNumber });
  // };

  // const sendRefund = async () => {
  //   console.log(
  //     "paymentIntent1",
  //     comlaintsInfo?.parcel?.payment_intent,
  //     refundDescription,
  //     refundPrice
  //   );
  //   const headers = {
  //     authorization: localStorage.getItem("authorization"),
  //   };
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_BASE_URL}/v1/payment/refund`,
  //     {
  //       paymentIntentId: comlaintsInfo?.parcel?.payment_intent,
  //       amount: refundPrice,
  //       refundApplicationFee: true,
  //       reverseTransfer: true,
  //     },
  //     { headers }
  //   );

  //   console.log("paymentIntent", response);
  // };
  useEffect(() => {
    getComplaintsData();
  }, [pagination.page]);
  const handleChange = (e) => {
    if (e.target.value.length) {
      let value = e.target.value.toLowerCase();
      let filterObj = searchcomplaintsData.filter(
        (el) =>
          el.first_name?.toLowerCase().includes(value) ||
          el.last_name?.toLowerCase().includes(value) ||
          el.role?.toLowerCase().includes(value)
      );
      setComplaintsData(filterObj);
    } else {
      setComplaintsData(searchcomplaintsData);
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

  const columns = [
    {
      name: "Name",
      selector: (row) => {
        const complainant = row?.complainant;

        if (complainant) {
          const name =
            complainant.name ||
            complainant.first_name + " " + complainant.last_name;
          const url = `/admin/userDetail/${row.complainant._id ? row.complainant._id : row.complainant}`; // Replace with your desired URL
          const linkStyle = {
            textDecoration: "underline", // Apply underline style
          };

          return (
            <Link to={url} style={linkStyle}>
              {name}
            </Link>
          );
        } else {
          return null; // Handle the case when complainAgainst is undefined or null
        }
      },
      sortable: true,
    },
    {
      name: "AGAINST",
      selector: (row) => {
        const complainAgainst = row?.complain_against;

        if (complainAgainst) {
          const name =
            complainAgainst.name ||
            complainAgainst.first_name + " " + complainAgainst.last_name;
          const url = `/admin/driverDetail/${row.complain_against}`; // Replace with your desired URL
          const linkStyle = {
            textDecoration: "underline", // Apply underline style
          };

          return (
            <Link to={url} style={linkStyle}>
              {name}
            </Link>
          );
        } else {
          return null; // Handle the case when complainAgainst is undefined or null
        }
      },
      sortable: true,
    },
    // {
    //   name: "TYPE",
    //   selector: (row) => row?.complainant?.role[0],
    //   sortable: true,
    // },
    {
      name: "STATUS",
      cell: (row, index) => (
        <div size="middle">
          {/* <select
            as="select"
            custom
            defaultValue={row.status}
            className="custom-style"
            onChange={(e) =>
              handleStatus({
                id: row._id,
                status: e.target.value,
              })
            }
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select> */}
          <Select
            // as="select"
            custom
            // defaultValue={row.status}
            value= {row.status}
            className="custom-style"
            onChange={(e) =>
              handleStatus({
                id: row._id,
                status: e.target.value,
              })
            }
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            
          </Select>
        </div>
      ),
    },
    {
      name: "",
      cell: (row, index) => (
        <div size="middle">
          <span
            className={`btn btn-fill btn-sm custom-btn btn-primary`}
            // style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}
            onClick={() => handleViewModal(row)}
          >
            <CgEyeAlt fontSize={20} />
          </span>
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
                <Card.Title as="h4">Complaints</Card.Title>
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
                  data={complaintsData}
                  pagination={true}
                  customStyles={customStyles}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Backdrop show={showModal} onClick={() => setShowModal(false)} />

        <ModalCom
          showModal={showModal}
          setShowModal={setShowModal}
          comlaintsId={comlaintsId}
          setRefundPrice={setRefundPrice}
          comlaintsInfo={comlaintsInfo}
          setRefundDescription = {setRefundDescription}
          refundDescription={refundDescription}
          refundPrice={refundPrice}
        />
        {/* {refundModel && (
          <Modal
            className="modal-md-large modal-sm-small modal-primary "
            show={showModal}
            onHide={() => setRefundModel(false)}
            size="sm"
            // aria-hidden="true"
          >
            <Modal.Header
              className="view-title"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "300px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(30, 101, 233)",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  className={`${
                    driver ? " active-slected shadow " : "not-slected"
                  }  text-upper`}
                >
                  REFUND
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="">
              <>
                <div className="inner-proof row">
                  <div className="col-md-12">
                    <span className="description">Enter Amount To Refund</span>
                    <input
                      type="number"
                      onChange={(e) => {
                        setRefundPrice(e.target.value);
                      }}
                      placeholder="amount in $"
                      style={{ width: "100%" }}
                    />

                    <textarea
                      // type="number"
                      // cols="23"
                      rows="3"
                      onChange={(e) => {
                        setRefundDescription(e.target.value);
                      }}
                      placeholder="Description"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  </div>
                </div>
              </>
            </Modal.Body>
            <div className="modal-footer">
              <Button
                className="btn-dark btn-fill"
                type="button"
                variant="primary"
                onClick={() => {
                  sendRefund();
                  setRefundModel(false);
                }}
              >
                SEND
              </Button>
              <Button
                className="btn-dark btn-fill"
                type="button"
                variant="link"
                onClick={() => {
                  setRefundModel(false);
                }}
              >
                Close
              </Button>
            </div>
          </Modal>
        )} */}
      </Container>
    </div>
  );
};

export default Complains;
