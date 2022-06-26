import { Grid, Typography, Avatar } from '@mui/material'
import React from 'react'

const MainForm = ({children, type}) => {
    const img = type === 'Login' ? `https://picsum.photos/1000/1000` : 'https://picsum.photos/1000/1000?grayscale'
    return (
        <div>
            {
                <Grid sx={{display: {xs: 'block', sm: 'flex'}, justifyContent: 'space-between', position: 'relative'}}>

                <Grid
                    sx={{
                    backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',   
                        height: {xs: '8.5vh', sm: '100vh'},
                        width: '100vw',
                    }}
                />

                <Grid
                    sx={{
                        display: 'block',
                        position: 'absolute',
                        width: {xs: '100%', sm: '80%'},
                        height: {xs: '50%', sm: '100%'},
                        top: 0,
                        left: 0,
                        mr: 'auto',
                        background: 'linear-gradient(335deg, rgba(2,0,36,0) 0%, rgba(48,48,48,0) 67%, rgba(29,35,175,0.6379331095834797) 100%)',
                    }}
                />

                <Grid
                    sx={{
                            minHeight: {xs: '80vh', sm: '100vh'},
                            width: {xs: '100%', sm: '80%', md: '50%', lg: '35%'},
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                >
                    <Avatar src='Login.png' 
                        sx={{
                            width: {xs: '150px', sm: '180px'},
                            height: {xs: '150px', sm: '180px'},
                            margin: '0 auto',
                            marginTop: '10px',
                            marginBottom: '10px',
                            border: '5px solid',
                            borderColor: 'primary.main',
                        }}
                    />
                    <Grid>
                        <Grid
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '2rem',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                }}
                            >{type}</Typography>
                        </Grid>
                    </Grid>
                    <Grid width='80%'>
                        {children}
                    </Grid>
                </Grid>
            </Grid>}
            </div>
    )
    

}

export default MainForm

