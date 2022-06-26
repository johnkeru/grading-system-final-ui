import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { CloseForget } from "./Forget";
import { useChangePassword } from './hooks/changepassword';
import InputField from "./utils/InputField";

export default function ChangePassword({open, setOpen, email}) {
    const {close} = useContext(CloseForget) 
    const {mutateAsync} = useChangePassword()
    const [loading, setLoading] = React.useState(false)
    const handleClose = () => setOpen(false);
    const handleSubmit = async (values, {setErrors}) => {
        setLoading(true)
        const val = Object.assign(values, {email})
        const res = await mutateAsync(val)
        setLoading(false)
        if(res.field){
            setErrors({
                [res.field]: res.msg
            })
        }
        if(res.success){
            close()
        }
    }

    return (
        <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your new password.
                </DialogContentText>
                <Formik initialValues={{password: ''}} onSubmit={handleSubmit}>
                    <Form>
                        <DialogContent>
                            <InputField name={'password'} label={'Password'}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            {loading ? 
                             <Box sx={{ display: 'flex', mx: 1}}>
                                <CircularProgress size={30}/>
                            </Box>
                            : <Button type='submit' color="primary">
                                Submit
                            </Button>}
                        </DialogActions>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
        </div>
    );
}
