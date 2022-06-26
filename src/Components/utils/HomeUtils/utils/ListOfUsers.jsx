import { BookmarkRemove } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, Tooltip, Typography } from '@mui/material'
import AddUserRole from './AddUserRole'
import ApprovalLevel from './Approvallevel'
import MarkInactive from './MarkInactive'
import Roles from './Roles'
import { useNavigate } from 'react-router-dom'
import UpdateUser from './UpdateUser'
import React from 'react'

const ListOfUsers = ({adminId, data, hasNextPage, fetchNextPage, isFetching}) => {
    const nav = useNavigate()
    return (
        <Grid
            width='100%'
            height='100%'
            mb={3}
            boxShadow={10}
        >
            {!data?.pages ? <Box sx={{ height: '70vh', width: '100%', display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={70} color='secondary'/>
                      </Box> : data.pages.map(page => (
                page?.users.map(user => (
                    <Grid
                        key={user.id}
                        display='flex'  
                        alignItems='center'
                        justifyContent='space-between'
                        px={2}
                        py={1}
                        color={user.inactive ? 'gray' : 'white'}
                        bgcolor='rgba(0,0,0,.1)'
                        borderBottom='1px solid rgba(250,250,250,.2)'
                        sx={{
                            '&:hover': {
                                bgcolor: user.inactive ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.3)',
                                transition: 'all .3s ease-in-out'
                            }
                        }}
                    >
                        <Grid display='flex' justifyContent='center' alignItems='space-evenly' position='relative'>
                            <Typography>{user.username}</Typography>
                            {user.inactive && <Tooltip title={"Marked as inactived Reason: " + (user.reason ? user?.reason : 'No reason specified')}>
                                <Box display='absolute' top={1} left={0}>
                                    <BookmarkRemove sx={{color: '#c0c0c0'}}/>
                                </Box>
                            </Tooltip>}
                            {user.createdBy !== 0 && <Typography mx={1} color='#c0c0c0' fontSize={12}>created by: {user.createdBy}</Typography>}
                        </Grid>

                        {user.inactive ?
                        <Typography sx={{cursor: 'pointer'}} onClick={() => nav(`/user/${user.id}`)}>{user.personalEmail}</Typography>
                        : 
                        <Typography sx={{':hover':{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            color: 'lightblue'
                        }}}
                            onClick={() => nav(`/user/${user.id}`)}
                        >{user.personalEmail}</Typography>}

                        <Grid display='flex' alignItems='center'>
                            <Roles roles={user.roles} inactive={user.inactive} />
                            {!user.roles.find(r => r.role === 'admin') && <AddUserRole  inactive={user.inactive}  user={user.username} user_id={user.id}/>}
                        </Grid>

                        <Grid display='flex' justifyContent='center' alignItems='center'>
                            <ApprovalLevel inactive={user.inactive}  id={user.id} level={user.approverLevel} name={user.username}/>
                            <UpdateUser inactive={user.inactive} lastUpdatedBy={adminId} id={user.id} username={user.username}/>
                            <MarkInactive name={user.username} id={user.id} inactive={user?.inactive} reason={user?.reason}/>
                        </Grid>
                        
                    </Grid>
                    ))
                ))}
                
                <Grid display='flex' justifyContent='center' py={2}>
                    {hasNextPage ? 
                        isFetching ? 
                        <Box sx={{ display: 'flex', mx: 1 }}>
                            <CircularProgress size={40} color='secondary'/>
                        </Box> :
                        <Button
                            size='small'
                            onClick={fetchNextPage}
                            variant='contained'
                            color='secondary'
                        >
                            Load more
                        </Button> :
                    <Typography variant='h6' color='#c0c0c0'>No more users.</Typography>}
                </Grid>
        </Grid>
    )
}

export default ListOfUsers