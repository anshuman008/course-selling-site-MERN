import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';

function Signup({setUser}){

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
    setUser('donee')
     navigate("/add")
  }
   })})
   }

}
}



 



// get all the aadmin courses

// async function createUser(){
    
// const key = localStorage.getItem("key");
 
//    fetch('http://localhost:3000/admin/courses',{
//         method: "GET",
//         headers: {
//          "Content-Type": "application/json",
//          "key":  localStorage.getItem("key")
//         }
//    }).then((responce)=>{responce.json().then((res)=>{console.log(res)})})
 
//  }

// // async function postData(url = 'http://localhost:3000/admin/signup', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       mode: "cors", // no-cors, *cors, same-origin
//       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: "same-origin", // include, *same-origin, omit
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: "follow", // manual, *follow, error
//       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }
export  default Signup;