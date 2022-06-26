import React from 'react'
import {Grid, Typography, IconButton} from '@mui/material'
import {Close} from '@mui/icons-material'

const WelcomeAdmin = ({username, setShow}) => {
  return (
    <Grid 
        sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            bgcolor: 'primary.main',
            padding: '1rem',
            borderRadius: '5px',
            mb: 2,
            p: 3,
        }}
    >
        <Typography variant="h5">
            Welcome {username} you are logged in as an admin therefore you are able to see this page.
        </Typography>
        <IconButton onClick={()=>setShow(false)}>
            <Close color='warning'/>
        </IconButton>
    </Grid>
  )
}

export default WelcomeAdmin