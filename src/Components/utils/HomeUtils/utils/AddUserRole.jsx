import { Add } from '@mui/icons-material';
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import React from 'react';
import { useAddUserRole } from '../../../hooks/addUserRole';
import { useRoles } from '../../../hooks/role';

export default function AddUserRole({user, user_id, inactive}) {
  const {mutateAsync} = useAddUserRole()
  const [checks, setChecks] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {data: roles} = useRoles()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    Promise.all(checks.map(async (role) => await mutateAsync({role, user_id}))).then(() => {
      setLoading(false)
      handleClose()
    })
  }

  return (
    <div>
        <IconButton disabled={inactive} onClick={handleClickOpen} sx={{bgcolor: 'success.main', color: '#eee', borderRadius: 1, p: .45, ':hover':{bgcolor:'success.main'}}} size='small'>
            <Add/>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
                <DialogTitle>Add {user} another role.</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Adding a role to {user} will give them access to the espicific role.
                  </DialogContentText>
                  
                  <FormGroup>
                      {roles?.map(role => (
                          <FormControlLabel 
                            key={role.id} 
                            control={<Checkbox 
                                checked={checks.includes(role.role_name)}
                                onChange={(e) => setChecks(checks.includes(role.role_name) ? checks.filter(r => r !== role.role_name) : [...checks, role.role_name])}
                            />} 
                            label={role.role_name} 
                            />
                      ))}
                  </FormGroup>
    
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} variant='contained' color='warning' size='small'>Cancel</Button>
                  {
                    loading ?
                      <Box sx={{ display: 'flex', mx: 1 }}>
                        <CircularProgress size={30} color='secondary'/>
                      </Box> :
                      <Button type='submit' variant='contained' size='small'>Add</Button>
                  }
                </DialogActions>
          </form>
        </Dialog>
    </div>
  );
}
