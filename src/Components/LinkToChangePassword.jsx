import { Dialog, DialogContent, DialogContentText, Grid, Typography } from "@mui/material";
import React from 'react'
import ChangePassword from "./ChangePassword";

export default function LinkToChangePassword({open, setOpen, email}) {
  const handleClose = () => setOpen(false);
  const [openChangePassword, setOpenChangePassword] = React.useState(false);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            Your Email has been found:
            <Typography variant='h6' sx={{marginLeft: '1rem', fontWeight: 700}} color='secondary'>{email}</Typography>
          </Grid>
          <DialogContentText
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              fontSize: '1rem',
              fontWeight: 700,
              lineHeight: '1.5rem',
              marginBottom: '1rem',
              textDecoration: 'underline',
              ':hover': {
                color: 'primary.dark'
              }
            }}
            onClick={() => setOpenChangePassword(true)}
          >
            Click this link to change your password.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {openChangePassword && <ChangePassword open={openChangePassword} setOpen={setOpenChangePassword} email={email}/>}
    </div>
  );
}
