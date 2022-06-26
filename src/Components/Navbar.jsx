import { BorderColor } from '@mui/icons-material';
import { AppBar, Avatar, Box, CircularProgress, Container, Grid, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from '../SubApp';

const pages = [{
  name: 'Home',
  url: '/',
}, {
  name: 'Register',
  url: '/register',
}, {
  name: 'Login',
  url: '/login',
}]

const Navbar = () => {
  const {me, setToken, isLoading} = useContext(AuthProvider)
  const [show, setShow] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  
  const currentUrl = window.location.pathname;
  const fade = (currentUrl && (currentUrl.includes('login') || currentUrl.includes('register'))) ? true : false;

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setShow(false); 
    else setShow(true);  
    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, controlNavbar]);

  const nav = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('logout')
    nav('/login')
  }

  return (
    <AppBar position="fixed" sx={{transition: '200ms ease', opacity: !show ? 0 : 1, boxShadow: 0, 
      bgcolor: fade ? 'transparent' : 'rgb(14,0,69)',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BorderColor/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => nav('/')}
            sx={{
              cursor: 'pointer',
              mr: 4,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GRADING SYSTEM
          </Typography>
          <Grid 
            sx={{display: 'flex', alignItems: 'center'}}
          >
            {
              !me?.user ? 
              pages.map(page => (
                <Typography key={page.name} onClick={()=>nav(page.url)} sx={{mr: 2, cursor: 'pointer', fontSize: '15px'}}>
                  {page.name}
                </Typography>
              ))
              : 
              <Grid sx={{display: 'flex', alignItems: 'center'}}>
                <Typography onClick={()=>nav('/')} sx={{mr: 2, cursor: 'pointer', fontSize: '15px'}}>
                  Home
                </Typography>

                {isLoading ? 
                  <Box sx={{ display: 'flex', mx: 1 }}>
                    <CircularProgress size={30} sx={{color: '#fff'}}/>
                  </Box> 
                :
                <Grid sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography sx={{mr: .5, fontSize: '15px'}}>Logout: </Typography>
                  <Grid display={'flex'} alignItems='center' 
                    onClick={handleLogout} 
                    sx={{
                      cursor: 'pointer', px: 1, py: .5, borderRadius: 2, transition: '250ms ease', ':hover': {bgcolor: 'rgba(250,250,250,.3)'}}
                    }
                    >
                    <Avatar>{me.user.username.charAt(0)}</Avatar>
                    <Typography sx={{mr: 2, fontSize: '15px', fontWeight: 700, ml: 1}}>
                      {me.user.personalEmail}
                    </Typography>
                  </Grid>
                </Grid>}

              </Grid>
            }

          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
