import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthProvider } from '../SubApp'
import { useRegister } from './hooks/register'
import InputField from './utils/InputField'
import MainForm from './utils/MainForm'

const Register = () => {

    const {setToken} = useContext(AuthProvider)

    const {mutateAsync} = useRegister()
    const [submitting, setSubmitting] = React.useState(false)

    const nav = useNavigate()

    const handleSubmit = async (values, {setErrors}) => {
        setSubmitting(true)
        const res = await mutateAsync(values)
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
        <MainForm
            type={'Register'}
            children={
                <Formik initialValues={{username: '', personalEmail: '', password: ''}} onSubmit={handleSubmit}>
                    <Grid>
                        <Form>
                            <InputField name={'username'} label={'Username'}/>
                            <InputField name={'personalEmail'} label={'Email'}/>
                            <InputField name={'password'} label={'Password'}/>
                            {
                                submitting ? 
                                <Box sx={{ display: 'flex', m: 1, mt: 1.3, alignItems: 'center', justifyContent: 'center' }}>
                                    <CircularProgress size={30}/>
                                </Box> :
                                <Button fullWidth type='submit' sx={{mt: 5, py: 1.3, px: 4}} variant='contained'>Sign Up</Button>
                            }
                        </Form>
                        <Grid mt={2}>
                            <Grid display='flex' alignItems='center' justifyContent={'center'}>
                                <Typography variant='body2' mr={.5}>
                                    Already have an account?
                                </Typography>
                                <Typography 
                                    onClick={() => nav('/login')} variant='body2' 
                                    sx={{textAlign: 'center', cursor: 'pointer',
                                        textDecoration: 'underline',
                                        color: 'primary.main'
                                    }}>
                                        Sign In
                                    </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Formik>
            }
        />
    )

}

export default Register

