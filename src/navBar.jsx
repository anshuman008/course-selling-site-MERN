import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function Navbar({username,setUser}) {
  
    if(username){
        return <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
        <div>
            <Typography variant="h5" color="initial" style={{ margin: "10px" }}>Coursera</Typography>
        </div>
       
        <div  style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            {/* <span>{username}</span> */}

            <Link to={"/courses"} style={{textDecoration:"none"}}>
            <Typography variant="body1" style={{marginRight:"20px",cursor:"pointer"}}color="primary">Courses</Typography>
            </Link>
          
            <Link to={"/add"} style={{textDecoration:"none"}}>
             <Typography variant="body1"style={{marginRight:"20px",cursor:"pointer"}} color="primary">Add Course</Typography>
             </Link>

            <Button variant="contained" style={{ margin: "10px" }} onClick={ ()=> {
              localStorage.setItem("key",null);
             setUser(null);
            }
            }>LOGOUT</Button>
        </div>

    </div>
    }

    return <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
        <div>
            <Typography variant="h5" color="initial" style={{ margin: "10px" }}>Coursera</Typography>
        </div>
        <div>
            <Button variant="contained" style={{ margin: "10px" }}><Link to={'/login'} style={{ textDecoration: "none", color: "white", }}>LOGIN</Link></Button>
            <Button variant="contained" style={{ margin: "10px" }}><Link to={'/signup'} style={{ textDecoration: "none", color: "white" }}>SIGNUP</Link></Button>
        </div>

    </div>
}

export default Navbar;