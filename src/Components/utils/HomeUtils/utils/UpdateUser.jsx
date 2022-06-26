import { AccountCircleOutlined, AlternateEmailOutlined, Update } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useGetOneUser } from '../../../hooks/getAllUsers';
import { useUpdateUser } from '../../../hooks/updateUser';
import DateOfBirth from '../../DateOfBirth';
import InputField from '../../InputField';

const getMonthDayYear = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export default function UpdateUser({lastUpdatedBy, id, username, inactive}) {

    const {data:user} = useGetOneUser(id)
    const {mutateAsync} = useUpdateUser()

    const [open, setOpen] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [dateOfBirth, setDateOfBirth] = React.useState(null);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (values, {setErrors}) => {
        if(error) return
        setSubmitting(true);
        const data = Object.assign(values, { dateOfBirth, lastUpdatedOn: getMonthDayYear(), lastUpdatedBy, id });
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
        username: user?.username,
        schoolEmail: user?.schoolEmail || '',
    }
    return (
        <div>
        <Button disabled={inactive} variant="contained" size='small' color='secondary' endIcon={<Update />} onClick={handleClickOpen}>
            Update
        </Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update {username}</DialogTitle>
            <DialogContent sx={{width: '500px'}}>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Grid>
                            <Form>
                                <InputField name={'username'} label={'Full Name'} Icon={AccountCircleOutlined}/>
                                <InputField name={'schoolEmail'} label={'School Email'} Icon={AlternateEmailOutlined}/>
                                <DateOfBirth error={error} setError={setError} setDate={setDateOfBirth} providedDate={user?.dateOfBirth}/>
                                <Button disabled={submitting} fullWidth type='submit' sx={{mt: 5, py: 1.3, px: 4}} variant='contained'>Update {username}</Button>
                            </Form>
                            <Grid mt={2}>
                                <Grid display='flex' alignItems='center' justifyContent={'center'}>
                                    {user?.lastUpdatedOn && <Typography variant='body2' color='#333'>
                                        Last Updated On: {user?.lastUpdatedOn}
                                    </Typography>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Formik>
            </DialogContent>
        </Dialog>
        </div>
    );
}
