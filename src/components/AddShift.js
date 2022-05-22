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

function createData(day, begining_time, end_time) {
    return { day, begining_time, end_time };
  }
  
export default function AddShift() {
  const location=useLocation();
    const [add,setadd]=useState({'daywork':null,'startShift':null,'stopShift':null})
    const[rows,setrows]=useState([]);
    const [pass, setpass] =useState({'pass':null});
    const[click,setClick]=useState(false);
    React.useEffect(()=>{ async function fetchData()
       { pass.pass = location.state;
        setpass({ ...pass });
        console.log(pass.pass);
        const promise = await axios.post("https://localhost:44314/api/WorkHours/PostAllWorkHours",pass );
        //dayWork    start_shift    stop_shift 
         console.log(promise.data);
        
        // debugger;
  
        let x=promise.data;
        let arr=[];
        console.log('data:::');
        console.log(x);
        // debugger;
        // console.log(Object.values(x));

        Object.values(x).forEach(arrs => {
          Object.values(arrs).forEach(element=>{
          arr.push(createData( element.dayWork,element.start_shift,element.stop_shift))})
  });
  console.log('rows:::');
  console.log(arr);
  setrows(arr);}
  fetchData();
      },[])
    
// const deleteUpdateShift=()=>{

// }

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
          <TableRow sx={{fontFamily:'Assistant SemiBold',fontSize:'3vh' }} >
            <TableCell align="center" sx={{fontFamily:'Assistant SemiBold',fontSize:'3vh',  color:"#4a148c" }}>יום</TableCell>

            <TableCell align="center"sx={{fontFamily:'Assistant SemiBold',fontSize:'3vh',  color:"#4a148c" }}>שעת התחלה</TableCell>
            <TableCell align="center"sx={{fontFamily:'Assistant SemiBold',fontSize:'3vh',  color:"#4a148c" }}> שעת סיום   </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{ backgroundColor:index==3? '#ce93d8':''}} 
            >

              <TableCell  align="center" ><Link  underline="none" href='#'   >{row.day}</Link></TableCell>
              <TableCell align="center"><Link  underline="none" href='#'  >{row.begining_time}</Link></TableCell>
              <TableCell align="center"><Link underline="none" href='#'  >{row.end_time}</Link></TableCell>

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
        <Button variant="contained" fullWidth    sx={{  backgroundColor:"#8e24aa"}}>
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
        <Button variant="contained" fullWidth    sx={{  backgroundColor:"#8e24aa"}}>
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