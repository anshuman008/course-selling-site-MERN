import { Card, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import Button from '@mui/material/Button';

function Courses(){

const[courses,  setCourses] = useState([]);


useEffect(()=>{
    fetch('http://localhost:3000/admin/courses',{
        method: "GET",
        headers: {
            "key": localStorage.getItem("key")
        }
    }).then((responce)=>{responce.json().then((data)=>{
        setCourses(data.Courses);
        console.log(data);
    })})
},[])


return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
    {courses.map((course)  => {
        return <Course course = {course}/>
    })}
</div>
}


function Course(props){
   return <Card style={{margin:  10, width: 300, minHeight: 200,padding:10}}>

    <Typography textAlign={"center"} variant="body1" color="initial"> {props.course.title}</Typography>
    <Typography textAlign={"center"} variant="body1" color="initial">  {props.course.description}</Typography>
    <img src={props.course.imageLink} style={{width:300}}></img>

    <Button variant="contained" style={{ margin: "10px" }}><Link to={"http://localhost:5173/course/"+props.course._id} style={{ textDecoration: "none", color: "white", }}>EDIT</Link></Button>

   </Card>
   
}

export default Courses;