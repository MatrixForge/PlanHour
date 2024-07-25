// FolderOptionsModal.jsx
import Link from 'next/link';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FolderOptionsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Folder Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Link href='/subEvent'><Button variant="success" className="mb-2 block" >Add Subfolder</Button></Link> 
        <Link href='/addEvent'><Button variant="primary" className="mb-2 block" >Add Plan</Button></Link> 
        <Link href=''><Button variant="secondary" className="mb-2 block" >To Do</Button></Link> 
        <Link href=''><Button variant="success" className="mb-2 block" >Budget</Button></Link> 
        <Link href=''><Button variant="warning" className="mb-2 block" >Guest List</Button></Link> 
      </Modal.Body>
    </Modal>
  );
};

export default FolderOptionsModal;
