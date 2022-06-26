import { AccountCircleOutlined, Add, AlternateEmailOutlined, LockOutlined, NumbersOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../../InputField';
import DateOfBirth from '../../DateOfBirth';
import { useAddUser } from '../../../hooks/createUser';

const getMonthDayYear = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export default function AddUser({createdBy}) {

  const {mutateAsync} = useAddUser()

  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [dateOfBirth, setDateOfBirth] = React.useState(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values, {setErrors}) => {
    if(error) return
    setSubmitting(true);
    const data = Object.assign(values, { dateOfBirth, createdOn: getMonthDayYear(), createdBy });
    if(isNaN(values.studentNumber)) {
      setErrors({studentNumber: 'must be a number'})
      setSubmitting(false)
      return
    }
    const res = await mutateAsync(data)
    if(res.field) {
      setErrors({[res.field]: res.msg})
      setSubmitting(false)
      return;
    }
    setSubmitting(false)
    handleClose();
  }

  const initialValues = {
    username: '',
    personalEmail: '',
    schoolEmail: '',
    studentNumber: '',
    password: '',
  }


  return (
    <div>
      <Button variant="contained" size='small' color='secondary' endIcon={<Add />} onClick={handleClickOpen}>
        Add User
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
          <DialogContent sx={{width: '500px'}}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Grid>
                        <Form>
                            <InputField name={'username'} label={'Full Name'} Icon={AccountCircleOutlined}/>
                            <InputField name={'personalEmail'} label={'Email'} Icon={AlternateEmailOutlined}/>
                            <InputField name={'schoolEmail'} label={'School Email'} Icon={AlternateEmailOutlined}/>
                            <DateOfBirth error={error} setError={setError} setDate={setDateOfBirth}/>
                            <InputField name={'studentNumber'} label={'Student Number'} Icon={NumbersOutlined}/>
                            <InputField name={'password'} label={'Password'} Icon={LockOutlined}/>
                            {submitting ?
                               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
                                  <CircularProgress size={30} color='secondary'/>
                              </Box>  :
                              <Button fullWidth type='submit' sx={{mt: 5, py: 1.3, px: 4}} variant='contained'>Add User</Button>
                            }
                        </Form>
                        <Grid mt={2}>
                            <Grid display='flex' alignItems='center' justifyContent={'center'}>
                                <Typography variant='body2' color='#333'>Create a temporary account.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Formik>
          </DialogContent>
      </Dialog>
    </div>
  );
}
