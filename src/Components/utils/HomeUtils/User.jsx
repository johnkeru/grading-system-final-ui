import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'

const User = ({user}) => {
    return (
        <Grid zIndex={1} width={{xs: '100%', sm: '70%', m: 'auto'}} p={2}>
            
            <Grid display={'flex'} alignItems='center' p={2} borderRadius={2} boxShadow={10}>
                <Avatar sx={{width: 100, height: 100}}>{user.username.charAt(0)}</Avatar>    
                <Grid display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Grid ml={2}>
                        <Typography variant='h2'>{user.username}</Typography>
                        <Typography>{user.personalEmail}</Typography>
                    </Grid>
                    {user.inactive && <Grid color='gray' p={2}>
                        <Typography>Inactive</Typography>
                        <Typography variant='h6'>Reason: {user.reason}</Typography>
                    </Grid>}
                </Grid>
            </Grid>
            <Grid p={2}>
                <Typography variant='h4'>Roles :</Typography>
                {user.roles.map(role => (
                    <Grid key={role.id}>
                        <Typography bgcolor='rgba(0,0,0,.2)' p={1}>{role.role}</Typography>
                    </Grid>
                ))}
                <Typography variant='h4'>Approve Level :</Typography>
                <Typography bgcolor='rgba(0,0,0,.2)' p={1}>{user?.approverLevel}</Typography>
            </Grid>
        </Grid>
    )
}

export default User