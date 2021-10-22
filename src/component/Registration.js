import React, { useState, useRef } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {Card,TextField, FormControl, CardContent, Button, Alert,FormControlLabel,Checkbox } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForUserName = RegExp(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

export default function Registration() {
  const [state, setState] = useState();
  const [data, setdata] = useState('');
  const [flag1, setflag1] = useState(0);
  const [errors, seterror] = useState(' ');

  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        let error = regForName.test(value)? " ": "First Name should be character";
        seterror(error);
        break;
      case "lname":
        let error2 = regForName.test(value)
          ? " "
          : "Last Name should be character";
        seterror(error2);
        
        break;
      case "username":
        let error3 = regForUserName.test(value) ? " " : "Invalid Username";
        seterror(error3);
        
        break;
      case "email":
        let error4 = regForEmail.test(value) ? " " : "Enter Correct Email-Id";
        seterror(error4);
        
        break;
      case "password":
        let error5 = regForpassword.test(value)
          ? " "
          : "Password Should Contain atleast 8 character with Upper, lower and special character";
        seterror(error5);
        setdata(value)
        break;
      case "cpassword":
        let error6 = value === data ? "" : "Password does not match";
        seterror(error6);
        break;
    }
  };
  const validate=()=>{
    if (!errors.length > 0) {
        setflag1(1);  
      let formData = {
        fName: document.getElementById("fname").value,
        lName: document.getElementById("lname").value,
        uName: document.getElementById("username").value,
        Email: document.getElementById("email").value,
        Pass: document.getElementById("password").value,
        TaskList: []
      };
      console.log(formData)
      setState(formData)
      axios.post(`http://localhost:3001/user`,formData)
      alert("form Validate");
    }
     else {
      seterror("Enter all details");
    }
  };
  return (
    <div>
        {!flag1?
      <Card sx={{ width: "80ch", mx: "auto", mb: "1rem", mt: "5rem",border:1 }}>
        <CardContent>
          <h1 style={{ color: "navy", textAlign: "center" ,fontFamily:'monospace' ,fontWeight:'bold' }} className="my-4">
            Registration Page
          </h1>

          {errors.length > 1 && <Alert severity="warning">{errors}</Alert>}
          <Row className="my-3">
            <Col>
              <FormControl sx={{ my: 1, width: "35ch" }}>
                <TextField
                  onChange={handler}
                  name="fname"
                  id="fname"
                  label="First Name"
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, width: "35ch" }}>
                <TextField
                  onChange={handler}
                  name="lname"
                  id="lname"
                  label="Last Name"
                />
              </FormControl>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormControl sx={{ my: 1, width: "35ch" }}>
                <TextField
                  onChange={handler}
                  name="username"
                  id="username"
                  label="Username"
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, width: "35ch" }}>
                <TextField
                  onChange={handler}
                  name="email"
                  id="email"
                  label="Email"
                />
              </FormControl>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <FormControl sx={{ my: 1, width: "35ch" }}>
                <TextField
                  onChange={handler}
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                />
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, width: "35ch" }}>
                <TextField
                  onChange={handler}
                  name="cpassword"
                  id="cpassword"
                  type="password"
                  label="Confirm password"
                />
              </FormControl>
            </Col>
          </Row>
          <div className="text-center">   
              <Button
                onClick={validate}
                sx={{ px: "15vh", py: "2vh" }}
                variant="contained">
                Register
              </Button>
            <br />

            <FormControl className="mt-2">
              <span>
                Already Registered?
                <Link className="mt-5 pt-4" to="/">
                  Click here to Login
                </Link>
              </span>
            </FormControl>
          </div>
        </CardContent>
      </Card>
      :
      <Redirect to="/"></Redirect> }
    </div>
  );
}
