import { Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const NotLogin = () => {
  const nav = useNavigate()

   return (
    <>
        <Grid
            sx={{
                zIndex: '1',
                width: '100%',
                height: '100vh',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
                <Grid textAlign='center'>
                    <Typography variant="h1" sx={{
                        fontSize: {xs: '3rem', md: '5rem'},
                        fontWeight: 700,
                    }}>
                        Welcome to the Grading System
                    </Typography>
                    <Button
                        onClick={() => nav('/login')}
                        sx={{
                            marginTop: '1rem',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            width: {xs: '79%', sm: '49%'},
                            height: '3.5rem',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: '#fff',
                            borderRadius: '0.5rem',
                            transition: '.5s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                width: {xs: '80%', sm: '50%'},
                                border: 'none'
                            },
                        }}
                    >Get Started</Button>
            </Grid>
        </Grid>
    </>
  )
}

export default NotLogin