import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../logo.png'
import CircleIcon from '@mui/icons-material/Circle';
// const pages = [];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [currUser, setCurUser] = React.useState(localStorage.getItem('userName'));
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" dir='rtl' sx={{ backgroundColor:"#8e24aa"}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters  >
         
        <img src={logo} style={{width:'4%',height:'4%'}}  onClick={() => navigate('/')}/> 
         {/* <IconButton 
             onClick={() => navigate('/')}
             color="secondary"
             aria-label="add to shopping cart"  sx={{ color:"#57ce52"}}> 
                          
          </IconButton>       */}
          <Typography 
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        color="#4a148c"
                        fontFamily={'Assistant ExtraBold'}
                        fontSize={'5vh'}
                    >
                 
                        תקף וסע
                    </Typography>
                    <Box sx={{marginRight:'100px' ,flexGrow: 9, display: { xs: 'revert', md: 'flex' },textAlign:'end' }}>                       
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/about')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block', fontFamily:'Assistant SemiBold',fontSize:'2.7vh'
                 }}
              >
              מדריך למשתמש
              </Button>      
          </Box>
          { !currUser && !localStorage.getItem('userName')?
          <>
           <Box sx={{ flexGrow:1, display: { xs: 'none', md: 'flex' } }} variant="contained" color="success" >           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/signIn')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block',fontFamily:'Assistant SemiBold',fontSize:'2.7vh' }}
              >
               כניסה
              </Button>      
           </Box>
          </>:
          <>
           
          {localStorage.getItem('status')==='admin'?<>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/administator')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' ,fontFamily:'Assistant SemiBold',fontSize:'2.7vh'}}
              >
              כל העובדים
              </Button>      
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> 
                
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/allshiftsToay')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block',fontFamily:'Assistant SemiBold',fontSize:'2.7vh' }}
              >
               משמרות יום נוכחי
              </Button>      
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/addInspactor')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block',fontFamily:'Assistant SemiBold',fontSize:'2.7vh' }}
              >
               הוסף עובד
              </Button>      
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/deleteInspector')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' ,fontFamily:'Assistant SemiBold',fontSize:'2.7vh'}}
              >
               מחק עובד
              </Button>      
          </Box>
    
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >  
          <div>  
          <IconButton  size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                 onClick={handleMenu}>      
              <AdminPanelSettingsIcon sx={{ fontSize:'40px',fontFamily:'Assistant SemiBold' }}/>  
              <div >מנהל </div>
              </IconButton>  
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem   onClick={()=>{ 
                  handleClose()                 
                    localStorage.clear()
                    setCurUser(null)
                    navigate('/home')
                }}>התנתק</MenuItem>
   
              </Menu>  
              </div>  
          </Box>
          </>:
          <>
           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/allshifts')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' ,fontFamily:'Assistant SemiBold',fontSize:'2.7vh'}}
              >
               המשמרות שלי
              </Button>      
          </Box>
         
            <Box sx={{ flexGrow: 1, 
              display: { xs: 'none', md: 'flex' ,fontFamily:'Assistant SemiBold',fontSize:'2.7vh',color:'#4a148c'}
               }}>  <div>  
               <IconButton size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                 onClick={handleMenu}>         
              <CircleIcon sx={{ fontSize:'10px',color:'#57ce52' }}/> 
              <div>  {localStorage.getItem('userName')}</div> 
               </IconButton>  
               <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem   onClick={()=>{ 
                   handleClose()      
                    localStorage.clear()
                    setCurUser(null)
                    navigate('/home')
                }}>התנתק</MenuItem>
   
              </Menu>
              </div> 
             </Box>
         
        
          </>} 
          </>} 
           </Box>   
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
