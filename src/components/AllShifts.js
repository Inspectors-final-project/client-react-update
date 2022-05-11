import * as React from 'react';
import { Grid, Button, Box, SvgIcon } from '@mui/material'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Shift from './Shift';

export default function AllShifts() { 
   
      const [numShifts,setNumShifts]=React.useState([{id:"1" ,name:"sara"},{id:"2" ,name:"ayala"}])
      const [currUser, setCurUser] = React.useState(localStorage.getItem('userName')) 
      const navigate=useNavigate(); 
    //   const getNumShifts = async () => {       
    //   const promise= axios.get("https://localhost:44314/api/", currUser)
    //     const res = await promise;
    //     console.log(res.data);
    //     return res.data;
    //   }
return (
<>
    <Grid container direction='column' sx={{marginTop:'60px'}}>
              
                <Grid item sx={{ margin: 'auto'  }}>
                    <Grid container direction='column'>
                        <div dir='rtl' sx={{marginBottom:'20px'}}>בחר משמרת לצפיה:</div>
                        <> 
                         {
                         numShifts.map((value, index) => {
                         return  <Button key={index}
                         variant="contained"
                         size="large"
                         onClick={() => {                              
                             navigate("/"+(index+1),{state:{numShifts}})
                         }}
                         sx={{
                             p: 2,
                             margin: 2,
                             backgroundColor:"#8e24aa"

                         }}>
                        {index+1}  משמרת
                         </Button>
                         })
                         }                    
                       
                        </>
                    </Grid>
                </Grid>  <Outlet/>
            </Grid>
          
            </>
   
  
)
}