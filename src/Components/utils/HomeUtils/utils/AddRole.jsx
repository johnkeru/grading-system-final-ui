import { Add } from '@mui/icons-material';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import React from 'react';
import {useAddRole} from '../../../hooks/role';


export default function AddRole() {
  const {mutateAsync} = useAddRole()
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if(!data.role_name) {
      setError('Role name is required');
      return
    }
    await mutateAsync(data.role_name)
    setLoading(false);
    handleClose();
  }

  return (
    <div>
        <IconButton onClick={handleClickOpen} sx={{bgcolor: 'success.main', color: '#eee', borderRadius: 1, p: .4, ':hover':{bgcolor:'success.main'}}} size='small'>
            <Add/>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Add Role</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This will allow you to add users to this role.
                </DialogContentText>
                <TextField
                  error={!!error}
                  helperText={error}
                  autoFocus
                  onChange={()=>setError('')}
                  margin="dense"
                  name="role_name"
                  label="New Role"
                  fullWidth
                  variant="standard"
                />
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
