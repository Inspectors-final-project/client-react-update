import * as React from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import AllShifts from './AllShifts';
import { Grid, Button } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ShowRouteMap from './Map';
import { width } from '@mui/system';
const columns = [
   
    { id: 'stop', label: 'בתחנה', minWidth: 100 }, 
    { id: 'stop_num', label: 'מספר תחנה', minWidth: 70 } ,
     { id: 'get_on_line', label: 'עליה על קו', minWidth: 70 }
     
  ];
  
  function createData(stop,stop_num,get_on_line) {
    
    return {stop,stop_num,stop_num,get_on_line};
  }
  


//s.stop_code, s.stop_name, s.stop_lon.Value, s.stop_lat.Value, r.route_short_name, r.route_long_name
export default function Shift() {
    const params=useParams()
    const location=useLocation()
    const [currWorkID, setCurrWorkID] = React.useState({'pass':location.state.value.id}) 
    const [dataMap, setdataMap] = React.useState([]) 
    const [myRoute, setMyRoute] = React.useState(null) 
    const [rows,setRows]=React.useState([]) 
//     function filRows(){
//       arr.forEach(el=>{
//         rows.add(createData(el.stopName,el.line))
//       })
// }
    React.useEffect(  ()=>{async function fetchData()
       {
         
        const promise = await axios.post("https://localhost:44314/api/Result",currWorkID );
        debugger
        console.log(promise.data);
        let x=promise.data;  
        let arr=[]   
        Object.values(x).forEach(element => {
        arr.push({stopId:element.stopCode,stopName:element.stopName,line:element.routeShortName,stopLat:element.stopLat,stopLen:element.stopLon});
          rows.push(createData(element.stopName,element.stopCode,element.routeShortName));
          dataMap.push({ lat:element.stopLat,lng:element.stopLon})
          console.log(dataMap)
          console.log(rows)

  });
 
    setMyRoute(arr);  
}
  fetchData()
   
 
//   console.log(arr);
      },[])

 const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    return(myRoute &&
        <>
        <Grid container spacing={3} direction='row-reverse' sx={{marginTop:'20px',marginRight:'70px'}}>
        <Grid item sx={{marginLeft:'60px',marginRight:'70px'}}>
                 <AllShifts />
              </Grid>
              <Grid item sx={{marginLeft:'600px',fontFamily:'Assistant SemiBold',fontSize:'2.7vh'}}>
                 <div>
               משמרת {params.id}
               </div>
                  
                    <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 700 ,maxWidth:400,marginTop:'50px'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{  minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
              </Grid>
             
              <Grid item sx={{marginTop:'50px'}}>
          
                <ShowRouteMap  data={dataMap} style={{width:'20%',height:'50%'}}/>

                </Grid>
          </Grid>
          
       
</>
    );
}








