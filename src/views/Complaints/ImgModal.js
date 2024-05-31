import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import { GrFormClose } from "react-icons/gr";

const ImgModal = ({ imgSrc, showImgModal, handleModalClose }) => {
  const getAllComplaintsData = async () => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.get("", { headers });
    } catch (error) {}
  };

  return (
    <div>
      {/* image zoom modal sta  */}
      <Modal
        className="modal-large modal-primary "
        show={showImgModal}
        size="lg"
        // close={handleModalClose}
        // show={show}
      >
        <button className="close-button" onClick={handleModalClose}>
          <span>
            <GrFormClose />
          </span>
        </button>

        <img
          src={imgSrc}
          alt="prof img"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Modal>
      {/* imag zoom modal end  */}
    </div>
  );
};

export default ImgModal;
