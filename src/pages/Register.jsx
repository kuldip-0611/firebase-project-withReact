import React, { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {useFirebase} from '../context/Firebase';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const firebase = useFirebase();
    console.log(firebase);
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.signUp(email,password)
        toast.success('sign up successful');

    }
    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/')

        }
    },[firebase,navigate])
    
  return (
    <div className="container">
        <h1 className="text-secondary text-center mt-5">Registartion</h1>
      <Form className="mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
         Create Account
        </Button>
      </Form>
    </div>
  );
};

export default Register;
