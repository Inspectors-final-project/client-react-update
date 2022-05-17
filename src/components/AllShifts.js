import * as React from 'react';
import { Grid, Button, Box, SvgIcon } from '@mui/material'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Shift from './Shift';
import { textAlign } from '@mui/system';
//id    inspector_id    dayWork    start_shift    stop_shift  
export default function AllShifts() { 
   
      const [shifts,setShifts]=React.useState()
      const [currUser, setCurUser] = React.useState(localStorage.getItem('userName')) 
      const navigate=useNavigate(); 

      React.useEffect(async ()=>{
        const promise = await axios.post("https://localhost:44314/api/WorkHours/PostWorkHoursToInspectorToday",currUser );
        // console.log(promise.data);
        let x=promise.data;
        let arr=[];
        // console.log(x);
        // debugger;
        // console.log(Object.values(x));
        Object.values(x).forEach(element => {
          console.log(element);
          // debugger;
        arr.push( { id:element.id, begining_time:element.start_shift, end_time:element.stop_shift}) 
        
  });
  setShifts(arr);
//   console.log(arr);
      },[])

return (
<>
    <Grid container direction='column' sx={{marginTop:'60px'}}>
              
                <Grid item sx={{ margin: 'auto'  }}>
                    <Grid container direction='column'>
                        <div dir='rtl' sx={{marginBottom:'20px'}}>בחר משמרת לצפיה:</div>
                        <> 
                         {
                        shifts.map((value, index) => {
                         return  <Button key={index}
                         variant="contained"
                         size="large"
                         onClick={() => {                              
                             navigate("/"+(index+1),{state:{value}})
                         }}
                         sx={{
                             p: 2,
                             margin: 2,
                             backgroundColor:"#8e24aa"

                         }}>
                         <div sx={{textAlign:'center'}}>
                        {index+1}  משמרת
                        {value.begining_time}-{value.end_time}
                        </div>
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