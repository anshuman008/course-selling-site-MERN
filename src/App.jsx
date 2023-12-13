import Signup from "./Signup";
import Navbar from "./navBar";
import Signin from "./Signin";
import AdCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
import { userState } from "./components/store/user";
import { RecoilRoot, useSetRecoilState } from "recoil";
import  axios  from "axios";
function App() {

  return (
    <RecoilRoot>
        <div style={{width:" 100vw", height: "100vh", background: "#eeeeee"}}>
    
      <BrowserRouter>
       <Navbar />
       <InitUser/>
            <Routes>
              <Route  path="/courses" element = {<Courses/>} />
              <Route  path="/course/:courseId" element = {<Course/>} />
              <Route  path="/add" element = {<AdCourse/>} />
              <Route path="/login" element= {<Signin />} />
              <Route path="/signup" element  = {<Signup/>}/>
              <Route path="/" element={<HomePage />} />
            </Routes>
      </BrowserRouter>
    
          </div>
    </RecoilRoot>
  
  )
}

function  InitUser(){
  const setUser = useSetRecoilState(userState);

  const init = async() =>{
   try{

     const response  = await axios.get('http://localhost:3000/admin/me',{
      headers: {
        "key" : localStorage.getItem("key")
    }
     })
     
     if(response.data.username){
      setUser({
        isLoading: false,
        userEmail: response.data.username
      })
     }
     else{
      setUser({
        isLoading: false,
        userEmail: null
      })
     }
    

     console.log(response.data.username,'hello imanshu')
   }

   catch(e){
    console.log('errorr')
    setUser({
      isLoading: false,
      userEmail: null
    })
   }
  }
   useEffect(()=>{init()},[])
  return <></>
}

export  default  App;
