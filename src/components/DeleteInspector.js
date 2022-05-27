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
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import '../css/error.css';
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

export default function DeleteInspector() {
    const [inspector, setinspector] = useState({'pass':null});
    const [error, seterror] = useState(false);

    const sendToDb = async() => {
  
        const promise = axios.post("https://localhost:44314/api/SignIn", inspector);
        const res = await promise;
        console.log(res.data);
        // setfamilyCode(res.data);
        return res.data;
      }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (await sendToDb() === 0){
      seterror(true)
    }
    else{
            const promise = axios.post('https://localhost:44314/api/Inspector/PostDelete',inspector);
            const res = await promise;
            console.log(res.data);
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
            מחיקת עובד
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="given-name"
              autoFocus
            />
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

                inspector.pass = e.target.value;
                    setinspector({ ...inspector });
                console.log(inspector);
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                {error ? <label className='error'>סיסמא לא תקינה*</label> : false}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,  backgroundColor:"#8e24aa"}}
              // onClick={async () => {
              //   console.log('hhhhhhh');
                
              //     if (await sendToDb() === 0)
              //       seterror(true);
              //   console.log('jhvfxdz');
              // }}
            >
              מחיקה
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

    </Box>
  );
}