import * as React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddInspector from './AddInspector';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DeleteInspector from './DeleteShift';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }
  
//   const rows = [
//     createData(' ראשון', 159, 6.0, 24, 4.0),
//     createData('שני', 237, 9.0, 37, 4.3),
//     createData('שלישי', 262, 16.0, 24, 6.0),
//     createData('רביעי', 305, 3.7, 67, 4.3),
//     createData('חמישי', 356, 16.0, 49, 3.9),
//   ];


export default function AddShift() {
  const location=useLocation();
  const[deleteUpdate,setdeleteUpdate]=useState();
    const [add,setadd]=useState({'daywork':null,'startShift':null,'stopShift':null})
    const [status, setstatus] = useState(0);
    const[rows,setrows]=useState(null);
    const [pass, setpass] =useState({'pass':null});
    const[error,seterror]=useState(false);
    React.useEffect(()=>{ async function fetchData()
       { pass.pass = location.state;
        setpass({ ...pass });
        console.log(pass.pass);
        const promise = await axios.post("https://localhost:44314/api/WorkHours/PostAllWorkHours",pass );
        
         console.log(promise.data);
        
        // debugger;
  
        let x=promise.data;
        let arr=[];
        console.log(x);
        // debugger;
        // console.log(Object.values(x));

        Object.values(x).forEach(element => {
          let temp={day:null,shift1:null,shift2:null,shift3:null,shift4:null};
          console.log(element);
        //   debugger;
          if(element.length>0){
               if(element[0]!==undefined){
                   temp.day=element[0].dayWork;
                   temp.shift1=`${element[0].start_shift}-${element[0].stop_shift}`;
               }
               if(element[1]!==undefined){
                temp.shift1=`${element[0].start_shift}-${element[0].stop_shift}`;
            }
            if(element[2]!==undefined){
                temp.shift1=`${element[0].start_shift}-${element[0].stop_shift}`;
            }
            if(element[3]!==undefined){
                temp.shift1=`${element[0].start_shift}-${element[0].stop_shift}`;
            }
          
          }
          if(temp.day!==null){
            arr.push(temp);
          }
          
  });
  console.log(arr);
  setrows(arr);}
  fetchData();
      },[])
    
const deleteUpdateShift=()=>{

}

return (rows && <Box sx={{ flexGrow: 1 }}>
        
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
<Grid container spacing={2}>

              <Grid item xs={8}  sm={8} lg={8}>
                {/* style={{margin:"30px", marginLeft:"400px"}} */}
      <TableContainer component={Paper} sx={{ maxWidth: 700 }} dir='rtl' >
      <Table sx={{ maxWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>יום</TableCell>
            <TableCell align="center">שעות</TableCell>
            <TableCell align="center">    </TableCell>
            <TableCell align="center">    </TableCell>
            <TableCell align="center">    </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.day}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Link onClick={deleteUpdateShift} color='inherit' underline="none" href='#'>{row.day}</Link>
              </TableCell>
              <TableCell  align="center"><Link onClick={deleteUpdateShift} color='inherit' underline="none" href='#'>{row.shift1}</Link></TableCell>
              <TableCell align="center"><Link onClick={deleteUpdateShift} color='inherit' underline="none" href='#'>{row.shift2}</Link></TableCell>
              <TableCell align="center"><Link onClick={deleteUpdateShift} color='inherit' underline="none" href='#'>{row.shift3}</Link></TableCell>
              <TableCell align="center"><Link onClick={deleteUpdateShift} color='inherit' underline="none" href='#'>{row.shift4}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Grid>
<Grid item xs={4} sm={4} lg={4}>
<Grid container spacing={2}>
<Grid item xs={4} sm={4} lg={4}>
    <TextField
          id="outlined-number"
          label="יום בשבוע"
          onChange={(e)=>{
            if(e.target.value<=6&&e.target.value>1){
              add.daywork=e.target.value;
              setadd({...add});
            }
            
          }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item xs={4} sm={4} lg={4}>
         <TextField
          id="outlined-number"
          label="שעת התחלה"
          onChange={(e)=>{
            
              add.startShift=e.target.value;
              setadd({...add});
            
            
          }}
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
         <TextField
          id="outlined-number"
          label="שעת סיום"
          onChange={(e)=>{
            
              add.stopShift=e.target.value;
              setadd({...add});
            
            
          }}
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <Button variant="outlined" fullWidth >
          הוסף משמרת
        </Button>
      </Grid>




        <Grid item xs={4} sm={4} lg={4}>
         <TextField style={{marginTop:"30px"}}
          id="outlined-number"
          label="שעת התחלה"
          onChange={(e)=>{
            
              add.startShift=e.target.value;
              setadd({...add});
            
            
          }}
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
         <TextField style={{marginTop:"30px"}}
          id="outlined-number"
          label="שעת סיום"
          onChange={(e)=>{
            
              add.stopShift=e.target.value;
              setadd({...add});
            
            
          }}
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <Button variant="outlined" fullWidth >
          שנה שעות משמרת
        </Button>
</Grid>
<Grid item xs={12} sm={12} lg={12}>
      <Link  underline="none" href='#'>למחוק משמרת זו? כן</Link>
    </Grid>
    </Grid>
    </Grid>
    </Grid>
    </Box>
        </Container>
    
        
  </Box>
);
}