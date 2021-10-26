import React, { useEffect, useState, useRef } from 'react'
import NavBar from './NavBar'
import { FormControl, TextField, Button } from '@mui/material';
import { Col, Container, Row, Table } from 'react-bootstrap'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Redirect } from 'react-router';

export default function Home() {
    const [data, setData] = useState({});
    const [flag,setFlag] = useState(0)
    const [userdata, setuserdata] = useState([]);
    const titleRef = useRef(null);
    const prioRef = useRef(null);

    const addtask = () => {
        if (prioRef.current.value <= 5) {
            console.log(titleRef.current.value)
            const user = JSON.parse(localStorage.getItem('user'))
            const task = { title: titleRef.current.value, priority: prioRef.current.value, flag: false }
            user.TaskList = [...user.TaskList, task]
            user.TaskList.sort((a,b)=>b.priority-a.priority)
            setuserdata([...user.TaskList])
            localStorage.setItem('user', JSON.stringify(user));
            titleRef.current.value=""
            prioRef.current.value = ""
       
        }
        else {
            alert("plz enter btw 1 to 5")
        }
    }

    const deletes = (index) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            user.TaskList.splice(index, 1)
            setData({ ...user });
            localStorage.setItem('user', JSON.stringify(user));
        }
        setFlag(flag+1)
    }

    const update = (index) => {
        let temp = JSON.parse(localStorage.getItem('user'));
        temp.TaskList[index].flag = !temp.TaskList[index].flag
        localStorage.setItem('user', JSON.stringify(temp))
        setFlag(flag+1)
    }

    useEffect(() => {
        if (localStorage.getItem('user') != undefined) {
            const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.TaskList
            setuserdata([...userd])
        }
    }, [flag])

    return (
        <>{localStorage.getItem('user') != undefined ?
            <div>
                <NavBar />
                <h1 className="my-3" style={{ color: "navy", textAlign: "center" }}> Add Task </h1>
                <Container>
                    <Row>
                        <Col xs={5}>
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <TextField
                                    inputRef={titleRef}
                                    type="text"
                                    label="Title" />
                            </FormControl>
                        </Col>

                        <Col xs={5}>
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <TextField
                                    inputRef={prioRef}
                                    type="text"
                                    label="Priority" />
                            </FormControl>
                        </Col>
                        <Col xs={2}>
                            <Button onClick={addtask} sx={{  px: "8vh", py: "2vh" }} variant="contained">Add</Button>
                        </Col>

                    </Row>
                    
                </Container>


                <h2 className="text-center my-5">List of Tasks</h2>
                <Container >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: "50%" }}>Task</th>
                                <th style={{ width: "30%" }}>Priority</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        {userdata.length?
                        <tbody>
                            {userdata.map((task, index) => {
                                return <tr key={index}>
                                    {task.flag ?
                                        <td style={{ textDecoration: "line-through" }}>{task.title}</td>
                                        :
                                        <td>{task.title}</td>}
                                    <td style={{ color: "blue" }}>{task.priority}</td>
                                    <td><CheckOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }} onClick={() => update(index)} className="border p-1 mx-1" color="primary" /><CloseOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }}
                                        onClick={() => deletes(index)} className="border p-1 mx-1 text-danger" /></td>

                                </tr>

                            })}
                        </tbody>
                    :
                    <tbody>
                        <tr>
                            <td colSpan={3}><h2 className="text-center mt-5">Curruntly No schedule Task</h2></td>
                        </tr>
                    </tbody>
                    
                        }
                    </Table>
                </Container>
            </div>
            :
            <Redirect to="/" />
        }
        </>
    )
}