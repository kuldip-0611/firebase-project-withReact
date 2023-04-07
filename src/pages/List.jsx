import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase";
import { toast } from "react-hot-toast";

const List = () => {
  
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price,setPrice]= useState('');
  const [pic,setPic] = useState("");


  const firebase = useFirebase();
  console.log(firebase);

  const handleSubmit = async (e) => {
   e.preventDefault();
   await firebase.addListing(name,isbn,price,pic);
  };
  return (
    <div>
      <Form className="mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter book name"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Isbn Number</Form.Label>
          <Form.Control
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            type="text"
            placeholder="isbn number"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="Enter price"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            
            onChange={(e) => setPic(e.target.files[0])}
            type="file"
            placeholder="upload photo"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
        List Your Book
        </Button>
      </Form>
    </div>
  );
};

export default List;
