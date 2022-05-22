import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import AddInspector from './AddInspector';
import { useState } from 'react';
import AddShift from './AddShift';
import DeleteInspector from './DeleteInspector';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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
// function createData(name, password, city, area,street, numHouse,phone,lon,lat) {
//   return { name, password, city, area,street, numHouse,phone,lon,lat};
// }
export default function Administrator() {
  console.log("aaa");
    const [status, setstatus] = useState(0);
    const[rows,setrows]=useState(null);
    const navigate=useNavigate();
// Object.values(x)
 debugger;
     React.useEffect(()=>{
       async function fetchData(){
        console.log('bbbb');
      
      const promise = await axios.get("https://localhost:44314/api/Inspector" );
      console.log(promise.data);
      let x=promise.data;
      let arr=[];
      console.log(x);
      // debugger;
      console.log(Object.values(x));
      Object.values(x).forEach(element => {
        console.log(element);
        // debugger;
      arr.push( { name:element.inspector_name, password:element.inspector_password, city:element.city, area:element.area,street:element.street, numHouse:element.num_house,phone:element.phone,
      lon:element.inspector_lon,lat:element.inspector_lat})
      
});
console.log(arr);
setrows(arr);
       }
       fetchData();

    },[]);

return ( rows && <Box sx={{ flexGrow: 1 }}>
  
  
      {/* <ThemeProvider theme={theme}> */}
      <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box>
      <TableContainer component={Paper}   style={{marginTop:"30px"}}dir='rtl'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" dir='rtl'>
        <TableHead>
          <TableRow>
            <StyledTableCell>שם פקח</StyledTableCell>
            <StyledTableCell align="right">סיסמא</StyledTableCell>
            <StyledTableCell align="right">עיר</StyledTableCell>
            <StyledTableCell align="right">אזור</StyledTableCell>
            <StyledTableCell align="right">רחוב</StyledTableCell>
            <StyledTableCell align="right">מספר בית</StyledTableCell>
            <StyledTableCell align="center">טלפון</StyledTableCell>
            <StyledTableCell align="center">lon</StyledTableCell>
            <StyledTableCell align="center">lat</StyledTableCell>
            <StyledTableCell align="center">משמרות</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.password}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.password}</StyledTableCell>
              <StyledTableCell align="right">{row.city}</StyledTableCell>
              <StyledTableCell align="right">{row.area}</StyledTableCell>
              <StyledTableCell align="right">{row.street}</StyledTableCell>
              <StyledTableCell align="right">{row.numHouse}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.lon}</StyledTableCell>
              <StyledTableCell align="right">{row.lat}</StyledTableCell>
              <Button onClick={()=>navigate('/addShift',{state:row.password})} style={{margin: "5px"}} variant="outlined">משמרות</Button>

              {/* <Button onClick={()=>setshift(2)} variant="outlined">מחיקת משמרת</Button> */}
            </StyledTableRow>
            
          ))}
           
        </TableBody>
      </Table>
    </TableContainer>
    
    </Box>
    </Container>
    {/* </ThemeProvider> */}
</Box>  
)
}