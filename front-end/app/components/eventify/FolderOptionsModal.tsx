// FolderOptionsModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FolderOptionsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Folder Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Button variant="success" className="mb-2" block>Add Subfolder</Button>
        <Button variant="primary" className="mb-2" block>Add Plan</Button>
        <Button variant="secondary" className="mb-2" block>To Do</Button>
        <Button variant="success" className="mb-2" block>Budget</Button>
        <Button variant="warning" className="mb-2" block>Guest List</Button>
      </Modal.Body>
    </Modal>
  );
};

export default FolderOptionsModal;
