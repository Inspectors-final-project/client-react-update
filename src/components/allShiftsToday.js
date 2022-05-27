import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '',
      color:'',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(id,name,start_shift, stop_shift) {
    return {id, name,start_shift, stop_shift };
  }
  
export default function AllShiftsToday() {
  const navigate=useNavigate(); 
    const [rows,setRows]=React.useState(null)
    React.useEffect(()=>{
        async function fetchData(){
      const promise = await axios.get("https://localhost:44314/api/Result");
      //  debugger;
      console.log("promise.data");

      console.log(promise.data);
      let x=promise.data;
      let arr=[];
      console.log(x);
      // debugger;
      // console.log(Object.values(x));
      Object.values(x).forEach( element => {
        console.log(element);
        // debugger;
      arr.push(createData(element.id,element.nameInspector,element.start_shift,element.stop_shift)) 
    //   console.log("element::");
    //    console.log(arr)
});
arr.sort(function(a, b) {
    const A = a.start_shift; // ignore upper and lowercase
    const B = b.start_shift; // ignore upper and lowercase
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
setRows(arr);

}fetchData();

console.log(rows); },[]);
return (rows &&
    <>
    <Box sx={{ flexGrow: 1 }}>
  

  <Container component="main" maxWidth="lg">
  {/* <CssBaseline /> */}
  <Box>
      <TableContainer component={Paper}  style={{marginTop:"8vh",direction:'rtl'}}>
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        <TableHead>
          <TableRow >        
          <StyledTableCell align="right"sx={{fontFamily:'Assistant SemiBold',fontSize:'3vh',  color:"#4a148c" }}>שם פקח</StyledTableCell>
            <StyledTableCell align="center"sx={{fontFamily:'Assistant SemiBold',fontSize:'3vh',  color:"#4a148c" }}>שעת התחלה</StyledTableCell>
            <StyledTableCell align="center"sx={{fontFamily:'Assistant SemiBold',fontSize:'3vh',  color:"#4a148c" }}>שעת סיום</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((value,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align='right'>
                {value.name}
              </StyledTableCell>
              <StyledTableCell align="center">{value.start_shift}</StyledTableCell>
              <StyledTableCell align="center">{value. stop_shift}</StyledTableCell>
             <StyledTableCell align="center"><Button  style={{margin: "5px"}} variant="outlined"  onClick={() => { console.log("value:",value);                             
                             navigate("/ShiftForInspector",{state:{value}})}}>  צפה במסלול</Button></StyledTableCell>
                       
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    </Box>
    </Container>

</Box>  
    </>
)
}