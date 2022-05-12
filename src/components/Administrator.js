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
    const [status, setstatus] = useState(0);
    const[rows,setrows]=useState(null);
    const [shift,setshift]=useState(null);
// Object.values(x)
     React.useEffect(async ()=>{
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

    },[])
// async function sendToDb() {
  
//   const promise = await axios.get("https://localhost:44314/api/Inspector" );
//   // const res =  promise;
//    console.log(promise.data);
  
//   return promise.data.data;
// };
// console.log(rows);
    console.log(status);
    if(status===1){
       return <AddInspector/>
    }
    else if(status===2){
      console.log(status);
        return <DeleteInspector/>
    }
    if(shift!==null){
      return <AddShift pass={shift}/>
    }
//     else if(shift===2){
// return <DeleteShift/>
//     }
return ( rows && <Box sx={{ flexGrow: 1 }}>
  
      {/* <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            פקחים-קווים
          </Typography>
          <Button onClick={()=>setstatus(1)} color="inherit">הוספת עובד</Button>
          <Button onClick={()=>setstatus(2)} color="inherit">מחיקת עובד</Button>
        </Toolbar>
      </AppBar> */}


      {/* <ThemeProvider theme={theme}> */}
      <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box>
      <TableContainer component={Paper}   style={{marginTop:"30px"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Inspector name</StyledTableCell>
            <StyledTableCell align="right">password</StyledTableCell>
            <StyledTableCell align="right">city</StyledTableCell>
            <StyledTableCell align="right">area</StyledTableCell>
            <StyledTableCell align="right">street</StyledTableCell>
            <StyledTableCell align="right">num house</StyledTableCell>
            <StyledTableCell align="center">phone</StyledTableCell>
            <StyledTableCell align="center">lon</StyledTableCell>
            <StyledTableCell align="center">lat</StyledTableCell>
            <StyledTableCell align="center">shift</StyledTableCell>
            
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
              <Button onClick={()=>setshift(row.password)} style={{margin: "5px"}} variant="outlined">משמרת</Button>

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