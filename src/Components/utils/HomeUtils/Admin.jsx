import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useGetAllUsers } from '../../hooks/getAllUsers'
import AddRole from './utils/AddRole'
import AddUser from './utils/AddUser'
import ListOfUsers from './utils/ListOfUsers'
import Roles from './utils/Roles'
import WelcomeAdmin from './utils/WelcomeAdmin'

const Admin = ({me}) => {
    const [show, setShow] = React.useState(true)
    const [key, setKey] = React.useState('')
    const [approval, setApproval] = React.useState(false)
    const {data, hasNextPage, fetchNextPage, isFetching, refetch} = useGetAllUsers({key})
    
    const setApprovalState = () => {
        setApproval(!approval)
        approval ? setKey('') : setKey('approval')
    }

    useEffect(() => {
        (async () => {
            await refetch({key})
        })()
    }, [key, refetch])

    return (
        <Grid
            sx={{
                    mt: '5rem',
                    zIndex: '1',
                    color: '#fff',
                    width: {xs: '100%', sm: '83%'},
                    transition: 'all 0.5s ease',
                }}
        >
            {show && <WelcomeAdmin username={me.username} setShow={setShow}/>}

            <Grid>
                <Grid
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    bgcolor='rgba(0,0,0,.5)'
                    px={2}
                    py={2.3}
                    borderBottom='1px solid #eee'
                >
                    <Grid display='flex' justifyContent='center' alignItems='space-evenly'>
                        <Typography variant='h6' color='success.main' mr={.5}>Admin:</Typography>
                        <Typography variant='h6'>{me.username}</Typography>
                    </Grid>

                    <Grid display='flex' alignItems='center'>
                        <AddUser createdBy={me.id}/>
                        <Grid display='flex' justifyContent='center' alignItems='center'>
                            <Roles/>
                            <AddRole/>
                        </Grid>
                    </Grid>
                    <Grid display='flex' alignItems='center'>
                        <Button size='small' variant='contained' color='secondary' 
                            onClick={setApprovalState}>{approval ? 'All' : 'Approvers Only'}
                        </Button>

                        <IconButton  sx={{color: 'white', borderRadius: 1, bgcolor: 'primary.main', p: .4, ':hover':{bgcolor: 'primary.main'}}} onClick={()=>setKey('desc')}>
                            <ArrowUpward/>
                        </IconButton>
                        <IconButton  sx={{color: 'white', borderRadius: 1, bgcolor: 'error.main', p: .4, ':hover':{bgcolor: 'error.main'}}} onClick={()=>setKey('asc')}>
                            <ArrowDownward/>
                        </IconButton>

                    </Grid>
                </Grid>

                <ListOfUsers
                    adminId={me.id}
                    data={data}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    isFetching={isFetching}
                 />
            
            </Grid>
        </Grid>
    )
}

export default Admin