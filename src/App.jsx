import Signup from "./Signup";
import Navbar from "./navBar";
import Signin from "./Signin";
import AdCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
function App() {

  const [username, setUsername] = useState(null); 

  useEffect(()=>{
      fetch('http://localhost:3000/admin/me',{
          method: "GET",
          headers: {
              "key" : localStorage.getItem("key")
          }
      }).then((responce)=>{responce.json().then((data)=>{
          if(data.username){
              // console.log('data hai', data.username);
              setUsername(data.username);
          }
      })})
  },[])



  return (
    <div style={{width:" 100vw", height: "100vh", background: "#eeeeee"}}>
      

<BrowserRouter>
 <Navbar username={username} setUser={setUsername}/>
      <Routes>
        <Route  path="/courses" element = {<Courses/>} />
        <Route  path="/course/:courseId" element = {<Course/>} />
        <Route  path="/add" element = {<AdCourse/>} />
        <Route path="/login" element= {<Signin setUser={setUsername}/>} />
        <Route path="/signup" element  = {<Signup setUser={setUsername}/>}/>
        <Route path="/" element={<HomePage username={username}/>} />
      </Routes>
</BrowserRouter>


    </div>
  )
}



export  default  App;
