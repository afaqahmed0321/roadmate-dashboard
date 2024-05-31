import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComponent = (props) => {
  const { show, handleClose, size, modalTitle } = props;
  return (
    <Modal className="modal-primary" onClose={handleClose} size={size} show={show} onHide={handleClose}>
      <Modal.Header className="justify-content-center admin-header">
        <Modal.Title ><div className="modal-title ">{modalTitle}</div></Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      
    </Modal>
  );
};

export default ModalComponent;