import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from '../context/Firbase';

const Listing = () => {
    const firbase = useFirebase();

    const [Name, setName] = useState('');
    const [isbnNumber, setisbnNumber] = useState('');
    const [price, setprice] = useState('');
    const [coverPic, setcoverPic] = useState('');

    const hendleSubmit = async(e)=>{
        e.preventDefault();
        const result = await firbase.hendleCreateNewListing(Name, isbnNumber, price, coverPic)
        
    }

  return (
    <div className="container mt-5">
        <Form onSubmit={hendleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control type="text" onChange={e => setName(e.target.value)} value={Name} placeholder="Book Name"  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control type="text" onChange={e => setisbnNumber(e.target.value)} value={isbnNumber} placeholder="ISBN Number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control type="Number" onChange={e => setprice(e.target.value)} value={price} placeholder="Enter Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control type="file" onChange={e => setcoverPic(e.target.files[0])}  placeholder="Cover Pic" />


        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default Listing