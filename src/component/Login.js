import React, { useState, useEffect, useRef } from 'react'
import { Card, TextField, FormControl, CardContent, Button, Alert } from '@mui/material'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [data, setData] = useState([]);
    const [flag, setflag] = useState(0);
    const [error, seterror] = useState('')
    const emailRef = useRef(null);
    const passRef = useRef(null);
    useEffect(() => {
        axios.get('http://localhost:3001/user')
            .then(res => {
                setData(res.data)
            })
    }, [])

    const checkdata = () => {
        console.log(data)
        const email = emailRef.current.value;
        const pass = passRef.current.value;
        data.forEach(ele => {
            if (email === ele.Email && pass === ele.Pass) {
                setflag(1);
                localStorage.setItem('user', JSON.stringify(ele));
                console.log("successsss")
            }
        })
        if (!flag) {
            seterror("Email or Password does not match")
        }
    }
    return (
        <div>
            {!flag ?
                <Card sx={{ width: '55ch', mx: "auto", mt: '7rem', border: 2 }}>
                    <CardContent>
                        <h1 style={{ "color": 'navy', textAlign: 'center' }}>Login Page</h1>
                        {error.length > 1 && <Alert severity="warning">{error}</Alert>}

                        <FormControl sx={{ m: 1, my: 3, width: '50ch' }}>
                            <TextField sx={{ mb: 3 }}
                                inputRef={emailRef}
                                label="Email" />
                            <TextField sx={{ mb: 3 }}
                                className="mt-2"
                                inputRef={passRef}
                                type="password"
                                label="Password" />
                            <br />

                            <Button variant="contained" onClick={checkdata}>Login</Button><br />
                            <span className="mt-3 text-center">Not Registered? <Link className="mt-5 pt-4" to="/registration">Click here to Register</Link></span>
                        </FormControl>
                    </CardContent>
                </Card>
                :
                <Redirect to="/home"></Redirect>}
        </div>
    )
}
