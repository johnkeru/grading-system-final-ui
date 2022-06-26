import { Button, Dialog, FormControl, InputLabel, Select, MenuItem, DialogActions, IconButton, Grid, Box, CircularProgress, Tooltip } from '@mui/material';
import React from 'react';
import {Typography} from '@mui/material'
import { StarBorder } from '@mui/icons-material';
import {useApproverLevel} from '../../../hooks/approverLevel'
import { red } from '@mui/material/colors';

const colorLevel = (level) => {
  if(level === 1) return red['200']
  if(level === 2) return red['300']
  if(level === 3) return red['400']
  if(level === 4) return red['500']
  if(level === 5) return red['700']
  return 'primary.main'
}

export default function ApprovalLevel({id, level, name, inactive}) {
  const [open, setOpen] = React.useState(false);
  const [approve, setApprove] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {mutateAsync} = useApproverLevel()

  const handleChange = (event) => setApprove(event.target.value);
  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await mutateAsync({id, approve: approve ? approve : 0})
    handleClose();
    setLoading(false);
  }

  return (
    <div>
      <IconButton disabled={inactive} sx={{color: 'white', borderRadius: 1, bgcolor: colorLevel(level), p: .4, mr: 1.5, ':hover':{bgcolor: colorLevel(level)}}}  size='small'onClick={handleClickOpen}>
        {level ? <Tooltip title={`
          ${name} has ${level} approval level
        `}>
          <Typography>{'A'+level}</Typography>
        </Tooltip> : <StarBorder/>}
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid width='300px' py={3} px={1.5}>
          <FormControl variant="filled" sx={{ minWidth: '100%' }}>
            <InputLabel id="demo-simple-select-filled-label">Approve</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={approve}
              onChange={handleChange}
            >
              <MenuItem value={1}>Approve Level 1</MenuItem>
              <MenuItem value={2}>Approve Level 2</MenuItem>
              <MenuItem value={3}>Approve Level 3</MenuItem>
              <MenuItem value={4}>Approve Level 4</MenuItem>
              <MenuItem value={5}>Approve Level 5</MenuItem>
            </Select>
          </FormControl>

            <DialogActions>
              <Button onClick={handleClose}>
                Cancel
              </Button>
              {
                loading ? <Box sx={{ display: 'flex', mx: 1 }}>
                    <CircularProgress size={30} color='secondary'/>
                  </Box> : 
                <Button onClick={handleSubmit} autoFocus>
                  Approve
                </Button>
              }
            </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}


