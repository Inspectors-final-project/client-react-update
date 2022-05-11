import * as React from 'react';
import { Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AllShifts from './AllShifts';
import Shift from './Shift';


export default function Employee() {
    const user=localStorage.getItem('userName')
    const navigate=useNavigate()
return (
<>
<Grid container direction='row' sx={{margin:'auto'}}>
              
              <Grid item sx={{ margin: 'auto' }}>
                 <AllShifts />
              </Grid>
              <Grid item sx={{ margin: 'auto' }}>
                 <Shift />
              </Grid>
          </Grid>
</>
)
}
