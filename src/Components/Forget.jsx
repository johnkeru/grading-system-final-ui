import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';
import InputField from './utils/InputField';
import React from 'react'
import {useReset} from './hooks/reset'
import LinkToChangePassword from './LinkToChangePassword';
import { createContext } from 'react';

export const CloseForget = createContext({
  close: (_val) => {},
})

export default function ForgetDialog({setOpen, open}) {
  
  const [openLink, setOpenLink] = React.useState(false)
  const [email, setEmail] = React.useState('')

  const [loading, setLoading] = React.useState(false)

  const handleClose = () => setOpen(false);
  const {mutateAsync} = useReset()

  const handleSubmit = async (values, {setErrors}) => {
    setLoading(true)
    const res = await mutateAsync(values)
    if(res.field){
      setErrors({
        [res.field]: res.msg
      })
    }
    if(res.email){
      setOpenLink(true)
      setEmail(res.email)
    }
    setLoading(false)
  }

  return (
    <CloseForget.Provider value={{close: handleClose}}>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Please Enter your E-mail first.</DialogTitle>
          <Formik initialValues={{email: ''}} onSubmit={handleSubmit}>
            <Form>
              <DialogContent>
                <DialogContentText>
                  We will send you a link to reset your password.
                </DialogContentText>
                <InputField name={'email'} label={'Email'}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                {
                  loading ? 
                   <Box sx={{ display: 'flex', mx: 1 }}>
                      <CircularProgress size={30}/>
                    </Box> : 
                    <Button type='submit' color="primary">
                      Send
                    </Button>
                }
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>

        <LinkToChangePassword open={openLink} setOpen={setOpenLink} email={email}/>
      </div>
    </CloseForget.Provider>
  );
}
