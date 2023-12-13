import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isUserLoading } from './components/selectors/isUserLoading';
import { userEmailState } from './components/selectors/userEmail';
import { userState } from './components/store/user';
import { useRecoilValue } from 'recoil';


function Navbar() {
  
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    
    // console.log(userEmail,'uer haiuyah')

   
    if(userEmail){
        console.log(userEmail,'uer haiuyah')
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
              setUser({
                isLoading: false,
                userEmail: null
              })
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