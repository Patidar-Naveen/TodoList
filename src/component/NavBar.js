import React, { Component } from 'react';
import {Box,AppBar, Toolbar, Typography, Button } from "@mui/material";
import {Link} from 'react-router-dom'
import axios from 'axios';
class NavBar extends Component {
    user = JSON.parse(localStorage.getItem('user'))
    logout(){
        let data=JSON.parse(localStorage.getItem('user'))
        axios.put(`http://localhost:3001/user/${data.id}`,data)
        localStorage.removeItem('user');
    }
    
    render() {
        return (
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                <Toolbar>       
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hey {this.user.fName } {this.user.lName}
                </Typography>

                <Link to="/"><Button onClick={()=>this.logout()} variant="contained" color="error">Logout</Button></Link>
              </Toolbar>
            </AppBar>
          </Box>
            </div>
        );
    }
}
export default NavBar
