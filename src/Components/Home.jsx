import { Grid } from '@mui/material'
import { useContext } from 'react'
import { AuthProvider } from '../SubApp'
import NotLogin from './utils/HomeUtils/NotLogin'
import React from 'react'
import Admin from './utils/HomeUtils/Admin'
import User from './utils/HomeUtils/User'

const Home = () => {

  const {me, admin} = useContext(AuthProvider)
  return (
      <Grid
        sx={{
            backgroundImage: "url('sign.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
            height: !admin ? '100vh' : undefined,
        }}
      >

      {admin && <Admin me={me?.user}/>}
      {!me?.user && <NotLogin/>} 
      {(me?.user && !admin) && <User user={me?.user}/>} 

      <Grid
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(335deg, rgba(14,0,69,0.317708390482356) 38%, rgba(23,0,116,0.868270188235165) 75%)',
        }}/>

      </Grid>
  )
}

export default Home