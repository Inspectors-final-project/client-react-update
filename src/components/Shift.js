import * as React from 'react';
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
const columns = [
    { id: 'get_on_line', label: 'עליה על קו', minWidth: 70 },
    { id: 'stop', label: 'ירידה בתחנה', minWidth: 100 },     
  ];
  
  function createData(get_on_line, stop) {
    
    return {get_on_line, stop };
  }
  
  const rows =[];

export default function Shift() {
    const params=useParams()
    const location=useLocation()

    React.useEffect(async ()=>{
        const promise = await axios.post("",location.state.value.id );
        // console.log(promise.data);
        let x=promise.data;
        let arr=[];
        // console.log(x);
        // debugger;
        // console.log(Object.values(x));
        Object.values(x).forEach(element => {
          console.log(element);
          // debugger;
        rows.push( { }) 
        
  });

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
//עד כאן לטבלה id    inspector_id    dayWork    start_shift    stop_shift   

    return(
        <>
        <Grid container direction='row' sx={{marginRight:'5px'}}>
              
              <Grid item sx={{ margin: 'auto' }}>
                 <div>
               shift {params.id}
               </div>
                  
                    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 ,maxWidth:400}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
              <Grid item sx={{ marginRight:'5vw' }}>
                 <AllShifts />
              </Grid>
          </Grid>
        
       
</>
    );
}








