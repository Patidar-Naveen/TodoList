import Login from './Login';
import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import TodoList from './TodoList'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button } from '@mui/material';
import { Col, Container, FormLabel, Row } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Update } from '@mui/icons-material';

export default function Home() {
    const [data, setData]= useState({});
    const [userdata, setuserdata]= useState([]);
    const addtask=()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        let title=document.getElementById('title').value
        let prio = document.getElementsByName('priority');
        let prio_value;
        for(let i = 0; i < prio.length; i++){
            if(prio[i].checked){
                prio_value = prio[i].value;
             }
        }
        let task={title:title, priority:prio_value}
        user.TaskList=[...user.TaskList,task]
        localStorage.setItem('user',JSON.stringify(user));
        document.getElementById('title').value=''
        for(let i = 0; i < prio.length; i++){    //doubt
            prio[i].checked=false;
        }
        const user1 = JSON.parse(localStorage.getItem('user'))
        const userd= user1.TaskList
        setuserdata([...userd])
    }

    const deletes = (index) => {
        const user = JSON.parse(localStorage.getItem('user'))
        var bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            user.TaskList.splice(index, 1)
            setData({...user});
            localStorage.setItem('user', JSON.stringify(user));
        }
        const user1 = JSON.parse(localStorage.getItem('user'))
        const userd= user1.TaskList
        setuserdata([...userd])
    }

    const update = (index) =>{

        console.log(userdata)
        userdata[index].title= `<strike>${userdata[index].title}</strike>`;
        setuserdata([...userdata])
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        const userd= user.TaskList
        setuserdata([...userd])
        
    },[])
   
    return (
        <div>
            <NavBar/>
            <h1 className="my-3" style={{ color: "navy", textAlign: "center" }}> Add Task </h1>
            <Container>
                <Row>
                    <Col>
                        <FormControl sx={{m:1, width:'60ch'}}>
                            <TextField
                                id="title"
                                type="text"
                                label="Title"/>
                        </FormControl>
                    </Col>

                    <Col>
                    <FormControl component="fieldset" sx={{m:1, width:'75ch'}}>
                        <FormLabel component="legend">Priority</FormLabel>
                            <RadioGroup id="priority" row aria-label="priority" name="row-radio-buttons-group">
                                <FormControlLabel name="priority" id="highest" value="Highest" control={<Radio />} label="Highest" />
                                <FormControlLabel name="priority" id="high" value="High" control={<Radio />} label="High" />
                                <FormControlLabel name="priority" id="average" value="Average" control={<Radio />} label="Average" />
                                <FormControlLabel name="priority" id="low" value="Low" control={<Radio />} label="Low" />
                                <FormControlLabel name="priority" id="lowest" value="Lowest" control={<Radio />} label="Lowest" />
                            </RadioGroup>
                    </FormControl>
                    </Col>
                </Row>
                <Button onClick={addtask} sx={{ml:"92vh", px: "8vh", py: "1vh" }} variant="contained">Add</Button>

            </Container>
            

            <h2 className="text-center mt-3">List of Tasks</h2>
            <Container >
            <table className="table table-striped">
                <thead className="thead-dark">
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Action</th>
                </thead>

                    <tbody>
                        {userdata.map((task, index) => {
                            return <tr key={index}>
                                <td style={{ width: "80%" }} id="line" >{ReactHtmlParser(task.title)}</td>
                                <td style={{ color: "blue" }}>{task.priority}</td>
                                <td><CheckOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }} onClick={()=> update(index)} className="border p-1 mx-1" color="primary"  /><CloseOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }}
                                    onClick={() => deletes(index)} className="border p-1 mx-1 text-danger" /></td>
                                
                            </tr>

                        })}
                    </tbody>

                </table>
                </Container>
        </div>
    )
}