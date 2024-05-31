import React, { useState, useEffect } from "react";
import fordemo from "../../assets/img/for-demo.jpg";
import routingApp from "../../assets/img/routingApp.jpg";
import { Button, Modal } from "react-bootstrap";
import ImgModal from "./ImgModal";
import axios from "axios";
import { apiHeader } from "utils";
import { toast } from "react-toastify";
import { TextField, TextareaAutosize } from "@mui/material";
const ModalCom = ({
  showModal,
  setShowModal,
  comlaintsId,
  setRefundPrice,
  setRefundDescription,
  comlaintsInfo,
  refundDescription,
  refundPrice,
}) => {
  const [driver, setDriver] = useState(true);
  const [customer, setCustomer] = useState("");
  const [isRefund, setIsRefund] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const [showImgModal, setShowImgModal] = useState("");
  const [complainantImages, setComplainantImages] = useState([]);
  const [complainantDesc, setComplainantDesc] = useState("");
  const [proofsData, setProofsData] = useState({});
  const [defendantImages, setDefendantImages] = useState([]);
  const [defendantDesc, setDefendantDesc] = useState("");
  console.log("784rrr", comlaintsId);

  const handleModalClose = () => {
    setShowImgModal(false);
  };

  const handleImgClick = (e) => {
    setImgSrc(e.target.src);
    setShowImgModal(true);
  };
  const handleDriver = () => {
    setDriver(true);
    setCustomer(false);
    setIsRefund(false);
  };

  const handleCustomer = () => {
    setCustomer(true);
    setDriver(false);
    setIsRefund(false);
  };
  const getAllProofs = async () => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/complaints/${comlaintsId}`,
        { headers }
      );
      console.log("5ggsfffs8", response.data);
      setProofsData(response.data);
      if (response.data.complainant_proof) {
        setComplainantImages(response?.data?.complainant_proof.images);
        setComplainantDesc(response?.data?.complainant_proof.description);
      }
      if (response?.data?.defendant_proof) {
        setDefendantImages(response?.data?.defendant_proof.images);
        setDefendantDesc(response?.data?.defendant_proof.description);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProofs();
  }, [comlaintsId]);

  const PROOFS = [
    {
      img: fordemo,
    },
    {
      img: fordemo,
    },
    {
      img: routingApp,
    },
  ];
  const handleCloseButton = () => {
    setComplainantDesc("");
    setComplainantImages([]);
    setDefendantImages([]);
    setDefendantDesc("");
    setShowModal(false);
  };

  const onBlockCustomer = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/block`,
        {
          user_id: proofsData.complainant._id,
          is_block: "true",
        },
        { headers: apiHeader }
      );

      if (response.status == 200) {
        toast.success("Blocked the Customer");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  const onBlockDriver = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/block`,
        {
          user_id: proofsData.complain_against._id,
          is_block: "true",
        },
        { headers: apiHeader }
      );

      if (response.status == 200) {
        toast.success("Blocked the Driver");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  console.log("my complaints info", comlaintsInfo);

  const sendRefund = async () => {
    console.log(
      "paymentIntent1",
      comlaintsInfo?.parcel?.payment_intent,
      refundDescription,
      refundPrice
    );
    const headers = {
      authorization: localStorage.getItem("authorization"),
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/v1/payment/refund`,
      {
        paymentIntentId: comlaintsInfo?.parcel?.payment_intent,
        amount: parseInt(refundPrice),
        refundApplicationFee: true,
        reverseTransfer: true,
      },
      { headers }
    );

    console.log("paymentIntent", response);
  };

  return (
    <div>
      <Modal
        className="modal-md-large modal-sm-small modal-primary "
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        aria-hidden="true"
        // onExited={handleReset}
      >
        <Modal.Header
          className="view-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <RiUserUnfollowLine fontSize={29} /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "5px",
              width: "300px",
              backgroundColor: "white",
            }}
          >
            <div
              onClick={handleDriver}
              className={`${
                driver ? " active-slected  " : "not-slected"
              }  text-upper modalButton`}
            >
              DRIVER PROOFS
            </div>
            <div
              onClick={handleCustomer}
              className={`${
                customer ? "active-slected" : "not-slected"
              } modalButton`}
            >
              CUSTOMER PROOFS
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "348px",
            }}
          >
            <div
              onClick={() => {
                // setShowModal(false)
                setIsRefund(true);
                setCustomer(false);
                setDriver(false);
                // setRefundModel(true);
              }}
              style={{ backgroundColor: "rgb(30, 101, 233)", color: "white" }}
              className={"slected  shadow "}
            >
              REFUND
            </div>
            <div
              // onClick={handleCustomer}
              // className={`${customer ? "slected  shadow " : "not-slected"}`}
              className={"slected  shadow "}
              style={{ backgroundColor: "red", color: "white" }}
              onClick={onBlockCustomer}
            >
              Block Customer
            </div>
            <div
              // onClick={handleCustomer}
              // className={`${customer ? "slected  shadow " : "not-slected"}`}
              className={"slected  shadow "}
              style={{ backgroundColor: "red", color: "white" }}
              onClick={onBlockDriver}
            >
              Block Driver
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="">
          {driver ? (
            <>
              <div className="inner-proof row">
                { complainantImages.length > 0 &&
                 <>
                 <span className="description">Image Proof:</span>

                <div className="d-flex flex-wrap flex-row">
                  {complainantImages.map((item) => {
                    return (
                      <img
                        className="mr-2 mb-3"
                        src={item ? item : "no images avaible"}
                        // alt="no images attached"
                        onClick={handleImgClick}
                        Height="150px"
                        Width="150px"
                      />
                    );
                  })}
                </div>
                 </> 
                }
                

                <div className="col-md-12">
                  <span className="description">Description:</span>
                  <div className="inner-text">
                    <p>{complainantDesc ? complainantDesc : "no text added"}</p>
                  </div>
                </div>
              </div>
            </>
          ) : customer ? (
            <div className="inner-proof row">
              <div className="d-flex flex-wrap flex-row">
                {defendantImages.map((item, index) => {
                  return (
                    <img
                      key={index}
                      className="mr-2 mb-3"
                      src={item}
                      onClick={handleImgClick}
                      Height="150px"
                      Width="150px"
                    />
                  );
                })}
              </div>
              <div className="col-md-12">
                <span className="description">Description</span>
                <div className="inner-text">
                  <p>
                    {defendantDesc
                      ? defendantDesc
                      : "no description added by defendant"}
                  </p>
                </div>
              </div>
            </div>
          ) : isRefund ? (
            <div className="inner-proof row">
              <div className="col-md-12">
                {/* <span className="description">Enter Amount To Refund</span> */}
                <label htmlFor="refundAmount" className="description">
                  Enter Amount To Refund:
                </label>
                <TextField
                  type="number"
                  variant="outlined"
                  onChange={(e) => {
                    setRefundPrice(e.target.value);
                  }}
                  id="refundAmount"
                  label="Amount in $"
                  style={{ width: "100%", marginTop: "10px" }}
                />
                {/* <input
                      type="number"
                      onChange={(e) => {
                        setRefundPrice(e.target.value);
                      }}
                      placeholder="amount in $"
                      style={{ width: "100%" }}
                    /> */}
                <label htmlFor="refundDescription" className="description">
                  Description:
                </label>
                <TextareaAutosize
                  rows={3}
                  id="refundDescription"
                  onChange={(e) => {
                    setRefundDescription(e.target.value);
                  }}
                  placeholder="Description"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    minHeight: "50px",
                  }}
                />
                {/* <textarea
                  // type="number"
                  // cols="23"
                  rows="3"
                  onChange={(e) => {
                    setRefundDescription(e.target.value);
                  }}
                  placeholder="Description"
                  style={{ width: "100%", marginTop: "10px" }}
                /> */}
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <div className="modal-footer">
          {isRefund && (
            <Button
              className="btn-dark btn-fill"
              type="button"
              variant="primary"
              onClick={() => {
                sendRefund();
              }}
            >
              SEND
            </Button>
          )}
          <Button
            className="btn-dark btn-fill"
            type="button"
            variant="link"
            onClick={handleCloseButton}
          >
            Close
          </Button>
        </div>
      </Modal>
      <ImgModal
        imgSrc={imgSrc}
        handleModalClose={handleModalClose}
        showImgModal={showImgModal}
      />
    </div>
  );
};

export default ModalCom;
