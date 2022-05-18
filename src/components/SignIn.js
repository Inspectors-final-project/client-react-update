import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import Employee from './Employee';
import Administrator from './Administrator';
import { useNavigate } from 'react-router-dom';
import '../css/error.css';
const theme = createTheme();

export default function SignIn() {
    const navigate=useNavigate()
    const [bool, setbool] = useState(0);
    const [user, setuser] = useState({'pass':null});
    // const [error, seterror] = useState(false);
    const sendToDb = async () => {
        console.log(user);
        const promise = axios.post("https://localhost:44314/api/SignIn/PostInspectorByPass", user);
        const res = await promise;
        console.log(res.data);
        // setfamilyCode(res.data);
        if(res.data!==null)
          { 
            localStorage.setItem('userName',res.data.inspector_name)
            localStorage.setItem('userPass',res.data.inspector_password)
            localStorage.setItem('userID',res.data.inspector_id)
          }

        return res.data;
      }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (parseInt(data.get('password')) === 100){
      localStorage.setItem('status','admin')
      localStorage.setItem('userName','admin')
      localStorage.setItem('userPass','100')
        console.log('administraitor');
        setbool(2);
    }
    //אם הוא עובד קיים
    else if (await sendToDb() !== null) {
        console.log('i am employee');
        setbool(1);
        localStorage.setItem('status','employee')
      }
      else {
        console.log('error');
        setbool(3);        
        // seterror(false);
      }
    // console.log({
    // //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
if(bool===1){
  navigate('/allshifts')
}
else if(bool===2){
  navigate('/administator')
}

  return (
    <Box sx={{ flexGrow: 1 }}>
  
    <ThemeProvider theme={theme}>
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            {/* <LockOutlinedIcon /> */}
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                user.pass = e.target.value;
                setuser({ ...user });
                localStorage.setItem("userPass",e.target.value)
                console.log(user);
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {bool===3 ? <label className='error'>סיסמא לא תקינה*</label> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            
            >
              כניסה
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    </Box>
  );
}