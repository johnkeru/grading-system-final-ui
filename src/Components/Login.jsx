import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../SubApp';
import ForgetDialog from './Forget';
import { useLogin } from './hooks/login';
import InputField from './utils/InputField';
import MainForm from './utils/MainForm';

const Login = () => {
    const [openForgot, setOpenForgot] = React.useState(false)
    const [threeTimeAccess, setThreeTimeAccess] = React.useState(0)
    const [emailToLock, setEmailToLock] = React.useState('')

    const {setToken} = useContext(AuthProvider)

    const {mutateAsync} = useLogin()
    const [submitting, setSubmitting] = React.useState(false)

    const nav = useNavigate()

    const handleSubmit = async (values, {setErrors}) => {
        setSubmitting(true)
        setThreeTimeAccess(threeTimeAccess + 1)
        const res = await mutateAsync(values)
        const {email} = values
        if(threeTimeAccess === 2) {
            setEmailToLock(email)
        }
        if(threeTimeAccess > 2) {
            if(emailToLock === email){
                setErrors({email: `Account ${email} is locked!`})
                alert(`You have 3 times access to ${email} account. Please wait for 1 minute to try again.`)
                setInterval(() => {
                    setEmailToLock('')
                    setThreeTimeAccess(0)
                }, 69 * 1000)
                setSubmitting(false)
                return
            }
        }
        if(res.field){
            setErrors({
                [res.field]: res.msg
            })
        }
        if(res.access_token){
            setToken(res.access_token)
            localStorage.setItem('token', res.access_token)
            nav('/')
        }
        setSubmitting(false)
    }

    return (
        <>
        <MainForm
            type={'Login'}
            children={
                <Formik initialValues={{personalEmail: '', password: ''}} onSubmit={handleSubmit}>
                    <Grid>
                        <Form>
                            <InputField name={'personalEmail'} label={'Email'}/>
                            <InputField name={'password'} label={'Password'}/>
                            {
                                submitting ? 
                                <Box sx={{ display: 'flex', m: 1, mt: 1.3, alignItems: 'center', justifyContent: 'center' }}>
                                    <CircularProgress size={30}/>
                                </Box> :
                                <Button fullWidth type='submit' sx={{mt: 5, py: 1.3, px: 4}} variant='contained'>Sign In</Button>
                            }
                        </Form>
                        <Grid mt={2}>
                            <Grid display='flex' alignItems='center' justifyContent={'center'}>
                                <Typography variant='body2' mr={.5}>
                                    Don't have an account? 
                                </Typography>
                                <Typography 
                                    onClick={() => nav('/register')} variant='body2' 
                                    sx={{textAlign: 'center', cursor: 'pointer',
                                        textDecoration: 'underline',
                                        color: 'primary.main'
                                    }}>
                                        Sign Up
                                    </Typography>
                            </Grid>
                            <Grid display='flex' alignItems='center' justifyContent={'center'} mt={1}>
                                <Typography variant='body2' mr={.5}>
                                    Forgot Password?
                                </Typography>
                                <Typography 
                                    onClick={() => setOpenForgot(true)} variant='body2' 
                                    sx={{textAlign: 'center', cursor: 'pointer',
                                        textDecoration: 'underline',
                                        color: 'primary.main'
                                    }}>
                                        Reset Password
                                    </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Formik>
            }
        />
        {openForgot && <ForgetDialog open={openForgot} setOpen={setOpenForgot}/>}
        </>
    )

}

export default Login

