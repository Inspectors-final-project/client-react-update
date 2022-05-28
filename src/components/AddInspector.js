import * as React from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from 'react';
import axios from 'axios';
import '../css/error.css';
import Shift from './Shift';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, 
    FormControlLabel, Radio, Button, Alert, IconButton,Container,Typography,Box,Link, Checkbox, CssBaseline, Avatar} from "@mui/material";
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
const validationSchema = Yup.object(
    {
        inspector_name: Yup.string().required('זהו שדה חובה'),
        city: Yup.string().required('זהו שדה חובה'),
        area: Yup.string().required('זהו שדה חובה'),
        street: Yup.string().required('זהו שדה חובה'),        
        num_house: Yup.number().min(0, 'לא יתכן ערך שלילי').required('זהו שדה חובה'),
        phone: Yup.string().required('טלפון זהו שדה חובה').matches(/^[0-9]+$/, 'צריך להכיל רק ספרות').min(9, 'מינימום 9 ספרות').max(10, 'מקסימום 10 ספרות'),
        inspector_lon: Yup.number().min(0, 'לא יתכן ערך שלילי').required('זהו שדה חובה'),
        inspector_lat: Yup.number().min(0, 'לא יתכן ערך שלילי').required('זהו שדה חובה'),
        inspector_password: Yup.string().min(4, 'סיסמא מדי קצרה').required('זהו שדה חובה')

        
    }
)
export default function AddInspector() {
   
  const areas=['בקעת אונו','חשמונאים','חדרה','נתניה','עמק האלה-ביתר עילית'];
  const cities=['צפת','באר שבע','תל אביב','ירושלים','רמת גן','בני ברק']
  const navigate=useNavigate();
  const pass={'pass':null}
//   const [error, seterror] = useState(false);
  
const sendToDb = async() => {
  pass.pass=values.inspector_password;
  console.log(pass);
  const promise = axios.post("https://localhost:44314/api/SignIn", pass);
  const res = await promise;
  console.log("res.data"); 

  console.log(res.data); 
  return res.data;
}

  const [inspector, setinspector] = useState({ 'inspector_name': null ,'city':null,
  'area':'', 'street':null, 'num_house':null,'phone':null,
  'inspector_lon':null,'inspector_lat':null,'inspector_password':null});
  ///
  const { handleBlur, handleChange, handleSubmit, values, touched, required, errors, dirty, isValid } = useFormik({
    initialValues: {
        inspector_name:'',
        city:'',
        area:'',
        street:'',
        num_house:'',
        phone:'',
        inspector_lon:'',
        inspector_lat:'',
        inspector_password:''
    },
    validationSchema,
    onSubmit: async(values) => { 
        const send={
            ...values            
        }
        console.log("send:");

        console.log(send);
       
        if (await sendToDb() !== 0){
             alert('error')
           
         
          }
          else{
              await axios.post("https://localhost:44314/api/Inspector", send).then(response => {
            console.log(response);
        })
           
        
          }

    }
})

//
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
                  fullWidth
                  name="inspector_name"                    
                  id="inspector_name"
                  label="name"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.inspector_name && touched.inspector_name}
                  dir='rtl'
                />
                      {errors.inspector_name && touched.inspector_name && <Alert severity="error">{errors.inspector_name}</Alert>}
              </Grid>
              <Grid item xs={12} sm={6}>
              <Autocomplete
          id="city"
          name="city"
          options={cities}
          getOptionLabel={(option) => option}    
          filterOptions={filterOptions} 
          onChange={(e,value) => {
            values.city =value;
           
          }}
          onBlur={handleBlur}
          // error={errors.city && touched.city}
     dir='rtl'
      renderInput={(params) => <TextField {...params} label="עיר"     
    
      dir='rtl'/>}
    /> {errors.city && touched.city && <Alert severity="error">{errors.city}</Alert>}
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth dir='rtl'>
        <InputLabel id="demo-simple-select-label" dir='rtl'>אזור *</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="area"
          name="area"
          value={values.area}
          label="אזור"
          onChange={handleChange} 
          onBlur={handleBlur}
          // error={errors.area }
          dir='rtl'
        >
           {areas.map((area,index) => (
          <MenuItem key={index} value={area} dir='rtl'>{area}</MenuItem>
          ))}
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoComplete="given"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.street && touched.street}
                />
                    {errors.street && touched.street && <Alert severity="error">{errors.street}</Alert>}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type='number'
                  fullWidth
                  id="num_house"
                  label="Num House"
                  name="num_house"
                  autoComplete="given"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.num_house && touched.num_house}
                />
                    {errors.num_house && touched.num_house && <Alert severity="error">{errors.num_house}</Alert>}

              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="phone"
                  label="Phone"            
                  id="phone"
                  autoComplete="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.phone && touched.phone}
                />
              </Grid>
              {errors.phone && touched.phone && <Alert severity="error">{errors.phone}</Alert>}
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="inspector_password"
                  label="Password"
                  type="password"
                  id="inspector_password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.inspector_password && touched.inspector_password}
                  
                />   
                {errors.inspector_password && touched.inspector_password && <Alert severity="error">{errors.inspector_password}</Alert>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  id="inspector_lon"
                  label="Lon"
                  name="inspector_lon"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.inspector_lon && touched.inspector_lon}
                />
                {errors.inspector_lon && touched.inspector_lon && <Alert severity="error">{errors.inspector_lon}</Alert>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="inspector_lat"
                  label="Lat"
                  name="inspector_lat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.inspector_lat && touched.inspector_lat}
                />
                  {errors.inspector_lat && touched.inspector_lat && <Alert severity="error">{errors.inspector_lat}</Alert>}
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
            {/* {error ? <label className='error'>הסיסמא כבר קיימת*</label> : null} */}
            {/* <Button fullWidth
              variant="contained" sx={{ mt: 3, mb: 2 }} color="inherit" onClick={toShift()} >להוספת משמרות לעובד</Button> */}
            <Button
               type="submit"
               variant="contained"
               disabled={!dirty || !isValid }
              fullWidth
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