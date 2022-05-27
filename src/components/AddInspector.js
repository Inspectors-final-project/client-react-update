import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import '../css/error.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Shift from './Shift';
import { useNavigate } from 'react-router-dom';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option,
});
// import swal from "sweetalert2"
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

export default function AddInspector() {
  const areas=['בקעת אונו','חשמונאים','חדרה','נתניה','עמק האלה-ביתר עילית'];
  const cities=['צפת','באר שבע','תל אביב','ירושלים','רמת גן','בני ברק']
  const navigate=useNavigate();
  const pass={'pass':null}
  const [error, seterror] = useState(false);
    const [inspector, setinspector] = useState({ 'inspector_name': null ,'city':null,
'area':'', 'street':null, 'num_house':null,'phone':null,
'inspector_lon':null,'inspector_lat':null,'inspector_password':null});
const sendToDb = async() => {
  pass.pass=inspector.inspector_password;
  console.log(pass);
  const promise = axios.post("https://localhost:44314/api/SignIn", pass);
  const res = await promise;
  console.log(res.data);
  
  return res.data;
}
const toShift=(event)=>{
  return <Shift/>;
}

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (await sendToDb() !== 0){
      seterror(true)
    }
    else{
      
      const promise = axios.post("https://localhost:44314/api/Inspector", inspector);
          const res = await promise;
          console.log(res.data);
        //   swal.fire({
        //     title: '',
        //     text: 'הפרטים נקלטו בהצלחה!! המשך יום מוצלח!!! ',
        //     icon: 'success',
        //     confirmButtonText: 'חזרה לדף הבית',
        //     confirmButtonColor: '#3085d6',
        // }).then(() => { navigate('/') })
          return res.data;
    }
    
  };

  return (
  
    <Box sx={{ flexGrow: 1 }}>
     

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            הוספת עובד
          </Typography>     
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}  dir='rtl'>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  onChange={(e) => {
                    inspector.inspector_name = e.target.value;
                    setinspector({ ...inspector });
                    console.log(inspector);
                  }}
                  dir='rtl'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Autocomplete
      id="filter-demo"
      options={cities}
      getOptionLabel={(option) => option}    
      filterOptions={filterOptions} 
      onChange={(e,value) => {
        inspector.city =value;
        setinspector({ ...inspector });
        console.log(value);
      }}
     dir='rtl'
      renderInput={(params) => <TextField {...params} label="עיר"     
    
      dir='rtl'/>}
    />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth dir='rtl'>
        <InputLabel id="demo-simple-select-label" dir='rtl'>אזור *</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="area"
          value={inspector.area}
          label="אזור"
          onChange={(e) => {
            inspector.area = e.target.value;
            setinspector({ ...inspector });
            console.log(inspector);
          }} dir='rtl'
        >
           {areas.map((area,index) => (
          <MenuItem key={index} value={area} dir='rtl'>{area}</MenuItem>
          ))}
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoComplete="given"
                  onChange={(e) => {
                    inspector.street = e.target.value;
                    setinspector({ ...inspector });
                    console.log(inspector);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="numHouse"
                  label="Num House"
                  name="numHouse"
                  autoComplete="given"
                  onChange={(e) => {
                    inspector.num_house = e.target.value;
                    setinspector({ ...inspector });
                    
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  onChange={(e) => {
                    inspector.phone = e.target.value;
                    setinspector({ ...inspector });
                    
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    inspector.inspector_password = e.target.value;
                    setinspector({ ...inspector });
                    
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lon"
                  label="Lon"
                  name="lon"
                  onChange={(e) => {
                    inspector.inspector_lon = e.target.value;
                    setinspector({ ...inspector });
                    
                  }}
                //   autoComplete="city-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lat"
                  label="Lat"
                  name="lat"
                  onChange={(e) => {
                    inspector.inspector_lat = e.target.value;
                    setinspector({ ...inspector });
                    
                  }}
                //   autoComplete="city-name"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error ? <label className='error'>הסיסמא כבר קיימת*</label> : null}
            {/* <Button fullWidth
              variant="contained" sx={{ mt: 3, mb: 2 }} color="inherit" onClick={toShift()} >להוספת משמרות לעובד</Button> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , backgroundColor:"#8e24aa"}}
            //   onClick={async () => {
            //     console.log('hhhhhhh');
                
            //       if (await sendToDb() !== 0){
            //         seterror(true);
            //       }
            //         else{
            //           console.log('sdgfffdf');
            //         }
                  
            //   }
            // }
            >
              הוספת עובד
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
   
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>

    </Box>
  
  );
}