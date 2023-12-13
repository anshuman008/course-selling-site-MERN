import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { Card, Typography, Container, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Courses from "./Courses";
import axios from "axios";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "./components/store/course";
import { courseDescription, courseImage, courseTitile,isCourseLoading,courseDetail,coursPrice } from "./components/selectors/user";


function Course(){

    const setCourse = useSetRecoilState(courseState);
    const isLoading = useRecoilValue(isCourseLoading);
    let {courseId} = useParams();

  


    useEffect(()=>{
        fetch(`http://localhost:3000/admin/course/${courseId}`,{
            method: "GET",
            headers: {
                "key": localStorage.getItem("key")
            }
        }).then((responce)=>{responce.json().then((data)=>{
          
            setCourse({
                isLoading: false,
                course: data.course
            })
        })})
    },[])

    

    
// console.log(course,'llll');
    
    if(isLoading){
        return <div>
            Loading....
        </div>
    }
    return <div>

     <Graytooper />
     <Grid container>
     <Grid item lg={8}  md={12} sm={12}> <UpdateCard/></Grid>
     <Grid item lg={4} md={12} sm={12}><CardCourse /></Grid>
     </Grid>
   
    </div>
}

function Graytooper(){
const title = useRecoilValue(courseTitile);

    return <div style={{height:"200px",background:"#212121",zIndex:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Typography variant="h3" color="initial" style={{color:"white",fontWeight:600}}>{title}</Typography>
    </div>
    }
    

function CardCourse(){
    const title = useRecoilValue(courseTitile);
    const description = useRecoilValue(courseDescription);
    const image = useRecoilValue(courseImage)

    console.log(title,description,image,'kkkkk')
 return <Card style={{margin:  10, width: 300, minHeight: 200,padding:10}}>

 <Typography textAlign={"center"} variant="body1" color="initial"> {title}</Typography>
 <Typography textAlign={"center"} variant="body1" color="initial"> {description}</Typography>
 <img src={image} style={{width:300}}></img>
 
 </Card>
}



function UpdateCard(){

  const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);

    const setCourse0 = useSetRecoilState(courseState);


  return <Card variant={"outlined"}  style={{width: 400, padding:20, margin:"auto",zIndex:1}}>
    
  <TextField 
  value={title}
  fullWidth = {true}
  id="title" 
 onChange={(e)=>{setTitle(e.target.value)}}
 autoComplete='off'
  label="title" 
  variant="outlined"
   />
  <br/>

  <TextField 
   value={description}
  fullWidth = {true}
  id="description" 
  onChange={(e)=>{setDescription(e.target.value)}}
  autoComplete='off'
  label="description" 
  variant="outlined"
   />
   <br/>

   <TextField 
    value={price}
  fullWidth = {true}
  id="price" 
  onChange={(e)=>{setPrice(e.target.value)}}
  autoComplete='off'
  label="price" 
  variant="outlined"
   />
  <br/>
  <TextField 
   value={image}
  fullWidth = {true}
  id="imageLink" 
  onChange={(e)=>{setImage(e.target.value)}}
  autoComplete='off'
  label="image Link" 
  variant="outlined"
   />
  <br/>
  <Button
                variant="contained"
                onClick={async () => {
                    axios.put(`http://localhost:3000/admin/courses/` + courseDetails.course._id, {
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true,
                        price:price
                    }, {
                        headers: {
                            "Content-type": "application/json",
                            "key": localStorage.getItem("key")
                        }
                    });
                    let updatedCourse = {
                        _id: courseDetails.course._id,
                        title: title,
                        description: description,
                        imageLink: image,
                        price:price
                    };
                    setCourse({course: updatedCourse, isLoading: false});
                }}
            > Update course</Button>


</Card>
}
export  default Course;