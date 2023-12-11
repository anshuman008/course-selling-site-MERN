import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { Card, Typography, Container, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Courses from "./Courses";

function Course(){

    let {courseId} = useParams();

    const[courses,  setCourses] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/admin/courses',{
            method: "GET",
            headers: {
                "key": localStorage.getItem("key")
            }
        }).then((responce)=>{responce.json().then((data)=>{
            setCourses(data.Courses);
        })})
    },[])


    let course  = null;

    
    for(let i = 0; i<courses.length; i++){
        if(courseId  === courses[i]._id) course = courses[i];
    }

    
    if(!course){
        return <div>
            Loading....
        </div>
    }
    return <div>

     <Graytooper title={course.title}/>
     <Grid container>
     <Grid item lg={8}  md={12} sm={12}> <UpdateCard courses={courses} course={course} setCourses={setCourses}/></Grid>
     <Grid item lg={4} md={12} sm={12}><CardCourse course={course}/></Grid>
     </Grid>
  

    </div>
}

function Graytooper({title}){
    return <div style={{height:"200px",background:"#212121",zIndex:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Typography variant="h3" color="initial" style={{color:"white",fontWeight:600}}>{title}</Typography>
    </div>
    }
    

function CardCourse(props){
 return <Card style={{margin:  10, width: 300, minHeight: 200,padding:10}}>

 <Typography textAlign={"center"} variant="body1" color="initial"> {props.course.title}</Typography>
 <Typography textAlign={"center"} variant="body1" color="initial"> {props.course.description}</Typography>
 <img src={props.course.imageLink} style={{width:300}}></img>
 
 </Card>
}



function UpdateCard(props){

console.log(props,'lllll')
    const [courseDetails, setDetails] = useState({
        title: props.course.title,
        description: props.course.description,
        price:  props.course.price,
        imageLink: props.course.imageLink
    });


    const handlechance = (e) =>{
        const fieldName = e.target.id;
        const value = e.target.value;
  
      setDetails({...courseDetails,[fieldName]:value})
        //   console.log(courseDetails);
    }

  return <Card variant={"outlined"}  style={{width: 400, padding:20, margin:"auto",zIndex:1}}>
    
  <TextField 
  value={courseDetails.title}
  fullWidth = {true}
  id="title" 
 onChange={handlechance}
 autoComplete='off'
  label="title" 
  variant="outlined"
   />
  <br/>

  <TextField 
   value={courseDetails.description}
  fullWidth = {true}
  id="description" 
  onChange={handlechance}
  autoComplete='off'
  label="description" 
  variant="outlined"
   />
   <br/>

   <TextField 
    value={courseDetails.price}
  fullWidth = {true}
  id="price" 
  onChange={handlechance}
  autoComplete='off'
  label="price" 
  variant="outlined"
   />
  <br/>
  <TextField 
   value={courseDetails.imageLink}
  fullWidth = {true}
  id="imageLink" 
  onChange={handlechance}
  autoComplete='off'
  label="image Link" 
  variant="outlined"
   />
  <br/>
  <Button variant="contained" onClick={()=>{

      fetch('http://localhost:3000/admin/courses/'+props.course._id,{
          method:  "PUT",
          headers: {
              "Content-Type": "application/json",
              "key": localStorage.getItem("key")
          },
          body: JSON.stringify(courseDetails)

      }).then((responce)=>{responce.json().then((data)=>{

       
        //   if(data.message) alert(data.message)

          let updatedCourse =  [];
     

          for(let i = 0;  i<props.courses.length; i++){
                if(props.courses[i]._id === props.course._id){
                    updatedCourse.push({
                        _id: props.course._id,
                        title:  courseDetails.title,
                        description: courseDetails.description,
                        padding: courseDetails.price,
                        imageLink: courseDetails.imageLink,
                    })
                }
                else{
                    updatedCourse.push(props.courses[i]);
                }
          }

        
          props.setCourses(updatedCourse);
         
      })})
  }}>Update</Button>

</Card>
}
export  default Course;