import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';


// const pages = [];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currUser, setCurUser] = React.useState(JSON.parse(localStorage.getItem('userName')))
  const navigate=useNavigate()

  React.useEffect(()=>{
      const u=JSON.parse(localStorage.getItem('userName'));
      if(u){
          setCurUser(u);
      }
  },[currUser])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" dir='rtl' sx={{ backgroundColor:"#8e24aa"}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
         <IconButton 
             onClick={() => navigate('/allshifts')}
             color="secondary"
             aria-label="add to shopping cart"  sx={{ color:"#57ce52"}}>
              <HomeRoundedIcon />
          </IconButton>      
          <Typography 
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        color="#57ce52"
                    >
                     
                        KAVIM-PAKACHIM
                    </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/about')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' }}
              >
               אודות
              </Button>      
          </Box>
          { !currUser && !localStorage.getItem('user')?
          <>
           <Box sx={{ flexGrow:1, display: { xs: 'none', md: 'flex' } }} variant="contained" color="success" dir="ltr">           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/signIn')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' }}
              >
               כניסה
              </Button>      
           </Box>
          </>:
          <>
           <Box sx={{ flexGrow:1, display: { xs: 'none', md: 'flex' } }} variant="contained" color="success" dir="ltr">           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    localStorage.clear()
                    setCurUser(null)
                    navigate('/home')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' }}
              >
               יציאה
              </Button>      
           </Box>
          {localStorage.getItem('status')==='admin'?<>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/addInspactor')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' }}
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
                sx={{ my: 2, color: '#57ce52', display: 'block' }}
              >
               מחק עובד
              </Button>      
          </Box>
          </>:
          <>
           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>           
              <Button   
                onClick={()=>{
                    handleCloseNavMenu()
                    navigate('/allshifts')
                }}
                sx={{ my: 2, color: '#57ce52', display: 'block' }}
              >
               המשמרות שלי
              </Button>      
          </Box>
          </>}
          </>}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
