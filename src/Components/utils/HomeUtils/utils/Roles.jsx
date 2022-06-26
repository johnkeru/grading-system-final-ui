import { Button, Menu, Fade, MenuItem } from '@mui/material';
import React from 'react'
import {useRoles} from '../../../hooks/role'

export default function Roles({roles, inactive}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const {data: rolez} = useRoles()
  const isAdmin = roles?.find(role => role.role === 'admin')

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='contained'
        color={isAdmin? 'secondary': 'primary'}
        size='small'
        disabled={inactive}
        sx={{
          color: 'white',
          textTransform: 'none',
        }}
      >
        {roles ? isAdmin ? 'ADMIN' : 'Roles' : 'Available Roles'}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {!roles ? rolez?.map(role => (
          <MenuItem key={role.id}>{role.role_name}</MenuItem>
        )) :
          roles?.map(role => (
            <MenuItem key={role.id}>{role.role}</MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}
