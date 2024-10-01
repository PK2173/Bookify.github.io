import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firbase";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const firebase = useFirebase();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    

    const hendleSubmit = async (e)=>{
      e.preventDefault();
      const result = await firebase.signupUserWithEmailAndPassword(Email,Password)
    }

    const navigate = useNavigate();
    
    useEffect(() => {
      if (firebase.isLoggedIn) {
        // navigate to home page
        navigate('/');
      }
    }, [firebase,navigate])
    
  return (
    <div className="container mt-5">
      <Form onSubmit={hendleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} value={Email} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} value={Password} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button variant="danger" onClick={firebase.singInWithGoogle}>Register with Google</Button>
    </div>
  );
};

export default Register;
