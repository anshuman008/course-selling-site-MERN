import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import Navbar from './navBar';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from './components/store/user';

function Signin(){

     const setUser = useSetRecoilState(userState);
     const navigate = useNavigate();
   const  [username ,setUsername]  = React.useState(" ")
   const  [password ,setpassword]  = React.useState(" ")

   const handelchange  = (e) =>{
   setUsername(e.target.value);

}

const handelchange2 = (e)=>{
   setpassword(e.target.value);
}
 return <div>
  <div style={{paddingTop: 100, marginBottom: 20,  display: "flex", justifyContent: "center"}}>
     <Typography variant="h6" color="initial">Welcome to  coursera</Typography>
  </div>


 <div style={{ display: "flex", justifyContent: "center"}}>
 <Card variant={"outlined"}  style={{width: 400, padding:20}}>
    <label></label>
    <TextField 
    fullWidth = {true}
    id="username" 
    label="Email" 
    onChange={handelchange}
    variant="outlined"
     />
    <br/>
    <label></label>
    <TextField 
    fullWidth = {true}
    id="password" 
    label="password" 
    onChange={handelchange2}
    variant="outlined"
     />
    <br/>
    <br/>
   
   <Button variant="contained" onClick={()=> {loginUser()}}>LOGIN</Button>
  </Card>
  </div>
 </div>


function loginUser(){

          if(!username || !password)  alert('please fill allthe details')
   
          else{
            fetch('http://localhost:3000/admin/login',{
               method: "POST",
               headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  "username": username,
                  "password": password
               })
          }).then((responce)=>{responce.json().then((res)=>{
          console.log(res.token);
        
         if(!res.token) alert('Wrong password  or email');
         else{
            localStorage.clear();  
            localStorage.setItem("key", res.token);
            setUser({
               isLoading: false,
               userEmail: "donee"
            })
            navigate('/courses');
            // console.log(res,'helooo'
         }
          })})
          }
   }
}




export  default Signin;