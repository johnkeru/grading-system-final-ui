import { DeleteForeverOutlined } from '@mui/icons-material';
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useMarkInactive } from '../../../hooks/markInactive';

export default function MarkInactive({name, id, inactive: ina, reason:rea}) {
  const [open, setOpen] = React.useState(false);
  const [inactive, setInactive] = React.useState(ina);
  const [reason, setReason] = React.useState(rea || '');
  const [loading, setLoading] = React.useState(false);

  const {mutateAsync} = useMarkInactive()

  const handleClickOpen = () => setOpen(true);
  const handleClose = async () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // @ts-ignore
    await mutateAsync({inactive, reason, id})
    setLoading(false);
    setOpen(false);
  }

  return (
    <div>
      <IconButton sx={{color: 'white', borderRadius: 1, bgcolor: 'error.main', p: .4, ':hover':{bgcolor: 'error.main'}}} onClick={handleClickOpen}>
          <DeleteForeverOutlined/>
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mark {inactive ? 'Active' : 'Inactive'}</DialogTitle>
        <DialogContent>
            <FormGroup>
                    <FormControlLabel 
                      control={<Checkbox 
                          checked={inactive}
                          onChange={() => setInactive(!inactive)}
                      />} 
                      label={`Mark ${name} as ${inactive ? 'active' : 'inactive'}`} 
                      />
            </FormGroup>

          <TextField
            autoFocus
            id="name"
            label="Reason"
            value={reason}
            onChange={e => setReason(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size='small' variant='contained' color='error'>Cancel</Button>
          {
            loading ? 
              <Box sx={{ display: 'flex', mx: 1 }}>
                <CircularProgress size={30} color='secondary'/>
              </Box> :
            <Button onClick={handleSubmit} size='small' variant='contained'>Mark</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
