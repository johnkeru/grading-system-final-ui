import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetOneUser } from './hooks/getAllUsers'

const GetUser = () => {
    
    const nav = useNavigate()
    const {id} = useParams()
    const {data:user} = useGetOneUser(id)
    useEffect(() => {
        if(user && user?.ehhh){
            nav('/')
        }
    }, [user, nav])
    return (
        <Grid zIndex={1} m='10vh auto' width={{xs: '100%', sm: '70%', }} p={2}>
            
            <Grid display={'flex'} alignItems='center' p={2} borderRadius={2} boxShadow={10}>
                <Avatar sx={{width: 100, height: 100}}>{user?.user?.username?.charAt(0)}</Avatar>    
                <Grid display={{xs: 'block', sm: 'flex'}} alignItems='center' justifyContent='space-between' width='100%'>
                    <Grid ml={2}>
                        <Typography fontSize={{xs: 30, sm: 50}}>{user?.user?.username}</Typography>
                        <Typography>{user?.user?.personalEmail}</Typography>
                    </Grid>
                    {user?.user?.inactive && <Grid color='gray' p={2}>
                        <Typography>Inactive</Typography>
                        <Typography variant='h6'>Reason: {user?.user?.reason}</Typography>
                    </Grid>}
                </Grid>
            </Grid>
            <Grid p={2}>
                <Typography fontSize={{xs: 30, sm: 50}}>Roles :</Typography>
                {user?.user?.roles.map(role => (
                    <Grid key={role.id}>
                        <Typography bgcolor='rgba(0,0,0,.2)' p={1}>{role.role}</Typography>
                    </Grid>
                ))}
                <Typography fontSize={{xs: 30, sm: 50}}>Approve Level :</Typography>
                <Typography bgcolor='rgba(0,0,0,.2)' p={1}>{user?.user?.approverLevel || 0}</Typography>
            </Grid> 
        </Grid>
    )
}

export default GetUser