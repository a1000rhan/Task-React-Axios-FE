import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import React, { useState } from "react";

export default function CreateRoomModal({ isOpen, closeModal, createRoom }) {
  const [room, setRoom] = useState({
    title: "",
    image: "",
    description: "",
    messages: [],
  });

  const handleChange = (event) => {
    // to do : setRoom state based in input
    setRoom({ ...room, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createRoom(room);

    // to do : stop page from refreshing
    // call a function from app to create a room (pass room as a parameter)

    closeModal(); // this is to close the modal that is shown
  };
  return (
    <Modal centered show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>Title</InputGroup.Text>
            <Form.Control type="text" name="title" onChange={handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Image</InputGroup.Text>
            <Form.Control type="text" name="image" onChange={handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Description</InputGroup.Text>
            <Form.Control
              type="text"
              name="description"
              onChange={handleChange}
            />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Create room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
