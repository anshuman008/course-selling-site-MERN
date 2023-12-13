import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import { Grid } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { userEmailState } from './components/selectors/userEmail';
const HomePage = () => {

    const userEmail = useRecoilValue(userEmailState)
    return (
        <div style={{ display:"flex",justifyContent:"space-around",alignItems:"center" }}>

           {!userEmail && <div>
                <Typography variant="h3" color="initial">Coursera Admin</Typography>
                <Typography variant="body1" color="initial">A plaace to learn,earn and grow</Typography>
                <Link  to={"/login"}>
                <Button variant="contained" style={{ marginRight: "20px" }} color="primary">
                    Login
                </Button>
                </Link>
              
              <Link to={"/signup"}>
              <Button variant="contained" color="primary">
                    Signup
                </Button>
              </Link>
                
            </div>}
  
            {userEmail && <div>
                <Typography variant="h3" color="initial">Welcome back: {userEmail}</Typography>
            </div>}

            <img width={"800px"} src="https://blogassets.leverageedu.com/blog/wp-content/uploads/2019/12/23174144/assistant-professor.png" alt="" />

        </div>

    )
}

export default HomePage
