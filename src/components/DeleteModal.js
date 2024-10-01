import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        variant="primary"
        onClick={handleShow}
        type="button"
        className="btn btn-md btn-outline-danger"
        data-bs-target="#exampleModal"
      >
        Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Silmek istediğinize emin misiniz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Değişiklikleri kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
