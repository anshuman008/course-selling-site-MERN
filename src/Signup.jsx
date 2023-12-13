import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from './components/store/user';

function Signup(){

   const setUser = useSetRecoilState(userState);
   const navigate= useNavigate();
   const [username,setUsername] =  React.useState(" ");
   const [password,setPassword]  = React.useState(" ");


  return <div>
  <div style={{paddingTop: 100, marginBottom: 20,  display: "flex", justifyContent: "center"}}>
     <Typography variant="h6" color="initial">Welcome to  coursera</Typography>
  </div>



 <div style={{ display: "flex", justifyContent: "center"}}>
 <Card variant={"outlined"}  style={{width: 400, padding:20}}>
    <label></label>
    <TextField 
    value={username}
    onChange={(e)=>{setUsername(e.target.value)}}
    fullWidth = {true}
    id="name" 
    label="Email" 
    variant="outlined"
     />
    <br/>
    <label></label>
    <TextField required={true}
    fullWidth = {true}
    value={password}
    onChange={(e)=>{setPassword(e.target.value)}}
    id="password" 
    label="Password" 
    variant="outlined"
     />
    <br/>
    <br/>
    <Button variant="contained" onClick={()=>{
         createUser();
    }}>Signup</Button>

  </Card>
  </div>
 </div>


function createUser(){

   if(!username || !password)  alert('please fill all the details')

   else{
     fetch('http://localhost:3000/admin/signup',{
        method: "POST",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({
           "username": username,
           "password": password
        })
   }).then((responce)=>{responce.json().then((res)=>{
   console.log(res.token);
 
  if(!res.token) alert('admin alreaady exist');
  else{
     localStorage.clear();  
     localStorage.setItem("key", res.token);
     
     setUser({
      isLoading: false,
      userEmail: 'donee'
     })
     navigate("/add")
  }
   })})
   }

}
}


export  default Signup;